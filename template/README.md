# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts
统一只是用npm
推荐只使用`npm`进行安装

`.npmrc`: 指定使用的registry

`.browserslistrc`: 指定目标浏览器

`config-overrides`: 覆盖CRA创建的项目中的配置

`tsconfigPaths.json`: react-app-rewired覆盖配置后，tsconfig中的paths别名会被覆盖掉，用extends方式继承路径别名

### `npm start`
地址 [http://localhost:3000](http://localhost:3000)
### `npm build:${branch}`
构建`branch`分支的dist

### 开发

1. `npm i `统一用npm的方式安装
2. `npm run start`启动后会跳转到登录页面，扫码登录后会报错，因为没有端口，在跳转回的鉴权链接域名后面加上端口:`http://k12-operate-dev.baicizhan.com:3000/?wx_token=xxxx`
