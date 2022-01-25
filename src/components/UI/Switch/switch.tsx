import * as React from 'react'
import ClassNames from 'classnames'
import { SwitchProps } from './interface'

import './style/index.scss'

const noop = () => {}

const defaultProps: SwitchProps = {
  disabled: false,
  checked: false,
  onChange: noop,
  prefixCls: 'ai--switch',
  color: '#FF8928',
  platform: 'ios',
  text: ''
}

const getClassName = ({ checked, disabled, prefixCls, platform }: SwitchProps) => {
  return ClassNames(prefixCls, `${prefixCls}-checked-${platform}`, {
    [`${prefixCls}-checked`]: checked,
    [`${prefixCls}-disabled`]: disabled
  })
}

const handleChange = (e: React.ChangeEvent<HTMLInputElement>, { onChange }: SwitchProps) => {
  const checked = e.target.checked
  onChange(checked)
}

const Switch: React.FC<SwitchProps> & { defaultProps: Partial<SwitchProps> } = props => {
  const { prefixCls, checked, color, platform,text } = props
  const classStr = getClassName(props)
  let style: any = {}
  if (checked) {
    style.backgroundColor = color
  }
  return (
    <div className={classStr}>
      <div className={`${prefixCls}-checkbox-${platform}`} style={style} >
        {text && <i>{text}</i>}
      </div>
     
      <input
        type="checkbox"
        checked={checked}
        onChange={e => handleChange(e, props)}
        className={`${prefixCls}-input`}
        value= {'1'}
      />
    </div>
  )
}

Switch.defaultProps = defaultProps

export default Switch
