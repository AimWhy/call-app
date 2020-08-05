import BaseCaller from './base'
import { Platform } from '../libs/platform'

const base = new BaseCaller()

class Core {
  constructor() {
    const plat = new Platform({})
    this.plat = plat.getCurrentPlatform()
    this.caller = null
    this.init()
  }

  static download({ channelId = 923, middleWareUrl, path }) {
    base.__download({ channelId, middleWareUrl, path })
  }

  loader() {
    const ZZCaller = require('../callers/' + this.plat).default
    this.caller = new ZZCaller()
    this.caller.init()
  }

  init() {
    this.loader()
  }

  /**
   * 端外主动调起app方法
   * tip1：通过一个对象传入
   * tip2：下面任意参数都非必填，默认调起首页（转转）
   * @param urlSearch：
   *        |- 参数openType：home首页（默认），detail详情页，order订单，mysell我卖出的，person个人中心，village小区，web页面
   *        |- 参数id：存放id或者url
   *        |- 其他任意参数均可（兼容新版调起协议）
   * @param channelId：渠道号
   * @param path:路径(兼容新版调起协议)
   * @param middleWareUrl：中转url，如空则直接跳转下载安装包或 App Store
   * @param callback：发起调起请求时的回调
   * @param success：调起成功的回调
   * @param fail：调起失败的回调
   */
  start(opts) {
    this.caller.wrap(
      this.caller.launch.bind(this.caller),
      Object.assign(
        {},
        {
          // iosScheme:'zhuanzhuan://',   //协议头
          // androidScheme:'zhuanzhuan://',     //协议头
          // appStore:'itms-apps://itunes.apple.com/us/app/zhuan-zhuan-kuai-ren-yi-bu/id1002355194?l=zh&ls=1&mt=8',
          // androidApk: 'https://app.zhuanzhuan.com/zz/redirect/download',
          // androidApk_deeplink:'https://app.zhuanzhuan.com/activity/deeplink/download/',
          targetApp: 'zz', // 目标App（zz: 主App, seller: 商家App）
          channelId: 923, //渠道号
          delay: 800, //触发下载的延时时间，低于16000可能会出现调起的同时触发下载
          middleWareUrl: '', //下载中转页,如不设置，将直接下载安装包或跳appstore
          wechatCheckInstallState: () => {}, //微信端初始化检测安装后的回调函数
          universal: false,
          download: true, // 默认吊起失败后，转入下载逻辑
        },
        opts
      )
    )
  }
}

window.CallApp = Core
export default Core
