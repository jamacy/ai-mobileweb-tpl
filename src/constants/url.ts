/**
 * @description 接口地址统一管理
 */

const version: string  = 'v1.0.0' 

const GET_TOKEN: string = `${version}/auth/mobile/authorize/getToken`; // 获取token

const GET_CURRENT_STAFF: string = `/account/employee/getCurrentStaff`; //获取员工信息



export {
    GET_TOKEN,
    GET_CURRENT_STAFF
}
