import React, { FC, useMemo } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import { Location } from 'history'
import { CustomRoute } from '@/routers/type'
import Layout from '@/layout'
import { UseEffectRoutes } from '@/routers/config'

// 计算Route节点
const calculateNode = (routes: CustomRoute[], location: Location<any>): React.ReactNode[] => {
  const result: React.ReactNode[] = []
  routes.forEach((item) => {
    if (item.children) {
      if (item.component) {
        result.push(
          <Route path={item.path} exact={true} component={item.component} key={item.path}></Route>
        )
      }
      result.push(...calculateNode(item.children ? item.children : [], location))
    } else {
      result.push(
        <Route path={item.path} key={item.path} exact={true} component={item.component}></Route>
      )
    }
  })
  return result
}
// 计算路由
const RouteNode: FC = () => {
  const location = useLocation<any>()
  const routes = UseEffectRoutes()
  const routeNode = useMemo(() => {
    const rootRouteNode = calculateNode(
      routes.filter((item) => item.path !== '/'),
      location
    )
    const menuRouter = routes.find((item) => item.path === '/')
    const menuRouteNode = <Layout>{calculateNode(menuRouter?.children ?? [], location)}</Layout>
    return (
      <Switch>
        {rootRouteNode}
        {menuRouteNode}
      </Switch>
    )
  }, [ routes, location ])
  return routeNode
}

export default React.memo(RouteNode)
