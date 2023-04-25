import { WebSocketData } from "./websocket";
import { mode as getMode } from "./main";
export const keybinds = JSON.parse(localStorage.getItem("g_keybinds") || "{}") as { [mode: string]: { [id: string]: string} }

export const sendChannel = new EventTarget();
function dispatchSend(eventName: string, data?: any) {
  const event = new CustomEvent(eventName, {detail: data});
  sendChannel.dispatchEvent(event);
}

const save = () => localStorage.setItem("g_keybinds", JSON.stringify(keybinds));

export const bind = (keybindId: string, key: string) => {
  const mode = getMode();
  if(!keybinds[mode]) keybinds[mode] = {};
  keybinds[mode][keybindId] = key;
  save();
}
export const unbind = (keybindId: string) => {
  const mode = getMode();
  if(!keybinds[mode]) return;
  delete keybinds[mode][keybindId];
  save();
}

window.addEventListener("keydown", e => {
  const mode = getMode();
  const binds = keybinds[mode];
  for(const [keybindId, bindedKey] of Object.entries(binds)) {
    if(e.key === bindedKey) {
      dispatchSend("KEYBIND", { keybindId, key: e.key, mode });
      break;
    }
  }
});