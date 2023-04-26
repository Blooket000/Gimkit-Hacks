import { WebSocketData, send } from '../websocket';
import { build } from '../navigator/build';
import { NavButton, ToggleList } from "../interfaces/navigator";
import createSelectUI from "../navigator/select";
import classic from "./classic";
import { sleep } from '../helpers';

const buyItem = async(itemId: string, targetted?: boolean) => {
  if(targetted) {
    if(!WebSocketData.IMPOSTER_MODE_PEOPLE) {
      send("IMPOSTER_MODE_REQUEST_PEOPLE");
      await sleep(500);
    }
    createSelectUI(
      Object.fromEntries(WebSocketData.IMPOSTER_MODE_PEOPLE?.filter(p => !p.votedOff).map(p => [p.name, { type: "button", action: () => {}, _id: p.id } as NavButton]) ?? []),
      (_id?: string) => {
        if(!_id) return;
        send("IMPOSTER_MODE_PURCHASE", { item: itemId, on: _id });
      }
    );
  }else send("IMPOSTER_MODE_PURCHASE", { item: itemId });
}

const imposter = {
  "Answers": classic["Answers"],
  "Auto Answer": classic["Auto Answer"],
  "Auto Answer Config": classic["Auto Answer Config"],
  "Answer Correctly Once": classic["Answer Correctly Once"],
  "Highlight Answer": classic["Highlight Answer"],
  "Hidden Answer": classic["Hidden Answer"],
  "Input Answer": classic["Input Answer"],

  "Imposter": {
    type: "header"
  },
  "Reveal Imposters": {
    type: "toggle", value: false,
    action: () => {}
  },
  "Purchase Item": {
    type: "collapse", elements: {
      "Private Investigation (7)": {
        type: "button",
        condition: () => WebSocketData.IMPOSTER_MODE_PERSON?.role === "detective",
        action: () => {
          buyItem("privateInvestigation", true);
        }
      },
      "Public Investigation (15)": {
        type: "button",
        condition: () => WebSocketData.IMPOSTER_MODE_PERSON?.role === "detective",
        action: () => {
          buyItem("publicInvestigation", true);
        }
      },
      "Note Look (7)": {
        type: "button",
        condition: () => WebSocketData.IMPOSTER_MODE_PERSON?.role === "detective",
        action: () => {
          buyItem("noteViewer", true);
        }
      },
      "Meeting (10)": {
        type: "button",
        condition: () => WebSocketData.IMPOSTER_MODE_PERSON?.role === "detective",
        action: () => {
          buyItem("meeting");
        }
      },
      "Investigation Remover (10)": {
        type: "button",
        condition: () => WebSocketData.IMPOSTER_MODE_PERSON?.role === "imposter",
        action: () => {
          buyItem("investigationRemover");
        }
      },
      "Fake Investigation (6)": {
        type: "button",
        condition: () => WebSocketData.IMPOSTER_MODE_PERSON?.role === "imposter",
        action: () => {
          buyItem("fakeInvestigation", true);
        }
      },
      "Unclear (15)": {
        type: "button",
        condition: () => WebSocketData.IMPOSTER_MODE_PERSON?.role === "imposter",
        action: () => {
          buyItem("clearListRemover", true);
        }
      },
      "Disguise (15)": {
        type: "button",
        condition: () => WebSocketData.IMPOSTER_MODE_PERSON?.role === "imposter",
        action: () => {
          buyItem("blendIn");
        }
      }
    }
  },
  "Spam Host": {
    type: "toggle", value: false,
    action: async function() {
      send("UPGRADE_PURCHASED", {
        upgradeName: "Money Per Question",
        level: 1
      });
      await sleep(250);
      if (this.value) this.action.bind(this)();
    }
  },

  "Misc": classic["Misc"],
  "Set Claps (Endgame)": classic["Set Claps (Endgame)"],
  // "Kick Player": classic["Kick Player"]
}

export default imposter as ToggleList;