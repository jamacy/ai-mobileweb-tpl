import * as React from 'react'

export interface Action {
  content?: React.ReactNode
  onClick?: () => void
}

export interface RowProps {
  // title 标题
  title?: React.ReactNode
  // extra 额外的部分
  extra?: React.ReactNode
  // style 自定义的样式
  style?: React.CSSProperties
  // className
  className?: string
  action?: boolean
  // prefixCls
  prefixCls: string
  bottomBorder?:boolean
  // onExtraClick
  onExtraClick: () => void
}
