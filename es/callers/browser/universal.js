import "core-js/modules/es.array.concat";
export default function (opt) {
  var __SCHEMA_PATH = opt.__SCHEMA_PATH;
  var path = /^(zzcheck)/.test(__SCHEMA_PATH) ? 'check' : /^(zhuanzhuanseller)/.test(__SCHEMA_PATH) ? 'seller' : 'zhuanzhuan';
  location.href = "https://mjump.zhuanzhuan.com/".concat(path, "/index.html?path=").concat(__SCHEMA_PATH);
}