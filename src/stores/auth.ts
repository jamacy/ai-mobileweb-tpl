import "whatwg-fetch";
import Kara from 'ai-jssdk';
import envConfig from '@/config'
import { GET_TOKEN } from '@/constants/url'

enum Types {
  RES_TYPE = "token",
  SCOPE = "all"
}

interface Options {
	statusCode: number
	message: string
	status?: string
}

export class HttpErrorResponse {

  readonly statusCode: number
  readonly message: string
  readonly status?: string
  

  constructor(
    options: Options
  ){
    const { status, message, statusCode } = options
    this.message = message
    this.statusCode = statusCode
    this.status = status
    
  }
}


class Oauth {
  
    private  redirectURI:string;
    private  ticket: string;
    private  ticketKey: string;

    
    constructor(
      private  clientId: string = envConfig.CLIENT_ID,
      private  scope: string = Types.SCOPE,
      private  responseType: string = Types.RES_TYPE
    ){}

    get redirectURL(){
        this.redirectURI = `${location.origin}${process.env.PUBLIC_URL}`;
        return this.redirectURI
    }
    
    getMobileTicket(){
      return new Promise((resolve)=>{
        Kara.getTicket().then(result=>{
          resolve(result);
        })
      })
    }

    private handleError(res: HttpErrorResponse) {
      return new HttpErrorResponse(res)
    }

    async getToken():Promise<any> {
      let result : any = await this.getMobileTicket();
      this.ticket = decodeURIComponent(result.ticket);
      this.ticketKey = decodeURIComponent(result.ticketKey);
      
      return fetch(
        envConfig.REACT_APP_GATEWAY + GET_TOKEN,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: this.clientId,
            redirect_uri: this.redirectURL,
            scope: this.scope,
            response_type: this.responseType,
            ticket: this.ticket,
            ticketKey: this.ticketKey,
          }),
          }
        )
        .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              this.handleError({ 
                statusCode: res.status, 
                status: res.statusText,
                message: `授权失败[status: ${res.status}]`
              })
            }
            return res
          })
          .catch((e) => {
            this.handleError({ 
              statusCode:  999998, 
              message:`网络异常`
            })
          })
          .then((data) => {
            if (!!data.error) {
              this.handleError({ 
                statusCode: 999999, 
                message: data.error_description
              })
            }
            return data;
          });
      }
};

export default new Oauth()



