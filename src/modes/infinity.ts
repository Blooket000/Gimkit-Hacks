import { sleep } from '../helpers';
import { WebSocketData } from "../websocket";
import { ToggleList } from '../interfaces/navigator';
import classic, { buyPowerup } from "./classic";


const infinityMode = {
  "Answers": classic["Answers"],
  "Auto Answer": classic["Auto Answer"],
  "Auto Answer Config": classic["Auto Answer Config"],
  "Answer Correctly Once": classic["Answer Correctly Once"],
  "Highlight Answer": classic["Highlight Answer"],
  "Input Answer": classic["Input Answer"],
  "Upgrades": classic["Upgrades"],
  "Auto Upgrade": classic["Auto Upgrade"],
  "Auto Upgrade Config": classic["Auto Upgrade Config"],
  "Items": {
    type: "header"
  },
  "Buy All Items": {
    type: "button",
    action: async() => {
      const el = infinityMode["Buy Specific Item"].elements;
      for(const data of Object.values(el)) {
        data.action();
        await sleep(100);
      }
    }
  },
  "Buy Specific Item": {
    type: "collapse", elements: {
      "Soul Stone": {
        type: "button",
        condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Soul Stone"),
        action: () => {
          buyPowerup("Soul Stone");
        }
      },
      "Time Stone": {
        type: "button",
        condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Time Stone"),
        action: () => {
          buyPowerup("Time Stone");
        }
      },
      "Space Stone": {
        type: "button",
        condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Space Stone"),
        action: () => {
          buyPowerup("Space Stone");
        }
      },
      "Mind Stone": {
        type: "button",
        condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Mind Stone"),
        action: () => {
          buyPowerup("Mind Stone");
        }
      },
      "Reality Stone": {
        type: "button",
        condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Reality Stone"),
        action: () => {
          buyPowerup("Reality Stone");
        }
      },
      "Power Stone": {
        type: "button",
        condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Power Stone"),
        action: () => {
          buyPowerup("Power Stone");
        }
      }
    }
  },
  "Use Specific Item": classic["Use Specific Powerup"],
  "Powerups": classic["Powerups"],
  "Buy All Powerups": classic["Buy All Powerups"],
  "Buy Specific Powerup": classic["Buy Specific Powerup"],
  "Use Specific Powerup": classic["Use Specific Powerup"],
  "Themes": classic["Themes"],
  "Buy All Themes": classic["Buy All Themes"],
  "Set Specific Theme": classic["Set Specific Theme"],
  "Misc": classic["Misc"],
  "Set Claps (Endgame)": classic["Set Claps (Endgame)"],
}

export default infinityMode as ToggleList;