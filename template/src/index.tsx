import React from 'react'
import ReactDOM from 'react-dom'
import './global.scss'
import Main from '@/pages/main'

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// k12运营后台不需要质量监控
// reportWebVitals()
