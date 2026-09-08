<script setup lang="ts">
import { ref } from 'vue'
import { accounts } from '../../services/storage'
import type { AccountItem } from '../../types/wedding'
import { Plus, Trash2 } from 'lucide-vue-next'

const newAccount = ref<Omit<AccountItem, 'id'>>({
  side: 'groom',
  title: '',
  bankName: '',
  accountNumber: '',
  accountHolder: '',
  kakaoPayUrl: ''
})

const handleAddAccount = () => {
  if (!newAccount.value.title.trim() || !newAccount.value.accountNumber.trim()) {
    alert('구분 명칭과 계좌번호를 입력해 주세요.')
    return
  }

  accounts.value.push({
    ...newAccount.value,
    id: 'acc_' + Date.now()
  })

  newAccount.value = {
    side: 'groom',
    title: '',
    bankName: '',
    accountNumber: '',
    accountHolder: '',
    kakaoPayUrl: ''
  }
}

const handleDeleteAccount = (id: string) => {
  if (confirm('이 계좌를 삭제하시겠습니까?')) {
    const idx = accounts.value.findIndex(a => a.id === id)
    if (idx !== -1) accounts.value.splice(idx, 1)
  }
}
</script>

<template>
  <div class="account-manager font-sans">
    <div class="manager-header">
      <div>
        <h3 class="manager-title font-serif">마음 전하실 곳 (계좌번호) 관리</h3>
        <p class="manager-desc">신랑/신부 및 혼주 계좌번호와 카카오페이 송금 링크를 관리합니다.</p>
      </div>
    </div>

    <!-- Add New Account Form -->
    <div class="card-paper add-box">
      <h4 class="box-title font-serif">새 계좌번호 추가</h4>
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">구분 측</label>
          <select v-model="newAccount.side" class="input-field">
            <option value="groom">신랑</option>
            <option value="groomParents">신랑 혼주</option>
            <option value="bride">신부</option>
            <option value="brideParents">신부 혼주</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">표시 타이틀</label>
          <input
            v-model="newAccount.title"
            type="text"
            placeholder="예: 신랑 김지우 / 신랑 혼주 (부)"
            class="input-field"
          />
        </div>

        <div class="form-group">
          <label class="form-label">은행명</label>
          <input
            v-model="newAccount.bankName"
            type="text"
            placeholder="예: 국민은행"
            class="input-field"
          />
        </div>

        <div class="form-group">
          <label class="form-label">계좌번호</label>
          <input
            v-model="newAccount.accountNumber"
            type="text"
            placeholder="예: 123-456-789012"
            class="input-field"
          />
        </div>

        <div class="form-group">
          <label class="form-label">예금주 성함</label>
          <input
            v-model="newAccount.accountHolder"
            type="text"
            placeholder="예: 김지우"
            class="input-field"
          />
        </div>

        <div class="form-group">
          <label class="form-label">카카오페이 송금 링크 (선택)</label>
          <input
            v-model="newAccount.kakaoPayUrl"
            type="url"
            placeholder="https://qr.kakaopay.com/..."
            class="input-field"
          />
        </div>
      </div>

      <button class="btn-primary add-btn" @click="handleAddAccount">
        <Plus :size="15" />
        <span>계좌 추가하기</span>
      </button>
    </div>

    <!-- Existing Accounts List -->
    <div class="accounts-list">
      <div v-for="item in accounts" :key="item.id" class="account-item-card card-paper">
        <div class="item-main">
          <div class="side-badge-row">
            <span
              class="side-tag"
              :class="item.side.startsWith('groom') ? 'groom' : 'bride'"
            >
              {{ item.side.startsWith('groom') ? '신랑측' : '신부측' }}
            </span>
            <strong class="item-title">{{ item.title }}</strong>
            <span class="item-holder">({{ item.accountHolder }})</span>
          </div>

          <div class="account-num-text">
            <strong>{{ item.bankName }}</strong> {{ item.accountNumber }}
          </div>

          <div v-if="item.kakaoPayUrl" class="kakaopay-link-text">
            카카오페이 링크 등록됨
          </div>
        </div>

        <button class="delete-btn" @click="handleDeleteAccount(item.id)" title="계좌 삭제">
          <Trash2 :size="16" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.account-manager {
  padding: 24px 0;
}

.manager-header {
  margin-bottom: 24px;
}

.manager-title {
  font-size: 20px;
  color: var(--text-main);
  margin-bottom: 4px;
}

.manager-desc {
  font-size: 13px;
  color: var(--text-sub);
}

.add-box {
  padding: 20px;
  margin-bottom: 24px;
  background: var(--bg-ivory);
}

.box-title {
  font-size: 15px;
  color: var(--text-main);
  margin-bottom: 14px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-sub);
}

.input-field {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  font-size: 13px;
  background: #FFFFFF;
}

.add-btn {
  font-size: 13px;
  padding: 9px 18px;
}

.accounts-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.account-item-card {
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.side-badge-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.side-tag {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
}

.side-tag.groom {
  background: #E8EFF8;
  color: #3A69A8;
}

.side-tag.bride {
  background: #F8ECE8;
  color: #B85848;
}

.item-title {
  font-size: 14px;
  color: var(--text-main);
}

.item-holder {
  font-size: 12px;
  color: var(--text-muted);
}

.account-num-text {
  font-size: 13px;
  color: var(--text-sub);
}

.kakaopay-link-text {
  font-size: 11px;
  color: #C28E00;
  margin-top: 2px;
}

.delete-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 6px;
  transition: color 0.15s;
}

.delete-btn:hover {
  color: var(--rose-accent);
}
</style>
