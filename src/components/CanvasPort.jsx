import React from "react";
import { Canvas } from '@react-three/fiber'
import { View } from "@react-three/drei";

function CanvasPort() {
   return (
      <Canvas
         className="w-full h-full"
         style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            overflow: "hidden",
         }}
        //  eventSource={document.getElementById('root')}
      >
         <View.Port />
      </Canvas>
   );
}

export default CanvasPort;
