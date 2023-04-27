import { ToggleList } from "../interfaces/navigator";
import { WebSocketData } from "../websocket";
import Widget from "../navigator/widget";
import classic from "./classic";
import { sleep } from "../helpers";

const widgets: { [key: string]: Widget } = {};

const hidden = {
  ...classic,
  "Render Balance": {
    type: "toggle", value: false,
    action: async function() {
      if(!widgets.balance) {
        widgets.balance = new Widget("Balance", {
          "balance": "$0"
        });
        widgets.balance.hide();
      }
      if(this.value) widgets.balance.show();
      else widgets.balance.hide();

      widgets.balance.updateElements({
        "balance": `$${(WebSocketData.BALANCE ?? 0).toLocaleString()}`
      });

      await sleep(50);
      if (this.value) this.action.bind(this)();
    }
  }
}

export default hidden as ToggleList;