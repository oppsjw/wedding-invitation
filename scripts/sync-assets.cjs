const fs = require('fs')
const path = require('path')

const distAssets = path.join(__dirname, '..', 'dist', 'assets')
const rootAssets = path.join(__dirname, '..', 'assets')

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
