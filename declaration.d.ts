// scss 模块化
declare module "*.scss"{
    const res: any;
    export default res;
}

declare interface Window {
    onLoad: () => void,
    emitter:any
}


declare module "react-date-range"
declare module "react-daterange-picker"
declare module "lodash.isempty"
declare module "react-safe-area-component"
declare module "rc-form"
declare module "ai-city-select"
declare module "ramda"



/* 环境变量 */
type EnvConfig = {
    ENV_TYPE: 'development' | 'uat' | 'production';
    REACT_APP_GATEWAY: string;
    PREVIEW_ACCESS_KEY?: string;
    PREVIEW_SECRET_KEY?:string;
    CLIENT_ID?: string;
  }