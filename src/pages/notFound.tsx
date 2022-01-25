import React from 'react'
import Button from "@/components/UI/PureButton";
import Kara from 'ai-jssdk';
import './index.scss'

const NotFound: React.FC = () => {
  return (<div className="error">
    <div className="error-img"></div>
    <h2>对不起，页面没有找到～</h2>
    <div className="exit">
      <Button
        text="返 回"
        highted={false}
        onClick={() => Kara.closePage()}
      />
    </div>
  </div>)
}

export default NotFound;

