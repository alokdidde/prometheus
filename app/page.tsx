"use client";
// import { useRef, useState, useEffect } from 'react'
// import * as THREE from 'three'
// import { Canvas, useFrame } from '@react-three/fiber'
// import { Cloud, Stars, Html } from '@react-three/drei'
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { SignIn } from '@/components/sign-in';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

// function FloatingParticles({ count = 100 }) {
//   const mesh = useRef<THREE.Points>(null);
//   const [positions, setPositions] = useState<number[]>([]);

//   useEffect(() => {
//     const newPositions = []
//     for (let i = 0; i < count; i++) {
//       newPositions.push(
//         Math.random() * 20 - 10,
//         Math.random() * 20 - 10,
//         Math.random() * 20 - 15
//       )
//     }
//     setPositions(newPositions)
//   }, [count])

//   useFrame(() => {
//     if (mesh.current) {
//       mesh.current.rotation.x += 0.0005
//       mesh.current.rotation.y += 0.0005
//     }
//   })

//   return (
//     <points ref={mesh}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={positions.length / 3}
//           array={new Float32Array(positions)}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.5} />
//     </points>
//   )
// }

function GlassmorphicUI() {
  return (
      <div className="w-full h-full flex flex-col p-8">
        <main className="flex-grow flex flex-col items-start justify-center max-w-md mx-auto w-full">
          <div className="flex items-center justify-between w-full mb-8">
            <h1 className="text-6xl font-bold text-white">
              Happening now
            </h1>
            <span className="text-6xl" role="img" aria-label="Moon">🌙</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-8">
            Join today.
          </h2>
          <div className="w-full space-y-4">
            <Button 
              variant="outline" 
              className="w-full h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300 shadow-[0_4px_12px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_16px_rgba(255,255,255,0.25)] relative overflow-hidden group"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/50 to-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <div className="relative z-10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign up with Google
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="w-full h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300 shadow-[0_4px_12px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_16px_rgba(255,255,255,0.25)] relative overflow-hidden group"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-500/50 to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <div className="relative z-10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2">
                  <path
                    fill="currentColor"
                    d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"
                  />
                </svg>
                Sign up with Apple
              </div>
            </Button>
            <SignIn />
            <div className="flex items-center gap-4 my-4">
              <div className="h-px bg-white/20 flex-grow" />
              <span className="text-white text-sm">or</span>
              <div className="h-px bg-white/20 flex-grow" />
            </div>
            <Button 
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-[0_4px_12px_rgba(59,130,246,0.5)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.7)] backdrop-blur-md border border-white/20"
            >
              Create account
            </Button>
            <p className="text-sm text-white/80 mt-2">
              By signing up, you agree to the{" "}
              <Link href="/terms" className="text-blue-300 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-blue-300 hover:underline">
                Privacy Policy
              </Link>
              , including{" "}
              <Link href="/cookie-use" className="text-blue-300 hover:underline">
                Cookie Use
              </Link>
              .
            </p>
            <div className="mt-10">
              <p className="text-white font-bold mb-4">Already have an account?</p>
              <Button 
                variant="outline" 
                className="w-full h-12 bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300 shadow-[0_4px_12px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_16px_rgba(255,255,255,0.2)] relative overflow-hidden group"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                <span className="relative z-10">Sign in</span>
              </Button>
            </div>
          </div>
        </main>
      </div>
  )
}

export default function HomePage() {

  const { data: session } = useSession();
  console.log(session);
  if (session) {
    redirect('/feed'); // Redirect if the user is authenticated
  }

  return (
    <div className="w-full h-screen bg-stone-800">
      {/* <Canvas camera={{ position: [0, 0, 5] }}> */ }
        {/* <color attach="background" args={['#000020']} /> */}
         {/* <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Cloud position={[-4, 2, 0]} speed={0.2} opacity={0.5} />
        <Cloud position={[4, -2, -5]} speed={0.2} opacity={0.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} /> */}
        {/* <FloatingParticles /> */}
        <GlassmorphicUI />
      {/* </Canvas> */}
    </div>
  )
}