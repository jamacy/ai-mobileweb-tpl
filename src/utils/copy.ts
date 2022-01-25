import { Toast } from 'antd-mobile'
export function copyToClipboard(textToCopy:string) {
    let textArea : any;
  
    function isOS() {
      //can use a better detection logic here
      return navigator.userAgent.match(/ipad|iphone/i);
    }
  
    function createTextArea(text:string) {
      textArea = document.createElement('textArea');
      textArea.readOnly = true;
      textArea.contentEditable = true;
      textArea.value = text;
      document.body.appendChild(textArea);
    }
  
    function selectText() {
      let range:any, selection:any;
  
      if (isOS()) {
        range = document.createRange();
        range.selectNodeContents(textArea);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        textArea.setSelectionRange(0, 999999);
      } else {
        textArea.select();
      }
    }
  
    function copyTo() {
      let r = document.execCommand('copy');
      console.log("rrr",r)
      if (r) {
      Toast.info("已成功复制到剪贴板");
      }
      document.body.removeChild(textArea);
    }
  
    createTextArea(textToCopy);
    selectText();
    copyTo();
  }
  
  export const copyText = (text:string) => {
    // 数字没有 .length 不能执行selectText 需要转化成字符串
    const textString = text.toString();
    let input = document.querySelector('#copy-input') as HTMLInputElement;
    if (!input) {
      input = document.createElement('input') as HTMLInputElement;
      input.id = "copy-input";
      (input as any).readOnly = "readOnly";        // 防止ios聚焦触发键盘事件
      input.style.position = "absolute";
      input.style.left = "-1000px";
      input.style.zIndex = "-1000";
      document.body.appendChild(input)
    }
  
    input.value = textString;
    // ios必须先选中文字且不支持 input.select();
    selectText(input, 0, textString.length);
    if (document.execCommand('copy')) {
      let r = document.execCommand('copy');
      alert('已复制到粘贴板' + r);
  
    }else {
      console.log('不兼容');
    }
    input.blur();
  
    // input自带的select()方法在苹果端无法进行选择，所以需要自己去写一个类似的方法
    // 选择文本。createTextRange(setSelectionRange)是input方法
    function selectText(textbox:any, startIndex:any, stopIndex:any) {
      if (textbox.createTextRange) {//ie
        const range = textbox.createTextRange();
        range.collapse(true);
        range.moveStart('character', startIndex);//起始光标
        range.moveEnd('character', stopIndex - startIndex);//结束光标
        range.select();//不兼容苹果
      } else {//firefox/chrome
        textbox.setSelectionRange(startIndex, stopIndex);
        textbox.focus();
      }
    }
  };
  