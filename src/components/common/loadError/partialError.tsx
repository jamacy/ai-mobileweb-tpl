import * as React from 'react'
import './index.scss'
import error  from '@assets/images/common/no_data.png'

interface IProps {
  text : React.ReactChild
}
const defaultProps: IProps = {
  text: ''
}
const PartialError: React.FC<IProps> & { defaultProps: Partial<IProps> } = props => {
  const { text } = props
  return (
    <div className={'partial-error'}>
       <div className="img">
         <img src={error} alt=""/>
       </div>
       <h3>{text}</h3>
    </div>
  )
}

PartialError.defaultProps = defaultProps

export default PartialError