import { NavButton } from "../interfaces/navigator";
import { navId, selectId } from "./navigator";
import { build } from "./build";
import { WebSocketData } from "../websocket";

const buildUI = () => {
  if(document.querySelector(`#${selectId}`)) return document.querySelector(`#${selectId}`) as HTMLDivElement;
  const ui = document.createElement("div");
  ui.id = selectId;
  ui.style.minHeight = (document.querySelector(`#${navId}`) as HTMLDivElement).scrollHeight + "px";
  document.querySelector(`#${navId}`)?.appendChild(ui);
  document.querySelector(`#${navId}`)?.scrollTo(0, 0);
  return ui;
}
export const closeUI = () => {
  document.querySelector(`#${selectId}`)?.remove();
}

export default function(options: {[key: string]: NavButton}, callback: (_id?: string) => void) {
  const ui = buildUI();
  for(const [key, data] of Object.entries(options)) {
    const btn = build.button(key.replace(/{.+}/gi, ""), data);
    btn.addEventListener("click", () => {
      closeUI();
      callback(data._id);
    });
    ui.appendChild(btn);
  }
}