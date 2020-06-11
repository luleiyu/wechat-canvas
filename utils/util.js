function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}


function encodeUTF8(s) {
  var i, r = [], c, x;
  for (i = 0; i < s.length; i++)
    if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
    else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
    else {
      if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
        c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
          r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
      else r.push(0xE0 + (c >> 12 & 0xF));
      r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
    };
  return r;
};
// 字符串加密成 hex 字符串
function sha1(s) {
  var data = new Uint8Array(encodeUTF8(s))
  var i, j, t;
  var l = ((data.length + 8) >>> 6 << 4) + 16, s = new Uint8Array(l << 2);
  s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
  for (t = new DataView(s.buffer), i = 0; i < l; i++)s[i] = t.getUint32(i << 2);
  s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
  s[l - 1] = data.length << 3;
  var w = [], f = [
    function () { return m[1] & m[2] | ~m[1] & m[3]; },
    function () { return m[1] ^ m[2] ^ m[3]; },
    function () { return m[1] & m[2] | m[1] & m[3] | m[2] & m[3]; },
    function () { return m[1] ^ m[2] ^ m[3]; }
  ], rol = function (n, c) { return n << c | n >>> (32 - c); },
    k = [1518500249, 1859775393, -1894007588, -899497514],
    m = [1732584193, -271733879, null, null, -1009589776];
  m[2] = ~m[0], m[3] = ~m[1];
  for (i = 0; i < s.length; i += 16) {
    var o = m.slice(0);
    for (j = 0; j < 80; j++)
      w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
        t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
        m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
    for (j = 0; j < 5; j++)m[j] = m[j] + o[j] | 0;
  };
  t = new DataView(new Uint32Array(m).buffer);
  for (var i = 0; i < 5; i++)m[i] = t.getUint32(i << 2);

  var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
    return (e < 16 ? "0" : "") + e.toString(16);
  }).join("");

  return hex;
};
function savePoster (val) {
  var that = this
  console.log(val)
  let img = val.img
  wx.downloadFile({
    url: img,
    success (res) {
      console.log(res)
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success(value) {
          console.log(value)
          if (val.type == 2) {
            wx.showToast({
              title: val.content,
              icon: 'none',
              mask: true
            })
          } else {
            wx.showModal({
              content: val.content,
              showCancel: false,
              confirmText: '好的',
              confirmColor: '#333',
              success: function(res) {
                if (res.confirm) {
                  console.log('999999')
                  console.log('用户点击确定');
                  /* 该隐藏的隐藏 */
                  that.setData({
                    maskHidden: false
                  })
                }
              },
              fail: function(res) {
                console.log(11111)
              }
            })
          }
        },
        fail(res) {
          // wx.showToast({
          //   title: '保存失败',
          //   icon: 'none',
          // })
       // 拒绝授权时，则进入手机设置页面，可进行授权设置
          if (res.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || res.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
            // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
            wx.showModal({
              title: '提示',
              content: '需要您授权保存相册',
              showCancel: false,
              success: modalSuccess => {
                wx.openSetting({
                  success(settingdata) {
                    console.log("settingdata", settingdata)
                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                      wx.showModal({
                        title: '提示',
                        content: '获取权限成功,再次点击按钮即可保存',
                        showCancel: false,
                      })
                    } else {
                      wx.showModal({
                        title: '提示',
                        content: '获取权限失败，将无法保存到相册哦~',
                        showCancel: false,
                      })
                    }
                  },
                  fail(failData) {
                    console.log("failData", failData)
                  },
                  complete(finishData) {
                    console.log("finishData", finishData)
                  }
                })
              }
            })
          }
        }
      })
    },
    fail: function (err) {
      console.log(err)
    },
    complete: function (msg) {
      console.log(msg)
    }
  })
}
function saveLocalPoster (val) {
  var that = this
  console.log(val)
  let img = val.img
  wx.saveImageToPhotosAlbum({
    filePath: img,
    success(value) {
      console.log(value)
      if (val.type == 2) {
        wx.showToast({
          title: val.content,
          icon: 'none',
          mask: true
        })
      } else {
        wx.showModal({
          content: val.content,
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function(res) {
            if (res.confirm) {
              console.log('999999')
              console.log('用户点击确定');
              /* 该隐藏的隐藏 */
              that.setData({
                maskHidden: false
              })
            }
          },
          fail: function(res) {
            console.log(11111)
          }
        })
      }
    },
    fail(res) {
      // wx.showToast({
      //   title: '保存失败',
      //   icon: 'none',
      // })
   // 拒绝授权时，则进入手机设置页面，可进行授权设置
      if (res.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || res.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
        // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
        wx.showModal({
          title: '提示',
          content: '需要您授权保存相册',
          showCancel: false,
          success: modalSuccess => {
            wx.openSetting({
              success(settingdata) {
                console.log("settingdata", settingdata)
                if (settingdata.authSetting['scope.writePhotosAlbum']) {
                  wx.showModal({
                    title: '提示',
                    content: '获取权限成功,再次点击按钮即可保存',
                    showCancel: false,
                  })
                } else {
                  wx.showModal({
                    title: '提示',
                    content: '获取权限失败，将无法保存到相册哦~',
                    showCancel: false,
                  })
                }
              },
              fail(failData) {
                console.log("failData", failData)
              },
              complete(finishData) {
                console.log("finishData", finishData)
              }
            })
          }
        })
      }
    }
  })
}
function shareFunction (options) {
  let orgId = wx.getStorageSync('orgId')
  let orgName = wx.getStorageSync('orgName') || ''
  let shareObj = {
    title: '见词能拼，见词会度，5分钟学会读故事，7天快速提升阅读力', // 默认是小程序的名称(可以写slogan等)
    path: '/pages/index/index?orgId=' + orgId, // 默认是当前页面，必须是以‘/’开头的完整路径
    // http://quxue-data.oss-cn-beijing.aliyuncs.com/activity-management/activity/share-page-2x.png
    imageUrl: options.imgUrl || 'http://quxue-data.oss-cn-beijing.aliyuncs.com/activity-management/activity/share-page-3x.png', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
    success: (res) => {
      console.log(res)
      if (res.errMsg == 'shareAppMessage:ok') {

      }
    },
    fail: (err) => {
      console.log(err)
      if (res.errMsg == 'shareAppMessage:fail cancel') {
        // 用户取消转发
      } else if (res.errMsg == 'shareAppMessage:fail') {
        // 转发失败，其中 detail message 为详细失败信息
      }
    },
    complete: (mes) => {
      console.log(mes)
    }
  }
  // 来自页面内的按钮的转发
  if(options.from == 'button') {
    var eData = options.target.dataset;
    console.log(eData.name);     // shareBtn
    // 此处可以修改 shareObj 中的内容
    shareObj.path = '/pages/index/index?orgId=' + orgId + '&orgName=' + orgName
  }
  return shareObj
}
module.exports = {
  formatTime: formatTime,
  formatLocation: formatLocation,
  sha1: sha1,
  savePoster: savePoster,
  shareFunction: shareFunction,
  saveLocalPoster: saveLocalPoster
}
