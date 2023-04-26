import { send } from '../websocket';
import { sleep } from '../helpers';
import { getCorrect, getCorrectIndex, getChoices } from "../parsers/answer";
import { WebSocketData } from "../websocket";
import { NavItem, NavToggle, ToggleList } from "../interfaces/navigator";
import createSelectUI from "../navigator/select";


export const answerClassicQuestion = () => {
  const firstQ: any = WebSocketData.GAME_QUESTIONS?.[classic["Auto Answer Config"].elements["Question Index"].value] || WebSocketData.GAME_QUESTIONS?.[0];
  send('QUESTION_ANSWERED', {
    questionId: firstQ._id,
    answer: getCorrect(firstQ.answers)._id,
  });
};
const buyPowerup = (id: string) => {
  send("POWERUP_PURCHASED", id);
}
const usePowerup = async(id: string) => {
  if(["Icer", "outnumbered", "Blurred Screen", "Giving", "Subtractor"].includes(id)) {
    if(!WebSocketData.PLAYER_LEADERBOARD) {
      send("PLAYER_LEADERBOARD_REQUESTED", undefined);
      await sleep(500);
    }
    const players = WebSocketData.PLAYER_LEADERBOARD ?? [];
    if(!players) return;
    createSelectUI(
      Object.fromEntries(players.map(p => [p.name+`{${p.id}}`, { type: "button", action: () => {}, _id: p.id }])),
      (_id?: string) => {
        if(!_id) return;
        send("POWERUP_ATTACK", {
          name: id,
          target: _id
        })
      }
    )
  }
  else send("POWERUP_ACTIVATED", id);
}
const powerupMap = {
    "repurchasePowerups": "Rebooter",
    "minuteMoreEarnings": "Minute To Win It",
    "outnumbered": "Outnumbered",
    "Quad Upgrade": "Quadrader",
    "Blurred Screen": "Blur",
    "Clap Multiplier": "Clapinator",
    "Giving": "Gift"
}
const buyTheme = (id: string) => {
  if(WebSocketData.PURCHASED_THEMES?.includes(id)) return;
  send("THEME_PURCHASED", id);
}
const setTheme = (id: string) => {
  send("THEME_APPLIED", id);
}

const classic = {
  "Answers": {
    type: "header"
  },
  "Auto Answer": {
    type: 'toggle', value: false,
    keybindId: "classic_auto_answer",
    action: async function () {
      answerClassicQuestion();
      await sleep(classic["Auto Answer Config"].elements["Delay"].value);
      if (this.value) this.action.bind(this)();
    },
  },
  "Auto Answer Config": {
    type: "collapse", elements: {
      "Delay": {
        type: "slider",
        interval: [500, 250, 2500],
        value: 1500,
        numSuffix: "ms",
        colors: {
          "red": 20,
          "orange": 20,
          "lime": 60
        }
        // example input track gradient:
        // linear-gradient(90deg, red 5%, orange 6%, orange 15%, lime 16%)
      },
      "Question Index": {
        type: "slider",
        interval: [0, 1, 4], // dynamically change this to match set
        value: 0
      },
      "Success Rate": {
        type: "slider",
        interval: [0, 5, 100],
        value: 100,
        numSuffix: "%"
      }
    }
  },
  "Answer Correctly Once": {
    type: "button",
    action: answerClassicQuestion
  },
  "Highlight Answer": {
    type: "toggle", value: false,
    action: async function() {
      const answer = getCorrectIndex();
      if(answer && answer?.type === "text" && answer.index) {
        const option = getChoices()?.[answer.index];
        if(option) {
          (option.children[0] as HTMLElement).style.background = "dodgerblue";
          (option.children[0] as HTMLElement).style.color = "black";
        }
      }
      await sleep(250);
      if(this.value) this.action.bind(this)();
      else {
        getChoices()?.forEach(option => {
          (option.children[0] as HTMLElement).style.background = "";
          (option.children[0] as HTMLElement).style.color = "";
        })
      }
    }
  },
  "Hidden Answer": {
    type: "toggle", value: false,
    action: async function() {
      const answer = getCorrectIndex();
      if(answer?.type === "text" && answer.index) document.title = `${answer.index + 1}lay Gimkit! - Enter game code here | Gimkit`;
      else document.title = "Play Gimkit! - Enter game code here | Gimkit" 
      await sleep(250);
      if(this.value) this.action.bind(this)();
      else document.title = "Play Gimkit! - Enter game code here | Gimkit";
    }
  },
  "Input Answer": {
    type: "toggle", value: false,
    action: async function() {
      const answer = getCorrectIndex();
      const input = (document.getElementsByTagName("form")[0]?.children[0] ?? {}) as HTMLInputElement | null;
      if(answer?.type === "input" && input) input.placeholder = answer.text;
      await sleep(250);
      if(this.value) this.action.bind(this)();
      else {
        const input = (document.getElementsByTagName("form")[0]?.children[0] ?? {}) as HTMLInputElement | null;
        input!.placeholder = "Enter answer here...";    
      }
    }
  },
  "Upgrades": {
    type: "header"
  },
  "Auto Upgrade": {
    type: "toggle", value: false,
    action: async function() {
      function purchase(upgradeName: string, level: number) {
        send("UPGRADE_PURCHASED", {
          upgradeName, level
        });
      }

      let bal = WebSocketData.BALANCE ?? 0;
      const discount = WebSocketData.PERSONAL_ACTIVE_POWERUPS?.includes("discount") ? 0.75 : 1;
      
      const money = classic['Auto Upgrade Config'].elements['Money Per Question'].value;
      const multiplier = classic['Auto Upgrade Config'].elements['Multiplier'].value;
      const streak = classic['Auto Upgrade Config'].elements['Streak Bonus'].value;
      const insurance = classic['Auto Upgrade Config'].elements['Insurance'].value;

      if(money) {
        const levels = WebSocketData.GAME_STATE!.upgrades[0].levels;
        const current = WebSocketData.UPGRADE_LEVELS!.moneyPerQuestion;
        const next = (levels[current]?.price ?? Infinity) * discount * (WebSocketData.UPGRADE_PRICING_DISCOUNT ?? 1);
        if(bal >= next) {
          purchase("Money Per Question", current + 1);
          bal -= next;
        }
      }
      if(multiplier) {
        const levels = WebSocketData.GAME_STATE!.upgrades[1].levels;
        const current = WebSocketData.UPGRADE_LEVELS!.multiplier;
        const next = (levels[current]?.price ?? Infinity) * discount * (WebSocketData.UPGRADE_PRICING_DISCOUNT ?? 1);
        if(bal >= next) {
          purchase("Multiplier", current + 1);
          bal -= next;
        }
      }
      if(streak) {
        const levels = WebSocketData.GAME_STATE!.upgrades[2].levels;
        const current = WebSocketData.UPGRADE_LEVELS!.streakBonus;
        const next = (levels[current]?.price ?? Infinity) * discount * (WebSocketData.UPGRADE_PRICING_DISCOUNT ?? 1);
        if(bal >= next) {
          purchase("Streak Bonus", current + 1);
          bal -= next;
        }
      }
      if(insurance) {
        const levels = WebSocketData.GAME_STATE!.upgrades[3].levels;
        const current = WebSocketData.UPGRADE_LEVELS!.insurance;
        const next = (levels[current]?.price ?? Infinity) * discount * (WebSocketData.UPGRADE_PRICING_DISCOUNT ?? 1);
        if(bal >= next) {
          purchase("Insurance", current + 1);
          bal -= next;
        }
      }

      await sleep(500);
      if (this.value) this.action.bind(this)();
    }
  },
  "Auto Upgrade Config": {
    type: "collapse", elements: {
      "Money Per Question": {
        type: "toggle", value: true
      },
      "Multiplier": {
        type: "toggle", value: true
      },
      "Streak Bonus": {
        type: "toggle", value: true
      },
      "Insurance": {
        type: "toggle", value: false
      }
    }
  },
  "Powerups": {
    type: "header"
  },
  "Buy All Powerups": {
    type: "button",
    action: async() => {
      const el = classic["Buy Specific Powerup"].elements;
      for(const data of Object.values(el)) {
        data.action();
        await sleep(100);
      }
    }
  },
  "Buy Specific Powerup": {
    type: "collapse", elements: {
      "Icer": {
        type: "button",
        condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Icer"),
        action: () => {
          buyPowerup("Icer");
        }
      },
      "Rebooter": {
        type: "button",
        condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("repurchasePowerups"),
        action: () => {
          buyPowerup("repurchasePowerups");
        }
      },
      "Minute To Win It": {
        type: "button",
        condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("minuteMoreEarnings"),
        action: () => {
          buyPowerup("minuteMoreEarnings");
        }
      },
      "Outnumbered": {
        type: "button",
        condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("outnumbered"),
        action: () => {
          buyPowerup("outnumbered");
        }
      },
      "Quadgrader": {
        type: "button",
        condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Quad Upgrade"),
        action: () => {
          buyPowerup("Quad Upgrade");
        }
      },
      "Discounter": {
        type: "button",
        condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Discounter"),
        action: () => {
          buyPowerup("Discounter");
        }
      },
      "Blur": {
        type: "button",
        condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Blurred Screen"),
        action: () => {
          buyPowerup("Blurred Screen");
        }
      },
      "Clapinator": {
        type: "button",
        condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Clap Multiplier"),
        action: () => {
          buyPowerup("Clap Multiplier");
        }
      },
      "Gift": {
        type: "button",
        condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Giving"),
        action: () => {
          buyPowerup("Giving");
        }
      },
      "Shield": {
        type: "button",
        condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Shield"),
        action: () => {
          buyPowerup("Shield");
        }
      },
      "Subtractor": {
        type: "button",
        condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Subtractor"),
        action: () => {
          buyPowerup("Subtractor");
        }
      },
      "Mini Bonus": {
        type: "button",
        condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Mini Bonus"),
        action: () => {
          buyPowerup("Mini Bonus");
        }
      },
      "Mega Bonus": {
        type: "button",
        condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Mega Bonus"),
        action: () => {
          buyPowerup("Mega Bonus");
        }
      }
    }
  },
  "Use Specific Powerup": {
    type: "button",
    condition: () => WebSocketData.PURCHASED_POWERUPS?.filter(p => !WebSocketData.USED_POWERUPS?.includes(p)).length ?? -1 > 0,
    action: () => {
      const unused = WebSocketData.PURCHASED_POWERUPS?.filter(p => !WebSocketData.USED_POWERUPS?.includes(p));
      if(!unused) return;
      createSelectUI(
        Object.fromEntries(unused.map(p => [powerupMap[p] || p, { type: "button", action: () => {}, _id: p }])),
        (_id?: string) => {
          if(!_id) return;
          usePowerup(_id);
        }
      );
    }
  },
  "Themes": {
    type: "header"
  },
  "Buy All Themes": {
    type: "button",
    action: async() => {
      const el = classic["Set Specific Theme"].elements;
      const prior = WebSocketData.THEME ?? "Default";
      for(const data of Object.values(el)) {
        data.action();
        await sleep(100);
      }
      setTheme(prior);
    }
  },
  "Set Specific Theme": {
    type: "collapse", elements: {
      "Default": {
        type: "button",
        condition: () => WebSocketData.THEME !== "Default",
        action: () => {
          setTheme("Default");
        }
      },
      "Night [$5]": {
        type: "button",
        condition: () => (WebSocketData.THEME !== "Night" && WebSocketData.PURCHASED_THEMES?.includes("Night")) || ((WebSocketData.BALANCE || 0) >= 5 && !WebSocketData.PURCHASED_THEMES?.includes("Night")),
        action: () => {
          buyTheme("Night");
          setTheme("Night");
        }
      },
      "Thanos [$15]": {
        type: "button",
        condition: () => (WebSocketData.THEME !== "Thanos" && WebSocketData.PURCHASED_THEMES?.includes("Thanos")) || ((WebSocketData.BALANCE || 0) >= 15 && !WebSocketData.PURCHASED_THEMES?.includes("Thanos")),
        action: () => {
          buyTheme("Thanos");
          setTheme("Thanos");
        }
      },
      "Ocean [$30]": {
        type: "button",
        condition: () => (WebSocketData.THEME !== "Ocean" && WebSocketData.PURCHASED_THEMES?.includes("Ocean")) || ((WebSocketData.BALANCE || 0) >= 30 && !WebSocketData.PURCHASED_THEMES?.includes("Ocean")),
        action: () => {
          buyTheme("Ocean");
          setTheme("Ocean");
        }
      },
      "Forest [$50]": {
        type: "button",
        condition: () => (WebSocketData.THEME !== "Forest" && WebSocketData.PURCHASED_THEMES?.includes("Forest")) || ((WebSocketData.BALANCE || 0) >= 50 && !WebSocketData.PURCHASED_THEMES?.includes("Forest")),
        action: () => {
          buyTheme("Forest");
          setTheme("Forest");
        }
      },
      "Sunset [$100]": {
        type: "button",
        condition: () => (WebSocketData.THEME !== "Sunset" && WebSocketData.PURCHASED_THEMES?.includes("Sunset")) || ((WebSocketData.BALANCE || 0) >= 100 && !WebSocketData.PURCHASED_THEMES?.includes("Sunset")),
        action: () => {
          buyTheme("Sunset");
          setTheme("Sunset");
        }
      },
      "Retro [$200]": {
        type: "button",
        condition: () => (WebSocketData.THEME !== "Retro" && WebSocketData.PURCHASED_THEMES?.includes("Retro")) || ((WebSocketData.BALANCE || 0) >= 200 && !WebSocketData.PURCHASED_THEMES?.includes("Retro")),
        action: () => {
          buyTheme("Retro");
          setTheme("Retro");
        }
      },
      "Pure Gold [$1t]": {
        type: "button",
        condition: () => (WebSocketData.THEME !== "Pure Gold" && WebSocketData.PURCHASED_THEMES?.includes("Pure Gold")) || ((WebSocketData.BALANCE || 0) >= 1e12 && !WebSocketData.PURCHASED_THEMES?.includes("Pure Gold")),
        action: () => {
          buyTheme("Pure Gold");
          setTheme("Pure Gold");
        }
      }
    }
  },
  "Misc": {
    type: "header"
  },
  "Set Claps (Endgame)": {
    type: "button",
    // condition: () => WebSocketData.GAME_STATUS === "endgame",
    action: () => {
      const claps = parseFloat(prompt("Enter the amount of claps you want to set") || "0");
      if(isNaN(claps)) return;
      send("CLAP", {
        amount: claps
      })
    }
  },
  // "Kick Player": {
  //   type: "button",
  //   action: () => {}
  // },
  // "Gift Bot": {
  //   type: "button",
  //   action: () => {}
  // }
};
const checkNavItem = (item: NavItem, keybindId: string) => {
  if(item.type === "toggle" || item.type === "button") {
    if(item.keybindId === keybindId) {
      if(item.type === "toggle") item.value = !item.value;
      if((item as NavToggle).value !== false) item.action?.();
      return true;
    }
  }
}
export const processKeybind = (keybindId: string) => {
  main:for(const [_k, data] of Object.entries(classic) as [string, NavItem][]) {
    if(data.type === "collapse") {
      for(const [_k2, data2] of Object.entries(data.elements)) {
        if(checkNavItem(data2, keybindId)) break main;
      }
    }
    if(checkNavItem(data, keybindId)) break;
  }
}

export default classic as ToggleList;