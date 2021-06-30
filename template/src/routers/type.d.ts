import React from "react"
import { RouteProps } from "react-router"

export interface CustomRoute extends RouteProps {
  path: string
  redirect?: string // 重定向地址
  hide?: boolean // 是否隐藏
  name?: string
  icon?: React.ReactNode,
  children?: CustomRoute[]
}
