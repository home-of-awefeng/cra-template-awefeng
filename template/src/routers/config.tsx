import { AreaChartOutlined } from '@ant-design/icons'
import React, { useMemo } from 'react'
import { CustomRoute } from './type'
import { Spin } from 'antd'
import { useSelector } from 'react-redux'

const loadComp: (Com: React.LazyExoticComponent<any>) => React.ComponentType = (Com) => {
  return class LoadComp extends React.Component<any, any> {
    render() {
      return (
        <React.Suspense
          fallback={
            <Spin
              size="large"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
          }
        >
          <Com />
        </React.Suspense>
      )
    }
  }
}
/**
 * router配置最多只支持3级菜单
 */
const routes: CustomRoute[] = [
  {
    path: '/',
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: '数据看板',
        icon: <AreaChartOutlined />,
        component: loadComp(React.lazy(() => import('@/pages/dashboard')))
      },
      {
        path: '/auth',
        name: '权限管理',
        icon: <AreaChartOutlined />,
        children: [
          {
            path: '/auth/role',
            name: '角色管理',
            icon: <AreaChartOutlined />,
            component: loadComp(React.lazy(() => import('@/pages/auth/role')))
          },
          {
            path: '/auth/accout',
            name: '人员管理',
            icon: <AreaChartOutlined />,
            component: loadComp(React.lazy(() => import('@/pages/auth/accout')))
          }
        ]
      }
    ]
  },
  {
    path: '/404',
    component: loadComp(React.lazy(() => import('@/pages/404')))
  }
]

function calcRoute(routes: CustomRoute[], auths: string[]): CustomRoute[] {
  const result: CustomRoute[] = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      const children = calcRoute(route.children, auths)

      // 如果计算出子节点里面有成立的
      if (children.length > 0) {
        result.push({ ...route, children })
      }
    } else {
      // 如果路由没有chidren了 子节点 并且在auth中 则填入result
      if (auths.includes(route.path)) {
        result.push(route)
      }
    }
  })
  return result
}

// 权限 计算出当前账户正确的菜单
export function UseEffectRoutes(): CustomRoute[] {
  const { menus, roles } = useSelector((state) => state.user)
  const result = useMemo(() => {
    if (roles.includes('admin')) return routes
    const result: CustomRoute[] = []
    const root = routes.find((item) => item.path === '/') as CustomRoute
    result.push(...routes.filter((item) => item.path !== '/'))
    result.push({
      ...root,
      children: calcRoute(root.children as CustomRoute[], Array.isArray(menus) ? menus : [])
    })
    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ routes, menus, roles ])
  return result
}
