import React from "react";
import Button from "@/components/UI/PureButton";
import Kara from 'ai-jssdk';
import './index.scss'

interface State {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error:Error) {
    return { error: error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    //logErrorToMyService(error, info);
  }

  exit(){
    Kara.closePage();
  }

  render() {
      return this.state.error ? <div className='error'>
            <div className='error-img'></div>
            <h2>程序开小差了，请退出后重试～</h2>
            <div className="exit">
              <Button
                  text="返 回"
                  highted = {false}
                  onClick={() => {
                    this.exit();
                  }}></Button>
            </div>
          </div> : this.props.children;
  }
}