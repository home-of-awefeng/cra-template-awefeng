import React, { FC }from 'react'
import { Layout, Avatar, Popover, Button } from 'antd'
import styles from './layout.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@/state/rootReducer'
import { logOut } from '@/utils/login'

const MainHeader: FC = () => {

  const user = useSelector((state: RootState) => state.user)
  const { name, avatarUrl } = user

  return <Layout.Header className={styles.header}>
    <Popover placement={"bottomRight"} content={<Button type="link" onClick={logOut}>退出登录</Button>}>
      <Avatar src={avatarUrl}></Avatar>
      <span style={{ marginLeft: 10 }}>{name}</span>
    </Popover>

  </Layout.Header>
}

export default MainHeader
