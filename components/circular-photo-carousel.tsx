"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Sparkles, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

const photos = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dmxmjjqy2/image/upload/v1753983840/IMG-20250729-WA0048_apux2y.jpg",
    caption: "Our first meet 🌅💕",
    
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dmxmjjqy2/image/upload/v1753983839/IMG-20250604-WA0060_qbu26k.jpg",
    caption: "Cozy movie date 🍿✨",
    
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/dmxmjjqy2/image/upload/v1753983840/IMG-20250729-WA0049_rhjsbv.jpg",
    caption: "Getting Butterflies 🦋❤️",
    
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dmxmjjqy2/image/upload/v1753983839/IMG-20250729-WA0045_hysgnn.jpg",
    caption: "My favvv Desert 😋🥰",
    
  },
  {
    // ?height=300&width=300
    id: 5,
    src: "https://res.cloudinary.com/dmxmjjqy2/image/upload/v1753983839/IMG-20250729-WA0001_dlncfo.jpg",
    caption: "Cuteness Overloaded 😍😻",
    
  },
  {
    id: 6,
    src: "https://res.cloudinary.com/dmxmjjqy2/image/upload/v1753983839/IMG-20250727-WA0005_kg9ebp.jpg",
    caption: "Mere Sapno ki Rani 😄📸",
    
  },
  {
    id: 7,
    src: "https://res.cloudinary.com/dmxmjjqy2/image/upload/v1753983840/IMG-20250729-WA0046_su6sge.jpg",
    caption: "Lifelong Memoriezzzz 🌸🧺",
    
  },
  {
    id: 8,
    src: "https://res.cloudinary.com/dmxmjjqy2/image/upload/v1753983839/IMG-20250729-WA0044_yv0zzt.jpg",
    caption: "7 Janmon ka Bandhan 💍❤️",
    
  },
]

export default function CircularPhotoCarousel() {
  const [rotation, setRotation] = useState(0)
  const [selectedPhoto, setSelectedPhoto] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(true)

  useEffect(() => {
    if (isAutoRotating) {
      const interval = setInterval(() => {
        setRotation((prev) => prev + 45)
        setSelectedPhoto((prev) => (prev + 1) % photos.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isAutoRotating])

  const handlePhotoClick = (index: number) => {
    setSelectedPhoto(index)
    setRotation(index * -45)
    setIsAutoRotating(false)
  }

  const toggleAutoRotation = () => {
    setIsAutoRotating(!isAutoRotating)
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-pink-600 mb-8 drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📸 Our Magical Memory Circle 📸
      </motion.h2>

      <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* 3D Circular Carousel */}
        <div className="relative w-96 h-96 mx-auto" style={{ perspective: "1000px" }}>
          <motion.div
            className="relative w-full h-full"
            style={{
              transformStyle: "preserve-3d",
            }}
            animate={{
              rotateZ: rotation,
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
          >
            {photos.map((photo, index) => {
              const angle = (index * 360) / photos.length
              const radius = 150

              return (
                <motion.div
                  key={photo.id}
                  className="absolute w-24 h-24 cursor-pointer"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `
                      translate(-50%, -50%) 
                      rotateZ(${angle}deg) 
                      translateY(-${radius}px) 
                      rotateZ(-${angle}deg)
                    `,
                  }}
                  // onClick={() => handlePhotoClick(index)}
                  // whileHover={{ scale: 1.2, zIndex: 10 }}
                  // whileTap={{ scale: 0.9 }}
                >
                  <div
                    className={`relative w-full h-full rounded-full overflow-hidden border-4 transition-all duration-300 ${
                      index === selectedPhoto
                        ? "border-yellow-400 shadow-2xl shadow-yellow-400/50"
                        : "border-white/50 hover:border-pink-400"
                    }`}
                    style={{
                      filter:
                        index === selectedPhoto
                          ? "brightness(1.2) contrast(1.1) saturate(1.3)"
                          : "brightness(0.8) contrast(0.9)",
                    }}
                  >
                    <img
                      src={photo.src || "/placeholder.svg"}
                      alt={photo.caption}
                      className="w-full h-full object-cover transition-all duration-300"
                    />

                    {/* Magical overlay effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Sparkle effect on selected photo */}
                    {index === selectedPhoto && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute text-yellow-300"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                              scale: [0, 1, 0],
                              rotate: [0, 180, 360],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: Math.random() * 1.5,
                            }}
                          >
                            <Sparkles className="w-3 h-3" />
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )
            })}

            {/* Center heart */}
            <motion.div
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-pink-400"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Heart className="w-12 h-12 fill-current" />
            </motion.div>
          </motion.div>
        </div>

        {/* Selected Photo Display */}
        <div className="flex-1 max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPhoto}
              initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30">
                <img
                  src={photos[selectedPhoto].src || "/placeholder.svg"}
                  alt={photos[selectedPhoto].caption}
                  className="w-full h-full object-cover transition-all duration-500"
                  style={{
                    filter: "brightness(1.1) contrast(1.2) saturate(1.4) hue-rotate(5deg)",
                  }}
                />

                {/* Magical gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-pink-500/20"></div>

                {/* Floating hearts around selected image */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-pink-300"
                      style={{
                        left: `${10 + i * 10}%`,
                        top: `${10 + i * 8}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 1, 0.3],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 2 + Math.random(),
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.3,
                      }}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </motion.div>
                  ))}
                </div>

                {/* Photo info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black/60 to-transparent">
                  <motion.p
                    className="text-xl font-semibold mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {photos[selectedPhoto].caption}
                  </motion.p>
                  <motion.p
                    className="text-sm opacity-80"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {/* {photos[selectedPhoto].date} */}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center mt-6">
            <Button
              onClick={toggleAutoRotation}
              className={`${
                isAutoRotating
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  : "bg-gradient-to-r from-gray-500 to-slate-500 hover:from-gray-600 hover:to-slate-600"
              } text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-200`}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {isAutoRotating ? "Auto Rotating" : "Start Auto Rotation"}
            </Button>
          </div>
        </div>
      </div>

      <motion.p
        className="text-xl text-black/70 text-center mt-8 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Every photo in our magical circle represents a beautiful chapter of our love story! 💕✨
      </motion.p>
    </div>
  )
}
