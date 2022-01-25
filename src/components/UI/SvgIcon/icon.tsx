import * as React from 'react'
import './index.scss'


interface IProps {
    type: string;
    prefixCls?: string
    className?: string
}

const defaultProps: IProps = {
    type: 'ai',
    prefixCls: 'ai-svg-icon',
    className: ''
}

const SvgIcon: React.FC<IProps> = props => {
  const { type, prefixCls, className } = props
  const classStr = prefixCls
  return  <img src={type} className = {`${classStr} ${className}`} alt={type}/>  
}

SvgIcon.defaultProps = defaultProps

export default SvgIcon
