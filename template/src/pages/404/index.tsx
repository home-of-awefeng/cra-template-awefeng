import { Button, Result } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'

const NoFoundPage: React.FC = () => {
  const history = useHistory()

  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起 你访问的页面不存在"
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          返回首页
        </Button>
      }
    />
  )
}

export default NoFoundPage
