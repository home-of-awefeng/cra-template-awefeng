import React, { useEffect, useMemo, useState } from 'react'
import { Layout, Menu } from 'antd'
import { SIDER_MENU_PROPS } from './constants'
import { Link, useLocation } from 'react-router-dom'
import styles from './layout.module.scss'
import { CustomRoute } from '@/routers/type'
import { UseEffectRoutes } from '@/routers/config'
import Logo from '@/assets/layout/logo.png'

const { Sider } = Layout
const { SubMenu } = Menu
// 生成 path=== '/'里面的内容 侧边栏
const calculateMenu: (routes: CustomRoute[]) => React.ReactNode[] = (routes) => {
  const node = routes.map((item) => {
    // 筛除隐藏掉的
    if (item.hide) {
      return null
    }

    if (!item.children || item.children.filter((i) => !i.hide).length === 0) {
      return (
        <Menu.Item key={item.path} icon={item.icon}>
          <Link to={item.path}>{item.name}</Link>
        </Menu.Item>
      )
    } else {
      return (
        <SubMenu key={item.path} icon={item.icon} title={item.name}>
          {item.children && calculateMenu(item.children)}
        </SubMenu>
      )
    }
  })
  return node.filter((item) => item !== null)
}
const MainSider: React.FC = () => {
  const [ collapsed, setCollapsed ] = useState(false)
  const [ selectedKeys, setSelectedKeys ] = useState<string[]>([])
  const location = useLocation()

  useEffect(() => {
    const { pathname } = location
    setSelectedKeys([ pathname ])
  }, [ location ])
  const routes = UseEffectRoutes()
  const menuResult = useMemo(() => {
    const tempMenu = routes.map((item) => {
      if (item.path === '/') {
        return calculateMenu(item.children ?? [])
      } else {
        return null
      }
    })
    return tempMenu.filter((item) => item !== null)
  }, [ routes ])

  return (
    <Sider
      collapsible
      className={styles.sider}
      collapsed={collapsed}
      onCollapse={() => {
        setCollapsed(!collapsed)
      }}
      width={SIDER_MENU_PROPS.width}
    >
      <div className={styles.logo}>
        <img src={Logo} alt="XXXX平台" />
        <span>XXXX平台</span>
      </div>
      <Menu
        selectedKeys={selectedKeys}
        inlineCollapsed={false}
        theme={SIDER_MENU_PROPS.theme}
        mode={SIDER_MENU_PROPS.mode as any}
      >
        {menuResult}
      </Menu>
    </Sider>
  )
}

export default MainSider
