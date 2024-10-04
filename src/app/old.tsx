"use client"
import IPhone from '@/components/IPhone';
import Lights from '@/components/Lights';
import CanvasLoader from '@/components/Loader';
// import CanvasPort from '@/components/CanvasPort'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'; // useful utilities for 3D control
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';

import { yellowImg } from '@/lib/utils';
import * as THREE from 'three';


export default function Home() {

  const controlRef = useRef<any>(null);
  const groupRef = useRef(new THREE.Group());
  const [rotation, setRotationState] = useState(0);
  const [model, setModel] = useState({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
    img: yellowImg,
  })

  return (
    <div className="h-screen">
      {/* <View
        id={"view1"}
        className={`w-full h-full absolute`}
      > */}
      {/* Ambient Light */}
      <Canvas>
        <ambientLight intensity={0.3} />
        <PerspectiveCamera makeDefault position={[0, 0, 4]} />
        <Lights />

        <OrbitControls
          // makeDefault
          // ref={controlRef}
          // enableZoom={false}
          // enablePan={false}
          // rotateSpeed={0.4}
          maxPolarAngle={Math.PI / 2}
        // target={new THREE.Vector3(0, 0, 0)}
        // onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
        />

        <group ref={groupRef} name={"large"} position={[0, 0, 0]}>
          <Suspense fallback={<CanvasLoader />}>
            <IPhone
              scale={[15, 15, 15]}
              item={model}
              size={"large"}
            />
          </Suspense>
        </group>
      </Canvas>
      {/* </View> */}
      {/* <CanvasPort /> */}
    </div>
  );
}
