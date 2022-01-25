import * as React from 'react'
import ClassNames from 'classnames'
import { ButtonProps } from './interface'
import './style/index.scss'

const defaultProps: ButtonProps = {
  disabled: false,
  loading: false,
  size: 'normal',
  prefixCls: 'ai--btn',
  type: 'default'
}

const getClassName = ({ className, loading, disabled, type, size, prefixCls }: ButtonProps) => {
 
  const classStr = ClassNames(prefixCls, className, {
    [`${prefixCls}-warning`]: type === 'warning',
    [`${prefixCls}-primary`]: type === 'primary',
    [`${prefixCls}-default`]: type === 'default',
    [`${prefixCls}-ghost`]: type === 'ghost',
    [`${prefixCls}-large`]: size === 'large',
    [`${prefixCls}-normal`]: size === 'normal',
    [`${prefixCls}-small`]: size === 'small',
    [`${prefixCls}-loading`]: loading,
    [`${prefixCls}-disabled`]: disabled
  })
  return classStr
}

//
const Button: React.FC<ButtonProps> & { defaultProps: Partial<ButtonProps> } = props => {
  const { style, onClick, disabled, prefixCls, children } = props
  return (
    <div className={`${prefixCls}-button_btn`}>
      <a
        role="button"
        onClick={disabled ? undefined : onClick}
        className={getClassName(props)}
        style={style}
      // disabled={disabled}
      >
        <span>{children}</span>
      </a>
    </div>
  )
}
Button.defaultProps = defaultProps

export default Button
