import * as React from 'react'
import { render } from 'react-dom'
import { RecoilRoot } from 'recoil'
import registerServiceWorker from './registerServiceWorker'
import Root from '@/pages/index'
import Http from '@/fetch/http'
import Kara from 'ai-jssdk'
import listenKeybord from '@/utils/keyboard'
import Oauth from '@/stores/auth'
import { EventEmitter } from "fbemitter";


const init = () => {
  render(
    <RecoilRoot>
      <Root />
    </RecoilRoot>,
    document.getElementById("root")
  );
  listenKeybord();
  registerServiceWorker();
};

function bootstrap() {
  const appEnv = process.env.REACT_APP_ENV;

  if (window.location.search?.indexOf("access_token=") > -1) {
    let token = `${
      window.location.search.split("access_token=")[1].split("&")[0]
    }`;
    
    Http.setToken(token);
    init();
  } else {

    if(appEnv === 'uat'){
      Oauth.getToken().then(data => {
        if (data.resultCode === "000000") {
          let token = data.tokenInfo.token_type + " " + data.tokenInfo.access_token;
          Http.setToken(token);
          init();
        } else if ((data.resultCode = "999998")) {
        }
      });
      return
    }
    Kara.getToken().then(v => {
      Http.setToken(v.token)
      init()
    })
  }
  
  window.emitter = new EventEmitter();

  interceptor();
  Kara.setupRightMenuButton("");
}

const interceptor = () => {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    //Kara.disableSwipeBackForIOS();
  }
};

bootstrap();
