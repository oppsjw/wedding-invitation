import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL, type FirebaseStorage } from 'firebase/storage'
import type { FirebaseConfigSetting } from '../types/wedding'

let app: FirebaseApp | null = null
let db: Firestore | null = null
let storage: FirebaseStorage | null = null

export function initFirebase(config?: FirebaseConfigSetting) {
  if (!config || !config.apiKey || !config.projectId) {
    return { app: null, db: null, storage: null }
  }

  try {
    const existingApps = getApps()
    if (existingApps.length > 0) {
      app = existingApps[0]
    } else {
      app = initializeApp(config)
    }
    db = getFirestore(app)
    storage = getStorage(app)
    return { app, db, storage }
  } catch (err) {
    console.warn('Firebase initialization error:', err)
    return { app: null, db: null, storage: null }
  }
}

export async function uploadToFirebaseStorage(file: File): Promise<string> {
  if (!storage) {
    throw new Error('Firebase Storage is not initialized')
  }

  const timestamp = Date.now()
  const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '_')
  const storageRef = ref(storage, `photos/${timestamp}_${cleanName}`)

  const snapshot = await uploadBytes(storageRef, file)
  const downloadUrl = await getDownloadURL(snapshot.ref)
  return downloadUrl
}

export function getFirebaseInstances() {
  return { app, db, storage }
}

