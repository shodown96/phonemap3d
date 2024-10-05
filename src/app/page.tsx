"use client"
import { UploadFileInput } from '@/components/custom/UploadFileInput';
import IPhone from '@/components/IPhone';
import Lights from '@/components/Lights';
import CanvasLoader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { yellowImg } from '@/lib/constants';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import html2canvas from 'html2canvas';
import { Camera } from 'lucide-react';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Home() {
  const groupRef = useRef(new THREE.Group());
  const [files, setFiles] = useState<File[]>([]);
  const [model, setModel] = useState({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
    img: yellowImg,
  })
  const mapImageToPhone = () => {
    try {
      URL.revokeObjectURL(model.img);
    } catch (error) {
      // console.log(error)
    }
    const file = files[0];
    const objectUrl = URL.createObjectURL(file);
    setModel({
      ...model,
      img: objectUrl
    })
  }
  const handleDownloadImage = async () => {
    const element = document.getElementById('3d-scene');
    if (element) {
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL('image/jpg');
      const link = document.createElement('a');

      link.href = data;
      link.download = 'downloaded-image.jpg';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

  };
  useEffect(() => {
    return () => URL.revokeObjectURL(model.img);
  }, [])

  return (
    <div className="h-screen grid grid-cols-12">
      <div className="max-lg:col-span-12 col-span-6 bg-scene bg-center bg-cover" id="3d-scene">
        <Canvas>
          <ambientLight intensity={0.3} />
          <PerspectiveCamera makeDefault position={[0, 0, 4]} />
          <Lights />

          <OrbitControls
            // makeDefault
            // ref={controlRef}
            enableZoom={false}
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
      </div>
      <div className='max-lg:col-span-12 col-span-6 bg-white'>

        <div className='flex flex-col gap-2 p-10'>
          <h4 className='text-3xl font-bold'>PhoneMap3D</h4>
          <p className='mb-4'>
            Upload an image that matches the display dimensions of the iPhone 15 Pro Max (1290 x 2796 pixels) to ensure a perfect fit for showcasing on the 3D model.{" "}
            <b>Click and drag the phone for rotation.</b>
          </p>
          <UploadFileInput
            files={files}
            dropzoneOptions={{
              multiple: false,
              maxSize: 1024 * 1024 * 4,
              accept: {
                'image/jpeg': [],
                'image/png': []
              },
            }}
            setFiles={values => {
              if (!values) return;
              setFiles(values)
            }} />
          <div className="flex items-center gap-5">
            <Button
              disabled={!files.length}
              onClick={mapImageToPhone}>
              Map image to iPhone
            </Button>
            <Button
              className='gap-1 items-center'
              disabled={!files.length}
              onClick={handleDownloadImage}>
              <Camera /> <span>Take a screenshot</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
// TODO: compress image or resize or crop image to fit texture
// Make it render videos and record?
// screemshot