!function(t){"use strict";function e(t){if(this.t=0,t instanceof ArrayBuffer)this.i=t,this.s=new DataView(this.i);else{if(!ArrayBuffer.isView(t))throw new Error("Invalid argument");this.i=t.buffer,this.s=new DataView(this.i,t.byteOffset,t.byteLength)}}function n(t,e,n){for(var i=0,s=0,o=n.length;s<o;s++)(i=n.charCodeAt(s))<128?t.setUint8(e++,i):(i<2048?t.setUint8(e++,192|i>>6):(i<55296||57344<=i?t.setUint8(e++,224|i>>12):(s++,i=65536+((1023&i)<<10|1023&n.charCodeAt(s)),t.setUint8(e++,240|i>>18),t.setUint8(e++,128|i>>12&63)),t.setUint8(e++,128|i>>6&63)),t.setUint8(e++,128|63&i))}e.prototype.g=function(t){for(var e=new Array(t),n=0;n<t;n++)e[n]=this.v();return e},e.prototype.M=function(t){for(var e={},n=0;n<t;n++)e[this.v()]=this.v();return e},e.prototype.h=function(t){var e=function(t,e,n){for(var i="",s=0,o=e,r=e+n;o<r;o++){var a=t.getUint8(o);if(0!=(128&a))if(192!=(224&a))if(224!=(240&a)){if(240!=(248&a))throw new Error("Invalid byte "+a.toString(16));65536<=(s=(7&a)<<18|(63&t.getUint8(++o))<<12|(63&t.getUint8(++o))<<6|(63&t.getUint8(++o))<<0)?(s-=65536,i+=String.fromCharCode(55296+(s>>>10),56320+(1023&s))):i+=String.fromCharCode(s)}else i+=String.fromCharCode((15&a)<<12|(63&t.getUint8(++o))<<6|(63&t.getUint8(++o))<<0);else i+=String.fromCharCode((31&a)<<6|63&t.getUint8(++o));else i+=String.fromCharCode(a)}return i}(this.s,this.t,t);return this.t+=t,e},e.prototype.l=function(t){var e=this.i.slice(this.t,this.t+t);return this.t+=t,e},e.prototype.v=function(){var t,e=this.s.getUint8(this.t++),n=0,i=0,s=0,o=0;if(e<192)return e<128?e:e<144?this.M(15&e):e<160?this.g(15&e):this.h(31&e);if(223<e)return-1*(255-e+1);switch(e){case 192:return null;case 194:return!1;case 195:return!0;case 196:return n=this.s.getUint8(this.t),this.t+=1,this.l(n);case 197:return n=this.s.getUint16(this.t),this.t+=2,this.l(n);case 198:return n=this.s.getUint32(this.t),this.t+=4,this.l(n);case 199:return n=this.s.getUint8(this.t),i=this.s.getInt8(this.t+1),this.t+=2,[i,this.l(n)];case 200:return n=this.s.getUint16(this.t),i=this.s.getInt8(this.t+2),this.t+=3,[i,this.l(n)];case 201:return n=this.s.getUint32(this.t),i=this.s.getInt8(this.t+4),this.t+=5,[i,this.l(n)];case 202:return t=this.s.getFloat32(this.t),this.t+=4,t;case 203:return t=this.s.getFloat64(this.t),this.t+=8,t;case 204:return t=this.s.getUint8(this.t),this.t+=1,t;case 205:return t=this.s.getUint16(this.t),this.t+=2,t;case 206:return t=this.s.getUint32(this.t),this.t+=4,t;case 207:return s=this.s.getUint32(this.t)*Math.pow(2,32),o=this.s.getUint32(this.t+4),this.t+=8,s+o;case 208:return t=this.s.getInt8(this.t),this.t+=1,t;case 209:return t=this.s.getInt16(this.t),this.t+=2,t;case 210:return t=this.s.getInt32(this.t),this.t+=4,t;case 211:return s=this.s.getInt32(this.t)*Math.pow(2,32),o=this.s.getUint32(this.t+4),this.t+=8,s+o;case 212:return i=this.s.getInt8(this.t),this.t+=1,0===i?void(this.t+=1):[i,this.l(1)];case 213:return i=this.s.getInt8(this.t),this.t+=1,[i,this.l(2)];case 214:return i=this.s.getInt8(this.t),this.t+=1,[i,this.l(4)];case 215:return i=this.s.getInt8(this.t),this.t+=1,0===i?(s=this.s.getInt32(this.t)*Math.pow(2,32),o=this.s.getUint32(this.t+4),this.t+=8,new Date(s+o)):[i,this.l(8)];case 216:return i=this.s.getInt8(this.t),this.t+=1,[i,this.l(16)];case 217:return n=this.s.getUint8(this.t),this.t+=1,this.h(n);case 218:return n=this.s.getUint16(this.t),this.t+=2,this.h(n);case 219:return n=this.s.getUint32(this.t),this.t+=4,this.h(n);case 220:return n=this.s.getUint16(this.t),this.t+=2,this.g(n);case 221:return n=this.s.getUint32(this.t),this.t+=4,this.g(n);case 222:return n=this.s.getUint16(this.t),this.t+=2,this.M(n);case 223:return n=this.s.getUint32(this.t),this.t+=4,this.M(n)}throw new Error("Could not parse")};const i=new Int32Array(2);new Float32Array(i.buffer),new Float64Array(i.buffer);const s={9:"HANDSHAKE",10:"JOIN_ROOM",11:"ERROR",12:"LEAVE_ROOM",13:"ROOM_DATA",14:"ROOM_STATE",15:"ROOM_STATE_PATCH",16:"ROOM_DATA_SCHEMA",HANDSHAKE:9,JOIN_ROOM:10,ERROR:11,LEAVE_ROOM:12,ROOM_DATA:13,ROOM_STATE:14,ROOM_STATE_PATCH:15,ROOM_DATA_SCHEMA:16},o=new Int32Array(2),r=new Float32Array(o.buffer),a=new Float64Array(o.buffer),c={int8:function(t,e){return c.uint8(t,e)<<24>>24},uint8:function(t,e){return t[e.offset++]},int16:function(t,e){return c.uint16(t,e)<<16>>16},uint16:function(t,e){return t[e.offset++]|t[e.offset++]<<8},int32:function(t,e){return t[e.offset++]|t[e.offset++]<<8|t[e.offset++]<<16|t[e.offset++]<<24},uint32:function(t,e){return c.int32(t,e)>>>0},float32:function(t,e){return c.readFloat32(t,e)},float64:function(t,e){return c.readFloat64(t,e)},int64:function(t,e){var n=c.uint32(t,e);return c.int32(t,e)*Math.pow(2,32)+n},uint64:function(t,e){var n=c.uint32(t,e);return c.uint32(t,e)*Math.pow(2,32)+n},readFloat32:function(t,e){return o[0]=c.int32(t,e),r[0]},readFloat64:function(t,e){return o[0]=c.int32(t,e),o[1]=c.int32(t,e),a[0]},boolean:function(t,e){return c.uint8(t,e)>0},string:function(t,e){var n,i=t[e.offset++];i<192?n=31&i:217===i?n=c.uint8(t,e):218===i?n=c.uint16(t,e):219===i&&(n=c.uint32(t,e));var s=((t,e,n)=>{for(var i="",s=0,o=e,r=e+n;o<r;o++){var a=t[o];0!=(128&a)?192!=(224&a)?224!=(240&a)?240!=(248&a)?console.error("Invalid byte "+a.toString(16)):(s=(7&a)<<18|(63&t[++o])<<12|(63&t[++o])<<6|(63&t[++o])<<0)>=65536?(s-=65536,i+=String.fromCharCode(55296+(s>>>10),56320+(1023&s))):i+=String.fromCharCode(s):i+=String.fromCharCode((15&a)<<12|(63&t[++o])<<6|(63&t[++o])<<0):i+=String.fromCharCode((31&a)<<6|63&t[++o]):i+=String.fromCharCode(a)}return i})(t,e.offset,n);return e.offset+=n,s},stringCheck:function(t,e){var n=t[e.offset];return n<192&&n>160||217===n||218===n||219===n},number:function(t,e){var n=t[e.offset++];return n<128?n:202===n?c.readFloat32(t,e):203===n?c.readFloat64(t,e):204===n?c.uint8(t,e):205===n?c.uint16(t,e):206===n?c.uint32(t,e):207===n?c.uint64(t,e):208===n?c.int8(t,e):209===n?c.int16(t,e):210===n?c.int32(t,e):211===n?c.int64(t,e):n>223?-1*(255-n+1):void 0},numberCheck:function(t,e){var n=t[e.offset];return n<128||n>=202&&n<=211},arrayCheck:function(t,e){return t[e.offset]<160},switchStructureCheck:function(t,e){return t[e.offset-1]===SWITCH_TO_STRUCTURE&&(t[e.offset]<128||t[e.offset]>=202&&t[e.offset]<=211)}},u=function(t,e){if(this._offset=e,t instanceof ArrayBuffer)this._buffer=t,this._view=new DataView(this._buffer);else{if(!ArrayBuffer.isView(t))throw new Error("Invalid argument");this._buffer=t.buffer,this._view=new DataView(this._buffer,t.byteOffset,t.byteLength)}};u.prototype._array=function(t){for(var e=new Array(t),n=0;n<t;n++)e[n]=this._parse();return e},u.prototype._map=function(t){for(var e={},n=0;n<t;n++)e[this._parse()]=this._parse();return e},u.prototype._str=function(t){var e=((t,e,n)=>{for(var i="",s=0,o=e,r=e+n;o<r;o++){var a=t.getUint8(o);if(0!=(128&a))if(192!=(224&a))if(224!=(240&a)){if(240!=(248&a))throw new Error("Invalid byte "+a.toString(16));(s=(7&a)<<18|(63&t.getUint8(++o))<<12|(63&t.getUint8(++o))<<6|(63&t.getUint8(++o))<<0)>=65536?(s-=65536,i+=String.fromCharCode(55296+(s>>>10),56320+(1023&s))):i+=String.fromCharCode(s)}else i+=String.fromCharCode((15&a)<<12|(63&t.getUint8(++o))<<6|(63&t.getUint8(++o))<<0);else i+=String.fromCharCode((31&a)<<6|63&t.getUint8(++o));else i+=String.fromCharCode(a)}return i})(this._view,this._offset,t);return this._offset+=t,e},u.prototype._bin=function(t){var e=this._buffer.slice(this._offset,this._offset+t);return this._offset+=t,e},u.prototype._parse=function(){var t,e=this._view.getUint8(this._offset++),n=0,i=0,s=0,o=0;if(e<192)return e<128?e:e<144?this._map(15&e):e<160?this._array(15&e):this._str(31&e);if(e>223)return-1*(255-e+1);switch(e){case 192:return null;case 194:return!1;case 195:return!0;case 196:return n=this._view.getUint8(this._offset),this._offset+=1,this._bin(n);case 197:return n=this._view.getUint16(this._offset),this._offset+=2,this._bin(n);case 198:return n=this._view.getUint32(this._offset),this._offset+=4,this._bin(n);case 199:return n=this._view.getUint8(this._offset),i=this._view.getInt8(this._offset+1),this._offset+=2,[i,this._bin(n)];case 200:return n=this._view.getUint16(this._offset),i=this._view.getInt8(this._offset+2),this._offset+=3,[i,this._bin(n)];case 201:return n=this._view.getUint32(this._offset),i=this._view.getInt8(this._offset+4),this._offset+=5,[i,this._bin(n)];case 202:return t=this._view.getFloat32(this._offset),this._offset+=4,t;case 203:return t=this._view.getFloat64(this._offset),this._offset+=8,t;case 204:return t=this._view.getUint8(this._offset),this._offset+=1,t;case 205:return t=this._view.getUint16(this._offset),this._offset+=2,t;case 206:return t=this._view.getUint32(this._offset),this._offset+=4,t;case 207:return s=this._view.getUint32(this._offset)*Math.pow(2,32),o=this._view.getUint32(this._offset+4),this._offset+=8,s+o;case 208:return t=this._view.getInt8(this._offset),this._offset+=1,t;case 209:return t=this._view.getInt16(this._offset),this._offset+=2,t;case 210:return t=this._view.getInt32(this._offset),this._offset+=4,t;case 211:return s=this._view.getInt32(this._offset)*Math.pow(2,32),o=this._view.getUint32(this._offset+4),this._offset+=8,s+o;case 212:return i=this._view.getInt8(this._offset),this._offset+=1,0===i?void(this._offset+=1):[i,this._bin(1)];case 213:return i=this._view.getInt8(this._offset),this._offset+=1,[i,this._bin(2)];case 214:return i=this._view.getInt8(this._offset),this._offset+=1,[i,this._bin(4)];case 215:return i=this._view.getInt8(this._offset),this._offset+=1,0===i?(s=this._view.getInt32(this._offset)*Math.pow(2,32),o=this._view.getUint32(this._offset+4),this._offset+=8,new Date(s+o)):[i,this._bin(8)];case 216:return i=this._view.getInt8(this._offset),this._offset+=1,[i,this._bin(16)];case 217:return n=this._view.getUint8(this._offset),this._offset+=1,this._str(n);case 218:return n=this._view.getUint16(this._offset),this._offset+=2,this._str(n);case 219:return n=this._view.getUint32(this._offset),this._offset+=4,this._str(n);case 220:return n=this._view.getUint16(this._offset),this._offset+=2,this._array(n);case 221:return n=this._view.getUint32(this._offset),this._offset+=4,this._array(n);case 222:return n=this._view.getUint16(this._offset),this._offset+=2,this._map(n);case 223:return n=this._view.getUint32(this._offset),this._offset+=4,this._map(n)}throw new Error("Could not parse")};const l=t=>{const e=Array.from(new Uint8Array(t)),n=e[0],i=s[n];if(n===s.ROOM_DATA){const n={offset:1};return{type:c.stringCheck(e,n)?c.string(e,n):c.number(e,n),message:e.length>n.offset?((t,e)=>{void 0===e&&(e=0);var n=new u(t,e),i=n._parse();if(n._offset!==t.byteLength)throw new Error(t.byteLength-n._offset+" trailing bytes");return i})(t,n.offset):null}}return{type:i,message:null}},h=()=>d.ws,f=new EventTarget,d={ws:null},p=(t,e,i="blueboat_SEND_MESSAGE",s=d.ROOM)=>{const o={type:2,data:[i,{room:s,key:t,data:e}],options:{compress:!0},nsp:"/"};h().send(function(t){var e=[],i=[],s=function t(e,n,i){var s=typeof i,o=0,r=0,a=0,c=0,u=0,l=0;if("string"===s){if((u=function(t){for(var e=0,n=0,i=0,s=t.length;i<s;i++)(e=t.charCodeAt(i))<128?n+=1:e<2048?n+=2:e<55296||57344<=e?n+=3:(i++,n+=4);return n}(i))<32)e.push(160|u),l=1;else if(u<256)e.push(217,u),l=2;else if(u<65536)e.push(218,u>>8,u),l=3;else{if(!(u<4294967296))throw new Error("String too long");e.push(219,u>>24,u>>16,u>>8,u),l=5}return n.push({h:i,u:u,t:e.length}),l+u}if("number"===s)return Math.floor(i)===i&&isFinite(i)?0<=i?i<128?(e.push(i),1):i<256?(e.push(204,i),2):i<65536?(e.push(205,i>>8,i),3):i<4294967296?(e.push(206,i>>24,i>>16,i>>8,i),5):(a=i/Math.pow(2,32)>>0,c=i>>>0,e.push(207,a>>24,a>>16,a>>8,a,c>>24,c>>16,c>>8,c),9):-32<=i?(e.push(i),1):-128<=i?(e.push(208,i),2):-32768<=i?(e.push(209,i>>8,i),3):-2147483648<=i?(e.push(210,i>>24,i>>16,i>>8,i),5):(a=Math.floor(i/Math.pow(2,32)),c=i>>>0,e.push(211,a>>24,a>>16,a>>8,a,c>>24,c>>16,c>>8,c),9):(e.push(203),n.push({o:i,u:8,t:e.length}),9);if("object"===s){if(null===i)return e.push(192),1;if(Array.isArray(i)){if((u=i.length)<16)e.push(144|u),l=1;else if(u<65536)e.push(220,u>>8,u),l=3;else{if(!(u<4294967296))throw new Error("Array too large");e.push(221,u>>24,u>>16,u>>8,u),l=5}for(o=0;o<u;o++)l+=t(e,n,i[o]);return l}if(i instanceof Date){var h=i.getTime();return a=Math.floor(h/Math.pow(2,32)),c=h>>>0,e.push(215,0,a>>24,a>>16,a>>8,a,c>>24,c>>16,c>>8,c),10}if(i instanceof ArrayBuffer){if((u=i.byteLength)<256)e.push(196,u),l=2;else if(u<65536)e.push(197,u>>8,u),l=3;else{if(!(u<4294967296))throw new Error("Buffer too large");e.push(198,u>>24,u>>16,u>>8,u),l=5}return n.push({l:i,u:u,t:e.length}),l+u}if("function"==typeof i.toJSON)return t(e,n,i.toJSON());var f=[],d="",p=Object.keys(i);for(o=0,r=p.length;o<r;o++)"function"!=typeof i[d=p[o]]&&f.push(d);if((u=f.length)<16)e.push(128|u),l=1;else if(u<65536)e.push(222,u>>8,u),l=3;else{if(!(u<4294967296))throw new Error("Object too large");e.push(223,u>>24,u>>16,u>>8,u),l=5}for(o=0;o<u;o++)l+=t(e,n,d=f[o]),l+=t(e,n,i[d]);return l}if("boolean"===s)return e.push(i?195:194),1;if("undefined"===s)return e.push(212,0,0),3;throw new Error("Could not encode")}(e,i,t),o=new ArrayBuffer(s),r=new DataView(o),a=0,c=0,u=-1;0<i.length&&(u=i[0].t);for(var l,h=0,f=0,d=0,p=e.length;d<p;d++)if(r.setUint8(c+d,e[d]),d+1===u){if(h=(l=i[a]).u,f=c+u,l.l)for(var g=new Uint8Array(l.l),E=0;E<h;E++)r.setUint8(f+E,g[E]);else l.h?n(r,f,l.h):void 0!==l.o&&r.setFloat64(f,l.o);c+=h,i[++a]&&(u=i[a].t)}let y=Array.from(new Uint8Array(o));return y.unshift(4),new Uint8Array(y).buffer}(o))};function g(t,e){const n=new CustomEvent(t,{detail:e});f.dispatchEvent(n)}const E=t=>{if("Blockly"in window)return y(t);const n=function(t){var n=new e(t=t.slice(1)),i=n.v();if(n.t===t.byteLength)return i;throw new Error(t.byteLength-n.t+" trailing bytes")}(t.data);if(console.warn(n),"3"===n.toString()&&setTimeout((()=>p("PLAYER_LEADERBOARD_REQUESTED",void 0)),500),"object"!=typeof n)return;if(2!==n.type)return;const{data:i,key:s}=n.data[1];switch(s){case"UPDATED_PLAYER_LEADERBOARD":d.PLAYER_LEADERBOARD=i.items;break;case"PLAYER_JOINS_STATIC_STATE":d.GAME_STATE=i,g("GAME_STATE");break;case"IMPOSTER_MODE_PEOPLE":case"LAVA_RESULTS":case"DEFENDING_HOMEBASE_STATUS":case"AVAILABLE_HOMEBASE_UPGRADES":case"AVAILABLE_LAVA_UPGRADES":d[s]=i;break;default:if(!i||!i?.type)return;d.ROOM=n.data[0].slice(8),d[i.type]=i.value}},y=t=>{const e=l(t.data);switch(e.type){case"AUTH_ID":g("AUTH_ID",e.message);break;case"MESSAGE_FOR_DEVICE":g("MESSAGE_FOR_DEVICE",e.message)}},_=WebSocket.prototype.send;WebSocket.prototype.send=function(t){return console.warn("[S]",t),d.ws=this,this.removeEventListener("message",E),this.addEventListener("message",E),"Blockly"in window?(t=>{const e=l(t);"MOVED"===e.type&&g("MOVED",e.message),h().send(t)})(t):_.apply(this,arguments)};const m=t=>new Promise((e=>setTimeout(e,t))),A=()=>"g_"+Date.now().toString(32)+"_"+Math.floor(1e4*Math.random()).toString(32),S=t=>Array.from({length:t},A),w=function(t){const e=t??C(),n=v(e.answers),i=b();if("text"===e.type)return{index:-1,type:"input",text:n.text,choice:n,element:null};for(const t of i){const e=t.textContent,s=t.getElementsByTagName("img")[0]?.src??"";if((n.text||"")===e&&(n.image||"")===s)return{index:i?.indexOf(t),type:"text",text:n.text??"",choice:n,element:t}}return{type:null}},v=function(t){for(const e of t??[])if(e.correct){let t="text";return e.text||(t="image"),e.type=t,e}return{type:null}},b=function(){return Array.from(document.querySelector(".sc-hKFoFe")?.children??[])},C=function(){const t=d.GAME_QUESTIONS,e=U();if(!e||!t)return{type:null};let n=[];for(const i of t)e.img===i.image&&e.text===i.text&&n.push(i);for(const t of n){const e=w(t);if(e?.type)return t}return{type:null}},U=function(){const t=document.querySelector(".notranslate.lang-en")||document.querySelector("img[alt=Question]");if(t){return{img:document.querySelector("img[alt=Question]")?.src??"",text:t.textContent}}return{type:null}},R=JSON.parse(localStorage.getItem("g_keybinds")||"{}"),P=new EventTarget;function O(t,e){const n=new CustomEvent(t,{detail:e});P.dispatchEvent(n)}const M=()=>localStorage.setItem("g_keybinds",JSON.stringify(R));window.addEventListener("keydown",(t=>{const e=Et(),n=R[e];for(const[i,s]of Object.entries(n))if(t.key===s){O("KEYBIND",{keybindId:i,key:t.key,mode:e});break}}));const[T,I,D,k,$,x,H,L,N,B,G,W,F,V]=S(14),Q={keybind:t=>{const e=document.createElement("span");return e.className=B,e.setAttribute("keybind",t.keybindId??""),e.setAttribute("keybind-key",t.key??""),e.textContent=t.key&&t.keybindId?t.key:"[ ]",e.addEventListener("click",(n=>{z.bindingKey||(e.textContent="...",z.bindingKey=!0,z.boundKey=n=>{(t=>{const e=Et();R[e]&&(delete R[e][t],M())})(t.keybindId),((t,e)=>{const n=Et();R[n]||(R[n]={}),R[n][t]=e,M()})(t.keybindId,n),t.key=n,e.textContent=n,e.setAttribute("keybind-key",n),z.bindingKey=!1,z.boundKey=t=>{}},setTimeout((()=>{z.bindingKey=!1,e.textContent=t.key&&t.keybindId?t.key:"[ ]",z.boundKey=t=>{}}),1e3))})),e},toggle:(t,e)=>{const n=document.createElement("div");n.className=`${T} ${I} `+(e.value?D:k),n.setAttribute("keybind",e.keybindId??"");const i=document.createElement("span");return i.textContent=t,t.length>21&&(i.style.fontSize="17px"),n.appendChild(i),e.keybindId&&n.appendChild(Q.keybind(e)),n},button:(t,e)=>{const n=document.createElement("div");n.className=`${T} ${G}`,n.setAttribute("keybind",e.keybindId??"");const i=document.createElement("span");return i.textContent=t,t.length>21&&(i.style.fontSize="17px"),n.appendChild(i),e.keybindId&&n.appendChild(Q.keybind(e)),n},slider:(t,e)=>{const n=document.createElement("div");n.className=`${T} ${V}`;const i=document.createElement("span");i.textContent=`${t}: ${e.value}${e.numSuffix||""}`;const s=document.createElement("input");if(s.type="range",s.className=A(),s.min=e.interval[0].toString(),s.step=e.interval[1].toString(),s.max=e.interval[2].toString(),s.value=e.value.toString(),n.appendChild(i),n.appendChild(s),e.colors){const t=document.createElement("style");let i="linear-gradient(90deg",o=0;for(const[t,n]of Object.entries(e.colors))o&&(i+=`, ${t} ${o}%`),i+=`, ${t} ${n+o}%`,o+=n;t.innerHTML=`#${q} .${s.className}::-moz-range-track {background: ${i}) !important;}`,n.appendChild(t)}return n},nav:()=>{if(document.querySelector(`#${q}`))return document.querySelector(`#${q}`);const t=document.createElement("div");return t.id=q,t.style.display="none",document.body.appendChild(t),t},style:()=>{if(document.querySelector(`style#${j}`))return;const t=document.createElement("style");t.id=j,t.innerHTML=` @import url('https://fonts.googleapis.com/css2?family=Baloo+2&display=swap'); @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');\n  #${q} {position: fixed;width: 280px;height: 500px;background: #00000090;font-family: 'Baloo 2', cursive;border-radius: 3px;font-size: 19px;user-select: none;overflow-y: scroll;-ms-overflow-style: none;scrollbar-width: none;overscroll-behavior-y: none;z-index: 99999;}\n  #${q}::-webkit-scrollbar {display: none;}\n  #${q} .${$}, #${q} .${T}, #${q} .${H} {display: block;width: 100%;height: 40px;line-height: 40px;color: white;}\n  #${q} .${G}.${k} {cursor:not-allowed !important;}\n  #${q} .${G}.${k} span {color:#444 !important;}\n  #${q} span.${$} {text-align: center;border-bottom-style: solid;border-bottom-width: 3px;animation: 7s infinite rainbowBC, 7s infinite rainbowC;}\n  #${q} .${T} {position: relative;transition: 0.3s background;}\n  #${q} .${T} span:first-child {color: white;transition: 0.2s color;padding-left: 20px;}\n  #${q} .${H} {transition: 0.3s height;}\n  #${q} .${H}:not(.${W}) {overflow-y: hidden;height: 40px;}\n  #${q} .${H}.${W} {height: auto;}\n  #${q} .${T}.${I}.${k} span:first-child {color: #f00a;}\n  #${q} .${T}.${I}.${D} span:first-child {color: #1f0e;}\n  #${q} .${T}:hover, #${q} .${H}:hover {background: #ffffff20;cursor: pointer;}\n  #${q} .${x}:hover {cursor: move;}\n  #${q} .${T} span.${B} {position: absolute;display: block;right: 0px;top: 0px;width: 40px;color: white;background: #ffffff10;text-align: center;margin-right: 7px;}\n  #${q} .${T} span.${B}[keybind-key=""] {color: #00000050;}\n  #${q} .${H} span.${N} {display: inline-block;width: 40px;text-align: center;transition: 0.2s transform;font-family: 'Righteous', cursive;}\n  #${q} .${H}.${W} span.${N} {transform: rotate(90deg);}\n  .${F} {position: absolute;right: 12px;top: 7px;opacity: 0.25;transition: 0.2s opacity;}\n  .${F}:hover {opacity: 0.5;cursor: pointer;}\n  .${F}.${D} {opacity: 1;}\n  #${q} .${V} {height: 60px;}\n  #${q} .${V} span {position: absolute;top: 8px;line-height: initial;}\n  #${q} .${V} input {position: absolute;top: 28px;width: calc(100% - 40px);left: 20px;background: transparent;}\n  #${q} .${V} input[type="range"]::-moz-range-thumb {height: 17px;width: 8px;border: none;border-radius: 0px;background: #9736FF;cursor: col-resize;}\n  #${q} .${V} input[type="range"]::-moz-range-track {height: 2.4px;border: none;background: white;border-radius: 0px;}\n  #${q} #${K} {position:absolute;left:0;top:0;width:100%;z-index:100000;background:#000d;}\n  @keyframes rainbowBC {\n    0% { border-color: red; }\n    18% { border-color: orange; }\n    36% { border-color: yellow; }\n    54% { border-color: lime; }\n    72% { border-color: dodgerblue; }\n    90% { border-color: violet; }\n    100% { border-color: red; }\n  }\n  @keyframes rainbowC {\n    0% { color: red; }\n    18% { color: orange; }\n    36% { color: yellow; }\n    54% { color: lime; }\n    72% { color: dodgerblue; }\n    90% { color: violet; }\n    100% { color: red; }\n  }`,document.head.appendChild(t)},elements:(t,e=!1,n,i)=>{const s=[];for(const[o,r]of Object.entries(t))switch(r.type){case"header":{const t=document.createElement("span");if(t.className=`${$} ${x}`,e)t.textContent=o;else{t.innerHTML=`${o}<svg class="${F}" fill="#8e3bff" width="24px" height="24px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="#8e3bff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1154.976 0 988.342 166.52c-60.448 60.447-63.436 153.418-15.4 220.646L670.359 689.751c-4.022 4.022-6.55 8.964-9.079 13.79-147.212-61.022-328.671-34.246-444.626 81.709l-98.027 98.141 418.31 418.195-520.129 520.129c-22.41 22.409-22.41 58.724 0 81.248 11.262 11.147 25.972 16.778 40.682 16.778s29.42-5.63 40.567-16.778l520.128-520.129 418.195 418.31 98.142-98.142c75.962-75.847 117.793-176.862 117.793-284.313 0-56.195-12.067-110.208-33.787-160.198 2.758-1.839 5.861-2.988 8.275-5.516l303.963-303.964c29.19 21.145 63.896 33.097 100.67 33.097 46.083 0 89.293-17.928 121.93-50.565L1920 764.909 1154.976 0Z" fill-rule="evenodd"></path> </g></svg>`;const n=t.querySelector("svg");n.addEventListener("click",(t=>{n.classList.toggle(D),z.pinned=!z.pinned})),e=!0}t.addEventListener("mousedown",st),s.push(t);break}case"toggle":{const t=Q.toggle(o,r);t.addEventListener("click",(e=>{if(!e.target?.classList.contains("key")){if(t.classList.toggle(D),t.classList.toggle(k),n&&i){const t=n[i].elements[o];t.value=!t.value}else r.value=!r.value;r.action?.()}})),s.push(t);break}case"button":{const t=Q.button(o,r),e=function(t){t.target?.classList.contains("key")||r.action()};let n=null;r.condition&&setInterval((()=>{const i=r.condition?.();i!==n&&(n=i,t.removeEventListener("click",e),i?(t.classList.remove(k),t.addEventListener("click",e)):t.classList.add(k))}),250),t.addEventListener("click",e),s.push(t);break}case"collapse":{const n=document.createElement("div");n.className=`${H} ${L}`;const i=document.createElement("span");i.className=`${N} ${L}`,i.textContent=">";const a=document.createElement("span");a.className=L,a.textContent=o,o.length>21&&(a.style.fontSize="17px");const c=document.createElement("div");n.appendChild(i),n.appendChild(a),n.appendChild(c);const u=Q.elements(r.elements,e,t,o);for(const t of u)c.appendChild(t);n.addEventListener("click",(t=>{t.target?.classList.contains(L)&&n.classList.toggle(W)})),s.push(n);break}case"slider":{const t=Q.slider(o,r);t.querySelector("input").addEventListener("input",(e=>{const n=e.target;r.value=parseInt(n.value),t.querySelector("span").textContent=`${o}: ${r.value}${r.numSuffix||""}`})),s.push(t);break}}return s}},[q,K,j]=S(3),Y=[0,0,0,0,!1],z={pinned:!1,bindingKey:!1,boundKey:t=>{}};let J=1,X=0,Z=0,tt={};const et=t=>{tt=t,Q.style();const e=Q.nav();e.innerHTML="";const n=Q.elements(t);for(const t of n)e.appendChild(t);z.pinned=!1},nt=t=>{J=Math.round(10*t)/10,Q.nav().style.transform=`scale(${J})`,X=Math.abs((280-Q.nav().offsetWidth)/2),Z=Math.abs((500-Q.nav().offsetHeight)/2),it()},it=()=>{const t=Q.nav();window.innerWidth-X<parseInt(t.style.left)+t.offsetWidth&&(t.style.left=""),t.style.right=-1*X+"px",window.innerHeight-Z<parseInt(t.style.top)+t.offsetHeight&&(t.style.top=""),t.style.bottom=-1*Z+"px"},st=t=>{Y[2]=t.clientX,Y[3]=t.clientY,Y[4]=!0};window.addEventListener("mousedown",(t=>{Array.from(Q.nav().querySelectorAll("*")).includes(t.target)||(z.pinned||(Q.nav().style.display="none",z.bindingKey=!1),ot())})),window.addEventListener("resize",it),window.addEventListener("mouseup",(()=>{Y[4]=!1})),window.addEventListener("mousemove",(t=>{if(!Y[4])return;Y[0]=Y[2]-t.clientX,Y[1]=Y[3]-t.clientY,Y[2]=t.clientX,Y[3]=t.clientY;const e=Q.nav();e.style.top=Math.max(-1*Z,e.offsetTop-Y[1])+"px",e.style.left=Math.max(-1*X,e.offsetLeft-Y[0])+"px",it()})),window.addEventListener("contextmenu",(t=>{const e=Q.nav();e.style.display="",e.style.left=Math.min(window.innerWidth-e.offsetWidth,t.x-X)+"px",e.style.top=Math.min(window.innerHeight-e.offsetHeight,t.y-Z)+"px",it(),t.preventDefault()})),window.addEventListener("keydown",(t=>{""===Q.nav().style.display&&("-"===t.key&&nt(Math.max(.5,J-.1)),"="===t.key&&nt(Math.min(1,J+.1)),z.bindingKey&&(["Escape","Backspace"].includes(t.key)?z.bindingKey=!1:z.boundKey(t.key)));const e=R[t.key];if(e){function n(t){if("toggle"===t.type){if(t.keybindId===e)return t.value=!t.value,t.action?.(),!0}else if("button"===t.type&&t.keybindId===e)return t.action?.(),!0}t:for(const i of Object.values(tt))if("collapse"===i.type){for(const s of Object.values(i.elements))if(n(s))break t}else if(n(i))break t}}));const ot=()=>{document.querySelector(`#${K}`)?.remove()};function rt(t,e){const n=(()=>{if(document.querySelector(`#${K}`))return document.querySelector(`#${K}`);const t=document.createElement("div");return t.id=K,t.style.minHeight=document.querySelector(`#${q}`).scrollHeight+"px",document.querySelector(`#${q}`)?.appendChild(t),document.querySelector(`#${q}`)?.scrollTo(0,0),t})();for(const[i,s]of Object.entries(t)){const t=Q.button(i.replace(/{.+}/gi,""),s);t.addEventListener("click",(()=>{ot(),e(s._id)})),n.appendChild(t)}}const at=()=>{const t=d.GAME_QUESTIONS?.[ft["Auto Answer Config"].elements["Question Index"].value]||d.GAME_QUESTIONS?.[0];p("QUESTION_ANSWERED",{questionId:t._id,answer:v(t.answers)._id})},ct=t=>{p("POWERUP_PURCHASED",t)},ut={repurchasePowerups:"Rebooter",minuteMoreEarnings:"Minute To Win It",outnumbered:"Outnumbered","Quad Upgrade":"Quadrader","Blurred Screen":"Blur","Clap Multiplier":"Clapinator",Giving:"Gift"},lt=t=>{d.PURCHASED_THEMES?.includes(t)||p("THEME_PURCHASED",t)},ht=t=>{p("THEME_APPLIED",t)},ft={Answers:{type:"header"},"Auto Answer":{type:"toggle",value:!1,keybindId:"classic_auto_answer",action:async function(){at(),await m(ft["Auto Answer Config"].elements.Delay.value),this.value&&this.action.bind(this)()}},"Auto Answer Config":{type:"collapse",elements:{Delay:{type:"slider",interval:[500,250,2500],value:1500,numSuffix:"ms",colors:{red:20,orange:20,lime:60}},"Question Index":{type:"slider",interval:[0,1,4],value:0},"Success Rate":{type:"slider",interval:[0,5,100],value:100,numSuffix:"%"}}},"Answer Correctly Once":{type:"button",action:at},"Highlight Answer":{type:"toggle",value:!1,action:async function(){const t=w();if(t&&"text"===t?.type&&t.index){const e=b()?.[t.index];e&&(e.children[0].style.background="dodgerblue",e.children[0].style.color="black")}await m(250),this.value?this.action.bind(this)():b()?.forEach((t=>{t.children[0].style.background="",t.children[0].style.color=""}))}},"Hidden Answer":{type:"toggle",value:!1,action:async function(){const t=w();"text"===t?.type&&t.index?document.title=`${t.index+1}lay Gimkit! - Enter game code here | Gimkit`:document.title="Play Gimkit! - Enter game code here | Gimkit",await m(250),this.value?this.action.bind(this)():document.title="Play Gimkit! - Enter game code here | Gimkit"}},"Input Answer":{type:"toggle",value:!1,action:async function(){const t=w(),e=document.getElementsByTagName("form")[0]?.children[0]??{};if("input"===t?.type&&e&&(e.placeholder=t.text),await m(250),this.value)this.action.bind(this)();else{(document.getElementsByTagName("form")[0]?.children[0]??{}).placeholder="Enter answer here..."}}},Upgrades:{type:"header"},"Auto Upgrade":{type:"toggle",value:!1,action:async function(){function t(t,e){p("UPGRADE_PURCHASED",{upgradeName:t,level:e})}let e=d.BALANCE??0;const n=d.PERSONAL_ACTIVE_POWERUPS?.includes("discount")?.75:1,i=ft["Auto Upgrade Config"].elements["Money Per Question"].value,s=ft["Auto Upgrade Config"].elements.Multiplier.value,o=ft["Auto Upgrade Config"].elements["Streak Bonus"].value,r=ft["Auto Upgrade Config"].elements.Insurance.value;if(i){const i=d.GAME_STATE.upgrades[0].levels,s=d.UPGRADE_LEVELS.moneyPerQuestion,o=(i[s]?.price??1/0)*n*(d.UPGRADE_PRICING_DISCOUNT??1);e>=o&&(t("Money Per Question",s+1),e-=o)}if(s){const i=d.GAME_STATE.upgrades[1].levels,s=d.UPGRADE_LEVELS.multiplier,o=(i[s]?.price??1/0)*n*(d.UPGRADE_PRICING_DISCOUNT??1);e>=o&&(t("Multiplier",s+1),e-=o)}if(o){const i=d.GAME_STATE.upgrades[2].levels,s=d.UPGRADE_LEVELS.streakBonus,o=(i[s]?.price??1/0)*n*(d.UPGRADE_PRICING_DISCOUNT??1);e>=o&&(t("Streak Bonus",s+1),e-=o)}if(r){const i=d.GAME_STATE.upgrades[3].levels,s=d.UPGRADE_LEVELS.insurance,o=(i[s]?.price??1/0)*n*(d.UPGRADE_PRICING_DISCOUNT??1);e>=o&&(t("Insurance",s+1),e-=o)}await m(500),this.value&&this.action.bind(this)()}},"Auto Upgrade Config":{type:"collapse",elements:{"Money Per Question":{type:"toggle",value:!0},Multiplier:{type:"toggle",value:!0},"Streak Bonus":{type:"toggle",value:!0},Insurance:{type:"toggle",value:!1}}},Powerups:{type:"header"},"Buy All Powerups":{type:"button",action:async()=>{const t=ft["Buy Specific Powerup"].elements;for(const e of Object.values(t))e.action(),await m(100)}},"Buy Specific Powerup":{type:"collapse",elements:{Icer:{type:"button",condition:()=>!d.PURCHASED_POWERUPS?.includes("Icer"),action:()=>{ct("Icer")}},Rebooter:{type:"button",condition:()=>!d.PURCHASED_POWERUPS?.includes("repurchasePowerups"),action:()=>{ct("repurchasePowerups")}},"Minute To Win It":{type:"button",condition:()=>!d.PURCHASED_POWERUPS?.includes("minuteMoreEarnings"),action:()=>{ct("minuteMoreEarnings")}},Outnumbered:{type:"button",condition:()=>!d.PURCHASED_POWERUPS?.includes("outnumbered"),action:()=>{ct("outnumbered")}},Quadgrader:{type:"button",condition:()=>!d.PURCHASED_POWERUPS?.includes("Quad Upgrade"),action:()=>{ct("Quad Upgrade")}},Discounter:{type:"button",condition:()=>!d.PURCHASED_POWERUPS?.includes("Discounter"),action:()=>{ct("Discounter")}},Blur:{type:"button",condition:()=>!d.PURCHASED_POWERUPS?.includes("Blurred Screen"),action:()=>{ct("Blurred Screen")}},Clapinator:{type:"button",condition:()=>!d.PURCHASED_POWERUPS?.includes("Clap Multiplier"),action:()=>{ct("Clap Multiplier")}},Gift:{type:"button",condition:()=>!d.PURCHASED_POWERUPS?.includes("Giving"),action:()=>{ct("Giving")}},Shield:{type:"button",condition:()=>!d.PURCHASED_POWERUPS?.includes("Shield"),action:()=>{ct("Shield")}},Subtractor:{type:"button",condition:()=>!d.PURCHASED_POWERUPS?.includes("Subtractor"),action:()=>{ct("Subtractor")}},"Mini Bonus":{type:"button",condition:()=>!d.PURCHASED_POWERUPS?.includes("Mini Bonus"),action:()=>{ct("Mini Bonus")}},"Mega Bonus":{type:"button",condition:()=>!d.PURCHASED_POWERUPS?.includes("Mega Bonus"),action:()=>{ct("Mega Bonus")}}}},"Use Specific Powerup":{type:"button",condition:()=>d.PURCHASED_POWERUPS?.filter((t=>!d.USED_POWERUPS?.includes(t))).length??!1,action:()=>{const t=d.PURCHASED_POWERUPS?.filter((t=>!d.USED_POWERUPS?.includes(t)));t&&rt(Object.fromEntries(t.map((t=>[ut[t]||t,{type:"button",action:()=>{},_id:t}]))),(t=>{t&&(async t=>{if(["Icer","outnumbered","Blurred Screen","Giving","Subtractor"].includes(t)){d.PLAYER_LEADERBOARD||(p("PLAYER_LEADERBOARD_REQUESTED",void 0),await m(500));const e=d.PLAYER_LEADERBOARD??[];if(!e)return;rt(Object.fromEntries(e.map((t=>[t.name+`{${t.id}}`,{type:"button",action:()=>{},_id:t.id}]))),(e=>{e&&p("POWERUP_ATTACK",{name:t,target:e})}))}else p("POWERUP_ACTIVATED",t)})(t)}))}},Themes:{type:"header"},"Buy All Themes":{type:"button",action:async()=>{const t=ft["Set Specific Theme"].elements,e=d.THEME??"Default";for(const e of Object.values(t))e.action(),await m(100);ht(e)}},"Set Specific Theme":{type:"collapse",elements:{Default:{type:"button",condition:()=>"Default"!==d.THEME,action:()=>{ht("Default")}},"Night [$5]":{type:"button",condition:()=>"Night"!==d.THEME&&d.PURCHASED_THEMES?.includes("Night")||(d.BALANCE||0)>=5&&!d.PURCHASED_THEMES?.includes("Night"),action:()=>{lt("Night"),ht("Night")}},"Thanos [$15]":{type:"button",condition:()=>"Thanos"!==d.THEME&&d.PURCHASED_THEMES?.includes("Thanos")||(d.BALANCE||0)>=15&&!d.PURCHASED_THEMES?.includes("Thanos"),action:()=>{lt("Thanos"),ht("Thanos")}},"Ocean [$30]":{type:"button",condition:()=>"Ocean"!==d.THEME&&d.PURCHASED_THEMES?.includes("Ocean")||(d.BALANCE||0)>=30&&!d.PURCHASED_THEMES?.includes("Ocean"),action:()=>{lt("Ocean"),ht("Ocean")}},"Forest [$50]":{type:"button",condition:()=>"Forest"!==d.THEME&&d.PURCHASED_THEMES?.includes("Forest")||(d.BALANCE||0)>=50&&!d.PURCHASED_THEMES?.includes("Forest"),action:()=>{lt("Forest"),ht("Forest")}},"Sunset [$100]":{type:"button",condition:()=>"Sunset"!==d.THEME&&d.PURCHASED_THEMES?.includes("Sunset")||(d.BALANCE||0)>=100&&!d.PURCHASED_THEMES?.includes("Sunset"),action:()=>{lt("Sunset"),ht("Sunset")}},"Retro [$200]":{type:"button",condition:()=>"Retro"!==d.THEME&&d.PURCHASED_THEMES?.includes("Retro")||(d.BALANCE||0)>=200&&!d.PURCHASED_THEMES?.includes("Retro"),action:()=>{lt("Retro"),ht("Retro")}},"Pure Gold [$1t]":{type:"button",condition:()=>"Pure Gold"!==d.THEME&&d.PURCHASED_THEMES?.includes("Pure Gold")||(d.BALANCE||0)>=1e12&&!d.PURCHASED_THEMES?.includes("Pure Gold"),action:()=>{lt("Pure Gold"),ht("Pure Gold")}}}},Misc:{type:"header"},"Set Claps (Endgame)":{type:"button",action:()=>{const t=parseFloat(prompt("Enter the amount of claps you want to set")||"0");isNaN(t)||p("CLAP",{amount:t})}}},dt={Answers:ft.Answers,"Auto Answer":{type:"toggle",value:!1,action:async function(){"questionStatus"===d.PARDY_MODE_STATE?.[0].value.key&&"ask"===d.PARDY_MODE_STATE[0].value.value&&(await m(dt["Auto Answer Config"].elements.Delay.value),at(),await m(500)),await m(10),this.value&&this.action.bind(this)()}},"Auto Answer Config":{type:"collapse",elements:{Delay:{type:"slider",interval:[0,250,2500],value:0,numSuffix:"ms",colors:{orange:50,lime:50}},"Question Index":ft["Auto Answer Config"].elements["Question Index"],"Success Rate":ft["Auto Answer Config"].elements["Success Rate"]}},"Answer Correctly Once":ft["Answer Correctly Once"],"Highlight Answer":ft["Highlight Answer"],"Hidden Answer":ft["Hidden Answer"],"Input Answer":ft["Input Answer"],Misc:ft.Misc,"Set Claps (Endgame)":ft["Set Claps (Endgame)"]},pt=async(t,e)=>{e?(d.IMPOSTER_MODE_PEOPLE||(p("IMPOSTER_MODE_REQUEST_PEOPLE"),await m(500)),rt(Object.fromEntries(d.IMPOSTER_MODE_PEOPLE?.filter((t=>!t.votedOff)).map((t=>[t.name,{type:"button",action:()=>{},_id:t.id}]))??[]),(e=>{e&&p("IMPOSTER_MODE_PURCHASE",{item:t,on:e})}))):p("IMPOSTER_MODE_PURCHASE",{item:t})},gt={Answers:ft.Answers,"Auto Answer":ft["Auto Answer"],"Auto Answer Config":ft["Auto Answer Config"],"Answer Correctly Once":ft["Answer Correctly Once"],"Highlight Answer":ft["Highlight Answer"],"Hidden Answer":ft["Hidden Answer"],"Input Answer":ft["Input Answer"],Imposter:{type:"header"},"Reveal Imposters":{type:"toggle",value:!1,action:()=>{}},"Purchase Item":{type:"collapse",elements:{"Private Investigation (7)":{type:"button",condition:()=>"detective"===d.IMPOSTER_MODE_PERSON?.role,action:()=>{pt("privateInvestigation",!0)}},"Public Investigation (15)":{type:"button",condition:()=>"detective"===d.IMPOSTER_MODE_PERSON?.role,action:()=>{pt("publicInvestigation",!0)}},"Note Look (7)":{type:"button",condition:()=>"detective"===d.IMPOSTER_MODE_PERSON?.role,action:()=>{pt("noteViewer",!0)}},"Meeting (10)":{type:"button",condition:()=>"detective"===d.IMPOSTER_MODE_PERSON?.role,action:()=>{pt("meeting")}},"Investigation Remover (10)":{type:"button",condition:()=>"imposter"===d.IMPOSTER_MODE_PERSON?.role,action:()=>{pt("investigationRemover")}},"Fake Investigation (6)":{type:"button",condition:()=>"imposter"===d.IMPOSTER_MODE_PERSON?.role,action:()=>{pt("fakeInvestigation",!0)}},"Unclear (15)":{type:"button",condition:()=>"imposter"===d.IMPOSTER_MODE_PERSON?.role,action:()=>{pt("clearListRemover",!0)}},"Disguise (15)":{type:"button",condition:()=>"imposter"===d.IMPOSTER_MODE_PERSON?.role,action:()=>{pt("blendIn")}}}},"Spam Host":{type:"toggle",value:!1,action:async function(){p("UPGRADE_PURCHASED",{upgradeName:"Money Per Question",level:1}),await m(250),this.value&&this.action.bind(this)()}},Misc:ft.Misc,"Set Claps (Endgame)":ft["Set Claps (Endgame)"]},Et=()=>d.GAME_STATE.gameOptions.specialGameType[0];window.addEventListener("load",(t=>{et(ft)})),f.addEventListener("GAME_STATE",(t=>{switch(t.detail,Et()){case"CLASSIC":default:et(ft);break;case"PARDY":et(dt);break;case"IMPOSTER":et(gt)}})),P.addEventListener("KEYBIND",(t=>{t.detail})),setInterval((()=>{Array.from(document.body.children??[]).forEach((t=>{t.id!==q&&(t.style.zIndex="10")}))}),200),t.mode=Et}({});
