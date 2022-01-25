import * as React from 'react'

export interface Action {
  content?: React.ReactNode
  onClick?: () => void
}

export interface SubmitBtnsProps {
  title?:React.ReactNode
  // style 自定义的样式
  style?: React.CSSProperties
  // className
  className?: string
  // prefixCls
  prefixCls: string
  hasInput?: boolean
  placeholder?:string
  action?: boolean
  textRef: any
   // actions 底部的操作
  actions: Array<Action>
  

  onChange: (value: string) => void
  
}
