import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { ConfigProvider } from "antd"
import uiTheme from "./assets/uiTheme.json"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={uiTheme}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
