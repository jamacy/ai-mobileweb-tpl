import Http, { Message } from '@/fetch/http'
import envConfig from '@/config'
import {
  GET_CURRENT_STAFF,
} from '@/constants/url'
Http.setBase(envConfig.REACT_APP_GATEWAY)

/**
 * 获取员工信息
 * @param
 */
 export const queryCurrentStaff = () => Message(GET_CURRENT_STAFF).jsonHeader().get()