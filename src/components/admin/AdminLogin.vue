<script setup lang="ts">
import { ref } from 'vue'
import { adminSettings } from '../../services/storage'
import { Lock, KeyRound, ArrowLeft } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const emit = defineEmits<{
  (e: 'login-success'): void
}>()

const router = useRouter()
const pinInput = ref('')
const errorMsg = ref('')

const handleLogin = () => {
  if (pinInput.value === adminSettings.value.adminPin) {
    emit('login-success')
  } else {
    errorMsg.value = '비밀번호가 일치하지 않습니다. (기본 비밀번호: 1234)'
    pinInput.value = ''
  }
}

const goBackToInvitation = () => {
  router.push('/')
}
</script>

<template>
  <div class="login-wrapper font-sans">
    <div class="login-card card-paper">
      <button class="back-btn" @click="goBackToInvitation">
        <ArrowLeft :size="16" />
        <span>청첩장으로 돌아가기</span>
      </button>

      <div class="lock-icon-wrap">
        <Lock :size="32" class="lock-icon" />
      </div>

      <h2 class="login-title font-serif">관리자 모드</h2>
      <p class="login-sub">
        웨딩 사진 등록 및 청첩장 정보를 관리합니다.<br />
        관리자 비밀번호를 입력해 주세요.
      </p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-wrap">
          <KeyRound :size="18" class="input-icon" />
          <input
            v-model="pinInput"
            type="password"
            placeholder="비밀번호 입력 (기본: 1234)"
            class="pin-input"
            autofocus
            required
          />
        </div>

        <p v-if="errorMsg" class="error-text">{{ errorMsg }}</p>

        <button type="submit" class="btn-primary submit-btn">
          <span>관리자 로그인</span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 36px 28px;
  text-align: center;
  position: relative;
}

.back-btn {
  position: absolute;
  top: 18px;
  left: 18px;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--text-muted);
  cursor: pointer;
}

.back-btn:hover {
  color: var(--gold-primary);
}

.lock-icon-wrap {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--gold-soft);
  color: var(--gold-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px auto 16px;
}

.login-title {
  font-size: 22px;
  color: var(--text-main);
  margin-bottom: 8px;
}

.login-sub {
  font-size: 13px;
  color: var(--text-sub);
  line-height: 1.5;
  margin-bottom: 24px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  color: var(--text-muted);
}

.pin-input {
  width: 100%;
  padding: 13px 14px 13px 44px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  font-size: 15px;
  outline: none;
  background: var(--bg-ivory);
}

.pin-input:focus {
  border-color: var(--gold-primary);
  background: #FFFFFF;
}

.error-text {
  font-size: 12px;
  color: var(--rose-accent);
}

.submit-btn {
  width: 100%;
  padding: 13px 0;
  font-size: 15px;
  margin-top: 4px;
}
</style>

