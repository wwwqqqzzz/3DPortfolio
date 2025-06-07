import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

export const Loader = () => {
  const { progress } = useProgress();
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // 当进度达到100%时，立即隐藏加载器
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500); // 缩短延迟时间
      return () => clearTimeout(timer);
    }
  }, [progress]);
  
  // 如果不可见，直接返回null，不渲染任何内容
  if (!isVisible) return null;
  
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-white z-50"
      style={{
        opacity: progress === 100 ? 0 : 1,
        transition: 'opacity 0.5s ease'
      }}
    >
      <div className="w-64 flex flex-col items-center">
        <div 
          className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2"
          style={{
            animation: 'fadeIn 0.5s ease forwards'
          }}
        >
          <div 
            className="h-full bg-indigo-600 rounded-full"
            style={{
              width: `${progress}%`,
              transition: 'width 0.5s ease'
            }}
          />
        </div>
        
        <div 
          className="text-gray-700 text-sm font-medium"
          style={{
            animation: 'fadeIn 0.5s ease 0.3s forwards',
            opacity: 0
          }}
        >
          加载中...{progress.toFixed(0)}%
        </div>
      </div>
      
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        `}
      </style>
    </div>
  );
}; 