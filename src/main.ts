import { socket, send, WebSocketData, sendChannel as websocketSendChannel } from './websocket';
import classicOptions from './modes/classic';
import defaultOptions from './modes/default';
import pardyOptions from './modes/pardy';
import imposterOptions from './modes/imposter';
import infinityOptions from './modes/infinity';
import { getCorrect } from './parsers/answer';
import { encode as blueboatEncode, decode as blueboatDecode } from './parsers/blueboat';
import { navId, render } from './navigator/navigator';
import { sendChannel as keybindsSendChannel } from './keybinds';

export const mode = () => { return WebSocketData.GAME_STATE!.gameOptions.specialGameType[0] };
// needs modified to support 2D

window.addEventListener("load", _ => {
  render(defaultOptions);
});

// window.decode = blueboatDecode;
// window.encode = blueboatEncode;
// window.wsdata = WebSocketData;
// window.render = render;

websocketSendChannel.addEventListener('GAME_STATE', (e: Event) => {
  const data = (e as CustomEvent).detail;
  switch(mode()) {
    case "CLASSIC":
    case "RICH":
    case "HIDDEN":
    case "DRAINED":
      render(classicOptions);
      break;
    case "PARDY":
      render(pardyOptions);
      break;
    case "IMPOSTER":
      render(imposterOptions);
      break;
    case "THANOS":
      render(infinityOptions);
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
