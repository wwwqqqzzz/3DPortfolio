import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// 移除字体导入
// import '@fontsource/inter/400.css'; // 常规字重
// import '@fontsource/inter/700.css'; // 粗体字重

// 创建一个单一的root实例并存储它
const rootElement = document.getElementById('root');
// 检查是否已经有data-reactroot属性来避免重复创建
const hasReactRoot = rootElement.hasAttribute('data-reactroot');

if (!hasReactRoot) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
