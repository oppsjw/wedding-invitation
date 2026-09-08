<script setup lang="ts">
import { ref, computed } from 'vue'
import { weddingInfo } from '../../services/storage'
import { MapPin, Copy, Navigation, Check, Car, Train, Bus } from 'lucide-vue-next'

const copied = ref(false)

const venue = computed(() => weddingInfo.value.venue)

const copyAddress = async () => {
  try {
    await navigator.clipboard.writeText(`${venue.value.address} ${venue.value.addressDetail}`)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Clipboard copy failed:', err)
  }
}

// Navigation links
const kakaoNaviUrl = computed(() => {
  const name = encodeURIComponent(venue.value.name)
  return `https://map.kakao.com/link/to/${name},${venue.value.mapLat},${venue.value.mapLng}`
})

const naverMapUrl = computed(() => {
  const name = encodeURIComponent(venue.value.name)
  return `https://map.naver.com/v5/directions/-/-/${venue.value.mapLng},${venue.value.mapLat},${name}/-/transit?c=15,0,0,0,dh`
})

const tmapUrl = computed(() => {
  const name = encodeURIComponent(venue.value.name)
  return `tmap://route?goalname=${name}&goalx=${venue.value.mapLng}&goaly=${venue.value.mapLat}`
})
</script>

<template>
  <section class="invitation-section location-section">
    <div class="section-divider">
      <span class="section-label">LOCATION</span>
    </div>

    <h2 class="section-title font-serif">오시는 길</h2>

    <!-- Venue Title & Address -->
    <div class="venue-header">
      <h3 class="venue-name font-serif">{{ venue.name }}</h3>
      <p class="venue-hall font-serif">{{ venue.hall }}</p>
      
      <div class="address-box font-sans">
        <MapPin :size="15" class="pin-icon" />
        <span class="addr-text">{{ venue.address }} {{ venue.addressDetail }}</span>
        <button class="copy-btn" @click="copyAddress" title="주소 복사">
          <Check v-if="copied" :size="13" class="text-green" />
          <Copy v-else :size="13" />
          <span>{{ copied ? '복사완료' : '주소복사' }}</span>
        </button>
      </div>

      <p v-if="venue.tel" class="venue-tel font-sans">
        안내전화: <a :href="`tel:${venue.tel}`">{{ venue.tel }}</a>
      </p>
    </div>

    <!-- Map Preview Frame -->
    <div class="map-card card-paper">
      <div class="map-visual">
        <!-- Interactive Kakao Map link / Static preview -->
        <iframe
          class="map-iframe"
          title="예식장 지도"
          :src="`https://maps.google.com/maps?q=${venue.mapLat},${venue.mapLng}&hl=ko&z=15&output=embed`"
          loading="lazy"
        ></iframe>
      </div>

      <!-- Navigation App 3 Buttons -->
      <div class="navi-buttons-grid font-sans">
        <a :href="kakaoNaviUrl" target="_blank" rel="noopener noreferrer" class="navi-btn kakao">
          <Navigation :size="14" />
          <span>카카오맵</span>
        </a>
        <a :href="naverMapUrl" target="_blank" rel="noopener noreferrer" class="navi-btn naver">
          <Navigation :size="14" />
          <span>네이버지도</span>
        </a>
        <a :href="tmapUrl" class="navi-btn tmap">
          <Navigation :size="14" />
          <span>티맵(TMAP)</span>
        </a>
      </div>
    </div>

    <!-- Transport Details Card -->
    <div class="transit-card card-paper font-sans">
      <!-- Subway -->
      <div v-if="venue.subwayInfo" class="transit-item">
        <div class="transit-icon subway">
          <Train :size="18" />
        </div>
        <div class="transit-body">
          <strong class="transit-title">지하철 안내</strong>
          <p class="transit-desc">{{ venue.subwayInfo }}</p>
        </div>
      </div>

      <!-- Bus -->
      <div v-if="venue.busInfo" class="transit-item">
        <div class="transit-icon bus">
          <Bus :size="18" />
        </div>
        <div class="transit-body">
          <strong class="transit-title">버스 안내</strong>
          <p class="transit-desc">{{ venue.busInfo }}</p>
        </div>
      </div>

      <!-- Parking -->
      <div v-if="venue.parkingInfo" class="transit-item">
        <div class="transit-icon parking">
          <Car :size="18" />
        </div>
        <div class="transit-body">
          <strong class="transit-title">자가용 & 주차 안내</strong>
          <p class="transit-desc">{{ venue.parkingInfo }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.location-section {
  background-color: var(--bg-ivory);
}

.venue-header {
  margin-bottom: 24px;
}

.venue-name {
  font-size: 20px;
  color: var(--text-main);
  font-weight: 700;
  margin-bottom: 4px;
}

.venue-hall {
  font-size: 15px;
  color: var(--gold-dark);
  margin-bottom: 14px;
}

.address-box {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #FFFFFF;
  padding: 8px 14px;
  border-radius: 9999px;
  border: 1px solid var(--border-color);
  font-size: 13px;
  color: var(--text-sub);
  margin-bottom: 8px;
}

.pin-icon {
  color: var(--gold-primary);
  flex-shrink: 0;
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--bg-subtle);
  border: 1px solid var(--border-color);
  border-radius: 9999px;
  padding: 3px 8px;
  font-size: 11px;
  color: var(--text-main);
  cursor: pointer;
  margin-left: 4px;
}

.copy-btn:hover {
  background: var(--gold-soft);
}

.text-green {
  color: #2E7D32;
}

.venue-tel {
  font-size: 12px;
  color: var(--text-muted);
}

.venue-tel a {
  color: var(--text-sub);
  text-decoration: none;
}

/* Map Card */
.map-card {
  padding: 12px;
  margin-bottom: 18px;
}

.map-visual {
  width: 100%;
  height: 220px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  background: #EAE6DF;
}

.map-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.navi-buttons-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 12px;
}

.navi-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 4px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  text-decoration: none;
  transition: transform 0.2s;
}

.navi-btn:active {
  transform: scale(0.96);
}

.navi-btn.kakao {
  background: #FEE500;
  color: #191919;
}

.navi-btn.naver {
  background: #03C75A;
  color: #FFFFFF;
}

.navi-btn.tmap {
  background: #E52528;
  color: #FFFFFF;
}

/* Transit Card */
.transit-card {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 22px;
}

.transit-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.transit-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.transit-icon.subway {
  background: #E8F0FE;
  color: #1A73E8;
}

.transit-icon.bus {
  background: #E6F4EA;
  color: #137333;
}

.transit-icon.parking {
  background: #FEF7E0;
  color: #B06000;
}

.transit-body {
  flex: 1;
}

.transit-title {
  display: block;
  font-size: 14px;
  color: var(--text-main);
  margin-bottom: 4px;
}

.transit-desc {
  font-size: 13px;
  color: var(--text-sub);
  line-height: 1.55;
}
</style>

