import * as React from 'react'
import './index.scss'
import error  from '@assets/images/common/error.png'


interface IProps {
  text : React.ReactChild
}
const defaultProps: IProps = {
  text: ''
}

const LoadError: React.FC<IProps> & { defaultProps: Partial<IProps> } = props => {
  const { text } = props
  return (
    <div className={'load-error'}>
       <div className="error-img">
         <img src={error} alt=""/>
       </div>
       <h3>{text}</h3>
    </div>
  )
}
LoadError.defaultProps = defaultProps

export default LoadError