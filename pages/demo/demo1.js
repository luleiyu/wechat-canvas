const _wxml = (obj) => {
  return `
  <view class="report_box">
    <view class="main_box">
      <view class="user_avatar">
        <view class="user_head_img_div">
          <image class="user_head_img" made="widthFix" src="` + obj.headUrl + `"></image>
        </view>
      </view>
      <view class="data_box">
        <view class="out_box">
          <view class="out_day">
            <text class="number_data_shuju number_data_num1">` + obj.totalDay + `</text>
            <text class="day_img_danwei">天</text>
          </view>
          <text class="out_title">累计打卡</text>
        </view>
        <view class="out_box">
          <view class="out_day">
            <text class="number_data_shuju number_data_num2">` + obj.totalSay + `</text>
            <text class="day_img_danwei">次</text>
          </view>
          <text class="out_title">累计开口</text>
        </view>
        <view class="out_box">
          <view class="out_day">
            <text class="number_data_shuju number_data_num3">` + obj.totalWord + `</text>
            <text class="day_img_danwei">个</text>
          </view>
          <text class="out_title">解锁单词</text>
        </view>
      </view>
      <view class="listen_box">
        <view class="lis_left">
          <image
            src="` + obj.bookUrl + `"
            class="lis_image"></image>
        </view>
        <view class="listen_right">
          <text class="right_top">` + obj.bookName + `</text>
          <text class="right_middle">` + obj.studentName + `小朋友的跟读作品</text>
        </view>
      </view>
      <view class="cose_img_div">
        <image src="` + obj.codeUrl + `" class="codeUrl_img"></image>
        <text class="code_tips">扫码听作品</text>
      </view>
    </view>
  </view>
  `
};
let _style = (_w, _h, _scale, obj) => {
  let newW = _w * _scale;
  let newH = _h * _scale;
  let bookW = newW * 0.211;
  let headW = newW * 0.21;
  let codeW = newW * 0.24;
  let main_box_len = 10 * _scale;
  let headBorderLen = 8 * _scale;
  let num_txt_len = 14 * _scale;
  return {
    report_box: {
      backgroundColor: "#FFA70E",
      boxSizing: "border-box",
      width: newW,
      height: newH
    },
    main_box: {
      backgroundColor: "#fff",
      marginTop: (headW / 2) + main_box_len,
      marginRight: main_box_len,
      marginBottom: 0,
      marginLeft: main_box_len,
      height: newH - ((headW / 2) + main_box_len * 2),
      boxSizing: "border-box",
      borderRadius: (7.5 * _scale)
    },
    user_avatar: {
      textAlign: "center",
      width: headW + headBorderLen,
      height: headW + headBorderLen,
      marginTop: -(headW) / 2,
      marginLeft: (newW - headW - headBorderLen - main_box_len * 2) / 2,
      boxSizing: "border-box",
      borderRadius: (headW + headBorderLen) / 2,
      padding: headBorderLen / 2,
      backgroundColor: "#fff"
    },
    user_head_img_div: {
      width: headW,
      height: headW,
      borderRadius: headW / 2,
    },
    user_head_img: {
      width: headW,
      height: headW,
      borderRadius: headW / 2,
    },
    data_box: {
      marginTop: main_box_len * 2,
      flexDirection: 'row',
      justifyContent: "space-around",
      alignItems: "center",
    },
    out_box: {
      width: (newW - (20 * _scale)) * 0.30,
      height: (50 * _scale),
      textAlign: "center"
    },
    out_title: {
      color: "#999999",
      fontSize: (15 * _scale),
      height: (22 * _scale),
      textAlign: "center",
      marginTop: (5 * _scale),
      fontWeight: "bold"
    },
    out_day: {
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: "flex-end",
      height: (28 * _scale)
    },
    number_data_shuju: {
      color: "#FFA70E",
      fontSize: (20 * _scale),
      // width:((newW-20) * 0.30)*0.8,
      height: (28 * _scale),
      fontWeight: "bold"
    },
    number_data_num1: {
      width: obj.totalDay.toString().length * num_txt_len,
    },
    number_data_num2: {
      width: obj.totalSay.toString().length * num_txt_len,
    },
    number_data_num3: {
      width: obj.totalWord.toString().length * num_txt_len,
    },
    day_img_danwei: {
      fontSize: (12 * _scale),
      width: (18 * _scale),
      height: (21 * _scale),
      color: "#999999"
    },
    listen_box: {
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginTop: (25 * _scale),
      marginRight: (15 * _scale),
      marginBottom: 0,
      marginLeft: (15 * _scale),
      backgroundColor: "#F8F8F8",
      padding: (15 * _scale),
      // boxSizing: "border-box",
      borderRadius: (5 * _scale),

    },
    lis_left: {
      width: bookW,
      height: bookW,
      borderRadius: (10 * _scale),
      // boxSizing: "border-box",
    },
    lis_image: {
      width: bookW,
      height: bookW,
      borderRadius: (10* _scale),
      verticalAlign: "middle",
    },
    listen_right: {
      width: newW - (90 * _scale) - bookW,
      height: bookW,
      textAlign: "left",
    },
    right_top: {
      fontSize: (16 * _scale),
      fontWeight: "bold",
      color: "#333",
      height: (25 * _scale),
    },
    right_middle: {
      fontSize: (13 * _scale),
      color: "#999999",
      marginTop: 0,
      height: bookW - (27 * _scale),
    },
    cose_img_div: {
      textAlign: "center",
    },
    codeUrl_img: {
      width: 150,
      height: 150,
      marginTop: (10 * _scale),
      marginLeft: (newW - (80 * _scale) - codeW) / 2
    },
    code_tips: {
      height: (20 * _scale),
      fontSize: (14 * _scale),
      fontWeight: 500,
      color: "#000000",
      marginTop: (10 * _scale)
    }
  };
}

module.exports._wxml = _wxml;
module.exports._style = _style