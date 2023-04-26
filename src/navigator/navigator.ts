import { randomId, randomIds } from "../helpers";
import { keybinds, bind } from "../keybinds";
import { NavHeader, NavToggle, NavButton, NavCollapse, NavSlider, NavItem, ToggleList } from "../interfaces/navigator";
import { build } from "./build";
import { closeUI as closeSelectUI } from "./select";

const [ navId, selectId, styleId ] = randomIds(3);
const pos: [number, number, number, number, boolean] = [0, 0, 0, 0, false];
const kc = {
  pinned: false,
  bindingKey: false,
  boundKey: (key: string) => {}
}
let scale = 1, offsetX = 0, offsetY = 0, renderData: ToggleList = {};
export { navId, selectId, styleId, kc, renderData };

export const render = (options: ToggleList) => {
  renderData = options;
  build.style();
  const n = build.nav();
  n!.innerHTML = "";
  const elements = build.elements(options);
  for(const element of elements) {
    n.appendChild(element);
  }
  kc.pinned = false;
}
const updateScale = (sc: number) => {
  scale = Math.round(sc*10)/10;
  build.nav().style.transform = `scale(${scale})`;
  offsetX = Math.abs((280 - build.nav().offsetWidth) / 2);
  offsetY = Math.abs((500 - build.nav().offsetHeight) / 2);
  windowResize();
}

const windowResize = () => {
  const n = build.nav();
  if(window.innerWidth - offsetX < parseInt(n.style.left) + n.offsetWidth) n.style.left = ""; n.style.right = -1 * offsetX + "px";
  if(window.innerHeight - offsetY < parseInt(n.style.top) + n.offsetHeight) n.style.top = ""; n.style.bottom = -1 * offsetY + "px";
}
export const mouseDown = e => { pos[2] = e.clientX; pos[3] = e.clientY; pos[4] = true };
const mouseUp = () => { pos[4] = false };
const mouseMove = e => {
  if(!pos[4]) return;
  pos[0] = pos[2] - e.clientX;
  pos[1] = pos[3] - e.clientY;
  pos[2] = e.clientX;
  pos[3] = e.clientY;
  const n = build.nav();
  n.style.top = Math.max(-1*offsetY, n.offsetTop - pos[1]) + "px";
  n.style.left = Math.max(-1*offsetX, n.offsetLeft - pos[0]) + "px";
  windowResize();
}
window.addEventListener("mousedown", e => {
  if(Array.from(build.nav().querySelectorAll("*")).includes(e.target as HTMLElement)) return;
  if(!kc.pinned) {
    build.nav().style.display = "none";
    kc.bindingKey = false;
  }
  closeSelectUI();
});
window.addEventListener("resize", windowResize);
window.addEventListener("mouseup", mouseUp);
window.addEventListener("mousemove", mouseMove);
window.addEventListener("contextmenu", e => {
  const n = build.nav();
  n.style.display = "";
  n.style.left = Math.min(window.innerWidth - n.offsetWidth, e.x - offsetX) + "px";
  n.style.top = Math.min(window.innerHeight - n.offsetHeight, e.y - offsetY) + "px";
  windowResize();
  e.preventDefault();
});
window.addEventListener("keydown", e => {
  if(build.nav().style.display === "") {
    if(e.key === "-") updateScale(Math.max(0.5, scale - 0.1));
    if(e.key === "=") updateScale(Math.min(1, scale + 0.1));
    if(kc.bindingKey) {
      if(["Escape", "Backspace"].includes(e.key)) kc.bindingKey = false;
      else kc.boundKey(e.key);
    }
  }
  const keybindId = keybinds[e.key];
  if(keybindId) {
    function checkItem(item: NavHeader | NavToggle | NavButton | NavCollapse | NavSlider) {
      if(item.type === "toggle") {
        if(item.keybindId === keybindId) {
          item.value = !item.value;
          item.action?.();
          return true;
        }
      }else if(item.type === "button") {
        if(item.keybindId === keybindId) {
          item.action?.();
          return true;
        }
      }
    }
    top:for(const item of Object.values(renderData)) {
      if(item.type === "collapse") {
        for(const subItem of Object.values(item.elements)) {
          if(checkItem(subItem)) break top;
        }
      }else if (checkItem(item)) break top;
    }
  }
})