import { useState } from 'react';
import { Button } from '@/components/ui/button';
import './App.css';

function App() {
  const [name, setName] = useState('访客');

  return (
    <div className="container">
      <Button>Click me</Button>
      <h1>欢迎来到我的页面</h1>
      <div className="card">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="请输入您的名字"
        />
        <p>你好,{name}!</p>
        <button
          onClick={() => {
            setName('访客');
            console.log(name);
          }}
        >
          重置名字
        </button>
      </div>
      <p className="footer">这是一个简单的 React 示例页面</p>
    </div>
  );
}

export default App;
