import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// 预加载所有图标模型
useGLTF.preload('/logos/c.glb');
useGLTF.preload('/logos/python.glb');
useGLTF.preload('/logos/js.glb');
useGLTF.preload('/logos/vue.glb');
useGLTF.preload('/logos/blender.glb');
useGLTF.preload('/logos/react.glb');

// 单个技术图标组件
export function TechIcon({ name, position, rotation = [0, 0, 0], targetSize = 1, visible = true }) {
  const { scene } = useGLTF(`/logos/${name}.glb`);
  const iconRef = useRef();
  
  // 计算模型的实际尺寸
  const box = useMemo(() => {
    const boundingBox = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    boundingBox.getSize(size);
    return { 
      size, 
      maxDimension: Math.max(size.x, size.y, size.z) 
    };
  }, [scene]);
  
  // 根据目标大小计算缩放比例
  const scaleFactor = useMemo(() => {
    return targetSize / box.maxDimension;
  }, [box, targetSize]);
  
  // 添加悬停效果
  const [hovered, setHovered] = React.useState(false);
  
  React.useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);
  
  if (!visible) return null;
  
  return (
    <primitive 
      ref={iconRef}
      object={scene.clone()} 
      position={position}
      rotation={rotation}
      scale={hovered ? scaleFactor * 1.2 : scaleFactor}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
}

// 两侧图标组管理组件
export function TechIcons() {
  // 获取视口大小
  const { viewport, size } = useThree();
  const [responsiveOffset, setResponsiveOffset] = useState(0.7);
  const [responsiveIconSize, setResponsiveIconSize] = useState(0.3);
  const [layoutMode, setLayoutMode] = useState('desktop'); // 'desktop' 或 'mobile'
  
  // 设置固定参数
  const showIcons = true;
  const iconSize = 0.3;
  const offsetX = 0.7;
  
  // 根据视口大小调整图标位置和大小
  useEffect(() => {
    const aspectRatio = size.width / size.height;
    const isMobile = size.width < 768;
    
    // 设置布局模式
    setLayoutMode(isMobile ? 'mobile' : 'desktop');
    
    // 移动端布局 - 图标更靠近中心，更小，更分散
    if (isMobile) {
      setResponsiveOffset(offsetX * 0.6); // 移动端图标更靠近中心
      setResponsiveIconSize(iconSize * 0.75); // 移动端图标更小
    } 
    // 平板布局
    else if (size.width < 1024) {
      setResponsiveOffset(offsetX * 0.8);
      setResponsiveIconSize(iconSize * 0.9);
    } 
    // 桌面布局 - 图标更分散，更大
    else {
      setResponsiveOffset(offsetX * 1.1); // 桌面端图标更分散
      setResponsiveIconSize(iconSize * 1.1); // 桌面端图标更大
    }
  }, [size, viewport]);
  
  // 创建图标配置
  const createIconConfigs = () => {
    // 基础配置
    const baseConfigs = {
      desktop: {
        left: [
          { 
            name: 'c', 
            position: [responsiveOffset, 0.7, 0.2], 
            rotation: [0, -Math.PI * 0.75, 0]
          },
          { 
            name: 'python', 
            position: [responsiveOffset * 0.9, -0.1, 0.3], 
            rotation: [0, -Math.PI * 0.85, 0]
          }, 
          { 
            name: 'js', 
            position: [responsiveOffset * 0.8, -1.2, -0.2], 
            rotation: [0, -Math.PI * 1.25, 0]
          }
        ],
        right: [
          { 
            name: 'vue', 
            position: [-responsiveOffset, 0.7, 0.2], 
            rotation: [0, Math.PI * 0.75, 0]
          },
          { 
            name: 'blender', 
            position: [-responsiveOffset * 0.9, -0.1, 0.3], 
            rotation: [0, Math.PI * 0.25, 0]
          },
          { 
            name: 'react', 
            position: [-responsiveOffset * 0.8, -0.9, 0], 
            rotation: [0, Math.PI * 0.85, 0]
          }
        ]
      },
      mobile: {
        // 移动端布局 - 更加分散，更像围绕在角色周围
        left: [
          { 
            name: 'c', 
            position: [responsiveOffset, 1.2, 0.5], 
            rotation: [0, -Math.PI * 0.75, 0]
          },
          { 
            name: 'python', 
            position: [responsiveOffset * 1.1, 0.2, 0.6], 
            rotation: [0, -Math.PI * 0.85, 0]
          }, 
          { 
            name: 'js', 
            position: [responsiveOffset * 0.9, -0.8, 0.3], 
            rotation: [0, -Math.PI * 1.25, 0]
          }
        ],
        right: [
          { 
            name: 'vue', 
            position: [-responsiveOffset, 1.2, 0.5], 
            rotation: [0, Math.PI * 0.75, 0]
          },
          { 
            name: 'blender', 
            position: [-responsiveOffset * 1.1, 0.2, 0.6], 
            rotation: [0, Math.PI * 0.25, 0]
          },
          { 
            name: 'react', 
            position: [-responsiveOffset * 0.9, -0.8, 0.3], 
            rotation: [0, Math.PI * 0.85, 0]
          }
        ]
      }
    };
    
    return baseConfigs[layoutMode];
  };
  
  // 获取当前布局的图标配置
  const iconConfigs = useMemo(() => createIconConfigs(), [layoutMode, responsiveOffset]);
  
  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      
      // 设置布局模式
      setLayoutMode(isMobile ? 'mobile' : 'desktop');
      
      // 移动端布局
      if (isMobile) {
        setResponsiveOffset(offsetX * 0.6);
        setResponsiveIconSize(iconSize * 0.75);
      } 
      // 平板布局
      else if (window.innerWidth < 1024) {
        setResponsiveOffset(offsetX * 0.8);
        setResponsiveIconSize(iconSize * 0.9);
      } 
      // 桌面布局
      else {
        setResponsiveOffset(offsetX * 1.1);
        setResponsiveIconSize(iconSize * 1.1);
      }
    };
 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (!showIcons) return null;
  
  return (
    <>
      {/* 渲染左侧图标 */}
      {iconConfigs.left.map((icon) => (
        <TechIcon 
          key={icon.name}
          name={icon.name}
          position={icon.position}
          rotation={icon.rotation}
          targetSize={responsiveIconSize}
          visible={true}
        />
      ))}
      
      {/* 渲染右侧图标 */}
      {iconConfigs.right.map((icon) => (
        <TechIcon 
          key={icon.name}
          name={icon.name}
          position={icon.position}
          rotation={icon.rotation}
          targetSize={responsiveIconSize}
          visible={true}
        />
      ))}
    </>
  );
} 