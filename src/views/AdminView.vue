<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminLogin from '../components/admin/AdminLogin.vue'
import PhotoManager from '../components/admin/PhotoManager.vue'
import InfoEditor from '../components/admin/InfoEditor.vue'
import AccountManager from '../components/admin/AccountManager.vue'
import RsvpViewer from '../components/admin/RsvpViewer.vue'
import GuestbookModerator from '../components/admin/GuestbookModerator.vue'
import AdminSettings from '../components/admin/AdminSettings.vue'
import {
  Image as ImageIcon,
  FileText,
  CreditCard,
  Users,
  MessageSquare,
  Settings,
  ExternalLink,
  LogOut
} from 'lucide-vue-next'

const router = useRouter()
const isAuthenticated = ref(false)
const activeTab = ref<'photos' | 'info' | 'accounts' | 'rsvp' | 'guestbook' | 'settings'>('photos')

const handleLoginSuccess = () => {
  isAuthenticated.value = true
}

const handleLogout = () => {
  isAuthenticated.value = false
}

const goToInvitation = () => {
  router.push('/')
}
</script>

<template>
  <div class="admin-page">
    <!-- 1. If not authenticated, show login form -->
    <AdminLogin v-if="!isAuthenticated" @login-success="handleLoginSuccess" />

    <!-- 2. Authenticated Admin Dashboard -->
    <div v-else class="admin-frame font-sans">
      <!-- Admin Top Bar -->
      <header class="admin-topbar">
        <div class="topbar-left">
          <h1 class="brand-title font-serif">웨딩 청첩장 관리자 센터</h1>
          <span class="auth-badge">관리자 인증됨</span>
        </div>

        <div class="topbar-actions">
          <button class="top-btn preview" @click="goToInvitation">
            <ExternalLink :size="14" />
            <span>청첩장 보러가기</span>
          </button>

          <button class="top-btn logout" @click="handleLogout">
            <LogOut :size="14" />
            <span>로그아웃</span>
          </button>
        </div>
      </header>

      <!-- Admin Tab Navigation -->
      <nav class="admin-tabs-nav">
        <button
          class="tab-btn"
          :class="{ 'active': activeTab === 'photos' }"
          @click="activeTab = 'photos'"
        >
          <ImageIcon :size="16" />
          <span>사진 관리</span>
        </button>

        <button
          class="tab-btn"
          :class="{ 'active': activeTab === 'info' }"
          @click="activeTab = 'info'"
        >
          <FileText :size="16" />
          <span>예식 정보</span>
        </button>

        <button
          class="tab-btn"
          :class="{ 'active': activeTab === 'accounts' }"
          @click="activeTab = 'accounts'"
        >
          <CreditCard :size="16" />
          <span>계좌번호</span>
        </button>

        <button
          class="tab-btn"
          :class="{ 'active': activeTab === 'rsvp' }"
          @click="activeTab = 'rsvp'"
        >
          <Users :size="16" />
          <span>참석 명단</span>
        </button>

        <button
          class="tab-btn"
          :class="{ 'active': activeTab === 'guestbook' }"
          @click="activeTab = 'guestbook'"
        >
          <MessageSquare :size="16" />
          <span>방명록</span>
        </button>

        <button
          class="tab-btn"
          :class="{ 'active': activeTab === 'settings' }"
          @click="activeTab = 'settings'"
        >
          <Settings :size="16" />
          <span>설정</span>
        </button>
      </nav>

      <!-- Tab Content Panels -->
      <main class="admin-content-wrap">
        <PhotoManager v-if="activeTab === 'photos'" />
        <InfoEditor v-else-if="activeTab === 'info'" />
        <AccountManager v-else-if="activeTab === 'accounts'" />
        <RsvpViewer v-else-if="activeTab === 'rsvp'" />
        <GuestbookModerator v-else-if="activeTab === 'guestbook'" />
        <AdminSettings v-else-if="activeTab === 'settings'" />
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin-page {
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg-ivory);
  display: flex;
  justify-content: center;
}

.admin-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 28px;
  background: #FFFFFF;
  border-bottom: 1px solid var(--border-light);
  flex-wrap: wrap;
  gap: 12px;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-main);
}

.auth-badge {
  font-size: 11px;
  background: #E6F4EA;
  color: #137333;
  padding: 3px 8px;
  border-radius: 9999px;
  font-weight: 600;
}

.topbar-actions {
  display: flex;
  gap: 8px;
}

.top-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  border: 1px solid var(--border-color);
  background: #FFFFFF;
  color: var(--text-main);
  transition: all 0.15s;
}

.top-btn.preview {
  background: var(--gold-soft);
  color: var(--gold-dark);
  border-color: var(--gold-light);
}

.top-btn.logout:hover {
  background: #FEECEB;
  color: var(--rose-accent);
}

/* Tabs Navigation */
.admin-tabs-nav {
  display: flex;
  background: #FFFFFF;
  border-bottom: 1px solid var(--border-light);
  padding: 0 20px;
  overflow-x: auto;
  gap: 4px;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 14px 16px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--text-sub);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.tab-btn:hover {
  color: var(--gold-dark);
}

.tab-btn.active {
  color: var(--gold-primary);
  border-bottom-color: var(--gold-primary);
  font-weight: 600;
}

.admin-content-wrap {
  padding: 0 28px;
}

@media (max-width: 640px) {
  .admin-topbar,
  .admin-content-wrap {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>

