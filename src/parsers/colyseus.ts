const utf8Length = (str) => {
  var c = 0,
    length = 0;
  for (var i = 0, l = str.length; i < l; i++) {
    c = str.charCodeAt(i);
    if (c < 0x80) {
      length += 1;
    } else if (c < 0x800) {
      length += 2;
    } else if (c < 0xd800 || c >= 0xe000) {
      length += 3;
    } else {
      i++;
      length += 4;
    }
  }
  return length;
};

const utf8Length$1 = utf8Length;

const _int32$1 = new Int32Array(2);
const _float32$1 = new Float32Array(_int32$1.buffer);
const _float64$1 = new Float64Array(_int32$1.buffer);

const encoders = {
  utf8Write: function utf8Write(view, offset, str) {
    var c = 0;
    for (var i = 0, l = str.length; i < l; i++) {
      c = str.charCodeAt(i);
      if (c < 0x80) {
        view[offset++] = c;
      } else if (c < 0x800) {
        view[offset++] = 0xc0 | (c >> 6);
        view[offset++] = 0x80 | (c & 0x3f);
      } else if (c < 0xd800 || c >= 0xe000) {
        view[offset++] = 0xe0 | (c >> 12);
        view[offset++] = 0x80 | ((c >> 6) & 0x3f);
        view[offset++] = 0x80 | (c & 0x3f);
      } else {
        i++;
        c = 0x10000 + (((c & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
        view[offset++] = 0xf0 | (c >> 18);
        view[offset++] = 0x80 | ((c >> 12) & 0x3f);
        view[offset++] = 0x80 | ((c >> 6) & 0x3f);
        view[offset++] = 0x80 | (c & 0x3f);
      }
    }
  },
  int8: function int8$1(bytes, value) {
    bytes.push(value & 255);
  },
  uint8: function uint8$1(bytes, value) {
    bytes.push(value & 255);
  },
  int16: function int16$1(bytes, value) {
    bytes.push(value & 255);
    bytes.push((value >> 8) & 255);
  },
  uint16: function uint16$1(bytes, value) {
    bytes.push(value & 255);
    bytes.push((value >> 8) & 255);
  },
  int32: function int32$1(bytes, value) {
    bytes.push(value & 255);
    bytes.push((value >> 8) & 255);
    bytes.push((value >> 16) & 255);
    bytes.push((value >> 24) & 255);
  },
  uint32: function uint32$1(bytes, value) {
    var b4 = value >> 24;
    var b3 = value >> 16;
    var b2 = value >> 8;
    var b1 = value;
    bytes.push(b1 & 255);
    bytes.push(b2 & 255);
    bytes.push(b3 & 255);
    bytes.push(b4 & 255);
  },
  int64: function int64$1(bytes, value) {
    var high = Math.floor(value / Math.pow(2, 32));
    var low = value >>> 0;
    encoders.uint32(bytes, low);
    encoders.uint32(bytes, high);
  },
  uint64: function unit64$1(bytes, value) {
    var high = (value / Math.pow(2, 32)) >> 0;
    var low = value >>> 0;
    encoders.uint32(bytes, low);
    encoders.uint32(bytes, high);
  },
  float32: function float32$1(bytes, value) {
    encoders.writeFloat32(bytes, value);
  },
  float64: function float64$1(bytes, value) {
    encoders.writeFloat64(bytes, value);
  },
  writeFloat32: function writeFloat32(bytes, value) {
    _float32$1[0] = value;
    encoders.int32(bytes, _int32$1[0]);
  },
  writeFloat64: function writeFloat64(bytes, value) {
    _float64$1[0] = value;
    encoders.int32(bytes, _int32$1[0]);
    encoders.int32(bytes, _int32$1[1]);
  },
  boolean: function boolean$1(bytes, value) {
    return encoders.uint8(bytes, value ? 1 : 0);
  },
  string: function string$1(bytes, value) {
    // encode `null` strings as empty.
    if (!value) {
      value = "";
    }
    var length = utf8Length(value);
    var size = 0;
    // fixstr
    if (length < 0x20) {
      bytes.push(length | 0xa0);
      size = 1;
    } // str 8
    else if (length < 0x100) {
      bytes.push(0xd9);
      encoders.uint8(bytes, length);
      size = 2;
    } // str 16
    else if (length < 0x10000) {
      bytes.push(0xda);
      encoders.uint16(bytes, length);
      size = 3;
    } // str 32
    else if (length < 0x100000000) {
      bytes.push(0xdb);
      encoders.uint32(bytes, length);
      size = 5;
    } else {
      throw new Error("String too long");
    }
    encoders.utf8Write(bytes, bytes.length, value);
    return size + length;
  },
  number: function number$1(bytes, value) {
    if (isNaN(value)) {
      return number$1(bytes, 0);
    } else if (!isFinite(value)) {
      return number$1(
        bytes,
        value > 0 ? Number.MAX_SAFE_INTEGER : -Number.MAX_SAFE_INTEGER,
      );
    } else if (value !== (value | 0)) {
      bytes.push(0xcb);
      encoders.writeFloat64(bytes, value);
      return 9;
      // TODO: encode float 32?
      // is it possible to differentiate between float32 / float64 here?
      // // float 32
      // bytes.push(0xca);
      // writeFloat32(bytes, value);
      // return 5;
    }
    if (value >= 0) {
      // positive fixnum
      if (value < 0x80) {
        encoders.uint8(bytes, value);
        return 1;
      }
      // uint 8
      if (value < 0x100) {
        bytes.push(0xcc);
        encoders.uint8(bytes, value);
        return 2;
      }
      // uint 16
      if (value < 0x10000) {
        bytes.push(0xcd);
        encoders.uint16(bytes, value);
        return 3;
      }
      // uint 32
      if (value < 0x100000000) {
        bytes.push(0xce);
        encoders.uint32(bytes, value);
        return 5;
      }
      // uint 64
      bytes.push(0xcf);
      encoders.uint64(bytes, value);
      return 9;
    } else {
      // negative fixnum
      if (value >= -0x20) {
        bytes.push(0xe0 | (value + 0x20));
        return 1;
      }
      // int 8
      if (value >= -0x80) {
        bytes.push(0xd0);
        encoders.int8(bytes, value);
        return 2;
      }
      // int 16
      if (value >= -0x8000) {
        bytes.push(0xd1);
        encoders.int16(bytes, value);
        return 3;
      }
      // int 32
      if (value >= -0x80000000) {
        bytes.push(0xd2);
        encoders.int32(bytes, value);
        return 5;
      }
      // int 64
      bytes.push(0xd3);
      encoders.int64(bytes, value);
      return 9;
    }
  },
};

const encode = (() => {
  function __encode(bytes, defers, value) {
    var type = typeof value,
      i = 0,
      l = 0,
      hi = 0,
      lo = 0,
      length = 0,
      size = 0;
    if (type === "string") {
      length = utf8Length$1(value);
      // fixstr
      if (length < 0x20) {
        bytes.push(length | 0xa0);
        size = 1;
      } // str 8
      else if (length < 0x100) {
        bytes.push(0xd9, length);
        size = 2;
      } // str 16
      else if (length < 0x10000) {
        bytes.push(0xda, length >> 8, length);
        size = 3;
      } // str 32
      else if (length < 0x100000000) {
        bytes.push(0xdb, length >> 24, length >> 16, length >> 8, length);
        size = 5;
      } else {
        throw new Error("String too long");
      }
      defers.push({ _str: value, _length: length, _offset: bytes.length });
      return size + length;
    }
    if (type === "number") {
      // TODO: encode to float 32?
      // float 64
      if (Math.floor(value) !== value || !isFinite(value)) {
        bytes.push(0xcb);
        defers.push({ _float: value, _length: 8, _offset: bytes.length });
        return 9;
      }
      if (value >= 0) {
        // positive fixnum
        if (value < 0x80) {
          bytes.push(value);
          return 1;
        }
        // uint 8
        if (value < 0x100) {
          bytes.push(0xcc, value);
          return 2;
        }
        // uint 16
        if (value < 0x10000) {
          bytes.push(0xcd, value >> 8, value);
          return 3;
        }
        // uint 32
        if (value < 0x100000000) {
          bytes.push(0xce, value >> 24, value >> 16, value >> 8, value);
          return 5;
        }
        // uint 64
        hi = (value / Math.pow(2, 32)) >> 0;
        lo = value >>> 0;
        bytes.push(
          0xcf,
          hi >> 24,
          hi >> 16,
          hi >> 8,
          hi,
          lo >> 24,
          lo >> 16,
          lo >> 8,
          lo,
        );
        return 9;
      } else {
        // negative fixnum
        if (value >= -0x20) {
          bytes.push(value);
          return 1;
        }
        // int 8
        if (value >= -0x80) {
          bytes.push(0xd0, value);
          return 2;
        }
        // int 16
        if (value >= -0x8000) {
          bytes.push(0xd1, value >> 8, value);
          return 3;
        }
        // int 32
        if (value >= -0x80000000) {
          bytes.push(0xd2, value >> 24, value >> 16, value >> 8, value);
          return 5;
        }
        // int 64
        hi = Math.floor(value / Math.pow(2, 32));
        lo = value >>> 0;
        bytes.push(
          0xd3,
          hi >> 24,
          hi >> 16,
          hi >> 8,
          hi,
          lo >> 24,
          lo >> 16,
          lo >> 8,
          lo,
        );
        return 9;
      }
    }
    if (type === "object") {
      // nil
      if (value === null) {
        bytes.push(0xc0);
        return 1;
      }
      if (Array.isArray(value)) {
        length = value.length;
        // fixarray
        if (length < 0x10) {
          bytes.push(length | 0x90);
          size = 1;
        } // array 16
        else if (length < 0x10000) {
          bytes.push(0xdc, length >> 8, length);
          size = 3;
        } // array 32
        else if (length < 0x100000000) {
          bytes.push(0xdd, length >> 24, length >> 16, length >> 8, length);
          size = 5;
        } else {
          throw new Error("Array too large");
        }
        for (i = 0; i < length; i++) {
          size += __encode(bytes, defers, value[i]);
        }
        return size;
      }
      // fixext 8 / Date
      if (value instanceof Date) {
        var time = value.getTime();
        hi = Math.floor(time / Math.pow(2, 32));
        lo = time >>> 0;
        bytes.push(
          0xd7,
          0,
          hi >> 24,
          hi >> 16,
          hi >> 8,
          hi,
          lo >> 24,
          lo >> 16,
          lo >> 8,
          lo,
        );
        return 10;
      }
      if (value instanceof ArrayBuffer) {
        length = value.byteLength;
        // bin 8
        if (length < 0x100) {
          bytes.push(0xc4, length);
          size = 2;
        } // bin 16
        else if (length < 0x10000) {
          bytes.push(0xc5, length >> 8, length);
          size = 3;
        } // bin 32
        else if (length < 0x100000000) {
          bytes.push(0xc6, length >> 24, length >> 16, length >> 8, length);
          size = 5;
        } else {
          throw new Error("Buffer too large");
        }
        defers.push({ _bin: value, _length: length, _offset: bytes.length });
        return size + length;
      }
      if (typeof value.toJSON === "function") {
        return __encode(bytes, defers, value.toJSON());
      }
      var keys: string[] = [],
        key = "";
      var allKeys = Object.keys(value);
      for (i = 0, l = allKeys.length; i < l; i++) {
        key = allKeys[i];
        if (typeof value[key] !== "function") {
          keys.push(key);
        }
      }
      length = keys.length;
      // fixmap
      if (length < 0x10) {
        bytes.push(length | 0x80);
        size = 1;
      } // map 16
      else if (length < 0x10000) {
        bytes.push(0xde, length >> 8, length);
        size = 3;
      } // map 32
      else if (length < 0x100000000) {
        bytes.push(0xdf, length >> 24, length >> 16, length >> 8, length);
        size = 5;
      } else {
        throw new Error("Object too large");
      }
      for (i = 0; i < length; i++) {
        key = keys[i];
        size += __encode(bytes, defers, key);
        size += __encode(bytes, defers, value[key]);
      }
      return size;
    }
    // false/true
    if (type === "boolean") {
      bytes.push(value ? 0xc3 : 0xc2);
      return 1;
    }
    // fixext 1 / undefined
    if (type === "undefined") {
      bytes.push(0xd4, 0, 0);
      return 3;
    }
    throw new Error("Could not encode");
  }

  function _encode(value) {
    var bytes = [];
    var defers = [];
    var size = __encode(bytes, defers, value);
    var buf = new ArrayBuffer(size);
    var view = new DataView(buf);
    var deferIndex = 0;
    var deferWritten = 0;
    var nextOffset = -1;
    if (defers.length > 0) {
      nextOffset = defers[0]._offset;
    }
    var defer,
      deferLength = 0,
      offset = 0;
    for (var i = 0, l = bytes.length; i < l; i++) {
      view.setUint8(deferWritten + i, bytes[i]);
      if (i + 1 !== nextOffset) {
        continue;
      }
      defer = defers[deferIndex];
      deferLength = defer._length;
      offset = deferWritten + nextOffset;
      if (defer._bin) {
        var bin = new Uint8Array(defer._bin);
        for (var j = 0; j < deferLength; j++) {
          view.setUint8(offset + j, bin[j]);
        }
      } else if (defer._str) {
        encoders.utf8Write(view, offset, defer._str);
      } else if (defer._float !== undefined) {
        view.setFloat64(offset, defer._float);
      }
      deferIndex++;
      deferWritten += deferLength;
      if (defers[deferIndex]) {
        nextOffset = defers[deferIndex]._offset;
      }
    }
    // fix buggy DataView assignment
    for (const i in view) {
      new Uint8Array(buf)[i] = view[i];
    }
    return buf;
  }

  function encode(type, message) {
    const initialBytes = [13];
    if (typeof type === "string") {
      encoders.string(initialBytes, type);
    } else {
      encoders.number(initialBytes, type);
    }
    let arr;
    if (message !== undefined) {
      let encoded = _encode(message);
      arr = new Uint8Array(initialBytes.length + encoded.byteLength);
      arr.set(new Uint8Array(initialBytes), 0);
      arr.set(new Uint8Array(encoded), initialBytes.length);
    } else {
      arr = new Uint8Array(initialBytes);
    }
    return arr.buffer;
  }

  return encode;
})();

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
  var string = "",
    chr = 0;
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
      string += String.fromCharCode(
        ((byte & 0x0f) << 12) |
          ((bytes[++i] & 0x3f) << 6) |
          ((bytes[++i] & 0x3f) << 0),
      );
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
        string += String.fromCharCode(
          (chr >>> 10) + 0xd800,
          (chr & 0x3ff) + 0xdc00,
        );
      } else {
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
    return (
      bytes[it.offset++] |
      (bytes[it.offset++] << 8) |
      (bytes[it.offset++] << 16) |
      (bytes[it.offset++] << 24)
    );
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
    } else if (prefix === 0xd9) {
      length = decoders.uint8(bytes, it);
    } else if (prefix === 0xda) {
      length = decoders.uint16(bytes, it);
    } else if (prefix === 0xdb) {
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
      prefix === 0xdb
    );
  },
  number: function number(bytes, it) {
    var prefix = bytes[it.offset++];
    if (prefix < 0x80) {
      // positive fixint
      return prefix;
    } else if (prefix === 0xca) {
      // float 32
      return decoders.readFloat32(bytes, it);
    } else if (prefix === 0xcb) {
      // float 64
      return decoders.readFloat64(bytes, it);
    } else if (prefix === 0xcc) {
      // uint 8
      return decoders.uint8(bytes, it);
    } else if (prefix === 0xcd) {
      // uint 16
      return decoders.uint16(bytes, it);
    } else if (prefix === 0xce) {
      // uint 32
      return decoders.uint32(bytes, it);
    } else if (prefix === 0xcf) {
      // uint 64
      return decoders.uint64(bytes, it);
    } else if (prefix === 0xd0) {
      // int 8
      return decoders.int8(bytes, it);
    } else if (prefix === 0xd1) {
      // int 16
      return decoders.int16(bytes, it);
    } else if (prefix === 0xd2) {
      // int 32
      return decoders.int32(bytes, it);
    } else if (prefix === 0xd3) {
      // int 64
      return decoders.int64(bytes, it);
    } else if (prefix > 0xdf) {
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
        (bytes[it.offset] >= 0xca && bytes[it.offset] <= 0xd3))
    );
  },
};

const Decoder = function (buffer, offset) {
  this._offset = offset;
  if (buffer instanceof ArrayBuffer) {
    this._buffer = buffer;
    this._view = new DataView(this._buffer);
  } else if (ArrayBuffer.isView(buffer)) {
    this._buffer = buffer.buffer;
    this._view = new DataView(
      this._buffer,
      buffer.byteOffset,
      buffer.byteLength,
    );
  } else {
    throw new Error("Invalid argument");
  }
};
const utf8Read$1 = (view, offset, length) => {
  var string = "",
    chr = 0;
  for (var i = offset, end = offset + length; i < end; i++) {
    var byte = view.getUint8(i);
    if ((byte & 0x80) === 0x00) {
      string += String.fromCharCode(byte);
      continue;
    }
    if ((byte & 0xe0) === 0xc0) {
      string += String.fromCharCode(
        ((byte & 0x1f) << 6) | (view.getUint8(++i) & 0x3f),
      );
      continue;
    }
    if ((byte & 0xf0) === 0xe0) {
      string += String.fromCharCode(
        ((byte & 0x0f) << 12) |
          ((view.getUint8(++i) & 0x3f) << 6) |
          ((view.getUint8(++i) & 0x3f) << 0),
      );
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
        string += String.fromCharCode(
          (chr >>> 10) + 0xd800,
          (chr & 0x3ff) + 0xdc00,
        );
      } else {
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
  var key = "",
    value = {};
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
  var value,
    length = 0,
    type = 0,
    hi = 0,
    lo = 0;
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

export { encode, decode };