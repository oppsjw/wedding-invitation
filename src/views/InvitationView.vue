<script setup lang="ts">
import BgmPlayer from '../components/invitation/BgmPlayer.vue'
import CoverSection from '../components/invitation/CoverSection.vue'
import GreetingSection from '../components/invitation/GreetingSection.vue'
import CalendarSection from '../components/invitation/CalendarSection.vue'
import GallerySection from '../components/invitation/GallerySection.vue'
import LocationSection from '../components/invitation/LocationSection.vue'
import AccountSection from '../components/invitation/AccountSection.vue'
import RsvpSection from '../components/invitation/RsvpSection.vue'
import GuestbookSection from '../components/invitation/GuestbookSection.vue'
import ShareFooter from '../components/invitation/ShareFooter.vue'
</script>

<template>
  <main class="mobile-frame">
    <!-- Floating BGM Player -->
    <BgmPlayer />

    <!-- 1. Cover Section -->
    <CoverSection />

    <!-- 2. Greeting & Contact Section -->
    <GreetingSection />

    <!-- 3. Wedding Calendar & D-Day Section -->
    <CalendarSection />

    <!-- 4. Wedding Photos Gallery Section -->
    <GallerySection />

    <!-- 5. Location & Map & Navigation Section -->
    <LocationSection />

    <!-- 6. Bank Account & Congratulatory Gift Section -->
    <AccountSection />

    <!-- 7. RSVP Attendance Survey Section -->
    <RsvpSection />

    <!-- 8. Guestbook Section -->
    <GuestbookSection />

    <!-- 9. Share & Footer Section -->
    <ShareFooter />
  </main>
</template>

<style scoped>
/* Scoped styles if needed for the view container */
</style>

