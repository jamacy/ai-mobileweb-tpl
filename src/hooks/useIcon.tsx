import * as React from 'react'
import { Icon } from '@components/UI'
import { ApplyStatus } from '@models/seal'

export const IconSet = {
    WAITING : "#1784FC",
    PROCESSING : "#FF9F57",
    DONE:"#999999",
    PC_PASSED: "#9C9C9C",
    USER_PASSED:"#FF533F",
    SERVER_PASSED: "#9C9C9C"
}
const useIcon = ( status:number | null = null )=>{
    switch (status) {
    case ApplyStatus.WAITING:
        return <span style={{color:IconSet.WAITING}}>未处理</span>
    case ApplyStatus.PROCESSING:
        return <span style={{color:IconSet.PROCESSING}}>处理中</span>
    case ApplyStatus.DONE:
        return <span style={{color:IconSet.DONE}}>处理完成</span>
    case ApplyStatus.PC_PASSED:
        return <span style={{color:IconSet.PC_PASSED}}>过号</span>
    case ApplyStatus.USER_PASSED:
        return <span style={{color:IconSet.USER_PASSED}}>用户取消</span>
    case ApplyStatus.SERVER_PASSED:
        return <span style={{color:IconSet.SERVER_PASSED}}>系统过号</span>
    default:
        return null
    }
}

export default useIcon