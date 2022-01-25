import * as React from 'react'
import ClassNames from 'classnames'
import { RowProps } from './interface'
import { Icon } from '@/components/UI'

import './index.scss'

const noop = () => {}

const defaultProps: RowProps = {
  prefixCls: 'ai--row',
  onExtraClick: noop,
  action: false,
  bottomBorder: true
}

const Row: React.FC<RowProps> & { defaultProps: Partial<RowProps> } = props => {
  const { prefixCls, title, extra, action, className, style, bottomBorder,onExtraClick } = props
  const classStr = ClassNames(prefixCls, className)
  let styleCopy = style || {}
  const headerExtraStr = ClassNames({
    [`${prefixCls}-no-border`]: bottomBorder === false,
  })
  return (
    <div className={classStr} style={styleCopy}>
      {title ? (
        <div className={`${prefixCls}-header ${headerExtraStr} `}>
          <div className={`${prefixCls}-title`}>{title}</div>
          {extra ? (
            <div className={`${prefixCls}-extra`} onClick={onExtraClick}>
              {extra} {action ? <Icon type="iconxiayibu" color="#999" size={18}/>:  null } 
            </div>
          ) : null}
        </div>
      ) : null}
    
    </div>
  )
}

Row.defaultProps = defaultProps

export default Row
