// https://procomponents.ant.design/components/layout
import React from "react"
import styles from "./layout.module.scss"
import { Layout } from "antd"
import Sider from "./sider"
import Header from "./header"
import { isLogin } from "@/utils/login"

const { Content } = Layout
const MainLayout: React.FC = (props) => {
  const { children } = props

  return isLogin() ? (
    <Layout style={{ height: "100vh" }}>
      <Sider></Sider>
      <Layout>
        <Header></Header>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  ) : null
}

export default MainLayout
