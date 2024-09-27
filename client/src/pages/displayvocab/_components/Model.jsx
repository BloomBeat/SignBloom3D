import React, { useEffect, useRef } from "react"
import { useLoader, useFrame } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import * as THREE from "three"

const Model = ({ modelUrl }) => {
  const gltf = useLoader(GLTFLoader, modelUrl)
  const mixer = useRef()
  // const animationName = "Root|clip|Base_Layer Retarget.001"
  const animationName = "Root|clip|Base_Layer Retarget"
  useEffect(() => {
    // Log all animation names
    // console.log("All animations:")
    // gltf.animations.forEach((animation, index) => {
    //   console.log(`${index}: ${animation.name}`)
    // })

    if (gltf.animations.length) {
      mixer.current = new THREE.AnimationMixer(gltf.scene)
      let clip = THREE.AnimationClip.findByName(gltf.animations, animationName)
      if (!clip && !isNaN(parseInt(animationName))) {
        const index = parseInt(animationName)
        if (index >= 0 && index < gltf.animations.length) {
          clip = gltf.animations[index]
        }
      }

      if (clip) {
        const action = mixer.current.clipAction(clip)
        action.play()
        // console.log(`Playing animation: ${clip.name}`)
      } else {
        console.log(`Animation not found: ${animationName}`)
      }
    }

    return () => {
      mixer.current?.stopAllAction()
    }
  }, [gltf, animationName])

  useFrame((state, delta) => {
    mixer.current?.update(delta)
  })

  return <primitive object={gltf.scene} scale={1} />
}

export default Model
