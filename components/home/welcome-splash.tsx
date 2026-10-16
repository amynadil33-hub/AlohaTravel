'use client'

import Image from 'next/image'
import { Volume2, VolumeX } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

const SEEN_KEY = 'alloha-welcome-seen'

function playWelcomeMusic() {
  const audio = new AudioContext()
  const master = audio.createGain()
  const warmth = audio.createBiquadFilter()
  const reverbDelay = audio.createDelay()
  const feedback = audio.createGain()
  const now = audio.currentTime
  const duration = 18

  master.gain.setValueAtTime(0.0001, now)
  master.gain.exponentialRampToValueAtTime(0.13, now + 1.2)
  master.gain.setValueAtTime(0.13, now + duration - 3)
  master.gain.exponentialRampToValueAtTime(0.0001, now + duration)
  master.connect(audio.destination)

  warmth.type = 'lowpass'
  warmth.frequency.value = 1800
  warmth.Q.value = 0.7
  warmth.connect(master)

  reverbDelay.delayTime.value = 0.32
  feedback.gain.value = 0.18
  reverbDelay.connect(feedback)
  feedback.connect(reverbDelay)
  reverbDelay.connect(master)

  const connectWithSpace = (source: AudioNode) => {
    source.connect(warmth)
    source.connect(reverbDelay)
  }

  // Four warm seventh chords form a complete, gentle musical progression.
  const chords = [
    [130.81, 164.81, 196, 246.94],
    [110, 130.81, 164.81, 196],
    [87.31, 130.81, 164.81, 196],
    [98, 123.47, 146.83, 164.81],
  ]

  chords.forEach((chord, chordIndex) => {
    const chordStart = now + chordIndex * 4

    chord.forEach((frequency, noteIndex) => {
      const oscillator = audio.createOscillator()
      const noteGain = audio.createGain()

      oscillator.type = noteIndex % 2 === 0 ? 'sine' : 'triangle'
      oscillator.frequency.value = frequency
      oscillator.detune.value = noteIndex % 2 === 0 ? -3 : 3
      noteGain.gain.setValueAtTime(0.0001, chordStart)
      noteGain.gain.exponentialRampToValueAtTime(0.12, chordStart + 0.8)
      noteGain.gain.setValueAtTime(0.12, chordStart + 2.8)
      noteGain.gain.exponentialRampToValueAtTime(0.0001, chordStart + 4.3)
      oscillator.connect(noteGain)
      connectWithSpace(noteGain)
      oscillator.start(chordStart)
      oscillator.stop(chordStart + 4.4)
    })
  })

  // A light pentatonic melody gives the pad a tropical, song-like shape.
  const melody = [
    523.25, 659.25, 783.99, 659.25,
    440, 523.25, 659.25, 783.99,
    698.46, 659.25, 523.25, 440,
    493.88, 587.33, 659.25, 523.25,
  ]

  melody.forEach((frequency, index) => {
    const oscillator = audio.createOscillator()
    const noteGain = audio.createGain()
    const startsAt = now + 0.8 + index * 0.92

    oscillator.type = 'triangle'
    oscillator.frequency.value = frequency
    noteGain.gain.setValueAtTime(0.0001, startsAt)
    noteGain.gain.exponentialRampToValueAtTime(0.2, startsAt + 0.04)
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startsAt + 0.72)
    oscillator.connect(noteGain)
    connectWithSpace(noteGain)
    oscillator.start(startsAt)
    oscillator.stop(startsAt + 0.75)
  })

  window.setTimeout(() => void audio.close(), (duration + 0.5) * 1000)
}

export function WelcomeSplash() {
  const [visible, setVisible] = useState(true)
  const [exiting, setExiting] = useState(false)
  const dismissing = useRef(false)

  const dismiss = useCallback((withSound = false) => {
    if (dismissing.current) return
    dismissing.current = true

    if (withSound) playWelcomeMusic()
    sessionStorage.setItem(SEEN_KEY, 'true')
    setExiting(true)
    window.setTimeout(() => setVisible(false), 1400)
  }, [])

  useEffect(() => {
    if (sessionStorage.getItem(SEEN_KEY)) {
      dismissing.current = true
      setVisible(false)
      return
    }

    const autoDismiss = window.setTimeout(() => dismiss(), 6000)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(autoDismiss)
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [dismiss])

  useEffect(() => {
    if (!visible) document.body.style.overflow = ''
  }, [visible])

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Welcome to Alloha Travels & Tours"
      className={`fixed inset-0 z-[100] overflow-hidden bg-[#087dab] transition-opacity duration-[1400ms] ease-in-out motion-reduce:transition-none ${
        exiting ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <Image
        src="/images/welcome-sandbank.webp"
        alt="A white sandbank surrounded by turquoise Maldivian water"
        fill
        priority
        sizes="100vw"
        className="welcome-splash-image object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#023a62]/20 via-transparent to-[#012a43]/70" />

      <div className="relative flex h-full flex-col items-center justify-end px-6 pb-12 text-center text-white sm:pb-16">
        <div className="welcome-splash-copy">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] drop-shadow-md sm:text-sm">
            Alloha Travels &amp; Tours
          </p>
          <h2 className="mt-3 text-balance font-serif text-4xl leading-none drop-shadow-lg sm:text-6xl">
            Let the islands welcome you
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-white/90 drop-shadow-md sm:text-base">
            Your Maldives story begins here.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => dismiss(true)}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#064d75] shadow-lg transition hover:scale-[1.02] hover:bg-white/95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Volume2 className="size-4" />
              Enter with music
            </button>
            <button
              type="button"
              onClick={() => dismiss()}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/70 bg-black/10 px-5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <VolumeX className="size-4" />
              Enter quietly
            </button>
          </div>
        </div>

        <div className="mt-7 h-px w-36 overflow-hidden bg-white/30">
          <span className="welcome-splash-progress block h-full bg-white" />
        </div>
      </div>
    </div>
  )
}
