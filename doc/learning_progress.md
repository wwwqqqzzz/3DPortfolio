# 我的3D作品集项目学习日志

## Day 1: 初始环境搭建 (2025-05-28)

今天开始学习制作3D作品集网站，使用React Three Fiber和Three.js技术。

### 完成的工作：

1. **克隆基础模板**
   - 使用命令：`git clone https://github.com/wass08/r3f-vite-starter.git`
   - 这个模板提供了R3F和Vite的基本配置
   - ![模板项目](https://cdn.jsdelivr.net/gh/wwwqqqzzz/Image/img/1749119082921-485ed5fe4a930dd831de4f996321210c.png)

2. **解决依赖问题**
   - 进入项目目录：`cd r3f-vite-starter`
   - 尝试运行`npm run dev`时发现缺少依赖
   - 尝试`npm i`安装依赖，但没完全解决问题
   - 最终使用`yarn`成功安装所有依赖
   - 启动项目：`yarn dev`
   - 成功在 http://localhost:5173/ 看到了初始场景

3. **创建个人3D模型**
   - 在ReadyPlayerMe上创建了自己的3D角色形象
   - 在项目中新建`public/models`目录
   - 将下载的GLB格式文件(`6841675a0a3a6091cd330a41.glb`)放入models目录
   - 使用命令生成React组件：`npx gltfjsx .\public\models\6841675a0a3a6091cd330a41.glb`
   - 将生成的组件文件复制到`src/components`文件夹
   - 将组件名从Model改为Avatar
   - 修改模型路径为`models/6841675a0a3a6091cd330a41.glb`

4. **修复导入错误**
   - 在Experience.jsx中添加Avatar组件：`<Avatar />`
   - 遇到错误：`Uncaught ReferenceError: Avatar is not defined at Experience (Experience.jsx:7:8)`
   - 检查Experience.jsx发现缺少Avatar组件的导入
   - 添加导入语句：`import { Avatar } from "./Avatar";`
   - 刷新页面，模型成功显示
   - ![](https://cdn.jsdelivr.net/gh/wwwqqqzzz/Image/img/1749119888129-91dd625024e2e2679f979abcfb815f44.png)

5. **调整场景和灯光**
   - 发现模型位置不理想，需要调整
   - 删除默认的示例盒子：
     ```jsx
     <mesh>
       <boxGeometry />
       <meshNormalMaterial />
     </mesh>
     ```
   - 添加环境光照：`<ambientLight intensity={1} />`
   - 将Avatar组件和灯光放在一个group中，并调整位置：
     ```jsx
     <group position-y={-1}>
       <Avatar />
       <ambientLight intensity={1} />
     </group>
     ```
   - 调整相机位置，将Canvas标签中的相机参数从：
     ```jsx
     <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
     ```
     改为：
     ```jsx
     <Canvas shadows camera={{ position: [0, 2, 5], fov: 30 }}>
     ```
   - 这样人物模型就能正确地显示在场景中了
   - ![最终效果](https://cdn.jsdelivr.net/gh/wwwqqqzzz/Image/img/1749120966488-3d17228d629dce6164a2a8e2670b434a.gif)

### 代码解释：

1. **环境光照 `<ambientLight intensity={1} />`**
   - 环境光是一种从所有方向均匀照射的光源
   - `intensity={1}` 设置光照强度为1，确保模型被充分照亮
   - 没有环境光的话，模型会显得很暗或完全看不见

2. **分组和位置调整 `<group position-y={-1}>`**
   - `group` 是一个容器，可以包含多个3D对象并一起操作它们
   - `position-y={-1}` 将整个组向下移动1个单位
   - 这样做是为了调整人物模型的高度，使其站在"地面"上

3. **相机设置 `camera={{ position: [0, 2, 5], fov: 30 }}`**
   - `position: [0, 2, 5]` 设置相机位置在x=0, y=2, z=5的坐标
   - 这个位置可以正面观察人物模型
   - `fov: 30` 设置视场角为30度，提供更自然的透视效果
   - 较小的fov值会产生类似望远镜的效果，减少透视变形


## Day 2: 添加角色动画 (2025-05-29)

接下来我们要使用Mixamo给角色添加动画。Mixamo是Adobe提供的免费3D角色动画库，有大量可以直接使用的动画资源。

### 使用Mixamo的准备工作

1. **下载并安装Blender**
   - 因为Mixamo需要使用FBX格式文件，所以我们需要先将GLB模型转换格式
   - ![Blender官网](https://cdn.jsdelivr.net/gh/wwwqqqzzz/Image/img/1749121137889-f354a50a65b99a51d58ce1ca5581eabd.png)
   - 从官网下载Blender: https://www.blender.org/

2. **使用Blender转换模型格式**
   - 打开Blender后，选择 File->Import->gLTF2.0
   - 导入之前下载的GLB模型
   - ![Blender导入](https://cdn.jsdelivr.net/gh/wwwqqqzzz/Image/img/1749121459249-4c3e8c588f35986a36afb5e4f9dc3776.png)
   - 按住键盘`z`键，选择Material Preview模式查看模型效果
   - ![Blender预览](https://cdn.jsdelivr.net/gh/wwwqqqzzz/Image/img/1749121658216-07a923918d5bd6dbb805846be8ebfc2c.png)
   - 将模型导出为FBX格式，保存为`character.fbx`
   - 将导出的FBX文件放在项目的models目录下
   - ![导出FBX](https://cdn.jsdelivr.net/gh/wwwqqqzzz/Image/img/1749121995576-030ee28ffeb608ff5a46a97043e36d1f.png)

3. **从Mixamo下载角色动画**
   - 访问Mixamo网站: https://www.mixamo.com/
   - 上传转换好的FBX模型
   - 在左侧动画列表中浏览动画库
   - 为我们的角色下载以下三种动画：
     - **站立动画**：选择"Idle"或"Standing"类型的动画
     - **行走动画**：选择"Walk"类型的动画
     - **下落动画**：选择"Falling"类型的动画
   - 对每个动画，可以调整右侧参数，包括：
     - 速度
     - 动作幅度
     - 是否循环播放
     - 是否镜像等
   - 调整到满意效果后，下载动画
   - 下载格式选择FBX格式
   - 下载选项设置：
     - 帧率：30 FPS
     - 勾选"Without Skin"选项（因为我们只需要动画数据）
   - ![Mixamo动画下载设置](https://cdn.jsdelivr.net/gh/wwwqqqzzz/Image/img/1749123138007-8294b3a46c2edce9bca7106607fb3a0a.png)

4. **组织动画文件**
   - 在项目中新建`public/animations`目录
   - 将下载的动画文件重命名为更简单的名称：
     - 站立动画：`standing.fbx`
     - 行走动画：`walk.fbx`
     - 下落动画：`falling.fbx`
   - 将这些文件放入animations目录

### 在代码中加载和应用动画

1. **安装必要的依赖**
   - 确保已安装`@react-three/drei`库，它提供了`useFBX`钩子用于加载FBX文件
   - 安装`three-stdlib`，它提供了`SkeletonUtils`用于克隆带有骨骼的模型
   - 安装`leva`库，它提供了强大的控制面板功能，方便调试和参数调整
   ```bash
   npm install @react-three/drei three-stdlib leva
   # 或使用yarn
   yarn add @react-three/drei three-stdlib leva
   ```

2. **导入必要的模块**
   - 在Avatar.jsx中添加必要的导入：
   ```jsx
   import { useFBX } from '@react-three/drei'
   import { SkeletonUtils } from 'three-stdlib'
   import { useControls } from 'leva'
   ```

3. **加载FBX动画文件**
   - 使用useFBX钩子加载动画文件：
   ```jsx
   // 加载动画FBX文件
   const { animations: walkAnimation } = useFBX('animations/walk.fbx')
   const { animations: standingAnimation } = useFBX('animations/standing.fbx')
   const { animations: fallingAnimation } = useFBX('animations/falling.fbx')
   
   // 设置动画名称
   walkAnimation[0].name = 'walk'
   standingAnimation[0].name = 'standing'
   fallingAnimation[0].name = 'falling'
   ```

4. **合并动画并创建动画控制器**
   - 使用useMemo缓存合并的动画，避免重复创建：
   ```jsx
   // 使用useMemo缓存合并的动画
   const allAnimations = React.useMemo(() => {
       return [
           ...walkAnimation,
           ...standingAnimation,
           ...fallingAnimation
       ]
   }, [walkAnimation, standingAnimation, fallingAnimation])
   
   // 设置动画控制器
   const { actions, mixer } = useAnimations(allAnimations, group)
   ```

5. **初始化和控制动画**
   - 设置默认动画：
   ```jsx
   // 初始化动画
   useEffect(() => {
       if (!actions) return;
       
       // 初始化默认动画 (standing静止状态)
       if (actions['standing']) {
           actions['standing'].play();
           currentAnimation.current = 'standing';
       }
   }, [actions]);
   ```
   
   - 实现动画切换：
   ```jsx
   // 跟踪动画变化并切换
   useEffect(() => {
       if (!actions || !animations) return;
       
       // 如果要播放的动画与当前播放的相同，则不做任何操作
       if (animations === currentAnimation.current) return;
       
       // 获取当前播放的动画和要切换到的动画
       const current = actions[currentAnimation.current];
       const next = actions[animations];
       
       if (current && next) {
           // 正常的动画交叉淡入淡出
           current.fadeOut(0.5);
           next.reset().fadeIn(0.5).play();
           
           // 更新当前动画
           currentAnimation.current = animations;
       }
   }, [animations, actions]);
   ```

## Day 3: 模型位置调整与动画问题修复 (2025-05-30)

今天我们进一步完善模型的位置和动画，解决了一些之前遇到的问题。

### 完成的工作：

1. **修复Avatar组件导入问题**
   - 解决了模型初始导入时的一些问题
   - 确保正确导入了必要的React钩子
   ```jsx
   import React, { useRef, useEffect, useState } from 'react'
   ```

2. **模型位置和大小调整**
   - 调整模型的position属性，控制模型在场景中的位置
   ```jsx
   position={[0, -1.8, 0]} // 将模型向下移动1.8个单位
   ```
   - 使用scale属性调整模型大小
   ```jsx
   scale={[-1.3, -1.3, -1.3]} // 所有轴都使用负值，实现上下左右镜像
   ```
   - 调整模型旋转
   ```jsx
   rotation={[-0.3, 0, 0]} // 轻微后仰
   ```

3. **动画问题修复**
   - 解决了falling动画从上方掉落的不自然效果
   - 通过调整动画播放时间，跳过不合适的部分
   ```jsx
   // 特殊处理falling动画
   if (animations === 'falling') {
       // 停止当前动画并立即切换到falling
       current.fadeOut(0.2);
       
       // 重置falling动画，从调整后的时间点开始播放
       next.reset();
       next.time = fallingParams.current.idealStart * fallingParams.current.duration;
       next.fadeIn(0.2).play();
   }
   ```
   - 尝试了多种方法改进动画循环播放的丝滑感
   - 使用了自定义的循环区间，避免不自然的跳变

## Day 4: 添加实验瓶漂浮效果和线框模式 (2025-05-31)

今天我们为模型添加了两个视觉效果：类似实验瓶中漂浮的动画效果，以及酷炫的线框(wireframe)模式。

### 实验瓶漂浮效果实现

1. **添加漂浮动画参数**
   - 使用Leva库添加控制参数
   ```jsx
   const { 
       headFollow, 
       floatingEnabled, 
       floatingIntensity, 
       rotationSpeed 
   } = useControls({
       headFollow: false,
       floatingEnabled: true,
       floatingIntensity: 0.3,
       rotationSpeed: 0.2
   })
   ```

2. **实现漂浮动画逻辑**
   - 使用useFrame钩子实现每帧更新的漂浮动画
   ```jsx
   // 上下漂浮 - 使用正弦函数
   const floatingY = Math.sin(floatingTime * 0.5) * floatingIntensity;
   group.current.position.y = floatingAnimation.current.initialY + floatingY;
   
   // 轻微旋转 - 使用余弦函数，使其看起来像是在水中飘浮
   const rotationX = Math.cos(floatingTime * 0.3) * 0.05 * rotationSpeed;
   const rotationY = Math.sin(floatingTime * 0.2) * 0.05 * rotationSpeed;
   const rotationZ = Math.sin(floatingTime * 0.4) * 0.03 * rotationSpeed;
   ```
   - 添加平滑的左右微移，增强漂浮感
   ```jsx
   // 添加一点随机微小移动，增强水中漂浮感
   group.current.position.x = THREE.MathUtils.lerp(
       group.current.position.x,
       Math.sin(floatingTime * 0.3) * 0.1 * floatingIntensity,
       0.02
   );
   ```

### 线框(Wireframe)模式实现

1. **添加线框模式控制参数**
   - 在控制面板中添加线框相关的参数
   ```jsx
   const { 
       wireframe,
       wireframeColor,
       emissiveIntensity,
       opacity
   } = useControls({
       wireframe: true,
       wireframeColor: '#00a2ff',
       emissiveIntensity: { value: 0.6, min: 0, max: 1, step: 0.01 },
       opacity: { value: 0.9, min: 0, max: 1, step: 0.01 }
   })
   ```

2. **实现线框材质管理**
   - 使用Map对象保存原始材质
   ```jsx
   const originalMaterials = useRef(new Map())
   const meshes = useRef([])
   ```
   - 初始化时收集所有网格和材质
   ```jsx
   // 收集所有网格和原始材质
   group.current.traverse((child) => {
       if (child.isMesh) {
           meshes.current.push(child)
           // 为每个网格创建原始材质的深拷贝
           originalMaterials.current.set(
               child.uuid, 
               child.material.clone()
           )
       }
   })
   ```

3. **实现线框模式切换**
   - 编写updateWireframe函数处理材质切换
   ```jsx
   const updateWireframe = () => {
       meshes.current.forEach(mesh => {
           const uuid = mesh.uuid
           
           if (wireframe) {
               // 创建新的线框材质
               const newMaterial = new THREE.MeshStandardMaterial({
                   color: wireframeColor,
                   wireframe: true,
                   transparent: true,
                   opacity: opacity,
                   emissive: wireframeColor,
                   emissiveIntensity: emissiveIntensity,
                   roughness: 0.2,
                   metalness: 0.8
               })
               
               // 应用线框材质
               mesh.material = newMaterial
           } else {
               // 恢复原始材质
               const originalMaterial = originalMaterials.current.get(uuid)
               if (originalMaterial) {
                   mesh.material = originalMaterial
               }
           }
       })
   }
   ```

4. **解决线框参数更新问题**
   - 添加延迟执行机制，确保DOM渲染后应用材质变化
   ```jsx
   useEffect(() => {
       const timer = setTimeout(() => {
           updateWireframe()
       }, 100)
       
       return () => clearTimeout(timer)
   }, [wireframe])
   ```
   - 分离参数处理逻辑，单独监听颜色和透明度变化
   ```jsx
   useEffect(() => {
       if (wireframe) {
           updateWireframe()
       }
   }, [wireframeColor, opacity, emissiveIntensity])
   ```

### 遇到的问题与解决方案

1. **线框模式参数不生效问题**
   - **问题**：更改控制面板中的参数时，模型外观没有变化
   - **原因**：使用了单一的材质实例，且参数更新逻辑有问题
   - **解决方案**：
     - 为每个网格单独创建新的线框材质，而不是共享一个实例
     - 添加详细的日志跟踪更新过程
     - 使用setTimeout延迟更新，确保DOM完全渲染

2. **线框材质emissive属性错误**
   - **问题**：出现"Cannot read properties of undefined (reading 'set')"错误
   - **原因**：MeshBasicMaterial没有emissive属性
   - **解决方案**：改用MeshStandardMaterial，它支持emissive属性

3. **wireframe开关不起作用**
   - **问题**：颜色和透明度可以调整，但wireframe开关无效
   - **原因**：材质更新机制有问题，没有正确切换材质
   - **解决方案**：
     - 重写材质管理逻辑，使用Map存储原始材质
     - 添加延迟执行机制确保DOM渲染后更新材质
     - 分离wireframe开关和其他参数的处理逻辑

### 最终效果

现在，我们的3D角色有了两种特殊效果：
1. 像漂浮在实验瓶中的样子，轻微上下浮动并伴随细微的旋转
2. 可切换的蓝色线框模式，带有发光效果，类似科技感的全息投影
![效果图](https://cdn.jsdelivr.net/gh/wwwqqqzzz/Image/img/1749159667759-7f643062bbdb8ea475cdc46538292927.png)

这些效果使我们的3D作品集更加生动和独特，也展示了React Three Fiber强大的材质和动画能力。

## 添加中央文字和技术图标标签

接着上面的工作，我又给作品集添加了中央文字内容和技术图标标签。这部分工作花了我不少时间，主要是处理文字朝向的问题。

### 完成的工作：

1. **创建独立的CenterText组件**
   
   我从TechIcons组件中分离出中央文字功能，创建了独立的`CenterText.jsx`文件。这样代码结构更清晰，也便于管理。使用了`@react-three/drei`中的`Text`组件实现3D文字效果。
   
   在`Experience.jsx`中引入并使用：
   ```jsx
   // Experience.jsx中导入
   import { CenterText } from "./CenterText";
   
   // 在场景中添加
   <group ref={sceneRef}>
     {/* 技术图标 */}
     <TechIcons />
     
     {/* 中央文字 */}
     <CenterText />
     
     {/* 主角色 */}
     <group position-y={-1.3} rotation-y={Math.PI}>
       <Avatar animations={animations} />
     </group>
   </group>
   ```

2. **实现多种文字内容选项**
   
   用Leva控制面板添加了三种不同的文字内容选项：个人介绍、技能介绍和合作意向。这样可以在不同场合展示不同内容，而不需要修改代码。
   
   ```jsx
   const { 
     showText, 
     textContent,
     textScale,
     textColor,
     glowColor,
     glowStrength
   } = useControls('中央文字', {
     showText: true,
     textContent: {
       options: ['个人介绍', '技能介绍', '合作意向'],
       value: '个人介绍'
     },
     textScale: { value: 1, min: 0.5, max: 2, step: 0.1 },
     textColor: '#ffffff',
     glowColor: '#00a2ff',
     glowStrength: { value: 0.5, min: 0, max: 1, step: 0.05 }
   });
   ```
   
   根据选择的内容类型显示不同的文字：
   ```jsx
   // 根据选择返回不同的文字内容
   const getTextContent = () => {
     switch(textContent) {
       case '个人介绍':
         return {
           line1: '嗨，我是 Leo',
           line2: '前端开发者 & 独立创作者',
           line3: '正在寻找远程合作机会'
         };
       // ...其他内容选项
     };
   };
   ```

3. **实现文字动画效果**
   
   给文字添加了渐入动画，三行文字依次出现，看起来挺酷的：
   
   ```jsx
   // 动画效果
   useEffect(() => {
     if (showText) {
       // 渐入动画
       const timer1 = setTimeout(() => setVisible(true), 500);
       const timer2 = setTimeout(() => setLine1Visible(true), 1000);
       const timer3 = setTimeout(() => setLine2Visible(true), 1800);
       const timer4 = setTimeout(() => setLine3Visible(true), 2600);
       
       // 清理定时器
       return () => {
         clearTimeout(timer1);
         clearTimeout(timer2);
         clearTimeout(timer3);
         clearTimeout(timer4);
       };
     }
   }, [showText, textContent]);
   ```
   
   还加了轻微的悬浮动画，让文字看起来更生动：
   
   ```jsx
   // 添加悬浮动画
   useFrame((state) => {
     if (groupRef.current && visible) {
       // 轻微的上下浮动
       groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
     }
   });
   ```

4. **添加文字发光效果**
   
   在文字背后加了发光平面，看起来像科幻电影里的全息投影：
   
   ```jsx
   {/* 发光效果 */}
   {line1Visible && (
     <mesh position={[0, 0, -0.05]} scale={[2.5, 0.5, 0.1]}>
       <planeGeometry />
       <meshBasicMaterial 
         color={glowColor} 
         transparent 
         opacity={glowStrength * 0.3}
         blending={THREE.AdditiveBlending}
       />
     </mesh>
   )}
   ```

5. **为技术图标添加标签**
   
   给技术图标添加了鼠标悬停时显示的标签，这样用户就能知道每个图标代表什么技术了：
   
   ```jsx
   // 获取技术名称的显示文本
   const displayName = useMemo(() => {
     const nameMap = {
       'c': 'C',
       'python': 'Python',
       'js': 'JavaScript',
       'vue': 'Vue.js',
       'blender': 'Blender',
       'react': 'React'
     };
     return nameMap[name] || name;
   }, [name]);
   
   // 在组件渲染中添加HTML标签
   {hovered && (
     <Html
       position={[position[0], position[1] + targetSize * 1.2, position[2]]}
       center
       distanceFactor={10}
     >
       <div style={{
         background: 'rgba(0,0,0,0.7)',
         color: 'white',
         padding: '6px 10px',
         borderRadius: '4px',
         fontSize: '14px'
       }}>
         {displayName}
       </div>
     </Html>
   )}
   ```

6. **修复文字朝向问题**
   
   这个问题让我卡了好久！添加的文字背对着用户，根本看不清内容。最后发现是因为3D空间中的朝向问题，用一行代码就解决了：
   
   ```jsx
   <group ref={groupRef} visible={visible} position={position} rotation={[0, Math.PI, 0]}>
     {/* 文字内容... */}
   </group>
   ```
   
   原来是因为我们的角色已经旋转了180度面向相机，文字也需要转过来才行。

### 遇到的问题与解决方案

1. **文字朝向问题**
   
   这个问题真的很烦人！一开始文字背对着用户，完全看不清。折腾了半天才发现，在3D空间中，Text组件默认朝向z轴正方向，而我们的相机在z轴负方向。
   
   解决方法其实很简单：给文字组添加`rotation={[0, Math.PI, 0]}`，旋转180度就行了。这个问题让我更深入理解了3D空间中的方向概念。

2. **组件结构优化**
   
   最初我把CenterText组件嵌在TechIcons组件里，结果代码越来越乱。后来把它分离出来作为独立组件，代码立刻清晰多了。

3. **响应式布局调整**
   
   在不同尺寸的屏幕上，文字大小和位置需要调整。我用了这段代码来处理：
   
   ```jsx
   // 响应式调整
   const isMobile = viewport.width < 5;
   const position = [0, 1, 0];
   const fontSize1 = isMobile ? 0.2 * textScale : 0.3 * textScale;
   const fontSize2 = isMobile ? 0.15 * textScale : 0.2 * textScale;
   const fontSize3 = isMobile ? 0.12 * textScale : 0.16 * textScale;
   ```
   

### Leva控制面板真好用

在这个项目中，我大量使用了Leva控制面板，它真的太方便了！可以在运行时调整各种参数，不用改代码重新编译。

1. **添加Leva依赖**
   ```bash
   npm install leva
   # 或
   yarn add leva
   ```

2. **为中央文字添加控制选项**
   ```jsx
   const { 
     showText,          // 显示/隐藏文字
     textContent,       // 文字内容选项
     textScale,         // 文字大小缩放
     textColor,         // 文字颜色
     glowColor,         // 发光效果颜色
     glowStrength       // 发光强度
   } = useControls('中央文字', {
     showText: true,
     textContent: {
       options: ['个人介绍', '技能介绍', '合作意向'],
       value: '个人介绍'
     },
     textScale: { value: 1, min: 0.5, max: 2, step: 0.1 },
     textColor: '#ffffff',
     glowColor: '#00a2ff',
     glowStrength: { value: 0.5, min: 0, max: 1, step: 0.05 }
   });
   ```

3. **为技术图标添加控制选项**
   ```jsx
   const {
     showIcons,
     iconSize,
     offsetX,
     rotationSpeed,
     showLabels
   } = useControls('技术图标', {
     showIcons: true,
     iconSize: { value: 0.3, min: 0.1, max: 0.5, step: 0.01 },
     offsetX: { value: 0.7, min: 0.3, max: 1.5, step: 0.1 },
     rotationSpeed: { value: 0.2, min: 0, max: 1, step: 0.1 },
     showLabels: true
   });
   ```

4. **为场景和角色添加控制选项**
   
   也给场景、角色动画和相机角度都添加了控制选项，这样就能随时调整各种效果了。

有了这些控制面板，我可以实时调整参数，快速找到最佳效果，不用反复修改代码和刷新页面，开发效率提高了很多！

### 下一步计划

1. 继续完善文字和图标的布局，确保在各种视角下都有良好的可读性
2. 添加更多交互功能，比如点击图标显示详细技能介绍
3. 实现项目展示区域，展示我的个人项目
4. 优化加载性能，特别是针对移动设备

## 参考资源

- 视频教程：[Build a 3D Portfolio with React Three Fiber - Avatar animations](https://www.youtube.com/watch?v=pGMKIyALcK0)
- 基础模板：[r3f-vite-starter](https://github.com/wass08/r3f-vite-starter)
- 角色创建：[ReadyPlayerMe](https://readyplayer.me/avatar)
- 动画资源：[Mixamo](https://www.mixamo.com/)
- 模型转换：[Blender](https://www.blender.org/)
- 教程作者：[Wawa Sensei](https://wawasensei.dev/)
- Three.js文档：[Three.js Materials](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial)
- React Three Fiber：[R3F Documentation](https://docs.pmnd.rs/react-three-fiber/) 
- Three.js文字：[Three.js Text](https://threejs.org/docs/#examples/en/geometries/TextGeometry)
- React Three Drei：[Text Component](https://github.com/pmndrs/drei#text)
- 3D空间中的方向：[Understanding 3D Transformations](https://threejs.org/docs/#manual/en/introduction/Matrix-transformations)
- HTML覆盖：[HTML Component](https://github.com/pmndrs/drei#html)

## Day 5: 添加页面滚动和内容分区 (2025-06-01)

今天主要解决了作品集网站的内容组织问题。之前所有内容都堆在一个页面上，看起来很乱，决定使用ScrollControls把内容分成几个部分。

### 完成的工作：

1. **添加滚动控制器**
   - 在App.jsx中引入ScrollControls组件
   ```jsx
   import { ScrollControls, Scroll, OrbitControls } from "@react-three/drei";
   ```
   - 将整个Experience组件包装在ScrollControls中
   ```jsx
   <ScrollControls pages={4} damping={0.1}>
     <Experience />
     <Scroll html>
       <h1 className="text-3xl font-bold underline">Hello World</h1>
     </Scroll>
   </ScrollControls>
   ```
   - 设置pages={4}表示内容分为4页，damping={0.1}让滚动更平滑

2. **删除OrbitControls解决滚动冲突**
   - 初始导入了OrbitControls但发现严重问题：OrbitControls会捕获鼠标事件，导致滚动功能失效
   - 虽然可以使用相机旋转查看3D场景，但与页面滚动完全冲突
   - 在App.jsx中删除了`<OrbitControls />`组件：
   ```jsx
   // 修改前
   <Canvas shadows camera={{ position: [0, 2, 5], fov: 30 }}>
     <color attach="background" args={["#ececec"]} />
     <ScrollControls pages={4} damping={0.1}>
       <Experience />
       <OrbitControls /> {/* 这行会破坏滚动功能 */}
       <Scroll html>
         <h1 className="text-3xl font-bold underline">Hello World</h1>
       </Scroll>
     </ScrollControls>
   </Canvas>
   
   // 修改后
   <Canvas shadows camera={{ position: [0, 2, 5], fov: 30 }}>
     <color attach="background" args={["#ececec"]} />
     <ScrollControls pages={4} damping={0.1}>
       <Experience />
       {/* 删除了OrbitControls */}
       <Scroll html>
         <h1 className="text-3xl font-bold underline">Hello World</h1>
       </Scroll>
     </ScrollControls>
   </Canvas>
   ```
   - 删除OrbitControls后，滚动功能立即恢复正常
   - 注意：如果需要同时支持相机控制和滚动，需要进行额外配置，比如设置OrbitControls的enableZoom={false}和enablePan={false}

3. **修改相机位置**
   - 发现所有内容（角色、图标、文字）都背对着我，原来是相机位置问题
   - 将App.jsx中的相机位置从：
   ```jsx
   <Canvas shadows camera={{ position: [0, 2, 5], fov: 30 }}>
   ```
   改为：
   ```jsx
   <Canvas shadows camera={{ position: [0, 2, -5], fov: 30 }}>
   ```
   - 这样相机从场景的另一侧观察，所有内容自然就面向用户了

4. **添加部分指示器**
   - 为了让用户知道当前在哪个部分，添加了简单的部分指示器
   - 在Experience.jsx中添加状态跟踪当前部分：
   ```jsx
   // 添加状态管理当前部分
   const [section, setSection] = useState(0);
   ```
   - 引入useScroll钩子获取滚动信息
   ```jsx
   import { useScroll } from "@react-three/drei";
   
   // 使用useScroll钩子获取滚动信息
   const scroll = useScroll();
   ```
   - 在useFrame中监听滚动位置，并更新当前部分
   ```jsx
   // 在useFrame中监听滚动位置
   useFrame(() => {
     // 计算当前部分 (0-3，对应4页内容)
     const currentSection = Math.floor(scroll.offset * 4);
     if (currentSection !== section) {
       setSection(currentSection);
       console.log(`当前部分: ${currentSection}`);
     }
   });
   ```
   - 还在HTML部分添加了可见的指示器小圆点，对应每个部分
   ```jsx
   // 在Scroll html中添加
   <div className="section-indicators">
     {[0, 1, 2, 3].map(idx => (
       <div 
         key={idx} 
         className={`indicator ${section === idx ? 'active' : ''}`}
         onClick={() => scrollToSection(idx)}
       />
     ))}
   </div>
   ```
   - 添加对应的CSS样式：
   ```css
   .section-indicators {
     position: fixed;
     right: 20px;
     top: 50%;
     transform: translateY(-50%);
     display: flex;
     flex-direction: column;
     gap: 10px;
   }
   
   .indicator {
     width: 10px;
     height: 10px;
     border-radius: 50%;
     background-color: rgba(255, 255, 255, 0.5);
     cursor: pointer;
     transition: all 0.3s;
   }
   
   .indicator.active {
     background-color: white;
     transform: scale(1.2);
   }
   ```
   
5. **实现平滑过渡**
   - 添加了部分之间的过渡动画，使滚动体验更加流畅
   - 引入需要的库：
   ```jsx
   import { useSpring } from "@react-spring/three";
   import * as THREE from "three";
   ```
   - 使用useSpring实现弹性动画效果：
   ```jsx
   // 使用useSpring实现平滑过渡
   const { cameraPosition } = useSpring({
     cameraPosition: [0, 2 + section * 0.2, -5 + section * 0.5],
     config: { tension: 70, friction: 20 }
   });
   
   // 在useFrame中应用相机位置
   useFrame((state) => {
     if (cameraPosition.length > 0) {
       // 使用lerp进行平滑插值
       state.camera.position.lerp(
         new THREE.Vector3(...cameraPosition), 
         0.05
       );
       // 确保相机始终看向场景中心
       state.camera.lookAt(0, 0, 0);
     }
   });
   ```
   - 添加点击指示器跳转到对应部分的功能：
   ```jsx
   // 滚动到指定部分的函数
   const scrollToSection = (idx) => {
     // 使用scrollTo方法平滑滚动
     scroll.el.scrollTo({
       top: idx / 4 * scroll.el.scrollHeight,
       behavior: 'smooth'
     });
   };
   ```

### 遇到的问题与解决方案

1. **OrbitControls与滚动冲突**
   - 问题：添加了ScrollControls后，无法滚动页面
   - 原因：OrbitControls捕获了所有鼠标事件，阻止了滚动事件传递
   - 解决方案：完全移除OrbitControls组件
   - 如果必须保留OrbitControls，可尝试以下方法：
     ```jsx
     <OrbitControls 
       enableZoom={false} 
       enablePan={false} 
       enableRotate={true}
       minPolarAngle={Math.PI / 2}
       maxPolarAngle={Math.PI / 2}
     />
     ```
   - 但最干净的解决方案是直接移除它，让ScrollControls完全控制用户交互

2. **相机朝向问题**
   - 问题：所有内容都背对着用户，看不清脸
   - 原因：相机位置在z轴正向(position: [0, 2, 5])，而模型面向z轴负向
   - 解决方案：将相机位置改为z轴负向(position: [0, 2, -5])
   - 这个简单的修改解决了困扰我好几天的问题！

3. **滚动同步问题**
   - 问题：3D内容滚动与HTML内容滚动不同步
   - 原因：没有正确设置Scroll组件的props
   - 解决方案：分别使用Scroll和Scroll.html，并传入相同的滚动控制参数
   ```jsx
   <ScrollControls pages={4} damping={0.1}>
     <Scroll>
       <Experience />
     </Scroll>
     <Scroll html>
       {/* HTML内容 */}
     </Scroll>
   </ScrollControls>
   ```

4. **部分切换卡顿**
   - 问题：滚动切换部分时画面卡顿
   - 原因：部分之间的切换是瞬间的，没有过渡效果
   - 解决方案：使用useSpring和lerp实现平滑的相机移动
   - 调整tension和friction参数，找到最适合的过渡速度
   - 使用较小的lerp系数(0.05)确保过渡足够平滑

### 完整实现步骤

如果要完全重现这个功能，需要按照以下步骤操作：

1. **首先确保安装所有依赖**
   ```bash
   npm install @react-three/drei @react-spring/three
   # 或
   yarn add @react-three/drei @react-spring/three
   ```

2. **修改App.jsx文件**
   ```jsx
   import { Canvas } from "@react-three/fiber";
   import { Experience } from "./components/Experience";
   import { ScrollControls, Scroll } from "@react-three/drei";
   
   function App() {
     return (
       <Canvas shadows camera={{ position: [0, 2, -5], fov: 30 }}>
         <color attach="background" args={["#ececec"]} />
         <ScrollControls pages={4} damping={0.1}>
           <Scroll>
             <Experience />
           </Scroll>
           <Scroll html>
             <div className="section-indicators">
               {[0, 1, 2, 3].map(idx => (
                 <div 
                   key={idx} 
                   className={`indicator ${section === idx ? 'active' : ''}`}
                   onClick={() => scrollToSection(idx)}
                 />
               ))}
             </div>
           </Scroll>
         </ScrollControls>
       </Canvas>
     );
   }
   
   export default App;
   ```

3. **修改Experience.jsx组件**
   ```jsx
   import { useRef, useState } from "react";
   import { useFrame } from "@react-three/fiber";
   import { useScroll } from "@react-three/drei";
   import { useSpring } from "@react-spring/three";
   import * as THREE from "three";
   import { TechIcons } from "./TechIcons";
   import { CenterText } from "./CenterText";
   import { Avatar } from "./Avatar";
   
   export const Experience = () => {
     // 场景引用
     const sceneRef = useRef();
     // 当前部分状态
     const [section, setSection] = useState(0);
     // 角色动画状态
     const [animations, setAnimations] = useState("standing");
     // 获取滚动信息
     const scroll = useScroll();
     
     // 使用弹簧动画系统处理相机移动
     const { cameraPosition } = useSpring({
       cameraPosition: [0, 2 + section * 0.2, -5 + section * 0.5],
       config: { tension: 70, friction: 20 }
     });
     
     // 每帧更新
     useFrame((state) => {
       // 检测当前滚动部分
       const currentSection = Math.floor(scroll.offset * 4);
       if (currentSection !== section) {
         setSection(currentSection);
         
         // 根据部分切换角色动画
         switch(currentSection) {
           case 0:
             setAnimations("standing");
             break;
           case 1:
             setAnimations("walk");
             break;
           case 2:
             setAnimations("standing");
             break;
           case 3:
             setAnimations("falling");
             break;
           default:
             setAnimations("standing");
         }
       }
       
       // 平滑更新相机位置
       if (cameraPosition.length > 0) {
         state.camera.position.lerp(
           new THREE.Vector3(...cameraPosition), 
           0.05
         );
         state.camera.lookAt(0, 0, 0);
       }
     });
     
     return (
       <group ref={sceneRef}>
         {/* 技术图标 */}
         <TechIcons />
         
         {/* 中央文字 */}
         <CenterText />
         
         {/* 主角色 */}
         <group position-y={-1.3} rotation-y={Math.PI}>
           <Avatar animations={animations} />
         </group>
         
         {/* 环境光 */}
         <ambientLight intensity={1} />
       </group>
     );
   };
   ```

4. **添加必要的CSS样式**
   ```css
   /* 在index.css或单独的样式文件中 */
   .section-indicators {
     position: fixed;
     right: 20px;
     top: 50%;
     transform: translateY(-50%);
     display: flex;
     flex-direction: column;
     gap: 10px;
   }
   
   .indicator {
     width: 10px;
     height: 10px;
     border-radius: 50%;
     background-color: rgba(255, 255, 255, 0.5);
     cursor: pointer;
     transition: all 0.3s;
   }
   
   .indicator.active {
     background-color: white;
     transform: scale(1.2);
   }
   ```

### 下一步计划

1. 继续完善各个部分的内容：
   - 第1部分(Hero)：展示角色和个人介绍
   - 第2部分(Projects)：展示个人项目作品
   - 第3部分(Skills)：展示技术栈和技能图标
   - 第4部分(Contact)：展示联系方式和社交媒体链接

2. 为每个部分添加独特的视觉效果和交互方式

3. 优化移动端体验，确保在不同设备上都有良好的显示效果 