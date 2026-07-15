export function useBackgroundMusic() {
  const isPlaying = useState('bg-music-playing', () => false)
  const isReady = useState('bg-music-ready', () => false)

  const SRC = '/audio/background.mp4'

  function getEl(): HTMLMediaElement | null {
    if (!import.meta.client) return null
    return document.getElementById('bg-music') as HTMLMediaElement | null
  }

  async function play() {
    const el = getEl()
    if (!el) return
    el.volume = 0.45
    try {
      await el.play()
      isPlaying.value = true
    } catch {
      isPlaying.value = false
    }
  }

  function pause() {
    const el = getEl()
    if (!el) return
    el.pause()
    isPlaying.value = false
  }

  async function toggle() {
    if (isPlaying.value) pause()
    else await play()
  }

  function bind(el: HTMLMediaElement) {
    el.loop = true
    el.volume = 0.45
    el.addEventListener('play', () => {
      isPlaying.value = true
    })
    el.addEventListener('pause', () => {
      isPlaying.value = false
    })
    isReady.value = true
  }

  return { isPlaying, isReady, SRC, play, pause, toggle, bind }
}
