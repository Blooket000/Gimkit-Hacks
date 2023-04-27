(function (exports) {
    'use strict';

    function s(t) {
        if (((this.t = 0), t instanceof ArrayBuffer)) {
            (this.i = t), (this.s = new DataView(this.i));
        }
        else {
            if (!ArrayBuffer.isView(t))
                throw new Error("Invalid argument");
            (this.i = t.buffer),
                (this.s = new DataView(this.i, t.byteOffset, t.byteLength));
        }
    }
    function y(t, i, r) {
        for (var s = 0, e = 0, h = r.length; e < h; e++) {
            (s = r.charCodeAt(e)) < 128
                ? t.setUint8(i++, s)
                : (s < 2048
                    ? t.setUint8(i++, 192 | (s >> 6))
                    : (s < 55296 || 57344 <= s
                        ? t.setUint8(i++, 224 | (s >> 12))
                        : (e++,
                            (s = 65536 + (((1023 & s) << 10) | (1023 & r.charCodeAt(e)))),
                            t.setUint8(i++, 240 | (s >> 18)),
                            t.setUint8(i++, 128 | ((s >> 12) & 63))),
                        t.setUint8(i++, 128 | ((s >> 6) & 63))),
                    t.setUint8(i++, 128 | (63 & s)));
        }
    }
    function d(t) {
        for (var i = 0, r = 0, s = 0, e = t.length; s < e; s++) {
            (i = t.charCodeAt(s)) < 128
                ? (r += 1)
                : i < 2048
                    ? (r += 2)
                    : i < 55296 || 57344 <= i
                        ? (r += 3)
                        : (s++, (r += 4));
        }
        return r;
    }
    s.prototype.g = function (t) {
        for (var i = new Array(t), r = 0; r < t; r++)
            i[r] = this.v();
        return i;
    };
    s.prototype.M = function (t) {
        for (var i = {}, r = 0; r < t; r++)
            i[this.v()] = this.v();
        return i;
    };
    s.prototype.h = function (t) {
        var i = (function (t, i, r) {
            for (var s = "", e = 0, h = i, n = i + r; h < n; h++) {
                var a = t.getUint8(h);
                if (0 != (128 & a)) {
                    if (192 != (224 & a)) {
                        if (224 != (240 & a)) {
                            if (240 != (248 & a)) {
                                throw new Error("Invalid byte " + a.toString(16));
                            }
                            65536 <=
                                (e = ((7 & a) << 18) |
                                    ((63 & t.getUint8(++h)) << 12) |
                                    ((63 & t.getUint8(++h)) << 6) |
                                    ((63 & t.getUint8(++h)) << 0))
                                ? ((e -= 65536),
                                    (s += String.fromCharCode(55296 + (e >>> 10), 56320 + (1023 & e))))
                                : (s += String.fromCharCode(e));
                        }
                        else {
                            s += String.fromCharCode(((15 & a) << 12) |
                                ((63 & t.getUint8(++h)) << 6) |
                                ((63 & t.getUint8(++h)) << 0));
                        }
                    }
                    else {
                        s += String.fromCharCode(((31 & a) << 6) | (63 & t.getUint8(++h)));
                    }
                }
                else
                    s += String.fromCharCode(a);
            }
            return s;
        })(this.s, this.t, t);
        return (this.t += t), i;
    };
    s.prototype.l = function (t) {
        var i = this.i.slice(this.t, this.t + t);
        return (this.t += t), i;
    };
    s.prototype.v = function () {
        var t, i = this.s.getUint8(this.t++), r = 0, s = 0, e = 0, h = 0;
        if (i < 192) {
            return i < 128
                ? i
                : i < 144
                    ? this.M(15 & i)
                    : i < 160
                        ? this.g(15 & i)
                        : this.h(31 & i);
        }
        if (223 < i)
            return -1 * (255 - i + 1);
        switch (i) {
            case 192:
                return null;
            case 194:
                return !1;
            case 195:
                return !0;
            case 196:
                return (r = this.s.getUint8(this.t)), (this.t += 1), this.l(r);
            case 197:
                return (r = this.s.getUint16(this.t)), (this.t += 2), this.l(r);
            case 198:
                return (r = this.s.getUint32(this.t)), (this.t += 4), this.l(r);
            case 199:
                return ((r = this.s.getUint8(this.t)),
                    (s = this.s.getInt8(this.t + 1)),
                    (this.t += 2),
                    [s, this.l(r)]);
            case 200:
                return ((r = this.s.getUint16(this.t)),
                    (s = this.s.getInt8(this.t + 2)),
                    (this.t += 3),
                    [s, this.l(r)]);
            case 201:
                return ((r = this.s.getUint32(this.t)),
                    (s = this.s.getInt8(this.t + 4)),
                    (this.t += 5),
                    [s, this.l(r)]);
            case 202:
                return (t = this.s.getFloat32(this.t)), (this.t += 4), t;
            case 203:
                return (t = this.s.getFloat64(this.t)), (this.t += 8), t;
            case 204:
                return (t = this.s.getUint8(this.t)), (this.t += 1), t;
            case 205:
                return (t = this.s.getUint16(this.t)), (this.t += 2), t;
            case 206:
                return (t = this.s.getUint32(this.t)), (this.t += 4), t;
            case 207:
                return ((e = this.s.getUint32(this.t) * Math.pow(2, 32)),
                    (h = this.s.getUint32(this.t + 4)),
                    (this.t += 8),
                    e + h);
            case 208:
                return (t = this.s.getInt8(this.t)), (this.t += 1), t;
            case 209:
                return (t = this.s.getInt16(this.t)), (this.t += 2), t;
            case 210:
                return (t = this.s.getInt32(this.t)), (this.t += 4), t;
            case 211:
                return ((e = this.s.getInt32(this.t) * Math.pow(2, 32)),
                    (h = this.s.getUint32(this.t + 4)),
                    (this.t += 8),
                    e + h);
            case 212:
                return ((s = this.s.getInt8(this.t)),
                    (this.t += 1),
                    0 === s ? void (this.t += 1) : [s, this.l(1)]);
            case 213:
                return (s = this.s.getInt8(this.t)), (this.t += 1), [s, this.l(2)];
            case 214:
                return (s = this.s.getInt8(this.t)), (this.t += 1), [s, this.l(4)];
            case 215:
                return ((s = this.s.getInt8(this.t)),
                    (this.t += 1),
                    0 === s
                        ? ((e = this.s.getInt32(this.t) * Math.pow(2, 32)),
                            (h = this.s.getUint32(this.t + 4)),
                            (this.t += 8),
                            new Date(e + h))
                        : [s, this.l(8)]);
            case 216:
                return (s = this.s.getInt8(this.t)), (this.t += 1), [s, this.l(16)];
            case 217:
                return (r = this.s.getUint8(this.t)), (this.t += 1), this.h(r);
            case 218:
                return (r = this.s.getUint16(this.t)), (this.t += 2), this.h(r);
            case 219:
                return (r = this.s.getUint32(this.t)), (this.t += 4), this.h(r);
            case 220:
                return (r = this.s.getUint16(this.t)), (this.t += 2), this.g(r);
            case 221:
                return (r = this.s.getUint32(this.t)), (this.t += 4), this.g(r);
            case 222:
                return (r = this.s.getUint16(this.t)), (this.t += 2), this.M(r);
            case 223:
                return (r = this.s.getUint32(this.t)), (this.t += 4), this.M(r);
        }
        throw new Error("Could not parse");
    };
    const encode = function (t) {
        var i = [], r = [], s = (function t(i, r, s) {
            var e = typeof s, h = 0, n = 0, a = 0, f = 0, u = 0, o = 0;
            if ("string" === e) {
                if ((u = d(s)) < 32)
                    i.push(160 | u), (o = 1);
                else if (u < 256)
                    i.push(217, u), (o = 2);
                else if (u < 65536)
                    i.push(218, u >> 8, u), (o = 3);
                else {
                    if (!(u < 4294967296))
                        throw new Error("String too long");
                    i.push(219, u >> 24, u >> 16, u >> 8, u), (o = 5);
                }
                return r.push({ h: s, u: u, t: i.length }), o + u;
            }
            if ("number" === e) {
                return Math.floor(s) === s && isFinite(s)
                    ? 0 <= s
                        ? s < 128
                            ? (i.push(s), 1)
                            : s < 256
                                ? (i.push(204, s), 2)
                                : s < 65536
                                    ? (i.push(205, s >> 8, s), 3)
                                    : s < 4294967296
                                        ? (i.push(206, s >> 24, s >> 16, s >> 8, s), 5)
                                        : ((a = (s / Math.pow(2, 32)) >> 0),
                                            (f = s >>> 0),
                                            i.push(207, a >> 24, a >> 16, a >> 8, a, f >> 24, f >> 16, f >> 8, f),
                                            9)
                        : -32 <= s
                            ? (i.push(s), 1)
                            : -128 <= s
                                ? (i.push(208, s), 2)
                                : -32768 <= s
                                    ? (i.push(209, s >> 8, s), 3)
                                    : -2147483648 <= s
                                        ? (i.push(210, s >> 24, s >> 16, s >> 8, s), 5)
                                        : ((a = Math.floor(s / Math.pow(2, 32))),
                                            (f = s >>> 0),
                                            i.push(211, a >> 24, a >> 16, a >> 8, a, f >> 24, f >> 16, f >> 8, f),
                                            9)
                    : (i.push(203), r.push({ o: s, u: 8, t: i.length }), 9);
            }
            if ("object" === e) {
                if (null === s)
                    return i.push(192), 1;
                if (Array.isArray(s)) {
                    if ((u = s.length) < 16)
                        i.push(144 | u), (o = 1);
                    else if (u < 65536)
                        i.push(220, u >> 8, u), (o = 3);
                    else {
                        if (!(u < 4294967296))
                            throw new Error("Array too large");
                        i.push(221, u >> 24, u >> 16, u >> 8, u), (o = 5);
                    }
                    for (h = 0; h < u; h++)
                        o += t(i, r, s[h]);
                    return o;
                }
                if (s instanceof Date) {
                    var c = s.getTime();
                    return ((a = Math.floor(c / Math.pow(2, 32))),
                        (f = c >>> 0),
                        i.push(215, 0, a >> 24, a >> 16, a >> 8, a, f >> 24, f >> 16, f >> 8, f),
                        10);
                }
                if (s instanceof ArrayBuffer) {
                    if ((u = s.byteLength) < 256)
                        i.push(196, u), (o = 2);
                    else if (u < 65536)
                        i.push(197, u >> 8, u), (o = 3);
                    else {
                        if (!(u < 4294967296))
                            throw new Error("Buffer too large");
                        i.push(198, u >> 24, u >> 16, u >> 8, u), (o = 5);
                    }
                    return r.push({ l: s, u: u, t: i.length }), o + u;
                }
                if ("function" == typeof s.toJSON)
                    return t(i, r, s.toJSON());
                var l = [], w = "", v = Object.keys(s);
                for (h = 0, n = v.length; h < n; h++) {
                    (w = v[h]), "function" != typeof s[w] && l.push(w);
                }
                if ((u = l.length) < 16)
                    i.push(128 | u), (o = 1);
                else if (u < 65536)
                    i.push(222, u >> 8, u), (o = 3);
                else {
                    if (!(u < 4294967296))
                        throw new Error("Object too large");
                    i.push(223, u >> 24, u >> 16, u >> 8, u), (o = 5);
                }
                for (h = 0; h < u; h++) {
                    (w = l[h]), (o += t(i, r, w)), (o += t(i, r, s[w]));
                }
                return o;
            }
            if ("boolean" === e)
                return i.push(s ? 195 : 194), 1;
            if ("undefined" === e)
                return i.push(212, 0, 0), 3;
            throw new Error("Could not encode");
        })(i, r, t), e = new ArrayBuffer(s), h = new DataView(e), n = 0, a = 0, f = -1;
        0 < r.length && (f = r[0].t);
        for (var u, o = 0, c = 0, l = 0, w = i.length; l < w; l++) {
            if ((h.setUint8(a + l, i[l]), l + 1 === f)) {
                if (((o = (u = r[n]).u), (c = a + f), u.l)) {
                    for (var v = new Uint8Array(u.l), g = 0; g < o; g++) {
                        h.setUint8(c + g, v[g]);
                    }
                }
                else
                    u.h ? y(h, c, u.h) : void 0 !== u.o && h.setFloat64(c, u.o);
                (a += o), r[++n] && (f = r[n].t);
            }
        }
        let e3 = Array.from(new Uint8Array(e));
        e3.unshift(4);
        return new Uint8Array(e3).buffer;
    };
    const decode$1 = function (t) {
        t = t.slice(1);
        var i = new s(t), r = i.v();
        if (i.t === t.byteLength)
            return r;
        throw new Error(t.byteLength - i.t + " trailing bytes");
    };

    const _int32$1 = new Int32Array(2);
    new Float32Array(_int32$1.buffer);
    new Float64Array(_int32$1.buffer);
    const protocol = {
        9: "HANDSHAKE",
        10: "JOIN_ROOM",
        11: "ERROR",
        12: "LEAVE_ROOM",
        13: "ROOM_DATA",
        14: "ROOM_STATE",
        15: "ROOM_STATE_PATCH",
        16: "ROOM_DATA_SCHEMA",
        HANDSHAKE: 9,
        JOIN_ROOM: 10,
        ERROR: 11,
        LEAVE_ROOM: 12,
        ROOM_DATA: 13,
        ROOM_STATE: 14,
        ROOM_STATE_PATCH: 15,
        ROOM_DATA_SCHEMA: 16,
    };
    const _int32 = new Int32Array(2);
    const _float32 = new Float32Array(_int32.buffer);
    const _float64 = new Float64Array(_int32.buffer);
    const utf8Read = (bytes, offset, length) => {
        var string = "", chr = 0;
        for (var i = offset, end = offset + length; i < end; i++) {
            var byte = bytes[i];
            if ((byte & 0x80) === 0x00) {
                string += String.fromCharCode(byte);
                continue;
            }
            if ((byte & 0xe0) === 0xc0) {
                string += String.fromCharCode(((byte & 0x1f) << 6) | (bytes[++i] & 0x3f));
                continue;
            }
            if ((byte & 0xf0) === 0xe0) {
                string += String.fromCharCode(((byte & 0x0f) << 12) |
                    ((bytes[++i] & 0x3f) << 6) |
                    ((bytes[++i] & 0x3f) << 0));
                continue;
            }
            if ((byte & 0xf8) === 0xf0) {
                chr = ((byte & 0x07) << 18) |
                    ((bytes[++i] & 0x3f) << 12) |
                    ((bytes[++i] & 0x3f) << 6) |
                    ((bytes[++i] & 0x3f) << 0);
                if (chr >= 0x010000) {
                    // surrogate pair
                    chr -= 0x010000;
                    string += String.fromCharCode((chr >>> 10) + 0xd800, (chr & 0x3ff) + 0xdc00);
                }
                else {
                    string += String.fromCharCode(chr);
                }
                continue;
            }
            console.error("Invalid byte " + byte.toString(16));
            // (do not throw error to avoid server/client from crashing due to hack attemps)
            // throw new Error('Invalid byte ' + byte.toString(16));
        }
        return string;
    };
    const decoders = {
        int8: function int8(bytes, it) {
            return (decoders.uint8(bytes, it) << 24) >> 24;
        },
        uint8: function uint8(bytes, it) {
            return bytes[it.offset++];
        },
        int16: function int16(bytes, it) {
            return (decoders.uint16(bytes, it) << 16) >> 16;
        },
        uint16: function uint16(bytes, it) {
            return bytes[it.offset++] | (bytes[it.offset++] << 8);
        },
        int32: function int32(bytes, it) {
            return (bytes[it.offset++] |
                (bytes[it.offset++] << 8) |
                (bytes[it.offset++] << 16) |
                (bytes[it.offset++] << 24));
        },
        uint32: function uint32(bytes, it) {
            return decoders.int32(bytes, it) >>> 0;
        },
        float32: function float32(bytes, it) {
            return decoders.readFloat32(bytes, it);
        },
        float64: function float64(bytes, it) {
            return decoders.readFloat64(bytes, it);
        },
        int64: function int64(bytes, it) {
            var low = decoders.uint32(bytes, it);
            var high = decoders.int32(bytes, it) * Math.pow(2, 32);
            return high + low;
        },
        uint64: function uint64(bytes, it) {
            var low = decoders.uint32(bytes, it);
            var high = decoders.uint32(bytes, it) * Math.pow(2, 32);
            return high + low;
        },
        readFloat32: function readFloat32(bytes, it) {
            _int32[0] = decoders.int32(bytes, it);
            return _float32[0];
        },
        readFloat64: function readFloat64(bytes, it) {
            _int32[0] = decoders.int32(bytes, it);
            _int32[1] = decoders.int32(bytes, it);
            return _float64[0];
        },
        boolean: function boolean(bytes, it) {
            return decoders.uint8(bytes, it) > 0;
        },
        string: function string(bytes, it) {
            var prefix = bytes[it.offset++];
            var length;
            if (prefix < 0xc0) {
                // fixstr
                length = prefix & 0x1f;
            }
            else if (prefix === 0xd9) {
                length = decoders.uint8(bytes, it);
            }
            else if (prefix === 0xda) {
                length = decoders.uint16(bytes, it);
            }
            else if (prefix === 0xdb) {
                length = decoders.uint32(bytes, it);
            }
            var value = utf8Read(bytes, it.offset, length);
            it.offset += length;
            return value;
        },
        stringCheck: function stringCheck(bytes, it) {
            var prefix = bytes[it.offset];
            return (
            // fixstr
            (prefix < 0xc0 && prefix > 0xa0) ||
                // str 8
                prefix === 0xd9 ||
                // str 16
                prefix === 0xda ||
                // str 32
                prefix === 0xdb);
        },
        number: function number(bytes, it) {
            var prefix = bytes[it.offset++];
            if (prefix < 0x80) {
                // positive fixint
                return prefix;
            }
            else if (prefix === 0xca) {
                // float 32
                return decoders.readFloat32(bytes, it);
            }
            else if (prefix === 0xcb) {
                // float 64
                return decoders.readFloat64(bytes, it);
            }
            else if (prefix === 0xcc) {
                // uint 8
                return decoders.uint8(bytes, it);
            }
            else if (prefix === 0xcd) {
                // uint 16
                return decoders.uint16(bytes, it);
            }
            else if (prefix === 0xce) {
                // uint 32
                return decoders.uint32(bytes, it);
            }
            else if (prefix === 0xcf) {
                // uint 64
                return decoders.uint64(bytes, it);
            }
            else if (prefix === 0xd0) {
                // int 8
                return decoders.int8(bytes, it);
            }
            else if (prefix === 0xd1) {
                // int 16
                return decoders.int16(bytes, it);
            }
            else if (prefix === 0xd2) {
                // int 32
                return decoders.int32(bytes, it);
            }
            else if (prefix === 0xd3) {
                // int 64
                return decoders.int64(bytes, it);
            }
            else if (prefix > 0xdf) {
                // negative fixint
                return (0xff - prefix + 1) * -1;
            }
        },
        numberCheck: function numberCheck(bytes, it) {
            var prefix = bytes[it.offset];
            // positive fixint - 0x00 - 0x7f
            // float 32        - 0xca
            // float 64        - 0xcb
            // uint 8          - 0xcc
            // uint 16         - 0xcd
            // uint 32         - 0xce
            // uint 64         - 0xcf
            // int 8           - 0xd0
            // int 16          - 0xd1
            // int 32          - 0xd2
            // int 64          - 0xd3
            return prefix < 0x80 || (prefix >= 0xca && prefix <= 0xd3);
        },
        arrayCheck: function arrayCheck(bytes, it) {
            return bytes[it.offset] < 0xa0;
            // const prefix = bytes[it.offset] ;
            // if (prefix < 0xa0) {
            //   return prefix;
            // // array
            // } else if (prefix === 0xdc) {
            //   it.offset += 2;
            // } else if (0xdd) {
            //   it.offset += 4;
            // }
            // return prefix;
        },
        switchStructureCheck: function switchStructureCheck(bytes, it) {
            return (
            // previous byte should be `SWITCH_TO_STRUCTURE`
            bytes[it.offset - 1] === SWITCH_TO_STRUCTURE &&
                // next byte should be a number
                (bytes[it.offset] < 0x80 ||
                    (bytes[it.offset] >= 0xca && bytes[it.offset] <= 0xd3)));
        },
    };
    const Decoder = function (buffer, offset) {
        this._offset = offset;
        if (buffer instanceof ArrayBuffer) {
            this._buffer = buffer;
            this._view = new DataView(this._buffer);
        }
        else if (ArrayBuffer.isView(buffer)) {
            this._buffer = buffer.buffer;
            this._view = new DataView(this._buffer, buffer.byteOffset, buffer.byteLength);
        }
        else {
            throw new Error("Invalid argument");
        }
    };
    const utf8Read$1 = (view, offset, length) => {
        var string = "", chr = 0;
        for (var i = offset, end = offset + length; i < end; i++) {
            var byte = view.getUint8(i);
            if ((byte & 0x80) === 0x00) {
                string += String.fromCharCode(byte);
                continue;
            }
            if ((byte & 0xe0) === 0xc0) {
                string += String.fromCharCode(((byte & 0x1f) << 6) | (view.getUint8(++i) & 0x3f));
                continue;
            }
            if ((byte & 0xf0) === 0xe0) {
                string += String.fromCharCode(((byte & 0x0f) << 12) |
                    ((view.getUint8(++i) & 0x3f) << 6) |
                    ((view.getUint8(++i) & 0x3f) << 0));
                continue;
            }
            if ((byte & 0xf8) === 0xf0) {
                chr = ((byte & 0x07) << 18) |
                    ((view.getUint8(++i) & 0x3f) << 12) |
                    ((view.getUint8(++i) & 0x3f) << 6) |
                    ((view.getUint8(++i) & 0x3f) << 0);
                if (chr >= 0x010000) {
                    // surrogate pair
                    chr -= 0x010000;
                    string += String.fromCharCode((chr >>> 10) + 0xd800, (chr & 0x3ff) + 0xdc00);
                }
                else {
                    string += String.fromCharCode(chr);
                }
                continue;
            }
            throw new Error("Invalid byte " + byte.toString(16));
        }
        return string;
    };
    Decoder.prototype._array = function (length) {
        var value = new Array(length);
        for (var i = 0; i < length; i++) {
            value[i] = this._parse();
        }
        return value;
    };
    Decoder.prototype._map = function (length) {
        var key = "", value = {};
        for (var i = 0; i < length; i++) {
            key = this._parse();
            value[key] = this._parse();
        }
        return value;
    };
    Decoder.prototype._str = function (length) {
        var value = utf8Read$1(this._view, this._offset, length);
        this._offset += length;
        return value;
    };
    Decoder.prototype._bin = function (length) {
        var value = this._buffer.slice(this._offset, this._offset + length);
        this._offset += length;
        return value;
    };
    Decoder.prototype._parse = function () {
        var prefix = this._view.getUint8(this._offset++);
        var value, length = 0, type = 0, hi = 0, lo = 0;
        if (prefix < 0xc0) {
            // positive fixint
            if (prefix < 0x80) {
                return prefix;
            }
            // fixmap
            if (prefix < 0x90) {
                return this._map(prefix & 0x0f);
            }
            // fixarray
            if (prefix < 0xa0) {
                return this._array(prefix & 0x0f);
            }
            // fixstr
            return this._str(prefix & 0x1f);
        }
        // negative fixint
        if (prefix > 0xdf) {
            return (0xff - prefix + 1) * -1;
        }
        switch (prefix) {
            // nil
            case 0xc0:
                return null;
            // false
            case 0xc2:
                return false;
            // true
            case 0xc3:
                return true;
            // bin
            case 0xc4:
                length = this._view.getUint8(this._offset);
                this._offset += 1;
                return this._bin(length);
            case 0xc5:
                length = this._view.getUint16(this._offset);
                this._offset += 2;
                return this._bin(length);
            case 0xc6:
                length = this._view.getUint32(this._offset);
                this._offset += 4;
                return this._bin(length);
            // ext
            case 0xc7:
                length = this._view.getUint8(this._offset);
                type = this._view.getInt8(this._offset + 1);
                this._offset += 2;
                return [type, this._bin(length)];
            case 0xc8:
                length = this._view.getUint16(this._offset);
                type = this._view.getInt8(this._offset + 2);
                this._offset += 3;
                return [type, this._bin(length)];
            case 0xc9:
                length = this._view.getUint32(this._offset);
                type = this._view.getInt8(this._offset + 4);
                this._offset += 5;
                return [type, this._bin(length)];
            // float
            case 0xca:
                value = this._view.getFloat32(this._offset);
                this._offset += 4;
                return value;
            case 0xcb:
                value = this._view.getFloat64(this._offset);
                this._offset += 8;
                return value;
            // uint
            case 0xcc:
                value = this._view.getUint8(this._offset);
                this._offset += 1;
                return value;
            case 0xcd:
                value = this._view.getUint16(this._offset);
                this._offset += 2;
                return value;
            case 0xce:
                value = this._view.getUint32(this._offset);
                this._offset += 4;
                return value;
            case 0xcf:
                hi = this._view.getUint32(this._offset) * Math.pow(2, 32);
                lo = this._view.getUint32(this._offset + 4);
                this._offset += 8;
                return hi + lo;
            // int
            case 0xd0:
                value = this._view.getInt8(this._offset);
                this._offset += 1;
                return value;
            case 0xd1:
                value = this._view.getInt16(this._offset);
                this._offset += 2;
                return value;
            case 0xd2:
                value = this._view.getInt32(this._offset);
                this._offset += 4;
                return value;
            case 0xd3:
                hi = this._view.getInt32(this._offset) * Math.pow(2, 32);
                lo = this._view.getUint32(this._offset + 4);
                this._offset += 8;
                return hi + lo;
            // fixext
            case 0xd4:
                type = this._view.getInt8(this._offset);
                this._offset += 1;
                if (type === 0x00) {
                    this._offset += 1;
                    return void 0;
                }
                return [type, this._bin(1)];
            case 0xd5:
                type = this._view.getInt8(this._offset);
                this._offset += 1;
                return [type, this._bin(2)];
            case 0xd6:
                type = this._view.getInt8(this._offset);
                this._offset += 1;
                return [type, this._bin(4)];
            case 0xd7:
                type = this._view.getInt8(this._offset);
                this._offset += 1;
                if (type === 0x00) {
                    hi = this._view.getInt32(this._offset) * Math.pow(2, 32);
                    lo = this._view.getUint32(this._offset + 4);
                    this._offset += 8;
                    return new Date(hi + lo);
                }
                return [type, this._bin(8)];
            case 0xd8:
                type = this._view.getInt8(this._offset);
                this._offset += 1;
                return [type, this._bin(16)];
            // str
            case 0xd9:
                length = this._view.getUint8(this._offset);
                this._offset += 1;
                return this._str(length);
            case 0xda:
                length = this._view.getUint16(this._offset);
                this._offset += 2;
                return this._str(length);
            case 0xdb:
                length = this._view.getUint32(this._offset);
                this._offset += 4;
                return this._str(length);
            // array
            case 0xdc:
                length = this._view.getUint16(this._offset);
                this._offset += 2;
                return this._array(length);
            case 0xdd:
                length = this._view.getUint32(this._offset);
                this._offset += 4;
                return this._array(length);
            // map
            case 0xde:
                length = this._view.getUint16(this._offset);
                this._offset += 2;
                return this._map(length);
            case 0xdf:
                length = this._view.getUint32(this._offset);
                this._offset += 4;
                return this._map(length);
        }
        throw new Error("Could not parse");
    };
    const _decode = (buffer, offset) => {
        if (offset === void 0) {
            offset = 0;
        }
        var decoder = new Decoder(buffer, offset);
        var value = decoder._parse();
        if (decoder._offset !== buffer.byteLength) {
            throw new Error(buffer.byteLength - decoder._offset + " trailing bytes");
        }
        return value;
    };
    const decode = (buf) => {
        const bytes = Array.from(new Uint8Array(buf));
        const code = bytes[0];
        const type = protocol[code];
        if (code === protocol.ROOM_DATA) {
            const it_3 = { offset: 1 };
            const type = decoders.stringCheck(bytes, it_3)
                ? decoders.string(bytes, it_3)
                : decoders.number(bytes, it_3);
            const message = bytes.length > it_3.offset
                ? _decode(buf, it_3.offset)
                : null;
            return { type, message };
        }
        return { type, message: null };
    };

    const socket = () => WebSocketData.ws;
    const sendChannel$1 = new EventTarget();
    const WebSocketData = {
        ws: null,
    };
    const send = (key, data, type = "blueboat_SEND_MESSAGE", room = WebSocketData.ROOM) => {
        const obj = { type: 2, data: [type, { room, key, data }], options: { compress: true }, nsp: "/" };
        socket().send(encode(obj));
    };
    const send2D = (data) => {
        const msg = decode(data);
        if (msg.type === "MOVED")
            dispatchSend$1("MOVED", msg.message);
        socket().send(data);
    };
    function dispatchSend$1(eventName, data) {
        const event = new CustomEvent(eventName, { detail: data });
        sendChannel$1.dispatchEvent(event);
    }
    const onMessage = (msg) => {
        if ("Blockly" in window)
            return onMessage2D(msg);
        const dataB4 = decode$1(msg.data);
        console.warn(dataB4);
        if (dataB4.toString() === "3")
            setTimeout(() => send("PLAYER_LEADERBOARD_REQUESTED", undefined), 500);
        if (typeof dataB4 !== "object")
            return;
        if (dataB4.type !== 2)
            return;
        const { data, key } = dataB4.data[1];
        switch (key) {
            case "UPDATED_PLAYER_LEADERBOARD":
                WebSocketData["PLAYER_LEADERBOARD"] = data.items;
                break;
            case "PLAYER_JOINS_STATIC_STATE":
                WebSocketData["GAME_STATE"] = data;
                dispatchSend$1("GAME_STATE");
                break;
            case "IMPOSTER_MODE_PEOPLE":
            case "LAVA_RESULTS":
            case "DEFENDING_HOMEBASE_STATUS":
            case "AVAILABLE_HOMEBASE_UPGRADES":
            case "AVAILABLE_LAVA_UPGRADES":
                WebSocketData[key] = data;
                break;
            default: {
                if (!data || !data?.type)
                    return;
                WebSocketData["ROOM"] = dataB4.data[0].slice(8);
                WebSocketData[data.type] = data.value;
            }
        }
    };
    const onMessage2D = (msg) => {
        const data = decode(msg.data);
        switch (data.type) {
            case "AUTH_ID":
                dispatchSend$1("AUTH_ID", data.message);
                break;
            case "MESSAGE_FOR_DEVICE": {
                dispatchSend$1("MESSAGE_FOR_DEVICE", data.message);
                break;
            }
        }
    };
    const oldSend = WebSocket.prototype.send;
    WebSocket.prototype.send = function (data) {
        console.warn("[S]", data);
        WebSocketData.ws = this;
        this.removeEventListener("message", onMessage);
        this.addEventListener("message", onMessage);
        if ("Blockly" in window)
            return send2D(data);
        return oldSend.apply(this, arguments);
    };

    const sleep = (ms) => new Promise(res => setTimeout(res, ms));
    const randomId = () => "g_" + Date.now().toString(32) + "_" + Math.floor(Math.random() * 1e4).toString(32);
    const randomIds = (n) => Array.from({ length: n }, randomId);

    const getCorrectIndex = function (ovrQuestion) {
        const question = ovrQuestion ?? getQuestion();
        const correct = getCorrect(question.answers);
        const choices = getChoices();
        if (question.type === "text")
            return {
                index: -1,
                type: "input",
                text: correct.text,
                choice: correct,
                element: null
            };
        for (const choice of choices) {
            const text = choice.textContent;
            const img = choice.getElementsByTagName("img")[0]?.src ?? "";
            // create 'validate' parameter; add second loop here to check if the choice(element) is one of the question.answers
            // then add 1 to score if true, and return the end value (hopefully 4, however depends on question type)
            if ((correct.text || "") === text && (correct.image || "") === img) {
                return {
                    index: choices?.indexOf(choice),
                    type: "text",
                    text: correct.text ?? "",
                    choice: correct,
                    element: choice
                };
            }
        }
        return { type: null };
    };
    const getCorrect = function (choices) {
        for (const choice of choices ?? []) {
            if (choice.correct) {
                let type = "text";
                if (!choice.text)
                    type = "image";
                choice.type = type;
                return choice;
            }
        }
        return { type: null };
    };
    const getChoices = function () {
        return Array.from(document.querySelector(".sc-hKFoFe")?.children ?? []);
    };
    const getQuestion = function () {
        const questionList = WebSocketData.GAME_QUESTIONS;
        const details = getQuestionElement();
        if (!details || !questionList)
            return { type: null };
        let questions = [];
        for (const question of questionList) {
            if (details.img === question.image && details.text === question.text) {
                questions.push(question);
            }
        }
        for (const question of questions) {
            const data = getCorrectIndex(question);
            if (data?.type)
                return question;
        }
        return { type: null };
    };
    const getQuestionElement = function () {
        const question = document.querySelector(".notranslate.lang-en") || document.querySelector("img[alt=Question]");
        if (question) {
            const img = document.querySelector("img[alt=Question]")?.src ?? "";
            const text = question.textContent;
            return { img, text };
        }
        else
            return { type: null };
    };

    const keybinds = JSON.parse(localStorage.getItem("g_keybinds") || "{}");
    const sendChannel = new EventTarget();
    function dispatchSend(eventName, data) {
        const event = new CustomEvent(eventName, { detail: data });
        sendChannel.dispatchEvent(event);
    }
    const save = () => localStorage.setItem("g_keybinds", JSON.stringify(keybinds));
    const bind = (keybindId, key) => {
        const mode$1 = mode();
        if (!keybinds[mode$1])
            keybinds[mode$1] = {};
        keybinds[mode$1][keybindId] = key;
        save();
    };
    const unbind = (keybindId) => {
        const mode$1 = mode();
        if (!keybinds[mode$1])
            return;
        delete keybinds[mode$1][keybindId];
        save();
    };
    window.addEventListener("keydown", e => {
        const mode$1 = mode();
        const binds = keybinds[mode$1];
        for (const [keybindId, bindedKey] of Object.entries(binds)) {
            if (e.key === bindedKey) {
                dispatchSend("KEYBIND", { keybindId, key: e.key, mode: mode$1 });
                break;
            }
        }
    });

    const [optionClass, toggleClass, enabledClass, disabledClass, fullClass, dragbarClass, collapseClass, tClass, arrowClass, keyClass, buttonClass, openClass, svgClass, sliderClass] = randomIds(14);
    const build = {
        keybind: (data) => {
            const keybind = document.createElement("span");
            keybind.className = keyClass;
            keybind.setAttribute("keybind", data.keybindId ?? "");
            keybind.setAttribute("keybind-key", data.key ?? "");
            keybind.textContent = (data.key && data.keybindId) ? data.key : "[ ]";
            keybind.addEventListener("click", e => {
                if (kc.bindingKey)
                    return;
                keybind.textContent = "...";
                kc.bindingKey = true;
                kc.boundKey = (key) => {
                    unbind(data.keybindId);
                    bind(data.keybindId, key);
                    data.key = key;
                    keybind.textContent = key;
                    keybind.setAttribute("keybind-key", key);
                    kc.bindingKey = false;
                    kc.boundKey = (key) => { };
                };
                setTimeout(() => {
                    kc.bindingKey = false;
                    keybind.textContent = (data.key && data.keybindId) ? data.key : "[ ]";
                    kc.boundKey = (key) => { };
                }, 1000);
            });
            return keybind;
        },
        toggle: (key, data) => {
            const element = document.createElement("div");
            element.className = `${optionClass} ${toggleClass} ` + (data.value ? enabledClass : disabledClass);
            data.onKeybind = () => element.className = `${optionClass} ${toggleClass} ` + (data.value ? enabledClass : disabledClass);
            element.setAttribute("keybind", data.keybindId ?? "");
            const label = document.createElement("span");
            label.textContent = key;
            if (key.length > 21)
                label.style.fontSize = "17px";
            element.appendChild(label);
            if (data.keybindId)
                element.appendChild(build.keybind(data));
            return element;
        },
        button: (key, data) => {
            const element = document.createElement("div");
            element.className = `${optionClass} ${buttonClass}`;
            element.setAttribute("keybind", data.keybindId ?? "");
            const label = document.createElement("span");
            label.textContent = key;
            if (key.length > 21)
                label.style.fontSize = "17px";
            element.appendChild(label);
            if (data.keybindId)
                element.appendChild(build.keybind(data));
            return element;
        },
        slider: (key, data) => {
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
            if (data.colors) {
                const style = document.createElement("style");
                let gradient = "linear-gradient(90deg";
                let lastPercent = 0;
                for (const [color, percent] of Object.entries(data.colors)) {
                    if (lastPercent)
                        gradient += `, ${color} ${lastPercent}%`;
                    gradient += `, ${color} ${percent + lastPercent}%`;
                    lastPercent += percent;
                }
                style.innerHTML = `#${navId} .${input.className}::-moz-range-track {background: ${gradient}) !important;}`;
                element.appendChild(style);
            }
            return element;
        },
        nav: () => {
            if (document.querySelector(`#${navId}`))
                return document.querySelector(`#${navId}`);
            const nav = document.createElement("div");
            nav.id = navId,
                nav.style.display = "none";
            document.body.appendChild(nav);
            return nav;
        },
        style: () => {
            const s = document.querySelector(`style#${styleId}`);
            if (s)
                return;
            const style = document.createElement("style");
            style.id = styleId;
            style.innerHTML = ` @import url('https://fonts.googleapis.com/css2?family=Baloo+2&display=swap'); @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');
  #${navId}, .${widgetId} {position: fixed;width: 280px;height: 500px;background: #00000090;font-family: 'Baloo 2', cursive;border-radius: 3px;font-size: 19px;user-select: none;overflow-y: scroll;-ms-overflow-style: none;scrollbar-width: none;overscroll-behavior-y: none;z-index: 99999;}
  .${widgetId} {width:220px;height:fit-content;}
  #${navId}::-webkit-scrollbar {display: none;}
  #${navId} .${fullClass}, #${navId} .${optionClass}, #${navId} .${collapseClass}, .${widgetId} span[data-key] {display: block;width: 100%;height: 40px;line-height: 40px;color: white;text-align:center;}
  #${navId} .${buttonClass}.${disabledClass} {cursor:not-allowed !important;}
  #${navId} .${buttonClass}.${disabledClass} span {color:#444 !important;}
  #${navId} span.${fullClass}, .${widgetId} .${widgetTitle} {text-align: center;display:block;border-bottom-style: solid;border-bottom-width: 3px;animation: 7s infinite rainbowBC, 7s infinite rainbowC;}
  #${navId} .${optionClass} {position: relative;transition: 0.3s background;}
  #${navId} .${optionClass} span:first-child {color: white;transition: 0.2s color;padding-left: 20px;}
  #${navId} .${collapseClass} {transition: 0.3s height;}
  #${navId} .${collapseClass}:not(.${openClass}) {overflow-y: hidden;height: 40px;}
  #${navId} .${collapseClass}.${openClass} {height: auto;}
  #${navId} .${optionClass}.${toggleClass}.${disabledClass} span:first-child {color: #f00a;}
  #${navId} .${optionClass}.${toggleClass}.${enabledClass} span:first-child {color: #1f0e;}
  #${navId} .${optionClass}:hover, #${navId} .${collapseClass}:hover {background: #ffffff20;cursor: pointer;}
  #${navId} .${dragbarClass}:hover, .${widgetId} .${widgetTitle}:hover {cursor: move;}
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
        elements: (options, firstHeader = false, parentReference, parentKey) => {
            const elements = [];
            for (const [key, data] of Object.entries(options)) {
                switch (data?.type ?? "") {
                    case "header": {
                        const element = document.createElement("span");
                        element.className = `${fullClass} ${dragbarClass}`;
                        if (!firstHeader) {
                            element.innerHTML = `${key}<svg class="${svgClass}" fill="#8e3bff" width="24px" height="24px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="#8e3bff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1154.976 0 988.342 166.52c-60.448 60.447-63.436 153.418-15.4 220.646L670.359 689.751c-4.022 4.022-6.55 8.964-9.079 13.79-147.212-61.022-328.671-34.246-444.626 81.709l-98.027 98.141 418.31 418.195-520.129 520.129c-22.41 22.409-22.41 58.724 0 81.248 11.262 11.147 25.972 16.778 40.682 16.778s29.42-5.63 40.567-16.778l520.128-520.129 418.195 418.31 98.142-98.142c75.962-75.847 117.793-176.862 117.793-284.313 0-56.195-12.067-110.208-33.787-160.198 2.758-1.839 5.861-2.988 8.275-5.516l303.963-303.964c29.19 21.145 63.896 33.097 100.67 33.097 46.083 0 89.293-17.928 121.93-50.565L1920 764.909 1154.976 0Z" fill-rule="evenodd"></path> </g></svg>`;
                            const svg = element.querySelector("svg");
                            svg.addEventListener("click", e => {
                                svg.classList.toggle(enabledClass);
                                kc.pinned = !kc.pinned;
                            });
                            firstHeader = true;
                        }
                        else
                            element.textContent = key;
                        element.addEventListener("mousedown", mouseDown);
                        elements.push(element);
                        break;
                    }
                    case "toggle": {
                        const element = build.toggle(key, data);
                        element.addEventListener("click", e => {
                            if (e.target?.classList.contains("key"))
                                return;
                            element.classList.toggle(enabledClass);
                            element.classList.toggle(disabledClass);
                            if (parentReference && parentKey) {
                                const t = parentReference[parentKey].elements[key];
                                t.value = !t.value;
                            }
                            else
                                data.value = !data.value;
                            data.action?.();
                        });
                        elements.push(element);
                        break;
                    }
                    case "button": {
                        const element = build.button(key, data);
                        const clickEvent = function (e) {
                            if (e.target?.classList.contains("key"))
                                return;
                            data.action();
                        };
                        let lastState = null;
                        if (data.condition)
                            setInterval(() => {
                                const newState = data.condition?.();
                                if (newState !== lastState) {
                                    lastState = newState;
                                    element.removeEventListener("click", clickEvent);
                                    if (newState) {
                                        element.classList.remove(disabledClass);
                                        element.addEventListener("click", clickEvent);
                                    }
                                    else
                                        element.classList.add(disabledClass);
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
                        if (key.length > 21)
                            label.style.fontSize = "17px";
                        const subElements = document.createElement("div");
                        element.appendChild(arrow);
                        element.appendChild(label);
                        element.appendChild(subElements);
                        const r = build.elements(data.elements, firstHeader, options, key);
                        for (const e of r)
                            subElements.appendChild(e);
                        element.addEventListener("click", e => {
                            if (!e.target?.classList.contains(tClass))
                                return;
                            element.classList.toggle(openClass);
                        });
                        elements.push(element);
                        break;
                    }
                    case "slider": {
                        const element = build.slider(key, data);
                        element.querySelector("input").addEventListener("input", e => {
                            const input = e.target;
                            data.value = parseInt(input.value);
                            element.querySelector("span").textContent = `${key}: ${data.value}${data.numSuffix || ""}`;
                        });
                        elements.push(element);
                        break;
                    }
                }
            }
            return elements;
        }
    };

    const [navId, selectId, styleId, widgetId, widgetTitle] = randomIds(5);
    const pos = [0, 0, 0, 0, false];
    const kc = {
        pinned: false,
        bindingKey: false,
        boundKey: (key) => { }
    };
    let scale = 1, offsetX = 0, offsetY = 0, renderData = {};
    const render = (options) => {
        renderData = options;
        build.style();
        const n = build.nav();
        n.innerHTML = "";
        const elements = build.elements(options);
        for (const element of elements) {
            n.appendChild(element);
        }
        kc.pinned = false;
    };
    const updateScale = (sc) => {
        scale = Math.round(sc * 10) / 10;
        build.nav().style.transform = `scale(${scale})`;
        offsetX = Math.abs((280 - build.nav().offsetWidth) / 2);
        offsetY = Math.abs((500 - build.nav().offsetHeight) / 2);
        windowResize();
    };
    const windowResize = () => {
        const n = build.nav();
        if (window.innerWidth - offsetX < parseInt(n.style.left) + n.offsetWidth)
            n.style.left = "";
        n.style.right = -1 * offsetX + "px";
        if (window.innerHeight - offsetY < parseInt(n.style.top) + n.offsetHeight)
            n.style.top = "";
        n.style.bottom = -1 * offsetY + "px";
    };
    const mouseDown = e => { pos[2] = e.clientX; pos[3] = e.clientY; pos[4] = true; };
    const mouseUp = () => { pos[4] = false; };
    const mouseMove = e => {
        if (!pos[4])
            return;
        pos[0] = pos[2] - e.clientX;
        pos[1] = pos[3] - e.clientY;
        pos[2] = e.clientX;
        pos[3] = e.clientY;
        const n = build.nav();
        n.style.top = Math.max(-1 * offsetY, n.offsetTop - pos[1]) + "px";
        n.style.left = Math.max(-1 * offsetX, n.offsetLeft - pos[0]) + "px";
        windowResize();
    };
    window.addEventListener("mousedown", e => {
        if (Array.from(build.nav().querySelectorAll("*")).includes(e.target))
            return;
        if (!kc.pinned) {
            build.nav().style.display = "none";
            kc.bindingKey = false;
        }
        closeUI();
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
        if (build.nav().style.display === "") {
            if (e.key === "-")
                updateScale(Math.max(0.5, scale - 0.1));
            if (e.key === "=")
                updateScale(Math.min(1, scale + 0.1));
            if (kc.bindingKey) {
                if (["Escape", "Backspace"].includes(e.key))
                    kc.bindingKey = false;
                else
                    kc.boundKey(e.key);
            }
        }
        const keybindId = keybinds[e.key];
        if (keybindId) {
            function checkItem(item) {
                if (item.type === "toggle") {
                    if (item.keybindId === keybindId) {
                        item.value = !item.value;
                        item.action?.();
                        return true;
                    }
                }
                else if (item.type === "button") {
                    if (item.keybindId === keybindId) {
                        item.action?.();
                        return true;
                    }
                }
            }
            top: for (const item of Object.values(renderData)) {
                if (item.type === "collapse") {
                    for (const subItem of Object.values(item.elements)) {
                        if (checkItem(subItem))
                            break top;
                    }
                }
                else if (checkItem(item))
                    break top;
            }
        }
    });

    const buildUI = () => {
        if (document.querySelector(`#${selectId}`))
            return document.querySelector(`#${selectId}`);
        const ui = document.createElement("div");
        ui.id = selectId;
        ui.style.minHeight = document.querySelector(`#${navId}`).scrollHeight + "px";
        document.querySelector(`#${navId}`)?.appendChild(ui);
        document.querySelector(`#${navId}`)?.scrollTo(0, 0);
        return ui;
    };
    const closeUI = () => {
        document.querySelector(`#${selectId}`)?.remove();
    };
    function createSelectUI (options, callback) {
        const ui = buildUI();
        for (const [key, data] of Object.entries(options)) {
            const btn = build.button(key.replace(/{.+}/gi, ""), data);
            btn.addEventListener("click", () => {
                closeUI();
                callback(data._id);
            });
            ui.appendChild(btn);
        }
    }

    const answerClassicQuestion = () => {
        const firstQ = WebSocketData.GAME_QUESTIONS?.[classic["Auto Answer Config"].elements["Question Index"].value] || WebSocketData.GAME_QUESTIONS?.[0];
        send('QUESTION_ANSWERED', {
            questionId: firstQ._id,
            answer: getCorrect(firstQ.answers)._id,
        });
    };
    const buyPowerup = (id) => {
        send("POWERUP_PURCHASED", id);
    };
    const usePowerup = async (id) => {
        if (["Icer", "outnumbered", "Blurred Screen", "Giving", "Subtractor"].includes(id)) {
            if (!WebSocketData.PLAYER_LEADERBOARD) {
                send("PLAYER_LEADERBOARD_REQUESTED", undefined);
                await sleep(500);
            }
            const players = WebSocketData.PLAYER_LEADERBOARD ?? [];
            if (!players)
                return;
            createSelectUI(Object.fromEntries(players.map(p => [p.name + `{${p.id}}`, { type: "button", action: () => { }, _id: p.id }])), (_id) => {
                if (!_id)
                    return;
                send("POWERUP_ATTACK", {
                    name: id,
                    target: _id
                });
            });
        }
        else
            send("POWERUP_ACTIVATED", id);
    };
    const powerupMap = {
        "repurchasePowerups": "Rebooter",
        "minuteMoreEarnings": "Minute To Win It",
        "outnumbered": "Outnumbered",
        "Quad Upgrade": "Quadrader",
        "Blurred Screen": "Blur",
        "Clap Multiplier": "Clapinator",
        "Giving": "Gift"
    };
    const buyTheme = (id) => {
        if (WebSocketData.PURCHASED_THEMES?.includes(id))
            return;
        send("THEME_PURCHASED", id);
    };
    const setTheme = (id) => {
        send("THEME_APPLIED", id);
    };
    const classic = {
        "Answers": {
            type: "header"
        },
        "Auto Answer": {
            type: 'toggle', value: false,
            keybindId: "classic_auto_answer",
            action: async function () {
                answerClassicQuestion();
                await sleep(classic["Auto Answer Config"].elements["Delay"].value);
                if (this.value)
                    this.action.bind(this)();
            },
        },
        "Auto Answer Config": {
            type: "collapse", elements: {
                "Delay": {
                    type: "slider",
                    interval: [500, 250, 2500],
                    value: 1500,
                    numSuffix: "ms",
                    colors: {
                        "red": 20,
                        "orange": 20,
                        "lime": 60
                    }
                    // example input track gradient:
                    // linear-gradient(90deg, red 5%, orange 6%, orange 15%, lime 16%)
                },
                "Question Index": {
                    type: "slider",
                    interval: [0, 1, 4],
                    value: 0
                },
                "Success Rate": {
                    type: "slider",
                    interval: [0, 5, 100],
                    value: 100,
                    numSuffix: "%"
                }
            }
        },
        "Answer Correctly Once": {
            type: "button",
            action: answerClassicQuestion
        },
        "Highlight Answer": {
            type: "toggle", value: false,
            action: async function () {
                const answer = getCorrectIndex();
                if (answer && answer?.type === "text" && answer.index) {
                    const option = getChoices()?.[answer.index];
                    if (option) {
                        option.children[0].style.background = "dodgerblue";
                        option.children[0].style.color = "black";
                    }
                }
                await sleep(250);
                if (this.value)
                    this.action.bind(this)();
                else {
                    getChoices()?.forEach(option => {
                        option.children[0].style.background = "";
                        option.children[0].style.color = "";
                    });
                }
            }
        },
        "Hidden Answer": {
            type: "toggle", value: false,
            action: async function () {
                const answer = getCorrectIndex();
                if (answer?.type === "text" && answer.index)
                    document.title = `${answer.index + 1}lay Gimkit! - Enter game code here | Gimkit`;
                else
                    document.title = "Play Gimkit! - Enter game code here | Gimkit";
                await sleep(250);
                if (this.value)
                    this.action.bind(this)();
                else
                    document.title = "Play Gimkit! - Enter game code here | Gimkit";
            }
        },
        "Input Answer": {
            type: "toggle", value: false,
            action: async function () {
                const answer = getCorrectIndex();
                const input = (document.getElementsByTagName("form")[0]?.children[0] ?? {});
                if (answer?.type === "input" && input)
                    input.placeholder = answer.text;
                await sleep(250);
                if (this.value)
                    this.action.bind(this)();
                else {
                    const input = (document.getElementsByTagName("form")[0]?.children[0] ?? {});
                    input.placeholder = "Enter answer here...";
                }
            }
        },
        "Upgrades": {
            type: "header"
        },
        "Auto Upgrade": {
            type: "toggle", value: false,
            action: async function () {
                function purchase(upgradeName, level) {
                    send("UPGRADE_PURCHASED", {
                        upgradeName, level
                    });
                }
                let bal = WebSocketData.BALANCE ?? 0;
                const discount = WebSocketData.PERSONAL_ACTIVE_POWERUPS?.includes("discount") ? 0.75 : 1;
                const money = classic['Auto Upgrade Config'].elements['Money Per Question'].value;
                const multiplier = classic['Auto Upgrade Config'].elements['Multiplier'].value;
                const streak = classic['Auto Upgrade Config'].elements['Streak Bonus'].value;
                const insurance = classic['Auto Upgrade Config'].elements['Insurance'].value;
                if (money) {
                    const levels = WebSocketData.GAME_STATE.upgrades[0].levels;
                    const current = WebSocketData.UPGRADE_LEVELS.moneyPerQuestion;
                    const next = (levels[current]?.price ?? Infinity) * discount * (WebSocketData.UPGRADE_PRICING_DISCOUNT ?? 1);
                    if (bal >= next) {
                        purchase("Money Per Question", current + 1);
                        bal -= next;
                    }
                }
                if (multiplier) {
                    const levels = WebSocketData.GAME_STATE.upgrades[1].levels;
                    const current = WebSocketData.UPGRADE_LEVELS.multiplier;
                    const next = (levels[current]?.price ?? Infinity) * discount * (WebSocketData.UPGRADE_PRICING_DISCOUNT ?? 1);
                    if (bal >= next) {
                        purchase("Multiplier", current + 1);
                        bal -= next;
                    }
                }
                if (streak) {
                    const levels = WebSocketData.GAME_STATE.upgrades[2].levels;
                    const current = WebSocketData.UPGRADE_LEVELS.streakBonus;
                    const next = (levels[current]?.price ?? Infinity) * discount * (WebSocketData.UPGRADE_PRICING_DISCOUNT ?? 1);
                    if (bal >= next) {
                        purchase("Streak Bonus", current + 1);
                        bal -= next;
                    }
                }
                if (insurance) {
                    const levels = WebSocketData.GAME_STATE.upgrades[3].levels;
                    const current = WebSocketData.UPGRADE_LEVELS.insurance;
                    const next = (levels[current]?.price ?? Infinity) * discount * (WebSocketData.UPGRADE_PRICING_DISCOUNT ?? 1);
                    if (bal >= next) {
                        purchase("Insurance", current + 1);
                        bal -= next;
                    }
                }
                await sleep(500);
                if (this.value)
                    this.action.bind(this)();
            }
        },
        "Auto Upgrade Config": {
            type: "collapse", elements: {
                "Money Per Question": {
                    type: "toggle", value: true
                },
                "Multiplier": {
                    type: "toggle", value: true
                },
                "Streak Bonus": {
                    type: "toggle", value: true
                },
                "Insurance": {
                    type: "toggle", value: false
                }
            }
        },
        "Powerups": {
            type: "header"
        },
        "Buy All Powerups": {
            type: "button",
            action: async () => {
                const el = classic["Buy Specific Powerup"].elements;
                for (const data of Object.values(el)) {
                    data.action();
                    await sleep(100);
                }
            }
        },
        "Buy Specific Powerup": {
            type: "collapse", elements: {
                "Icer": {
                    type: "button",
                    condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Icer"),
                    action: () => {
                        buyPowerup("Icer");
                    }
                },
                "Rebooter": {
                    type: "button",
                    condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("repurchasePowerups"),
                    action: () => {
                        buyPowerup("repurchasePowerups");
                    }
                },
                "Minute To Win It": {
                    type: "button",
                    condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("minuteMoreEarnings"),
                    action: () => {
                        buyPowerup("minuteMoreEarnings");
                    }
                },
                "Outnumbered": {
                    type: "button",
                    condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("outnumbered"),
                    action: () => {
                        buyPowerup("outnumbered");
                    }
                },
                "Quadgrader": {
                    type: "button",
                    condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Quad Upgrade"),
                    action: () => {
                        buyPowerup("Quad Upgrade");
                    }
                },
                "Discounter": {
                    type: "button",
                    condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Discounter"),
                    action: () => {
                        buyPowerup("Discounter");
                    }
                },
                "Blur": {
                    type: "button",
                    condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Blurred Screen"),
                    action: () => {
                        buyPowerup("Blurred Screen");
                    }
                },
                "Clapinator": {
                    type: "button",
                    condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Clap Multiplier"),
                    action: () => {
                        buyPowerup("Clap Multiplier");
                    }
                },
                "Gift": {
                    type: "button",
                    condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Giving"),
                    action: () => {
                        buyPowerup("Giving");
                    }
                },
                "Shield": {
                    type: "button",
                    condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Shield"),
                    action: () => {
                        buyPowerup("Shield");
                    }
                },
                "Subtractor": {
                    type: "button",
                    condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Subtractor"),
                    action: () => {
                        buyPowerup("Subtractor");
                    }
                },
                "Mini Bonus": {
                    type: "button",
                    condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Mini Bonus"),
                    action: () => {
                        buyPowerup("Mini Bonus");
                    }
                },
                "Mega Bonus": {
                    type: "button",
                    condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Mega Bonus"),
                    action: () => {
                        buyPowerup("Mega Bonus");
                    }
                }
            }
        },
        "Use Specific Powerup": {
            type: "button",
            condition: () => WebSocketData.PURCHASED_POWERUPS?.filter(p => !WebSocketData.USED_POWERUPS?.includes(p)).length ?? -1 > 0,
            action: () => {
                const unused = WebSocketData.PURCHASED_POWERUPS?.filter(p => !WebSocketData.USED_POWERUPS?.includes(p));
                if (!unused)
                    return;
                createSelectUI(Object.fromEntries(unused.map(p => [powerupMap[p] || p, { type: "button", action: () => { }, _id: p }])), (_id) => {
                    if (!_id)
                        return;
                    usePowerup(_id);
                });
            }
        },
        "Themes": {
            type: "header"
        },
        "Buy All Themes": {
            type: "button",
            action: async () => {
                const el = classic["Set Specific Theme"].elements;
                const prior = WebSocketData.THEME ?? "Default";
                for (const data of Object.values(el)) {
                    data.action();
                    await sleep(100);
                }
                setTheme(prior);
            }
        },
        "Set Specific Theme": {
            type: "collapse", elements: {
                "Default": {
                    type: "button",
                    condition: () => WebSocketData.THEME !== "Default",
                    action: () => {
                        setTheme("Default");
                    }
                },
                "Night [$5]": {
                    type: "button",
                    condition: () => (WebSocketData.THEME !== "Night" && WebSocketData.PURCHASED_THEMES?.includes("Night")) || ((WebSocketData.BALANCE || 0) >= 5 && !WebSocketData.PURCHASED_THEMES?.includes("Night")),
                    action: () => {
                        buyTheme("Night");
                        setTheme("Night");
                    }
                },
                "Thanos [$15]": {
                    type: "button",
                    condition: () => (WebSocketData.THEME !== "Thanos" && WebSocketData.PURCHASED_THEMES?.includes("Thanos")) || ((WebSocketData.BALANCE || 0) >= 15 && !WebSocketData.PURCHASED_THEMES?.includes("Thanos")),
                    action: () => {
                        buyTheme("Thanos");
                        setTheme("Thanos");
                    }
                },
                "Ocean [$30]": {
                    type: "button",
                    condition: () => (WebSocketData.THEME !== "Ocean" && WebSocketData.PURCHASED_THEMES?.includes("Ocean")) || ((WebSocketData.BALANCE || 0) >= 30 && !WebSocketData.PURCHASED_THEMES?.includes("Ocean")),
                    action: () => {
                        buyTheme("Ocean");
                        setTheme("Ocean");
                    }
                },
                "Forest [$50]": {
                    type: "button",
                    condition: () => (WebSocketData.THEME !== "Forest" && WebSocketData.PURCHASED_THEMES?.includes("Forest")) || ((WebSocketData.BALANCE || 0) >= 50 && !WebSocketData.PURCHASED_THEMES?.includes("Forest")),
                    action: () => {
                        buyTheme("Forest");
                        setTheme("Forest");
                    }
                },
                "Sunset [$100]": {
                    type: "button",
                    condition: () => (WebSocketData.THEME !== "Sunset" && WebSocketData.PURCHASED_THEMES?.includes("Sunset")) || ((WebSocketData.BALANCE || 0) >= 100 && !WebSocketData.PURCHASED_THEMES?.includes("Sunset")),
                    action: () => {
                        buyTheme("Sunset");
                        setTheme("Sunset");
                    }
                },
                "Retro [$200]": {
                    type: "button",
                    condition: () => (WebSocketData.THEME !== "Retro" && WebSocketData.PURCHASED_THEMES?.includes("Retro")) || ((WebSocketData.BALANCE || 0) >= 200 && !WebSocketData.PURCHASED_THEMES?.includes("Retro")),
                    action: () => {
                        buyTheme("Retro");
                        setTheme("Retro");
                    }
                },
                "Pure Gold [$1t]": {
                    type: "button",
                    condition: () => (WebSocketData.THEME !== "Pure Gold" && WebSocketData.PURCHASED_THEMES?.includes("Pure Gold")) || ((WebSocketData.BALANCE || 0) >= 1e12 && !WebSocketData.PURCHASED_THEMES?.includes("Pure Gold")),
                    action: () => {
                        buyTheme("Pure Gold");
                        setTheme("Pure Gold");
                    }
                }
            }
        },
        "Misc": {
            type: "header"
        },
        "Set Claps (Endgame)": {
            type: "button",
            // condition: () => WebSocketData.GAME_STATUS === "endgame",
            action: () => {
                const claps = parseFloat(prompt("Enter the amount of claps you want to set") || "0");
                if (isNaN(claps))
                    return;
                send("CLAP", {
                    amount: claps
                });
            }
        },
        // "Kick Player": {
        //   type: "button",
        //   action: () => {}
        // },
        // "Gift Bot": {
        //   type: "button",
        //   action: () => {}
        // }
    };

    var defaultOptions = {
        "Default": {
            type: "header"
        },
        // "Hold key to open GUI": {
        //   type: "toggle",
        //   value: false
        // },
        // "Close GUI when button pressed": {
        //   type: "toggle",
        //   value: false
        // },
        // "Anti REDBOAT": {
        //   type: "toggle",
        //   value: true
        // }
    };

    const pardy = {
        "Answers": classic["Answers"],
        "Auto Answer": {
            type: "toggle", value: false,
            action: async function () {
                if (WebSocketData.PARDY_MODE_STATE?.[0].value.key === "questionStatus") {
                    if (WebSocketData.PARDY_MODE_STATE[0].value.value === "ask") {
                        await sleep(pardy["Auto Answer Config"].elements["Delay"].value);
                        answerClassicQuestion();
                        await sleep(500);
                    }
                }
                await sleep(10);
                if (this.value)
                    this.action.bind(this)();
            }
        },
        "Auto Answer Config": {
            type: "collapse", elements: {
                "Delay": {
                    type: "slider",
                    interval: [0, 250, 2500],
                    value: 0,
                    numSuffix: "ms",
                    colors: {
                        "orange": 50,
                        "lime": 50
                    }
                },
                "Question Index": classic["Auto Answer Config"].elements["Question Index"],
                "Success Rate": classic["Auto Answer Config"].elements["Success Rate"]
            }
        },
        "Answer Correctly Once": classic["Answer Correctly Once"],
        "Highlight Answer": classic["Highlight Answer"],
        "Hidden Answer": classic["Hidden Answer"],
        "Input Answer": classic["Input Answer"],
        "Misc": classic["Misc"],
        "Set Claps (Endgame)": classic["Set Claps (Endgame)"],
        // "Kick Player": classic["Kick Player"]
    };

    const buyItem = async (itemId, targetted) => {
        if (targetted) {
            if (!WebSocketData.IMPOSTER_MODE_PEOPLE) {
                send("IMPOSTER_MODE_REQUEST_PEOPLE");
                await sleep(500);
            }
            createSelectUI(Object.fromEntries(WebSocketData.IMPOSTER_MODE_PEOPLE?.filter(p => !p.votedOff).map(p => [p.name, { type: "button", action: () => { }, _id: p.id }]) ?? []), (_id) => {
                if (!_id)
                    return;
                send("IMPOSTER_MODE_PURCHASE", { item: itemId, on: _id });
            });
        }
        else
            send("IMPOSTER_MODE_PURCHASE", { item: itemId });
    };
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
            action: () => { }
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
            action: async function () {
                send("UPGRADE_PURCHASED", {
                    upgradeName: "Money Per Question",
                    level: 1
                });
                await sleep(250);
                if (this.value)
                    this.action.bind(this)();
            }
        },
        "Misc": classic["Misc"],
        "Set Claps (Endgame)": classic["Set Claps (Endgame)"],
        // "Kick Player": classic["Kick Player"]
    };

    const infinityMode = {
        "Answers": classic["Answers"],
        "Auto Answer": classic["Auto Answer"],
        "Auto Answer Config": classic["Auto Answer Config"],
        "Answer Correctly Once": classic["Answer Correctly Once"],
        "Highlight Answer": classic["Highlight Answer"],
        "Input Answer": classic["Input Answer"],
        "Upgrades": classic["Upgrades"],
        "Auto Upgrade": classic["Auto Upgrade"],
        "Auto Upgrade Config": classic["Auto Upgrade Config"],
        "Items": {
            type: "header"
        },
        "Buy All Items": {
            type: "button",
            action: async () => {
                const el = infinityMode["Buy Specific Item"].elements;
                for (const data of Object.values(el)) {
                    data.action();
                    await sleep(100);
                }
            }
        },
        "Buy Specific Item": {
            type: "collapse", elements: {
                "Soul Stone": {
                    type: "button",
                    condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Soul Stone"),
                    action: () => {
                        buyPowerup("Soul Stone");
                    }
                },
                "Time Stone": {
                    type: "button",
                    condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Time Stone"),
                    action: () => {
                        buyPowerup("Time Stone");
                    }
                },
                "Space Stone": {
                    type: "button",
                    condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Space Stone"),
                    action: () => {
                        buyPowerup("Space Stone");
                    }
                },
                "Mind Stone": {
                    type: "button",
                    condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Mind Stone"),
                    action: () => {
                        buyPowerup("Mind Stone");
                    }
                },
                "Reality Stone": {
                    type: "button",
                    condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Reality Stone"),
                    action: () => {
                        buyPowerup("Reality Stone");
                    }
                },
                "Power Stone": {
                    type: "button",
                    condition: () => !WebSocketData.PURCHASED_POWERUPS?.includes("Power Stone"),
                    action: () => {
                        buyPowerup("Power Stone");
                    }
                }
            }
        },
        "Use Specific Item": classic["Use Specific Powerup"],
        "Powerups": classic["Powerups"],
        "Buy All Powerups": classic["Buy All Powerups"],
        "Buy Specific Powerup": classic["Buy Specific Powerup"],
        "Use Specific Powerup": classic["Use Specific Powerup"],
        "Themes": classic["Themes"],
        "Buy All Themes": classic["Buy All Themes"],
        "Set Specific Theme": classic["Set Specific Theme"],
        "Misc": classic["Misc"],
        "Set Claps (Endgame)": classic["Set Claps (Endgame)"],
    };

    class Widget {
        title;
        element;
        header;
        offsetX = 0;
        offsetY = 0;
        pos = [0, 0, 0, 0, false];
        constructor(title, elements) {
            this.element = document.createElement("div");
            this.element.className = widgetId;
            this.element.style.top = "15px";
            this.element.style.left = "15px";
            this.title = title;
            this.clearElements();
            this.addElements(elements ?? {});
            window.addEventListener("resize", this.windowResize.bind(this));
            document.body.appendChild(this.element);
        }
        hide() {
            this.element.style.display = "none";
        }
        show() {
            this.element.style.display = "";
        }
        mouseDown(e) {
            this.pos[2] = e.clientX;
            this.pos[3] = e.clientY;
            this.pos[4] = true;
        }
        mouseUp() {
            this.pos[4] = false;
        }
        mouseMove(e) {
            if (!this.pos[4])
                return;
            this.pos[0] = this.pos[2] - e.clientX;
            this.pos[1] = this.pos[3] - e.clientY;
            this.pos[2] = e.clientX;
            this.pos[3] = e.clientY;
            this.element.style.top = Math.max(-1 * this.offsetY, this.element.offsetTop - this.pos[1]) + "px";
            this.element.style.left = Math.max(-1 * this.offsetX, this.element.offsetLeft - this.pos[0]) + "px";
            this.windowResize();
        }
        windowResize() {
            if (window.innerWidth - this.offsetX < parseInt(this.element.style.left) + this.element.offsetWidth)
                this.element.style.left = "";
            this.element.style.right = -1 * this.offsetX + "px";
            if (window.innerHeight - this.offsetY < parseInt(this.element.style.top) + this.element.offsetHeight)
                this.element.style.top = "";
            this.element.style.bottom = -1 * this.offsetY + "px";
        }
        addElements(elements) {
            for (const [key, text] of Object.entries(elements)) {
                const span = document.createElement("span");
                span.innerHTML = text;
                span.setAttribute("data-key", key);
                this.element.appendChild(span);
            }
        }
        updateElements(elements) {
            for (const [key, text] of Object.entries(elements)) {
                const span = this.element.querySelector(`span[data-key="${key}"]`);
                if (span)
                    span.innerHTML = text;
            }
        }
        removeElements(elements) {
            for (const [key, text] of Object.entries(elements)) {
                const span = this.element.querySelector(`span[data-key="${key}"]`);
                if (span)
                    span.remove();
            }
        }
        clearElements() {
            this.header = document.createElement("span");
            this.header.className = widgetTitle;
            this.header.innerHTML = this.title;
            this.element.innerHTML = "";
            this.element.appendChild(this.header);
            window.addEventListener("mouseup", this.mouseUp.bind(this));
            this.header.addEventListener("mousedown", this.mouseDown.bind(this));
            window.addEventListener("mousemove", this.mouseMove.bind(this));
        }
        destroy() {
            this.element.remove();
            window.removeEventListener("mouseup", this.mouseUp.bind(this));
            this.header.removeEventListener("mousedown", this.mouseDown.bind(this));
            window.removeEventListener("mousemove", this.mouseMove.bind(this));
            window.removeEventListener("resize", this.windowResize.bind(this));
        }
    }

    const widgets = {};
    const hidden = {
        ...classic,
        "Render Balance": {
            type: "toggle", value: false,
            action: async function () {
                if (!widgets.balance) {
                    widgets.balance = new Widget("Balance", {
                        "balance": "$0"
                    });
                    widgets.balance.hide();
                }
                if (this.value)
                    widgets.balance.show();
                else
                    widgets.balance.hide();
                widgets.balance.updateElements({
                    "balance": `$${(WebSocketData.BALANCE ?? 0).toLocaleString()}`
                });
                await sleep(50);
                if (this.value)
                    this.action.bind(this)();
            }
        }
    };

    const mode = () => { return WebSocketData.GAME_STATE.gameOptions.specialGameType[0]; };
    // needs modified to support 2D
    Object.freeze = function (n) { return n; };
    window.addEventListener("load", _ => {
        render(defaultOptions);
    });
    // window.decode = blueboatDecode;
    // window.encode = blueboatEncode;
    // window.wsdata = WebSocketData;
    // window.render = render;
    window.widgetClass = Widget;
    sendChannel$1.addEventListener('GAME_STATE', (e) => {
        e.detail;
        switch (mode()) {
            case "CLASSIC":
            case "RICH":
            case "DRAINED":
                render(classic);
                break;
            case "HIDDEN":
                render(hidden);
                break;
            case "PARDY":
                render(pardy);
                break;
            case "IMPOSTER":
                render(imposter);
                break;
            case "THANOS":
                render(infinityMode);
                break;
            default:
                render(classic);
                break;
        }
    });
    sendChannel.addEventListener("KEYBIND", (e) => {
        e.detail;
    });
    setInterval(() => {
        Array.from(document.body.children ?? []).forEach(e => {
            if (e.id === navId || e.className === widgetId)
                return;
            e.style.zIndex = "10";
        });
    }, 200);

    exports.mode = mode;

    return exports;

})({});
