import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Scroll } from "@react-three/drei";
import { useState, Suspense } from "react";
import { Hero } from "./sections/Hero";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";
import { Contact } from "./sections/Contact";
import { PageIndicator } from "./components/PageIndicator";
import { Loader } from "./components/Loader";
import { CustomScrollControls } from "./components/ScrollControls";

function App() {
  const [section, setSection] = useState(0);
  
  // 滚动到指定部分的函数
  const scrollToSection = (idx) => {
    // 这里会由Experience组件中的代码更新
    setSection(idx);
  };
  
  return (
    <>
      {/* 加载状态指示器 */}
      <Loader />
      
      <Canvas shadows camera={{ position: [0, 2, -5], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <Suspense>
          <CustomScrollControls pages={4} damping={0.1} setSection={setSection}>
            <Scroll>
              <Experience currentSection={section} setSection={setSection} />
            </Scroll>
            <Scroll html>
              <Hero />
              
              {/* 分页指示器 */}
              <PageIndicator section={section} scrollToSection={scrollToSection} />
              
              {/* 不同部分的组件 */}
              <Projects />
              <Skills />
              <Contact />
            </Scroll>
          </CustomScrollControls>
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
