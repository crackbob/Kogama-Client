function read32(addr){return Module.HEAP32[addr/4];}
function set32(addr,val){return Module.HEAP32[addr/4] = val;}
function read8(addr){return Module.HEAP8[addr];}
function set8(addr,val){return Module.HEAP32[addr] = val;}

function readFloat32(addr){return Module.HEAPF32[addr/4];}
function setFloat32(addr,val){return Module.HEAPF32[addr/4] = val;}

function read16(addr){return Module.HEAP16[addr/2];}
function set16(addr,val){return Module.HEAP16[addr/2] = val;}

function createString(value){
    let ptr = Module._malloc(0xC+value.length*2);
    writeString(ptr,value);
    return ptr;
}

function writeString(ptr,str){set32(ptr+0x8,str.length);for(let i = 0;i<str.length*2;i+=2){set16(ptr+0xC+i,str.charCodeAt(i/2))}}