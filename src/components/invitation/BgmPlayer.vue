<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Disc3, Volume2, VolumeX } from 'lucide-vue-next'
import { weddingInfo } from '../../services/storage'

const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const hasInteracted = ref(false)

const bgmUrl = computed(() => weddingInfo.value.bgmUrl)

const togglePlay = () => {
  if (!audioRef.value) return
  hasInteracted.value = true

  if (isPlaying.value) {
    audioRef.value.pause()
    isPlaying.value = false
  } else {
    audioRef.value.play().then(() => {
      isPlaying.value = true
    }).catch(err => {
      console.warn('Playback error:', err)
      isPlaying.value = false
    })
  }
}

onMounted(() => {
  // Mobile browsers restrict autoplay without user interaction,
  // so we attempt autoplay if enabled, or wait for first touch.
  if (weddingInfo.value.bgmAutoPlay && audioRef.value) {
    audioRef.value.play().then(() => {
      isPlaying.value = true
    }).catch(() => {
      // Browsers often block autoplay; wait for first interaction
      const startOnTouch = () => {
        if (!hasInteracted.value && audioRef.value) {
          audioRef.value.play().then(() => {
            isPlaying.value = true
          }).catch(() => {})
        }
        window.removeEventListener('touchstart', startOnTouch)
        window.removeEventListener('click', startOnTouch)
      }
      window.addEventListener('touchstart', startOnTouch, { once: true })
      window.addEventListener('click', startOnTouch, { once: true })
    })
  }
})
</script>

<template>
  <div class="bgm-container">
    <audio ref="audioRef" :src="bgmUrl" loop preload="auto"></audio>

    <button
      class="bgm-button"
      :class="{ 'is-playing': isPlaying }"
      @click="togglePlay"
      :title="isPlaying ? 'BGM 일시정지' : 'BGM 재생'"
      aria-label="배경음악 토글"
    >
      <Disc3 class="disk-icon" :class="{ 'animate-spin-slow': isPlaying }" :size="20" />
      <span class="icon-badge">
        <Volume2 v-if="isPlaying" :size="11" />
        <VolumeX v-else :size="11" />
      </span>
    </button>
  </div>
</template>

<style scoped>
.bgm-container {
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 40;
}

.bgm-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(234, 227, 214, 0.8);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  color: var(--gold-primary);
  transition: all 0.25s ease;
}

.bgm-button:active {
  transform: scale(0.92);
}

.bgm-button.is-playing {
  color: var(--gold-dark);
  border-color: var(--gold-primary);
  box-shadow: 0 4px 16px rgba(168, 131, 80, 0.25);
}

.disk-icon {
  transition: transform 0.2s;
}

.icon-badge {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #FFFFFF;
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-sub);
}
</style>

