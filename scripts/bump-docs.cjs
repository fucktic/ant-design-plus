#!/usr/bin/env node
/* Auto bump docs package version only */
const fs = require('fs')
const path = require('path')

function bump(v) {
    const [maj, min, pat] = v.split('.').map(Number)
    if (Number.isNaN(maj) || Number.isNaN(min) || Number.isNaN(pat)) {
        throw new Error('Invalid semver: ' + v)
    }
    if (pat < 9) return `${maj}.${min}.${pat + 1}`
    if (min < 9) return `${maj}.${min + 1}.0`
    return `${maj + 1}.0.0`
}

function update(pkgPath) {
    const raw = fs.readFileSync(pkgPath, 'utf8')
    const json = JSON.parse(raw)
    const oldV = json.version
    const newV = bump(oldV)
    json.version = newV
    fs.writeFileSync(pkgPath, JSON.stringify(json, null, 4))
    console.log(`[bump-docs] ${json.name}: ${oldV} -> ${newV}`)
}

const docsPkg = path.resolve(__dirname, '..', 'packages', 'docs', 'package.json')

try {
    update(docsPkg)
} catch (e) {
    console.error('[bump-docs] failed:', e.message)
    process.exit(1)
}
