//index.js
import drawQrcode from '../../utils/weapp.qrcode.js'
import upng from '../../utils/UPNG.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imageBase64: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getContext () {
    wx.createSelectorQuery().selectAll('#qrcode').boundingClientRect(function (rect) {
      console.log(rect[0].height)
      console.log(rect[0].width)
  }).exec()
    wx.createSelectorQuery().select('#qrcode').context(function(res){
      console.log(res.context) // 节点对应的 Context 对象。如：选中的节点是 <video> 组件，那么此处即返回 VideoContext 对象
    }).exec()
  },
  getFields () {
    let a = drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'myTwoQrcode',
      ctx: wx.createCanvasContext('myTwoQrcode'),
      text: 'https://github.com/yingye',
      // v1.0.0+版本支持在二维码上绘制图片
      image: {
        imageResource: '../../images/icon.png',
        dx: 70,
        dy: 70,
        dWidth: 60,
        dHeight: 60
      },
      callback (res) {
        console.log(res)
      }
    })
  },
  getHtmlNode () {
    let a = wx.createSelectorQuery().select('#qrcode')._selector
    console.log(a)
    wx.createSelectorQuery().select('#qrcode').node(function(res){
      console.log(res) // 节点对应的 Canvas 实例。
    }).exec()
  },
  onShow: function () {
    let self = this
    console.log(this)
    let a = drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      ctx: wx.createCanvasContext('myQrcode'),
      text: 'https://github.com/yingye',
      // v1.0.0+版本支持在二维码上绘制图片
      image: {
        imageResource: '../../images/icon.png',
        dx: 70,
        dy: 70,
        dWidth: 60,
        dHeight: 60
      },
      callback (res) {
        console.log(res)
        wx.canvasGetImageData({
          canvasId: 'myQrcode',
          x: 0,
          y: 0,
          width: 200,
          height: 200,
          success: (res) => {
            // 进行png编码
            console.log(res)
            let pngData = upng.encode([res.data.buffer], res.width, res.height)
            // 对png数据调用接口完成base64编码
            console.log(pngData)
            let base64 = wx.arrayBufferToBase64(pngData)
            console.log(base64)
            console.log(self)
            self.setData({
              imageBase64: 'data:image/jpeg;base64,'+base64
            })
            // ...
          }
        })
      }
    })
  }
})
