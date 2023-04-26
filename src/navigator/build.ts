import { randomId, randomIds } from "../helpers";
import { NavHeader, NavToggle, NavButton, NavCollapse, NavSlider, NavItem, ToggleList } from "../interfaces/navigator";
import { navId, selectId, styleId, kc as KeyControls, renderData, mouseDown } from "./navigator";
const [ optionClass, toggleClass, enabledClass, disabledClass, fullClass, dragbarClass, collapseClass, tClass, arrowClass, keyClass, buttonClass, openClass, svgClass, sliderClass ] = randomIds(14);
import { keybinds, bind, unbind } from "../keybinds";

export const build = {
  keybind: (data: NavToggle | NavButton) => {
    const keybind = document.createElement("span");
    keybind.className = keyClass;
    keybind.setAttribute("keybind", data.keybindId ?? "");
    keybind.setAttribute("keybind-key", data.key ?? "");
    keybind.textContent = (data.key && data.keybindId) ? data.key : "[ ]";
    keybind.addEventListener("click", e => {
      if(KeyControls.bindingKey) return;
      keybind.textContent = "...";
      KeyControls.bindingKey = true;
      KeyControls.boundKey = (key: string) => {
        unbind(data.keybindId as string);
        bind(data.keybindId as string, key);
        data.key = key; 
        keybind.textContent = key;
        keybind.setAttribute("keybind-key", key);
        KeyControls.bindingKey = false;
        KeyControls.boundKey = (key: string) => {};
      }
      setTimeout(() => {
        KeyControls.bindingKey = false;
        keybind.textContent = (data.key && data.keybindId) ? data.key : "[ ]";
        KeyControls.boundKey = (key: string) => {};
      }, 1000);
    });
    return keybind;
  },
  toggle: (key: string, data: NavToggle) => {
    const element = document.createElement("div");
    element.className = `${optionClass} ${toggleClass} ` + (data.value ? enabledClass : disabledClass);
    element.setAttribute("keybind", data.keybindId ?? "");
    const label = document.createElement("span");
    label.textContent = key;
    if(key.length > 21) label.style.fontSize = "17px";
    element.appendChild(label);
    if(data.keybindId) element.appendChild(build.keybind(data));
    return element;
  },
  button: (key: string, data: NavButton) => {
    const element = document.createElement("div");
    element.className = `${optionClass} ${buttonClass}`;
    element.setAttribute("keybind", data.keybindId ?? "");
    const label = document.createElement("span");
    label.textContent = key;
    if(key.length > 21) label.style.fontSize = "17px";
    element.appendChild(label);
    if(data.keybindId) element.appendChild(build.keybind(data));
    return element;
  },
  slider: (key: string, data: NavSlider) => {
    const element = document.createElement("div");
    element.className = `${optionClass} ${sliderClass}`;
    const label = document.createElement("span");
    label.textContent = `${key}: ${data.value}${data.numSuffix || ""}`;
    const input = document.createElement("input");
    input.type = "range";
    input.className = randomId();
    input.min = data.interval[0].toString();
    input.step = data.interval[1].toString();
    input.max = data.interval[2].toString();
    input.value = data.value.toString();
    element.appendChild(label);
    element.appendChild(input);
    if(data.colors) {
      const style = document.createElement("style");
      let gradient = "linear-gradient(90deg";
      let lastPercent = 0;
      for(const [color, percent] of Object.entries(data.colors)) {
        if(lastPercent) gradient += `, ${color} ${lastPercent}%`;
        gradient += `, ${color} ${percent + lastPercent}%`;
        lastPercent += percent;
      }
      style.innerHTML = `#${navId} .${input.className}::-moz-range-track {background: ${gradient}) !important;}`;
      element.appendChild(style);
    }
    return element;
  },
  nav: () => {
    if(document.querySelector(`#${navId}`)) return document.querySelector(`#${navId}`) as HTMLDivElement;
    const nav = document.createElement("div");
    nav.id = navId,
    nav.style.display = "none";
    document.body.appendChild(nav);
    return nav as HTMLDivElement;
  },
  style: () => {
    const s = document.querySelector(`style#${styleId}`);
    if(s) return;
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = ` @import url('https://fonts.googleapis.com/css2?family=Baloo+2&display=swap'); @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');
  #${navId} {position: fixed;width: 280px;height: 500px;background: #00000090;font-family: 'Baloo 2', cursive;border-radius: 3px;font-size: 19px;user-select: none;overflow-y: scroll;-ms-overflow-style: none;scrollbar-width: none;overscroll-behavior-y: none;z-index: 99999;}
  #${navId}::-webkit-scrollbar {display: none;}
  #${navId} .${fullClass}, #${navId} .${optionClass}, #${navId} .${collapseClass} {display: block;width: 100%;height: 40px;line-height: 40px;color: white;}
  #${navId} .${buttonClass}.${disabledClass} {cursor:not-allowed !important;}
  #${navId} .${buttonClass}.${disabledClass} span {color:#444 !important;}
  #${navId} span.${fullClass} {text-align: center;border-bottom-style: solid;border-bottom-width: 3px;animation: 7s infinite rainbowBC, 7s infinite rainbowC;}
  #${navId} .${optionClass} {position: relative;transition: 0.3s background;}
  #${navId} .${optionClass} span:first-child {color: white;transition: 0.2s color;padding-left: 20px;}
  #${navId} .${collapseClass} {transition: 0.3s height;}
  #${navId} .${collapseClass}:not(.${openClass}) {overflow-y: hidden;height: 40px;}
  #${navId} .${collapseClass}.${openClass} {height: auto;}
  #${navId} .${optionClass}.${toggleClass}.${disabledClass} span:first-child {color: #f00a;}
  #${navId} .${optionClass}.${toggleClass}.${enabledClass} span:first-child {color: #1f0e;}
  #${navId} .${optionClass}:hover, #${navId} .${collapseClass}:hover {background: #ffffff20;cursor: pointer;}
  #${navId} .${dragbarClass}:hover {cursor: move;}
  #${navId} .${optionClass} span.${keyClass} {position: absolute;display: block;right: 0px;top: 0px;width: 40px;color: white;background: #ffffff10;text-align: center;margin-right: 7px;}
  #${navId} .${optionClass} span.${keyClass}[keybind-key=""] {color: #00000050;}
  #${navId} .${collapseClass} span.${arrowClass} {display: inline-block;width: 40px;text-align: center;transition: 0.2s transform;font-family: 'Righteous', cursive;}
  #${navId} .${collapseClass}.${openClass} span.${arrowClass} {transform: rotate(90deg);}
  .${svgClass} {position: absolute;right: 12px;top: 7px;opacity: 0.25;transition: 0.2s opacity;}
  .${svgClass}:hover {opacity: 0.5;cursor: pointer;}
  .${svgClass}.${enabledClass} {opacity: 1;}
  #${navId} .${sliderClass} {height: 60px;}
  #${navId} .${sliderClass} span {position: absolute;top: 8px;line-height: initial;}
  #${navId} .${sliderClass} input {position: absolute;top: 28px;width: calc(100% - 40px);left: 20px;background: transparent;}
  #${navId} .${sliderClass} input[type="range"]::-moz-range-thumb {height: 17px;width: 8px;border: none;border-radius: 0px;background: #9736FF;cursor: col-resize;}
  #${navId} .${sliderClass} input[type="range"]::-moz-range-track {height: 2.4px;border: none;background: white;border-radius: 0px;}
  #${navId} #${selectId} {position:absolute;left:0;top:0;width:100%;z-index:100000;background:#000d;}
  @keyframes rainbowBC {
    0% { border-color: red; }
    18% { border-color: orange; }
    36% { border-color: yellow; }
    54% { border-color: lime; }
    72% { border-color: dodgerblue; }
    90% { border-color: violet; }
    100% { border-color: red; }
  }
  @keyframes rainbowC {
    0% { color: red; }
    18% { color: orange; }
    36% { color: yellow; }
    54% { color: lime; }
    72% { color: dodgerblue; }
    90% { color: violet; }
    100% { color: red; }
  }`; // gui add styles here
  document.head.appendChild(style);
  },
  elements: (options: ToggleList, firstHeader = false, parentReference?: ToggleList | NavCollapse, parentKey?: string) => {
    const elements: (HTMLSpanElement | HTMLDivElement)[] = [];
    for(const [key, data] of Object.entries(options)) {
      switch(data.type) {
        case "header": {
          const element = document.createElement("span");
          element.className = `${fullClass} ${dragbarClass}`;
          if(!firstHeader) {
            element.innerHTML = `${key}<svg class="${svgClass}" fill="#8e3bff" width="24px" height="24px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="#8e3bff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1154.976 0 988.342 166.52c-60.448 60.447-63.436 153.418-15.4 220.646L670.359 689.751c-4.022 4.022-6.55 8.964-9.079 13.79-147.212-61.022-328.671-34.246-444.626 81.709l-98.027 98.141 418.31 418.195-520.129 520.129c-22.41 22.409-22.41 58.724 0 81.248 11.262 11.147 25.972 16.778 40.682 16.778s29.42-5.63 40.567-16.778l520.128-520.129 418.195 418.31 98.142-98.142c75.962-75.847 117.793-176.862 117.793-284.313 0-56.195-12.067-110.208-33.787-160.198 2.758-1.839 5.861-2.988 8.275-5.516l303.963-303.964c29.19 21.145 63.896 33.097 100.67 33.097 46.083 0 89.293-17.928 121.93-50.565L1920 764.909 1154.976 0Z" fill-rule="evenodd"></path> </g></svg>`;
            const svg = element.querySelector("svg") as SVGElement;
            svg!.addEventListener("click", e => {
              svg.classList.toggle(enabledClass);
              KeyControls.pinned = !KeyControls.pinned;
            });
            firstHeader = true;
          }else element.textContent = key;
          element.addEventListener("mousedown", mouseDown);
          elements.push(element);
          break;
        }
        case "toggle": {
          const element = build.toggle(key, data);
          element.addEventListener("click", e => {
            if((e.target as HTMLDivElement)?.classList.contains("key")) return;
            element.classList.toggle(enabledClass);
            element.classList.toggle(disabledClass);
            if(parentReference && parentKey) {
              const t = ((parentReference[parentKey] as NavCollapse).elements[key] as NavToggle);
              t.value = !t.value;
            }
            else data.value = !data.value;
            data.action?.();
          });
          elements.push(element);
          break;
        }
        case "button": {
          const element = build.button(key, data);
          const clickEvent = function(e) {
            if((e.target as HTMLDivElement)?.classList.contains("key")) return;
            data.action();
          }
          let lastState = null as unknown as boolean;
          if(data.condition) setInterval(() => {
            const newState = data.condition?.() as boolean;
            if(newState !== lastState) {
              lastState = newState;
              element.removeEventListener("click", clickEvent);
              if(newState) {
                element.classList.remove(disabledClass);
                element.addEventListener("click", clickEvent);
              }
              else element.classList.add(disabledClass);
            }
          }, 250);
          element.addEventListener("click", clickEvent);
          elements.push(element);
          break;
        }
        case "collapse": {
          const element = document.createElement("div");
          element.className = `${collapseClass} ${tClass}`;
          const arrow = document.createElement("span");
          arrow.className = `${arrowClass} ${tClass}`;
          arrow.textContent = ">";
          const label = document.createElement("span");
          label.className = tClass;
          label.textContent = key;
          if(key.length > 21) label.style.fontSize = "17px";
          const subElements = document.createElement("div");
          element.appendChild(arrow);
          element.appendChild(label);
          element.appendChild(subElements);
          const r = build.elements(data.elements, firstHeader, options, key);
          for(const e of r) subElements.appendChild(e);
          element.addEventListener("click", e => {
            if(!(e.target as HTMLDivElement)?.classList.contains(tClass)) return;
            element.classList.toggle(openClass);
          });
          elements.push(element);
          break;
        }
        case "slider": {
          const element = build.slider(key, data);
          element.querySelector("input")!.addEventListener("input", e => {
            const input = e.target as HTMLInputElement;
            data.value = parseInt(input.value);
            element.querySelector("span")!.textContent = `${key}: ${data.value}${data.numSuffix || ""}`;
          });
          elements.push(element);
          break;
        }
      }
    }
    return elements;
  }
}