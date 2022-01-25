
export interface TabBarProps {
  barTintColor?: string
  hidden?: boolean
  className?: string
  prefixCls: string
  tabBarPosition: 'top' | 'bottom'
  items?: Array<TabBarItemProps>
  onPress: (key: string) => void,
  activeKey:string,
  setActiveKey:(key: string) => void
}

export interface TabBarItemProps {
  badge?: number | string
  dot?: boolean
  icon: React.ReactElement<any>
  selectedIcon: React.ReactElement<any>
  title: string | React.ReactElement
  selectedTitle: string | React.ReactElement
  key?: string
  content?: React.ReactElement
}
