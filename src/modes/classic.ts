import { send } from '../websocket';
import { sleep } from '../helpers';
import { getCorrect, getCorrectIndex, getChoices } from "../parsers/answer";
import { WebSocketData } from "../websocket";
import { NavItem, NavToggle, ToggleList } from "../interfaces/navigator";

const answerQuestion = () => {
  const firstQ = WebSocketData.GAME_QUESTIONS?.[0] as any;
  send('QUESTION_ANSWERED', {
    questionId: firstQ._id,
    answer: getCorrect(firstQ.answers)._id,
  });
};

const classic = {
  "Answers": {
    type: "header"
  },
  "Auto Answer": {
    type: 'toggle', value: false,
    keybindId: "classic_auto_answer",
    action: async function () {
      answerQuestion();
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
    action: answerQuestion
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
  // "Powerups": {
  //   type: "header"
  // },
  // "Buy All Powerups": {
  //   type: "button",
  //   action: () => {}
  // },
  // "Buy Specific Powerup": {
  //   type: "collapse", elements: {
  //     "Icer": {
  //       type: "button",
  //       action: () => {}
  //     },
  //     "Rebooter": {
  //       type: "button",
  //       action: () => {}
  //     },
  //     "Minute To Win It": {
  //       type: "button",
  //       action: () => {}
  //     },
  //     "Outnumbered": {
  //       type: "button",
  //       action: () => {}
  //     },
  //     "Quadgrader": {
  //       type: "button",
  //       action: () => {}
  //     },
  //     "Discounter": {
  //       type: "button",
  //       action: () => {}
  //     },
  //     "Blur": {
  //       type: "button",
  //       action: () => {}
  //     },
  //     "Clapinator": {
  //       type: "button",
  //       action: () => {}
  //     },
  //     "Gift": {
  //       type: "button",
  //       action: () => {}
  //     },
  //     "Shield": {
  //       type: "button",
  //       action: () => {}
  //     },
  //     "Subtractor": {
  //       type: "button",
  //       action: () => {}
  //     },
  //     "Mini Bonus": {
  //       type: "button",
  //       action: () => {}
  //     },
  //     "Mega Bonus": {
  //       type: "button",
  //       action: () => {}
  //     }
  //   }
  // },
  // "Themes": {
  //   type: "header"
  // },
  // "Buy All Themes": {
  //   type: "button",
  //   action: () => {}
  // },
  // "Set Specific Theme": {
  //   type: "collapse", elements: {
  //     "Default": {
  //       type: "button",
  //       action: () => {}
  //     },
  //     "Night [$5]": {
  //       type: "button",
  //       action: () => {}
  //     },
  //     "Thanos [$15]": {
  //       type: "button",
  //       action: () => {}
  //     },
  //     "Ocean [$30]": {
  //       type: "button",
  //       action: () => {}
  //     },
  //     "Forest [$50]": {
  //       type: "button",
  //       action: () => {}
  //     },
  //     "Sunset [$100]": {
  //       type: "button",
  //       action: () => {}
  //     },
  //     "Retro [$200]": {
  //       type: "button",
  //       action: () => {}
  //     },
  //     "Pure Gold [$1t]": {
  //       type: "button",
  //       action: () => {}
  //     }
  //   }
  // },
  // "Misc": {
  //   type: "header"
  // },
  // "Set Claps (Endgame)": {
  //   type: "button",
  //   action: () => {}
  // },
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