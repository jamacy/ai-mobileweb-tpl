import React, { lazy, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'antd-mobile/dist/antd-mobile.css'
import NotFound from './notFound'
import ErrorBoundary from './error'
const Main = lazy(() => import('@pages/main'))

const Loading = () => {
  return <div />
}
const Bundle = (Com: React.LazyExoticComponent<any>) => (props: any) => {
  return (
    <React.Suspense fallback={<Loading></Loading>}>
      <Com {...props}></Com>
    </React.Suspense>
  )
}

export default () => {
  const rootPath = process.env.REACT_APP_ROOT_PATH
  console.log("rootPath",rootPath);
  
  return (
    <ErrorBoundary>
        <div className="container">
          <Router basename={rootPath}>
            <Switch>
              <Route exact path="/main" component={Bundle(Main)} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </div>
    </ErrorBoundary>
  )
}
