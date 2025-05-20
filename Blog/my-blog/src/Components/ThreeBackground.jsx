// src/Components/ThreeBackground.jsx
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export const ThreeBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars
          radius={100}      // how far the stars spread
          depth={50}        // starfield depth
          count={6000}      // number of stars
          factor={4}        // size of stars
          saturation={0}    // grayscale stars
          fade              // fade edges of starfield
          speed={1}         // animation speed
        />
      </Canvas>
    </div>
  );
};
