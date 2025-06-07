import React, { useRef, useState, useEffect } from 'react';
import { Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function CenterText() {
  const { viewport } = useThree();
  const [visible, setVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [descVisible, setDescVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  
  const groupRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  
  // 设置固定参数
  const showText = true;
  const textContent = '开发者简介';
  const textScale = 1;
  const primaryColor = '#1e293b';
  const secondaryColor = '#475569';
  const accentColor = '#3b82f6';
  const animationSpeed = 1;
  const letterSpacing = 0;
  const showBackground = true;
  const backgroundOpacity = 0.15;
  
  // 根据选择返回不同的文字内容
  const getTextContent = () => {
    switch(textContent) {
      case '开发者简介':
        return {
          title: 'Leo Chen',
          subtitle: 'Frontend Developer',
          description: '专注于现代Web开发 • React • Three.js • 远程协作',
          cta: '🚀 Ready for Remote Work'
        };
      case '技能展示':
        return {
          title: 'Full-Stack',
          subtitle: 'Web Developer',
          description: 'React • Vue • Node.js • 3D可视化 • UI/UX设计',
          cta: '💡 Let\'s Build Something Amazing'
        };
      case '服务介绍':
        return {
          title: 'Remote',
          subtitle: 'Development Services',
          description: '前端开发 • 3D交互 • 性能优化 • 技术咨询',
          cta: '📧 Contact Me Today'
        };
      default:
        return {
          title: 'Leo Chen',
          subtitle: 'Frontend Developer',
          description: '专注于现代Web开发 • React • Three.js • 远程协作',
          cta: '🚀 Ready for Remote Work'
        };
    }
  };
  
  const content = getTextContent();
  
  // 高级动画效果
  useFrame((state) => {
    if (!visible) return;
    
    const time = state.clock.getElapsedTime() * animationSpeed;
    
    if (groupRef.current) {
      // 主容器轻微浮动
      groupRef.current.position.y = Math.sin(time * 0.3) * 0.02;
    }
    
    if (titleRef.current && titleVisible) {
      // 标题字符逐个动画效果
      titleRef.current.position.x = Math.sin(time * 0.5) * 0.01;
    }
    
    if (subtitleRef.current && subtitleVisible) {
      // 副标题轻微摆动
      subtitleRef.current.rotation.z = Math.sin(time * 0.4) * 0.005;
    }
  });
  
  // 分步动画效果
  useEffect(() => {
    if (showText) {
      const timers = [
        setTimeout(() => setVisible(true), 200),
        setTimeout(() => setTitleVisible(true), 600),
        setTimeout(() => setSubtitleVisible(true), 1200),
        setTimeout(() => setDescVisible(true), 1800),
        setTimeout(() => setCtaVisible(true), 2400)
      ];
      
      return () => timers.forEach(clearTimeout);
    } else {
      [setVisible, setTitleVisible, setSubtitleVisible, setDescVisible, setCtaVisible]
        .forEach(setter => setter(false));
    }
  }, [showText]);
  
  if (!showText) return null;
  
  // 响应式设计
  const isMobile = viewport.width < 6;
  const baseScale = isMobile ? 0.7 : 1;
  
  return (
    <group 
      ref={groupRef} 
      visible={visible} 
      position={[0, 0.5, 0]} 
      rotation={[0, Math.PI, 0]}
    >
      {/* 背景面板 - 提供视觉对比 */}
      {showBackground && (
        <mesh position={[0, 0.7, -0.05]} scale={[3, 1.8, 0.01]}>
          <planeGeometry />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={backgroundOpacity} 
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      
      {/* 主标题 - 大胆且有冲击力 */}
      <Text
        ref={titleRef}
        position={[0, 1.2, 0]}
        fontSize={0.4 * textScale * baseScale}
        color={primaryColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={letterSpacing}
        visible={titleVisible}
        material-transparent={true}
        material-opacity={titleVisible ? 1 : 0}
      >
        {content.title}
      </Text>
      
      {/* 副标题 - 强调职业身份 */}
      <Text
        ref={subtitleRef}
        position={[0, 0.85, 0]}
        fontSize={0.22 * textScale * baseScale}
        color={accentColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={letterSpacing}
        visible={subtitleVisible}
        material-transparent={true}
        material-opacity={subtitleVisible ? 0.95 : 0}
      >
        {content.subtitle}
      </Text>
      
      {/* 技能描述 - 简洁但信息丰富 */}
      <Text
        position={[0, 0.55, 0]}
        fontSize={0.14 * textScale * baseScale}
        color={secondaryColor}
        anchorX="center"
        anchorY="middle"
        maxWidth={isMobile ? 4 : 6}
        textAlign="center"
        lineHeight={1.2}
        letterSpacing={letterSpacing}
        visible={descVisible}
        material-transparent={true}
        material-opacity={descVisible ? 0.85 : 0}
      >
        {content.description}
      </Text>
      
      {/* 行动号召 - 突出且有趣 */}
      <Text
        position={[0, 0.25, 0]}
        fontSize={0.16 * textScale * baseScale}
        color={accentColor}
        anchorX="center"
        anchorY="middle"
        letterSpacing={letterSpacing}
        visible={ctaVisible}
        material-transparent={true}
        material-opacity={ctaVisible ? 0.9 : 0}
      >
        {content.cta}
      </Text>
      
      {/* 简化装饰元素 */}
      <group visible={ctaVisible}>
        {/* 底部分隔线 */}
        <mesh position={[0, 0.15, 0]}>
          <planeGeometry args={[1.5, 0.002]} />
          <meshBasicMaterial color={secondaryColor} transparent opacity={0.3} />
        </mesh>
      </group>
    </group>
  );
}