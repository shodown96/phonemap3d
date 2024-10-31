"use client"
import { UploadFileInput } from '@/components/custom/UploadFileInput';
import IPhone from '@/components/IPhone';
import Lights from '@/components/Lights';
import CanvasLoader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { yellowImg } from '@/lib/constants';
import { initialDetailValues, usePhoneStore } from '@/lib/store';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import html2canvas from 'html2canvas';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import { Textarea } from '@/components/ui/textarea';
import { PhoneParamsSchema, PhoneParamsType } from '@/lib/validations';
import { useFormik } from "formik";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  const groupRef = useRef(new THREE.Group());
  const { files, setFiles, setDetails, details } = usePhoneStore()
  const [model, setModel] = useState({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
    img: yellowImg,
  })


  const cameraPostion = new THREE.Vector3(2.5, 0, -4);

  const formik = useFormik<PhoneParamsType>({
    initialValues: details,
    validationSchema: PhoneParamsSchema,
    validateOnBlur: true,
    onSubmit: values => {
      setDetails(values)
      router.push("/showcase")
    },
  });
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    values,
    isSubmitting,
  } = formik;

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
    if (files.length) {
      mapImageToPhone()
    } else {
      setModel({
        ...model,
        img: yellowImg
      })
    }
  }, [files])

  useEffect(() => {
    return () => URL.revokeObjectURL(model.img);
  }, [])

  return (
    <div className="h-screen grid grid-cols-12" id="3d-scene">
      <div className="max-lg:col-span-12 col-span-7 bg-scene bg-center bg-cover min-h-[400px]">
        <Canvas>
          <ambientLight intensity={0.3} />
          <PerspectiveCamera makeDefault position={cameraPostion} onUpdate={v => console.log(v)} onWheel={x => console.log(x)} />
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
      <div className='max-lg:col-span-12 col-span-5 bg-white'>

        <div className='flex flex-col gap-2 p-10'>
          <h4 className='text-3xl font-bold'>PhoneMap3D</h4>
          <p className='mb-4'>
            Upload an image that matches the display dimensions of the iPhone 15 Pro Max (1290 x 2796 pixels) to ensure a perfect fit for showcasing on the 3D model.{" "}
            <b>Click and drag the phone for rotation.</b>
          </p>
          <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
            <Input
              id="title"
              label="Title"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.title}
              error={errors.title}
              touched={touched.title}
              placeholder={"Enter a title"}
            />
            <Textarea
              id="description"
              label="Description"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              error={errors.description}
              touched={touched.description}
              placeholder={"Enter a description"}
            />
            <Input
              id="iphoneLink"
              label="iPhone Link"
              type='url'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.iphoneLink}
              error={errors.iphoneLink}
              touched={touched.iphoneLink}
              placeholder={"Enter an iPhone Link"}
            />
            <Input
              id="androidLink"
              label="Android Link"
              type='url'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.androidLink}
              error={errors.androidLink}
              touched={touched.androidLink}
              placeholder={"Enter an Android Link"}
            />
            <UploadFileInput
              files={files}
              label='Screenshot'
              dropzoneOptions={{
                multiple: false,
                maxSize: 1024 * 1024 * 4,
                accept: {
                  'image/jpeg': [],
                  'image/png': []
                },
              }}
              setFiles={values => {
                if (!values) {
                  return
                }
                setFiles(values)
              }} />
            <div className="flex items-center gap-5 flex-wrap">
              {/* <Button
                disabled={!files.length}
                onClick={mapImageToPhone}>
                Map image to iPhone
              </Button> */}
              <Button
                className='gap-1 items-center'
                disabled={!files.length || !formik.isValid}
                loading={isSubmitting}
              // onClick={handleDownloadImage}
              >
                Showcase
                {/* <Camera /> <span>Take a screenshot</span> */}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
// TODO: compress image or resize or crop image to fit texture
// Make it render videos and record?
// screemshot