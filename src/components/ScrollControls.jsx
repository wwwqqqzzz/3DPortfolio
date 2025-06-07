import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, ScrollControls } from '@react-three/drei';

// 自定义ScrollControls组件，包装drei的ScrollControls并添加部分检测功能
export const CustomScrollControls = ({ children, pages = 1, damping = 0.1, setSection }) => {
  const previousOffset = useRef(0);
  
  // 使用drei的ScrollControls
  return (
    <ScrollControls pages={pages} damping={damping}>
      {/* 渲染传入的子组件 */}
      {children}
      
      {/* 添加滚动监听器 */}
      <ScrollListener setSection={setSection} pages={pages} />
    </ScrollControls>
  );
};

// 滚动监听器组件，不渲染任何内容，仅监听滚动事件
const ScrollListener = ({ setSection, pages }) => {
  const scroll = useScroll();
  const previousOffset = useRef(0);
  
  useFrame(() => {
    // 获取当前滚动偏移
    const currentOffset = scroll.offset;
    
    // 如果滚动位置改变
    if (Math.abs(currentOffset - previousOffset.current) > 0.01) {
      // 计算当前部分
      const newSection = Math.floor(currentOffset * pages);
      
      // 更新部分
      setSection(newSection);
      
      // 更新前一个偏移量
      previousOffset.current = currentOffset;
    }
  });
  
  return null;
}; 