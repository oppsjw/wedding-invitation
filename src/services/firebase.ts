import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject,
  type FirebaseStorage
} from 'firebase/storage'
import type { FirebaseConfigSetting } from '../types/wedding'

let app: FirebaseApp | null = null
let db: Firestore | null = null
let storage: FirebaseStorage | null = null

// Vite 환경 변수(VITE_FIREBASE_*)에서 설정 가져오기
export function getEnvFirebaseConfig(): FirebaseConfigSetting | null {
  const env = import.meta.env
  if (env.VITE_FIREBASE_API_KEY && env.VITE_FIREBASE_PROJECT_ID) {
    return {
      apiKey: env.VITE_FIREBASE_API_KEY,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || `${env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || `${env.VITE_FIREBASE_PROJECT_ID}.firebasestorage.app`,
      messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: env.VITE_FIREBASE_APP_ID || ''
    }
  }
  return null
}

export function initFirebase(config?: FirebaseConfigSetting) {
  const targetConfig = (config && config.apiKey && config.projectId)
    ? config
    : getEnvFirebaseConfig()

  if (!targetConfig || !targetConfig.apiKey || !targetConfig.projectId) {
    return { app: null, db: null, storage: null }
  }

  try {
    const existingApps = getApps()
    if (existingApps.length > 0) {
      app = existingApps[0]
    } else {
      app = initializeApp(targetConfig)
    }
    db = getFirestore(app)
    storage = getStorage(app)
    return { app, db, storage }
  } catch (err) {
    console.warn('Firebase initialization error:', err)
    return { app: null, db: null, storage: null }
  }
}

export function isFirebaseStorageReady(): boolean {
  return storage !== null
}

export function getStorageBucketName(): string {
  if (!storage) return ''
  return storage.app.options.storageBucket || ''
}

export async function uploadToFirebaseStorage(
  file: File,
  onProgress?: (percent: number) => void
): Promise<string> {
  if (!storage) {
    initFirebase()
    if (!storage) {
      throw new Error('Firebase Storage가 초기화되지 않았습니다. 관리자 설정에서 Firebase 정보를 입력해주세요.')
    }
  }

  const timestamp = Date.now()
  const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const storageRef = ref(storage, `photos/${timestamp}_${cleanName}`)

  if (onProgress) {
    const uploadTask = uploadBytesResumable(storageRef, file)
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          if (snapshot.totalBytes > 0) {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            onProgress(Math.round(progress))
          }
        },
        (error) => {
          console.error('Firebase Storage upload error:', error)
          reject(error)
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
            resolve(downloadUrl)
          } catch (e) {
            reject(e)
          }
        }
      )
    })
  } else {
    const snapshot = await uploadBytes(storageRef, file)
    const downloadUrl = await getDownloadURL(snapshot.ref)
    return downloadUrl
  }
}

export async function fetchPhotosFromFirebaseStorage(): Promise<Array<{ url: string; fullPath: string; name: string }>> {
  if (!storage) {
    initFirebase()
    if (!storage) {
      throw new Error('Firebase Storage가 초기화되지 않았습니다.')
    }
  }

  const photosFolderRef = ref(storage, 'photos')
  const result = await listAll(photosFolderRef)

  const items = await Promise.all(
    result.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef)
      return {
        url,
        fullPath: itemRef.fullPath,
        name: itemRef.name
      }
    })
  )

  return items
}

export async function deleteFromFirebaseStorage(urlOrPath: string): Promise<void> {
  if (!storage) return
  try {
    const targetRef = ref(storage, urlOrPath)
    await deleteObject(targetRef)
  } catch (err) {
    console.warn('Firebase Storage 파일 삭제 건너뜀 (외부 URL 또는 삭제 불가):', err)
  }
}

export function getFirebaseInstances() {
  return { app, db, storage }
}
