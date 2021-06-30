/**
 * 开发中不同环境的配置信息
 *
 * key值为process.env.NODE_ENV
 * 在package.json中是script 命令中带入
 */
const config = {
  development: {
    domain: "//127.0.0.1:3000",
    baseUrl: "//backend-api-dev.example.com",
  },
  test: {
    domain: "//frontend-domain-test.example.com",
    baseUrl: "//backend-api-test.example.com",
  },
  production: {
    domain: "//frontend-domain.com",
    baseUrl: "//backend-api.example.com",
  }
}

interface ConfigProps {
  domain: string //用于登录后的跳转
  baseUrl: string //用于接口请求的拼装
}

export function getConfig(): ConfigProps {
  return config[process.env.REACT_APP_ENV]
}
export default getConfig()
