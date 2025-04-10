function read32(addr){return Module.HEAP32[addr/4];}
function set32(addr,val){return Module.HEAP32[addr/4] = val;}
function read8(addr){return Module.HEAP8[addr];}
function set8(addr,val){return Module.HEAP32[addr] = val;}