import { ToggleList } from "../interfaces/navigator";
import classic from "./classic";

const pardy = {
  "Answers": classic["Answers"],
  // "Auto Answer": {
  //   type: "toggle", value: false,
  //   action: () => {}
  // },
  // "Auto Answer Config": classic["Auto Answer Config"],
  // "Answer Correctly Once": {
  //   type: "button",
  //   action: () => {}
  // },
  "Highlight Answer": classic["Highlight Answer"],
  "Hidden Answer": classic["Hidden Answer"],
  "Input Answer": classic["Input Answer"],

  // "Misc": classic["Misc"],
  // "Set Claps (Endgame)": classic["Set Claps (Endgame)"],
  // "Kick Player": classic["Kick Player"]
}
export default pardy as ToggleList;