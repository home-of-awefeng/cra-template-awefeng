import React, { FC, useEffect, useMemo, useState } from "react"
import { Route, Switch, useHistory, useLocation } from "react-router-dom"
import { Location } from "history"
import {  CustomRoute } from "@/routers/type"
import Layout from "@/layout"
import { UserStateProps, setUserInfo } from "@/state/user"
import { useDispatch } from "react-redux"
import { UseEffectRoutes } from "@/routers/config"

// 计算Route节点
const calculateNode = (
  routes: CustomRoute[],
  location: Location<any>
): React.ReactNode[] => {
  const result: React.ReactNode[] = []
  routes.forEach((item) => {
    if (item.children) {
      if(item.component){
        result.push(
          <Route
            path={item.path}
            exact={true}
            component={item.component}
            key={item.path}
          ></Route>
        )
      }
      result.push(
        ...calculateNode(item.children ? item.children : [], location)
      )
    } else {
      result.push(
        <Route
          path={item.path}
          key={item.path}
          exact={true}
          component={item.component}
        ></Route>
      )
    }
  })
  return result
}
// 计算界面的路径：404界面的问题
const calcRoutePath = (routes: CustomRoute[]): CustomRoute[] => {
  const paths: CustomRoute[] = []
  routes.forEach((item) => {
    if (item.children && item.children.length > 0) {
      paths.push(...calcRoutePath(item.children))
    }

    if (item.path && item.redirect) {
      paths.push(item)
    } else if (item.path && item.component) {
      paths.push(item)
    }
  })
  return paths
}
// 计算路由
const RouteNode: FC = () => {

  const location = useLocation<any>()
  const routes = UseEffectRoutes()
  const routeNode = useMemo(() => {
    const rootRouteNode = calculateNode(
      routes.filter((item) => item.path !== "/"),
      location
    )
    const menuRouter = routes.find((item) => item.path === "/")
    const menuRouteNode = (
      <Layout>{calculateNode(menuRouter?.children ?? [], location)}</Layout>
    )
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
