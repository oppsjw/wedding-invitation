<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  photos,
  uploadImage,
  addPhotoItem,
  deletePhotoItem,
  setCoverPhotoItem,
  movePhotoItem
} from '../../services/storage'
import {
  UploadCloud,
  Trash2,
  Star,
  ArrowUp,
  ArrowDown,
  Plus,
  Image as ImageIcon,
  Check
} from 'lucide-vue-next'

const fileInputRef = ref<HTMLInputElement | null>(null)
const isUploading = ref(false)
const uploadProgressText = ref('')
const urlInput = ref('')
const urlCaption = ref('')
const showUrlModal = ref(false)

const sortedPhotos = computed(() => {
  return [...photos.value].sort((a, b) => a.order - b.order)
})

const handleFileChange = async (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return

  const files = Array.from(target.files)
  isUploading.value = true

  try {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      uploadProgressText.value = `사진 업로드 중 (${i + 1}/${files.length}): ${file.name}`
      const url = await uploadImage(file)
      addPhotoItem({
        url,
        caption: '',
        isCover: photos.value.length === 0
      })
    }
  } catch (err) {
    console.error('File upload error:', err)
    alert('사진 업로드 중 오류가 발생했습니다.')
  } finally {
    isUploading.value = false
    uploadProgressText.value = ''
    if (fileInputRef.value) fileInputRef.value.value = ''
  }
}

const handleAddByUrl = () => {
  if (!urlInput.value.trim()) return
  addPhotoItem({
    url: urlInput.value.trim(),
    caption: urlCaption.value.trim(),
    isCover: photos.value.length === 0
  })
  urlInput.value = ''
  urlCaption.value = ''
  showUrlModal.value = false
}

const handleDelete = (id: string) => {
  if (confirm('이 사진을 정말 삭제하시겠습니까?')) {
    deletePhotoItem(id)
  }
}

const handleSetCover = (id: string) => {
  setCoverPhotoItem(id)
}

const handleMove = (index: number, direction: 'up' | 'down') => {
  movePhotoItem(index, direction)
}
</script>

<template>
  <div class="photo-manager font-sans">
    <div class="manager-header">
      <div>
        <h3 class="manager-title font-serif">웨딩 사진 관리</h3>
        <p class="manager-desc">
          청첩장에 노출될 웨딩 사진을 업로드하고 대표 사진 및 순서를 설정할 수 있습니다. (현재 {{ photos.length }}장 등록됨)
        </p>
      </div>

      <div class="header-actions">
        <button class="btn-secondary add-url-btn" @click="showUrlModal = !showUrlModal">
          <Plus :size="15" />
          <span>이미지 URL 직접 추가</span>
        </button>

        <button class="btn-primary upload-btn" @click="fileInputRef?.click()" :disabled="isUploading">
          <UploadCloud :size="16" />
          <span>{{ isUploading ? '업로드 중...' : '컴퓨터에서 사진 선택' }}</span>
        </button>
        <input
          ref="fileInputRef"
          type="file"
          multiple
          accept="image/*"
          class="hidden-file-input"
          @change="handleFileChange"
        />
      </div>
    </div>

    <!-- Upload Status Progress Banner -->
    <div v-if="isUploading" class="upload-banner">
      <div class="spinner"></div>
      <span>{{ uploadProgressText }}</span>
    </div>

    <!-- URL Add Modal / Inset Box -->
    <div v-if="showUrlModal" class="card-paper url-add-box">
      <h4 class="url-box-title">이미지 웹 URL 직접 추가</h4>
      <div class="url-inputs">
        <input
          v-model="urlInput"
          type="url"
          placeholder="https://example.com/photo.jpg"
          class="input-field"
        />
        <input
          v-model="urlCaption"
          type="text"
          placeholder="사진 설명 / 문구 (선택)"
          class="input-field caption"
        />
        <button class="btn-primary" @click="handleAddByUrl">
          <Check :size="14" />
          <span>추가</span>
        </button>
      </div>
    </div>

    <!-- Photo List Grid -->
    <div class="photo-grid">
      <div
        v-for="(photo, index) in sortedPhotos"
        :key="photo.id"
        class="photo-card"
        :class="{ 'is-cover': photo.isCover }"
      >
        <div class="photo-thumb-wrap">
          <img :src="photo.url" :alt="photo.caption || '웨딩 사진'" class="photo-thumb" />

          <!-- Cover Badge -->
          <div v-if="photo.isCover" class="cover-badge font-serif">
            <Star :size="12" fill="currentColor" />
            <span>대표 사진</span>
          </div>

          <!-- Order Badge -->
          <div class="order-badge font-sans">
            {{ index + 1 }}
          </div>
        </div>

        <!-- Photo Actions & Caption -->
        <div class="photo-details">
          <input
            v-model="photo.caption"
            type="text"
            placeholder="사진 설명 (캡션)"
            class="caption-input"
          />

          <div class="actions-row">
            <button
              v-if="!photo.isCover"
              class="action-text-btn cover-btn"
              @click="handleSetCover(photo.id)"
            >
              <Star :size="13" />
              <span>대표 지정</span>
            </button>
            <span v-else class="action-text-btn current-cover">
              대표 사진 지정됨
            </span>

            <div class="order-buttons">
              <button
                class="icon-btn"
                :disabled="index === 0"
                @click="handleMove(index, 'up')"
                title="앞으로 이동"
              >
                <ArrowUp :size="14" />
              </button>
              <button
                class="icon-btn"
                :disabled="index === sortedPhotos.length - 1"
                @click="handleMove(index, 'down')"
                title="뒤로 이동"
              >
                <ArrowDown :size="14" />
              </button>
              <button
                class="icon-btn delete"
                @click="handleDelete(photo.id)"
                title="사진 삭제"
              >
                <Trash2 :size="14" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="photos.length === 0" class="empty-state card-paper">
      <ImageIcon :size="40" class="empty-icon" />
      <p class="empty-text">등록된 사진이 없습니다.</p>
      <p class="empty-sub">위의 '컴퓨터에서 사진 선택' 버튼을 눌러 사진을 등록해 보세요.</p>
    </div>
  </div>
</template>

<style scoped>
.photo-manager {
  padding: 24px 0;
}

.manager-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
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

.header-actions {
  display: flex;
  gap: 8px;
}

.hidden-file-input {
  display: none;
}

.upload-btn {
  font-size: 13px;
  padding: 10px 18px;
}

.add-url-btn {
  font-size: 13px;
  padding: 10px 16px;
}

.upload-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  background: var(--gold-soft);
  border: 1px solid var(--gold-light);
  border-radius: 10px;
  color: var(--gold-dark);
  font-size: 13px;
  margin-bottom: 20px;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--gold-light);
  border-top-color: var(--gold-dark);
  border-radius: 50%;
  animation: spinSlow 1s linear infinite;
}

.url-add-box {
  margin-bottom: 24px;
  padding: 18px 20px;
  background: var(--bg-ivory);
}

.url-box-title {
  font-size: 14px;
  color: var(--text-main);
  margin-bottom: 10px;
}

.url-inputs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.url-inputs .input-field {
  flex: 2;
  min-width: 200px;
  padding: 9px 12px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  font-size: 13px;
}

.url-inputs .caption {
  flex: 1;
}

/* Photo Grid */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.photo-card {
  background: #FFFFFF;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-sm);
  transition: border-color 0.2s;
}

.photo-card.is-cover {
  border: 2px solid var(--gold-primary);
}

.photo-thumb-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: var(--bg-warm);
}

.photo-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: var(--gold-primary);
  color: #FFFFFF;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
}

.order-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.55);
  color: #FFFFFF;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-details {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.caption-input {
  width: 100%;
  padding: 7px 10px;
  border-radius: 6px;
  border: 1px solid var(--border-light);
  font-size: 12px;
  outline: none;
}

.caption-input:focus {
  border-color: var(--gold-primary);
}

.actions-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.action-text-btn {
  background: none;
  border: none;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}

.cover-btn {
  color: var(--gold-primary);
}

.cover-btn:hover {
  text-decoration: underline;
}

.current-cover {
  color: var(--gold-dark);
  font-weight: 600;
  cursor: default;
}

.order-buttons {
  display: flex;
  gap: 4px;
}

.icon-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  background: #FFFFFF;
  color: var(--text-sub);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
}

.icon-btn:hover:not(:disabled) {
  background: var(--bg-subtle);
  color: var(--text-main);
}

.icon-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.icon-btn.delete:hover {
  background: #FEECEB;
  border-color: #F8B4B0;
  color: var(--rose-accent);
}

.empty-state {
  text-align: center;
  padding: 48px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.empty-icon {
  color: var(--border-color);
}

.empty-text {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-main);
}

.empty-sub {
  font-size: 13px;
  color: var(--text-muted);
}
</style>

