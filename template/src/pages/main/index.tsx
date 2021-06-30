import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import RouteNode from './routeNode'
import { Provider } from 'react-redux'
import store from '@/state/store'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

const Main: FC = (props) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider locale={zhCN}>
          <RouteNode></RouteNode>
        </ConfigProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default Main
