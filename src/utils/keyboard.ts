
enum Device {
  ios,
  android,
  unknown
}

let isReset = true; //是否归位
// 判断设备类型
function getDevice() {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {return Device.android;}
  if (isiOS) { return Device.ios; }
  return Device.unknown;
}

function listenKeybordIOS() {
  document.body.addEventListener('focusin', () => {
    // 软键盘弹出的事件处理
    isReset = false;
  });
  document.body.addEventListener('focusout', () => {
    // 软键盘收起的事件处理
    isReset = true;
    setTimeout(() => {
      // 当焦点在弹出层的输入框之间切换时先不归位
      if (isReset) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        }); // 失焦后强制让页面归位
      }
    }, 300);
  });
}

function listenKeybordAndroid() {
  window.onresize = function () {
    let h =  100
    // 键盘弹起与隐藏都会引起窗口的高度发生变化
    let resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (resizeHeight < h) {
      // 当软键盘弹起，在此处操作
      isReset = false;
    } else {
      // 当软键盘收起，在此处操作
      isReset = true;
      setTimeout(() => {
        if (isReset) {
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          }); // 失焦后强制让页面归位
        }
      }, 300);
    }
  }
}

// 监听输入框的软键盘弹起和收起事件
function listenKeybord() {
  let device = getDevice();
  if (device == Device.ios) {
    listenKeybordIOS();
  }
  if (device == Device.android) {
    listenKeybordAndroid();
  }
}

export default listenKeybord;