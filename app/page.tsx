"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Sparkles, Gift, Cake, Camera, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import CircularPhotoCarousel from "@/components/circular-photo-carousel"
import BackgroundMusic from "@/components/background-music"

export default function BirthdaySuprise() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showHearts, setShowHearts] = useState(false)

  const steps = [
    {
      id: 0,
      title: "✨ Something Special Awaits ✨",
      message: "Click to start your birthday surprise!",
      action: "Start",
    },
    {
      id: 1,
      title: "🎂 Happy Birthday, Beautiful! 🎂",
      message: "Today is extra special because it's YOUR day!",
      action: "Continue",
    },
    {
      id: 2,
      title: "💕 Do you know what makes today magical? 💕",
      message: "It's not just any birthday... it's YOURS!",
      action: "Tell me more",
    },
    {
      id: 3,
      title: "🌟 You light up my world 🌟",
      message: "Every day with you feels like a celebration, but today we celebrate YOU!",
      action: "View our memories",
    },
    {
      id: 4,
      title: "📸 Our Beautiful Journey Together 📸",
      message: "Let's take a magical trip through all our amazing memories!",
      action: "Aww, Continue",
      showCircularCarousel: true,
    },
    {
      id: 5,
      title: "🎁 My wish for you 🎁",
      message: "May this year bring you endless laughter, infinite love, and all the happiness your heart can hold!",
      action: "More surprises",
    },
    {
      id: 6,
      title: "💖 You're my everything 💖",
      message: "Thank you for being the most amazing girlfriend. I love you more than words can say!",
      action: "Final surprise",
    },
    {
      id: 7,
      title: "🎉 Happy Birthday, My Love! 🎉",
      message: "You are the best thing that has happend to my life💖. My life has only become better and better ever since you came in it ❣️. You mean so much to me🫀that there aren't enough words in this worlds to express my love for you🫂. You deserve all the happines🤗 and success😚.Hope this year and all the years aftewords bring you all the happiness and success 💝. As for love🫣, I have been there to give you all the love 💓 and I always will be there with you🫂🫀not for just the rest of our life, but for our next lives also🩷. Because our meeting and falling is love💗wasn't just a coincidence it was our destiny🫂💞. Once again, Happy Birthday my love 😘, hope you have a beautiful day❣️and you know I'll be there with you to celebrate it🥰",
      action: "Celebrate!",
    },
  ]

  useEffect(() => {
    if (currentStep >= 3) {
      setShowHearts(true)
    }
  }, [currentStep])

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setCurrentStep(0) // Reset to beginning
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentStepData = steps[currentStep]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-rose-400 relative overflow-hidden">
      {/* Background Music Component */}
      <BackgroundMusic />

      {/* Floating Hearts Animation */}
      <AnimatePresence>
        {showHearts && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-pink-500"
                initial={{
                  x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                  y: (typeof window !== "undefined" ? window.innerHeight : 800) + 50,
                  opacity: 0,
                }}
                animate={{
                  y: -50,
                  opacity: [0, 1, 0],
                  rotate: 360,
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 3,
                }}
              >
                <Heart className="w-6 h-6 fill-current" />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Enhanced Sparkles with Different Colors */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${i % 3 === 0 ? "text-yellow-300" : i % 3 === 1 ? "text-pink-300" : "text-purple-300"
              }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Cute Characters */}
          {!currentStepData.showCircularCarousel && (
            <motion.div
              className="mb-8"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <div className="text-8xl mb-4">🐻💕🐰</div>
            </motion.div>
          )}

          {/* Main Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30"
            >
              {/* Circular Photo Carousel Section */}
              {currentStepData.showCircularCarousel ? (
                <CircularPhotoCarousel />
              ) : (
                <>
                  <motion.h1
                    className="text-3xl md:text-4xl font-bold text-pink-600 mb-6 drop-shadow-lg"
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(255,255,255,0.5)",
                        "0 0 20px rgba(255,255,255,0.8)",
                        "0 0 10px rgba(255,255,255,0.5)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {currentStepData.title}
                  </motion.h1>

                  <motion.p
                    className="text-xl md:text-2xl text-black/70 mb-8 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    {currentStepData.message}
                  </motion.p>
                </>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-center gap-4">
                {currentStep > 0 && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={prevStep}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  </motion.div>
                )}

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={nextStep}
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg transform transition-all duration-200"
                  >
                    {currentStep === steps.length - 1 ? (
                      <span className="flex items-center gap-2">
                        <Cake className="w-5 h-5" />
                        {currentStepData.action}
                        <Cake className="w-5 h-5" />
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        {currentStepData.showCircularCarousel ? (
                          <Camera className="w-5 h-5" />
                        ) : (
                          <Gift className="w-5 h-5" />
                        )}
                        {currentStepData.action}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </span>
                    )}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer ${index <= currentStep ? "bg-white" : "bg-white/30"}`}
                animate={index === currentStep ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.5, repeat: index === currentStep ? Number.POSITIVE_INFINITY : 0 }}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Birthday Confetti Effect */}
      {currentStep === steps.length - 1 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${i % 4 === 0
                  ? "bg-yellow-400"
                  : i % 4 === 1
                    ? "bg-pink-400"
                    : i % 4 === 2
                      ? "bg-purple-400"
                      : "bg-blue-400"
                }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
              }}
              animate={{
                y: (typeof window !== "undefined" ? window.innerHeight : 800) + 50,
                rotate: 360,
                opacity: [1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
