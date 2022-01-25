import * as React from 'react'
import ClassNames from 'classnames'
import { SubmitBtnsProps } from './interface'
import './index.scss'

const noop = () => {}

const defaultProps: SubmitBtnsProps = {
  prefixCls: 'ai--submit',
  action: false,
  actions: [],
  hasInput: false,
  textRef: null,
  onChange:noop
}

const renderActions = ({ actions, prefixCls }: SubmitBtnsProps) => {
  if (actions && actions.length) {
    return (
      <div className={`${prefixCls}-actions`}>
        {actions.map((action, index) => {
          return (
            <div
              className={`${prefixCls}-actions-item ${actions.length === 1 ? `${prefixCls}-actions-single` : '' }`}
              onClick={action.onClick}
              key={`action-${index}`}
            >
              {action.content}
            </div>
          )
        })}
      </div>
    )
  }
  return null
}


const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, { onChange  }: SubmitBtnsProps) => {
  const value = e.target.value
 onChange(value)
}
const SubmitBtns: React.FC<SubmitBtnsProps> & { defaultProps: Partial<SubmitBtnsProps> } = props => {

  const { prefixCls, title, className, style , hasInput ,placeholder ,textRef } = props

  const classStr = ClassNames(prefixCls, className)
  let styleCopy = style || {}
  return (
    <div className={classStr} style={styleCopy}>
      {title ? (
        <div className={`${prefixCls}-header`}>
          <div className={`${prefixCls}-title`}>{title}</div>
        </div>
      ) : null}
       {
          hasInput &&  <div className={`${prefixCls}-form`}>
          <textarea  placeholder={placeholder}   onChange={e => handleChange(e,props)} ref={textRef}/>
          </div>
        }
       {renderActions(props)}
    </div>
  )
}

SubmitBtns.defaultProps = defaultProps

export default SubmitBtns
