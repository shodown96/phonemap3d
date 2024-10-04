import { Html, useProgress } from '@react-three/drei';

const CanvasLoader = () => {
    const { progress } = useProgress();
    return (
        <Html
            as="div"
            center
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}>
            <span className="canvas-loader"></span>
            <p
                style={{
                    fontSize: 14,
                    color: '#F1F1F1',
                    fontWeight: 800,
                    marginTop: 40,
                }}>
                {progress !== 0 ? `${progress.toFixed(2)}%` : 'Loading...'}
            </p>
        </Html>
    );
};

export default CanvasLoader;


// import { Html } from '@react-three/drei'
// import React from 'react'

// const Loader = () => {
//   return (
//     <Html>
//       <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
//         <div className="w-[10vw] h-[10vw] rounded-full">
//           Loading...
//         </div>
//       </div>
//     </Html>
//   )
// }

// export default Loader