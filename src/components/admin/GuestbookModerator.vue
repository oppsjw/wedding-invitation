<script setup lang="ts">
import { guestbook, deleteGuestbookEntry } from '../../services/storage'
import { Trash2, MessageSquare, Heart } from 'lucide-vue-next'

const handleDelete = (id: string) => {
  if (confirm('이 축하 메시지를 삭제하시겠습니까?')) {
    deleteGuestbookEntry(id, undefined, true)
  }
}
</script>

<template>
  <div class="guestbook-moderator font-sans">
    <div class="moderator-header">
      <div>
        <h3 class="moderator-title font-serif">방명록 관리</h3>
        <p class="moderator-desc">
          하객들이 남긴 축하 메시지를 확인하고 부적절한 글을 관리자 권한으로 삭제할 수 있습니다. (총 {{ guestbook.length }}건)
        </p>
      </div>
    </div>

    <div class="messages-list">
      <div v-for="entry in guestbook" :key="entry.id" class="card-paper message-card">
        <div class="card-header">
          <div class="author-info">
            <Heart :size="14" class="heart-icon" />
            <strong class="author-name">{{ entry.author }}</strong>
            <span class="created-at">{{ new Date(entry.createdAt).toLocaleString('ko-KR') }}</span>
          </div>

          <button class="delete-btn" @click="handleDelete(entry.id)" title="메시지 삭제">
            <Trash2 :size="15" />
            <span>삭제</span>
          </button>
        </div>

        <p class="message-text">{{ entry.message }}</p>
      </div>

      <div v-if="guestbook.length === 0" class="empty-state card-paper">
        <MessageSquare :size="36" class="empty-icon" />
        <p>작성된 방명록 글이 없습니다.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.guestbook-moderator {
  padding: 24px 0;
}

.moderator-header {
  margin-bottom: 24px;
}

.moderator-title {
  font-size: 20px;
  color: var(--text-main);
  margin-bottom: 4px;
}

.moderator-desc {
  font-size: 13px;
  color: var(--text-sub);
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message-card {
  padding: 18px 20px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.heart-icon {
  color: var(--rose-accent);
}

.author-name {
  font-size: 15px;
  color: var(--text-main);
}

.created-at {
  font-size: 12px;
  color: var(--text-muted);
}

.delete-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: 1px solid var(--border-color);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  color: var(--rose-accent);
  cursor: pointer;
  transition: all 0.15s;
}

.delete-btn:hover {
  background: #FEECEB;
  border-color: #F8B4B0;
}

.message-text {
  font-size: 14px;
  color: var(--text-sub);
  line-height: 1.6;
  white-space: pre-line;
}

.empty-state {
  text-align: center;
  padding: 40px 0;
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.empty-icon {
  color: var(--border-color);
}
</style>

