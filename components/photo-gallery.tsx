"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

const photos = [
  {
    id: 1,
    src: "/public/images/IMG-20250614-WA0003.jpg",
    caption: "Our first beach trip together 🏖️💕",
    date: "Summer 2023",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=400&width=600",
    caption: "That perfect dinner date 🍽️✨",
    date: "Fall 2023",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=400&width=600",
    caption: "Adventure buddies for life 🏔️❤️",
    date: "Spring 2024",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=400&width=600",
    caption: "Cozy movie nights are the best 🎬🥰",
    date: "Winter 2024",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=400&width=600",
    caption: "Dancing the night away 💃🕺",
    date: "Recent",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=400&width=600",
    caption: "Just being silly together 😄📸",
    date: "Always",
  },
]

export default function PhotoGallery() {
  const [currentPhoto, setCurrentPhoto] = useState(0)

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-white mb-8 drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📸 Our Beautiful Memories 📸
      </motion.h2>

      {/* Main Photo Display */}
      <div className="relative mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhoto}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto w-full max-w-2xl h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30"
          >
            <img
              src={photos[currentPhoto].src || "/placeholder.svg"}
              alt={photos[currentPhoto].caption}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg"
              }}
              loading="lazy" // Add lazy loading
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

            {/* Photo Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <motion.p
                className="text-xl font-semibold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {photos[currentPhoto].caption}
              </motion.p>
              <motion.p
                className="text-sm opacity-80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {photos[currentPhoto].date}
              </motion.p>
            </div>

            {/* Floating Hearts on Photo */}
            <motion.div
              className="absolute top-4 right-4 text-pink-300"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <Heart className="w-8 h-8 fill-current" />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <Button
          onClick={prevPhoto}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white rounded-full p-3"
          size="sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Button
          onClick={nextPhoto}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white rounded-full p-3"
          size="sm"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Photo Thumbnails */}
      <div className="flex justify-center space-x-2 mb-6 overflow-x-auto pb-2">
        {photos.map((photo, index) => (
          <motion.button
            key={photo.id}
            onClick={() => setCurrentPhoto(index)}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${index === currentPhoto ? "border-white scale-110" : "border-white/30 opacity-70"
              }`}
            whileHover={{ scale: index === currentPhoto ? 1.1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={photo.src || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>

      {/* Photo Counter */}
      <motion.p
        className="text-white/80 text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Photo {currentPhoto + 1} of {photos.length}
      </motion.p>

      <motion.p
        className="text-xl text-white/90 text-center leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Every picture tells our story of love, laughter, and endless adventures together! 💕
      </motion.p>
    </div>
  )
}
