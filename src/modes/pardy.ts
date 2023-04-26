import { NavButton, NavCollapse, ToggleList } from "../interfaces/navigator";
import { WebSocketData } from "../websocket";
import classic, { answerClassicQuestion } from "./classic";
import { sleep } from '../helpers';

const pardy = {
  "Answers": classic["Answers"],
  "Auto Answer": {
    type: "toggle", value: false,
    action: async function() {
      if(WebSocketData.PARDY_MODE_STATE?.[0].value.key === "questionStatus") {
        if(WebSocketData.PARDY_MODE_STATE[0].value.value === "ask") {
          await sleep(pardy["Auto Answer Config"].elements["Delay"].value);
          answerClassicQuestion();
          await sleep(500);
        }
      }
      await sleep(10);
      if (this.value) this.action.bind(this)();
    }
  },
  "Auto Answer Config": {
    type: "collapse", elements: {
      "Delay": {
        type: "slider",
        interval: [0, 250, 2500],
        value: 0,
        numSuffix: "ms",
        colors: {
          "orange": 50,
          "lime": 50
        }
      },
      "Question Index": (classic["Auto Answer Config"] as NavCollapse).elements["Question Index"],
      "Success Rate": (classic["Auto Answer Config"] as NavCollapse).elements["Success Rate"]
    }
  },
  "Answer Correctly Once": classic["Answer Correctly Once"],
  "Highlight Answer": classic["Highlight Answer"],
  "Hidden Answer": classic["Hidden Answer"],
  "Input Answer": classic["Input Answer"],

  // "Misc": classic["Misc"],
  // "Set Claps (Endgame)": classic["Set Claps (Endgame)"],
  // "Kick Player": classic["Kick Player"]
}
export default pardy as ToggleList;