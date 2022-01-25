import * as React  from 'react'
import { TabBar } from '@components/UI'
const { useState,useEffect } = React
import { Icon } from '@components/UI'
import { ai_seal_icon } from '@models/index'
import ApplyList from '@pages/seal/applyList'
import Main from '@pages/main'

const normal ={
    size:22,
    color:'#979797'
}
const selected ={
    size:22,
    color:'#417BF4'
}

//const withTabbar = ( Component:React.FC ) => (props:IProps) => {
const withTabbar =  () => {

   const [key ,setKey] = useState<string>('lift');

    const items = [
        {
          selected: true,
          icon: <Icon  prefixCls = {ai_seal_icon}  type={'moren'} {...normal} />,
          selectedIcon: <Icon  prefixCls = {ai_seal_icon}  type={'xuanzhong'} {...selected} />,
          title: <span>取号</span>,
          selectedTitle: <span style={{ color: '#417BF4' }}>取号</span>,
          key: 'lift',
          content: key== 'lift'  ? <Main tabKey={key} setTab={setKey}/> : undefined
        },
        {
          selected: false,
          icon: <Icon  prefixCls = {ai_seal_icon}  type={'xuanzhong1'} {...normal} />,
          selectedIcon:<Icon  prefixCls = {ai_seal_icon}  type={'wode'} {...selected} />,
          title: <span>我的</span>,
          selectedTitle: <span style={{ color: '#417BF4' }}>我的</span>,
          key: 'my',
          content: key== 'my' ? <ApplyList tabBarKey = {key}/> : undefined
        }
        
      ]
    const onPress = (key: string) => {
      console.log("onPress",key)
      setKey(key)
    }
    return (
        <div style={{
            marginBottom: '1rem',
            position: 'fixed',
            height: '100%',
            width:'100%',
            top: 0,
            left: 0
          }}>
            <TabBar activeKey={key} setActiveKey={setKey} items={items} hidden={false}  barTintColor={'#fff'} onPress={onPress} />
        </div>
      )
  }


  export default withTabbar;