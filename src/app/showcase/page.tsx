"use client"
import { UploadFileInput } from '@/components/custom/UploadFileInput';
import IPhone from '@/components/IPhone';
import Lights from '@/components/Lights';
import CanvasLoader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { yellowImg } from '@/lib/constants';
import { usePhoneStore } from '@/lib/store';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import html2canvas from 'html2canvas';
import { AppleIcon, Camera, PlayIcon } from 'lucide-react';
import Link from 'next/link';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';


function ShowcasePage() {
    const groupRef = useRef(new THREE.Group());
    const { files, setFiles, details } = usePhoneStore()
    const [model, setModel] = useState({
        title: 'iPhone 15 Pro in Natural Titanium',
        color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
        img: yellowImg,
    })

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
        if (files.length) {
            const newImg = URL.createObjectURL(files[0])
            setModel({
                ...model,
                img: newImg
            })
        }
        return () => URL.revokeObjectURL(model.img);
    }, [files])
    const cameraPostion = new THREE.Vector3(2, 0, -2.5);
    return (

        <div className="h-screen grid grid-cols-12 bg-scene bg-no-repeat bg-cover" id="3d-scene">
            <div className="max-lg:col-span-12 col-span-7 bg-center bg-cover min-h-[400px]">
                <Canvas>
                    <ambientLight intensity={0.3} />
                    <PerspectiveCamera makeDefault position={cameraPostion} onUpdate={v => console.log(v)} onWheel={x => console.log(x)} />
                    <Lights />

                    <OrbitControls
                        enableZoom={false}
                        maxPolarAngle={Math.PI / 2}
                    />

                    <group ref={groupRef} name={"large"} position={[0, 0, 0]}>
                        {model.img ? (
                            <Suspense fallback={<CanvasLoader />}>
                                <IPhone
                                    scale={[15, 15, 15]}
                                    item={model}
                                    size={"large"}
                                />
                            </Suspense>
                        ) : null}
                    </group>
                </Canvas>
            </div>
            <div className='max-lg:col-span-12 col-span-5 text-white bg-transparent'>

                <div className='flex flex-col gap-2 p-10 pt-[300px]'>
                    <h4 className='text-3xl font-bold'>{details.title || "Title"}</h4>
                    <p className='mb-4'>
                        {details.description || 'Buy this mehn'}
                    </p>

                    <div className="flex items-center gap-5 flex-wrap">
                        <Link href="#">
                            <Button disabled={!files.length} className='gap-1 items-center bg-black border p-6'>
                                <AppleIcon /> Buy from iPhone
                            </Button>
                        </Link>
                        <Link href="#">
                            <Button
                                className='gap-1 items-center bg-black border p-6'
                                disabled={!files.length}>
                                <PlayIcon /> <span>Buy from Andoird</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowcasePage