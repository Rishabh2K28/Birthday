"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

// Add this ButtonSparkles component at the top of the file
const ButtonSparkles = () => {
  return (
    <div className="absolute -inset-2 pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute inline-flex h-2 w-2"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        >
          <span className="absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
          <span className="absolute inline-flex h-full w-full rounded-full bg-pink-500 blur-sm"></span>
        </motion.span>
      ))}
    </div>
  )
}


export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element and set properties
    audioRef.current = new Audio('/music/song.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = volume

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!audioRef.current) return

    if (isMuted) {
      audioRef.current.volume = volume
    } else {
      audioRef.current.volume = 0
    }
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (newVolume: number) => {
    if (!audioRef.current) return

    setVolume(newVolume)
    if (!isMuted) {
      audioRef.current.volume = newVolume
    }
  }


  return (
    <motion.div
      // Update the padding and add larger blur effect
      className="fixed top-6 right-6 z-50 bg-white/25 backdrop-blur-lg rounded-3xl p-5 shadow-xl border-2 border-white/40"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <div className="flex items-center space-x-4"> {/* Increased space between items */}
        <div className="relative">
          <Button
            onClick={togglePlay}
            size="sm"
            // Increase button size
            className="bg-pink-500/80 hover:bg-pink-600/80 text-white rounded-full p-4 h-12 w-12"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </Button>
          {isPlaying && <ButtonSparkles />} {/* Added ButtonSparkles */}
        </div>

        <div className="relative"><Button
          onClick={toggleMute}
          size="sm"
          // Increase button size
          className="bg-purple-500/80 hover:bg-purple-600/80 text-white rounded-full p-4 h-12 w-12"
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </Button>
          {!isMuted && <ButtonSparkles />} {/* Added ButtonSparkles */}
        </div>

        <div className="flex items-center space-x-2"> {/* Increased space */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => handleVolumeChange(Number.parseFloat(e.target.value))}
            // Increase slider width and height
            className="w-24 h-2 bg-white/30 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${volume * 100}%, rgba(255,255,255,0.3) ${volume * 100}%, rgba(255,255,255,0.3) 100%)`,
            }}
          />
        </div>

        {isPlaying && (
          <motion.div
            // Increase music note size
            className="text-pink-300 text-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            🎵
          </motion.div>
        )}
      </div>

      <motion.p
        // Increase text size and adjust margins
        className="text-sm font-medium text-white/90 mt-3 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Romantic Vibes
      </motion.p>
    </motion.div>
  )
}