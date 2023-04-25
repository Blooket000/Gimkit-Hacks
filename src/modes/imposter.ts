import { ToggleList } from "../navigator";
import classic from "./classic";

const imposter = {
  "Answers": classic["Answers"],
  "Auto Answer": classic["Auto Answer"],
  "Auto Answer Config": classic["Auto Answer Config"],
  "Answer Correctly Once": classic["Answer Correctly Once"],
  "Highlight Answer": classic["Highlight Answer"],
  "Hidden Answer": classic["Hidden Answer"],
  "Input Answer": classic["Input Answer"],

  // "Imposter": {
  //   type: "header"
  // },
  // "Reveal Imposters": {
  //   type: "toggle", value: false,
  //   action: () => {}
  // },

  // "Misc": classic["Misc"],
  // "Spam Host": {
  //   type: "toggle", value: false,
  //   action: () => {}
  // },
  // "Set Claps (Endgame)": classic["Set Claps (Endgame)"],
  // "Kick Player": classic["Kick Player"]
}

export default imposter as ToggleList;