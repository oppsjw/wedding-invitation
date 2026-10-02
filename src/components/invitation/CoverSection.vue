<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { photos, weddingInfo, formatWeddingDate } from '../../services/storage'
import { Heart } from 'lucide-vue-next'
import WeddingDayCalligraphy from './WeddingDayCalligraphy.vue'

const isCoverReady = ref(false)
const calligraphyRef = ref<InstanceType<typeof WeddingDayCalligraphy> | null>(null)

watch(isCoverReady, (ready) => {
  if (ready) {
    nextTick(() => {
      setTimeout(() => {
        calligraphyRef.value?.start()
      }, 450)
    })
  }
})

const currentCoverPhoto = computed(() => {
  const visiblePhotos = photos.value.filter(p => !p.isHidden)
  const found = visiblePhotos.find(p => p.isCover)
  return found || visiblePhotos[0] || null
})

const coverPhotoUrl = computed(() => {
  return currentCoverPhoto.value?.url || ''
})

const coverObjectPosition = computed(() => {
  return currentCoverPhoto.value?.objectPosition || 'center center'
})

const preloadCover = () => {
  if (!coverPhotoUrl.value) {
    isCoverReady.value = true
    return
  }
  const img = new Image()
  img.src = coverPhotoUrl.value
  if (img.complete) {
    isCoverReady.value = true
  } else {
    img.onload = () => {
      isCoverReady.value = true
    }
    img.onerror = () => {
      isCoverReady.value = true
    }
  }
}

onMounted(() => {
  preloadCover()
})

watch(coverPhotoUrl, () => {
  isCoverReady.value = false
  preloadCover()
})

const formattedDate = computed(() => {
  return formatWeddingDate(
    weddingInfo.value.date,
    weddingInfo.value.dateFormat,
    weddingInfo.value.customDateFormat
  )
})
</script>

<template>
  <Transition name="cover-fade" mode="out-in">
    <!-- 1. Full-screen Intro Loading Screen: renders until cover image is 100% loaded -->
    <div v-if="!isCoverReady" class="cover-loading-screen" key="loading">
      <div class="cover-loading-card">
        <div class="intro-monogram font-serif">
          <span>{{ weddingInfo.groom.name }}</span>
          <span class="mono-heart">♥</span>
          <span>{{ weddingInfo.bride.name }}</span>
        </div>
        <div class="loading-ring-spinner"></div>
        <p class="intro-text font-sans">청첩장을 불러오는 중입니다...</p>
      </div>
    </div>

    <!-- 2. Main Cover Section: Rendered only after image is 100% loaded -->
    <header v-else class="cover-container" key="content">
      <!-- Top Tagline & Calligraphy -->
      <div class="header-tagline">
        <div class="calligraphy-container">
          <WeddingDayCalligraphy
            ref="calligraphyRef"
            color="#000000"
            :speed="1.1"
            :autoplay="true"
            :replayable="false"
          />
        </div>
      </div>

      <!-- Main Photo Frame with elegant shadow & border -->
      <div class="photo-frame-wrapper">
        <div class="photo-frame">
          <img
            v-if="coverPhotoUrl"
            :src="coverPhotoUrl"
            alt="웨딩 대표 사진"
            class="cover-image"
            :style="{ objectPosition: coverObjectPosition }"
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
          <div v-else class="empty-cover">
            <Heart :size="32" class="empty-icon" />
            <p>관리자 페이지에서 대표 사진을 등록해 주세요</p>
          </div>
        </div>
      </div>

    <!-- Couple Names & Wedding Details -->
    <div class="couple-details">
      <h1 class="couple-names font-serif">
        <span>{{ weddingInfo.groom.name }}</span>
        <span class="divider-dot font-sans">♥</span>
        <span>{{ weddingInfo.bride.name }}</span>
      </h1>

      <div class="wedding-time-location font-serif">
        <p class="date-text">{{ formattedDate }}</p>
        <p class="venue-text">
          {{ weddingInfo.venue.name }} {{ weddingInfo.venue.hall }}
        </p>
      </div>
    </div>
  </header>
  </Transition>
</template>

<style scoped>
.cover-container {
  min-height: 100vh;
  min-height: 100dvh;
  justify-content: center;
  padding: 40px 20px 32px;
  text-align: center;
  position: relative;
  background-color: var(--bg-ivory);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  box-sizing: border-box;
  width: 100%;
}

.header-tagline {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 0px;
}

.calligraphy-container {
  width: 100%;
  max-width: 285px;
  margin: 0 auto;
}

.photo-frame-wrapper {
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.photo-frame {
  position: relative;
  width: 220px;
  height: 220px;
  aspect-ratio: 1 / 1;
  max-width: calc(100vw - 48px);
  max-height: calc(100vw - 48px);
  border-radius: 0;
  overflow: hidden;
  background: var(--bg-warm);
  flex-shrink: 0;
}

.cover-loading-screen {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background-color: var(--bg-ivory);
  width: 100%;
}

.cover-loading-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.intro-monogram {
  font-family: 'Nanum Myeongjo', serif;
  font-size: 22px;
  color: var(--gold-dark);
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
}

.mono-heart {
  color: var(--rose-accent);
  font-size: 18px;
}

.loading-ring-spinner {
  width: 36px;
  height: 36px;
  border: 2.5px solid rgba(85, 93, 102, 0.2);
  border-top-color: var(--gold-primary);
  border-radius: 50%;
  animation: spin 0.85s linear infinite;
  margin: 6px 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.intro-names {
  font-size: 16px;
  color: var(--text-main);
  letter-spacing: 2px;
}

.intro-text {
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 0.5px;
}

.cover-fade-enter-active {
  transition: opacity 0.5s ease-out;
}

.cover-fade-leave-active {
  transition: opacity 0.3s ease-in;
}

.cover-fade-enter-from,
.cover-fade-leave-to {
  opacity: 0;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;
}

.empty-cover {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: var(--text-muted);
  font-size: 13px;
  gap: 12px;
}

.empty-icon {
  color: var(--gold-primary);
  opacity: 0.6;
}

.couple-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.couple-names {
  font-family: 'Nanum Myeongjo', serif;
  font-size: 24px;
  color: var(--text-main);
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
}

.divider-dot {
  font-size: 14px;
  color: var(--rose-accent);
  opacity: 0.8;
}

.wedding-time-location {
  font-family: 'Nanum Myeongjo', serif;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.date-text {
  font-size: 15px;
  color: var(--gold-dark);
  font-weight: 700;
}

.venue-text {
  font-size: 14px;
  color: var(--text-sub);
}
</style>
