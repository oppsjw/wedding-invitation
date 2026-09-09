const fs = require('fs')
const path = require('path')

const rootDir = path.join(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const distAssets = path.join(distDir, 'assets')
const rootAssets = path.join(rootDir, 'assets')

// 1. Copy dist/assets to root assets/ (for direct branch root deployment)
if (!fs.existsSync(rootAssets)) {
  fs.mkdirSync(rootAssets, { recursive: true })
}
if (fs.existsSync(distAssets)) {
  const files = fs.readdirSync(distAssets)
  for (const file of files) {
    fs.copyFileSync(path.join(distAssets, file), path.join(rootAssets, file))
    console.log(`Synced ${file} to assets/`)
  }
}

// 2. Copy root index.html to dist/index.html (for GitHub Actions dist artifact deployment)
if (fs.existsSync(path.join(rootDir, 'index.html'))) {
  fs.copyFileSync(path.join(rootDir, 'index.html'), path.join(distDir, 'index.html'))
  console.log('Synced index.html to dist/index.html')
}
