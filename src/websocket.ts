import { encode as blueboatEncode, decode as blueboatDecode } from "./parsers/blueboat";
import { encode as colyseusEncode, decode as colyseusDecode } from "./parsers/colyseus";
import { GameState, WSData } from "./interfaces/websocket";

export const socket = () => WebSocketData.ws as WebSocket | null;
let room = null;

export const sendChannel = new EventTarget();
export const WebSocketData = {
  ws: null,
} as WSData;

export const send = (key: string, data?: any, type = "blueboat_SEND_MESSAGE", room = WebSocketData.ROOM) => {
  const obj = { type: 2, data: [ type, { room, key, data } ], options: { compress: true }, nsp: "/" } as const;
  socket()!.send(blueboatEncode(obj));
}
export const send2D = (data: any) => {
  const msg = colyseusDecode(data);
  if(msg.type === "MOVED") dispatchSend("MOVED", msg.message);
  socket()!.send(data);
}
export const fakeRecv2D = (type: string, data: any) => {
  const e = new Event("message") as any;
  e.data = colyseusEncode(type, data);
  socket()!.dispatchEvent(e);
}

function dispatchSend(eventName: string, data?: any) {
  const event = new CustomEvent(eventName, {detail: data});
  sendChannel.dispatchEvent(event);
}

const onMessage = (msg: any) => {
  if("Blockly" in window) return onMessage2D(msg);
  const dataB4 = blueboatDecode(msg.data);
  console.warn(dataB4);
  if(dataB4.toString() === "3") setTimeout(() => send("PLAYER_LEADERBOARD_REQUESTED", undefined), 500);
  if(typeof dataB4 !== "object") return;
  if(dataB4.type !== 2) return;
  
  const { data, key } = dataB4.data[1];
  switch(key) {
    case "UPDATED_PLAYER_LEADERBOARD":
      WebSocketData["PLAYER_LEADERBOARD"] = data.items;
      break;
    case "PLAYER_JOINS_STATIC_STATE":
      WebSocketData["GAME_STATE"] = data;
      dispatchSend("GAME_STATE");
      break;
    case "IMPOSTER_MODE_PEOPLE":
    case "LAVA_RESULTS":
    case "DEFENDING_HOMEBASE_STATUS":
    case "AVAILABLE_HOMEBASE_UPGRADES":
    case "AVAILABLE_LAVA_UPGRADES":
      WebSocketData[key] = data;
      break;
    default: {
      if(!data || !data?.type) return;
      WebSocketData["ROOM"] = dataB4.data[0].slice(8);
      WebSocketData[data.type] = data.value;
    }
  }
}
const onMessage2D = (msg: any) => {
  const data = colyseusDecode(msg.data);
  switch(data.type) {
    case "AUTH_ID":
      dispatchSend("AUTH_ID", data.message);
      break;
    case "MESSAGE_FOR_DEVICE": {
      dispatchSend("MESSAGE_FOR_DEVICE", data.message);
      break;
    }
  }
}

const oldSend = WebSocket.prototype.send;
WebSocket.prototype.send = function(data) {
  console.warn("[S]", data);
  WebSocketData.ws = this;
  this.removeEventListener("message", onMessage);
  this.addEventListener("message", onMessage);

  if("Blockly" in window) return send2D(data);

  return oldSend.apply(this, arguments);
}
WebSocket.prototype.send.toString = () => oldSend.toString();