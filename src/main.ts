import { socket, send, WebSocketData, sendChannel as websocketSendChannel } from './websocket';
import classicOptions from './modes/classic';
import defaultOptions from './modes/default';
import pardyOptions from './modes/pardy';
import imposterOptions from './modes/imposter';
import { getCorrect } from './parsers/answer';
import { encode as blueboatEncode, decode as blueboatDecode } from './parsers/blueboat';
import { navId, render } from './navigator/navigator';
import { sendChannel as keybindsSendChannel } from './keybinds';

export const mode = () => { return WebSocketData.GAME_STATE!.gameOptions.specialGameType[0] };
// needs modified to support 2D

document.body.style.background = "#4C1B81";
window.addEventListener("load", _ => {
  render(classicOptions);
});

// window.decode = blueboatDecode;
// window.encode = blueboatEncode;
// window.classic = classicOptions;
// window.default = defaultOptions;
// window.pardy = pardyOptions;
// window.imposter = imposterOptions;
// window.wsdata = WebSocketData;
// window.render = render;

websocketSendChannel.addEventListener('GAME_STATE', (e: Event) => {
  const data = (e as CustomEvent).detail;
  switch(mode()) {
    case "CLASSIC":
      render(classicOptions);
      break;
    case "PARDY":
      render(pardyOptions);
      break;
    case "IMPOSTER":
      render(imposterOptions);
      break;
    default:
      render(classicOptions);
      break;
  }
});
keybindsSendChannel.addEventListener("KEYBIND", (e: Event) => {
  const { keybindId, key, mode } = (e as CustomEvent).detail;
});

setInterval(() => {
  Array.from(document.body.children ?? []).forEach(e => {
    if(e.id === navId) return;
    (e as HTMLDivElement).style.zIndex = "10";
  });
}, 200);
