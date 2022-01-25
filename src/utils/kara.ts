
function _kara(): Promise<any> {
    return new Promise((resolve, reject) => {
      if ((<any>window).kara) {
        resolve((<any>window).kara);
        return;
      }
      document.addEventListener('JSSDKReady', function () {
        resolve((<any>window).kara);
      }, false);
    })
  } 
  
  function wrapper(fn: string, args: any = {}): Promise<any> {
    return _kara().then(k => {
      if (!Object.prototype.hasOwnProperty.call(k, fn)) {
        return Promise.reject(`${fn} 方法不存在`)
      }
      
      return new Promise((resolve, reject) => {
        let success = function(result: any) {
          console.log("result",result)
          resolve(result);
        }
        let fail = function(result: any) {
          reject(result);
        }
       
        let a = {...args, success, fail};
        k[fn]({...args, success, fail})
      })
    })
  }
  class Karas {
    _kara(): Promise<any> {
      return new Promise((resolve, reject) => {
        if ((<any>window).kara) {
          resolve((<any>window).kara);
          return;
        }
        document.addEventListener('JSSDKReady', function () {
          resolve((<any>window).kara);
        }, false);
      })
    }
  
    setTitle(title: string) {
      wrapper("setTitle", {
        title
      })
    }
    
    getToken() {
      return wrapper("getToken")
    }
  
    disableSwipeBackForIOS() {
      wrapper("disableSwipeBackForIOS")
    }

    setupRightMenuButton(title: string,color?:string,trigger?:()=>void) {
      wrapper("setupRightMenuButton", {
        title,
        color,
        trigger
      });
    }
    closePage() {
      wrapper("closePage")
    }
  
    sendNotification(name: string, info: Record<string, any>) {
      wrapper("sendNotification", {
        name,
        info
      })
    }

    registerNotification(name: string,trigger:any = {}){
      wrapper("registerNotification", {
        name,
        trigger
      })
    }

    getTicket(){
      return wrapper("getMobileTicket")
    }

    openURL(options:{url:string,tag?:string,title?:string,hideNavigationBar?:number,canBack?:number}){
      const { url,tag,title,hideNavigationBar,canBack } = options;
       wrapper("openURL", {
        url,
        tag,
        title,
        hideNavigationBar,
        canBack
      });
    }
    toast(message: string) {
      wrapper("showToast", {message})
    }
    loading(message: string = "") {
      wrapper("showLoading", {message});
    }
    hideLoading() {
      wrapper("hideLoading")
    }

    getCoordinate(args:any) {
      console.log("xxx",...args)
      wrapper("getCoordinate",args)
    }


    refreshToken() {
      return wrapper("refreshToken")
    }
  }
  
  export default new Karas();