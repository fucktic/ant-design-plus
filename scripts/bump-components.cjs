#!/usr/bin/env node
/* Auto bump components package version only */
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
    console.log(`[bump-components] ${json.name}: ${oldV} -> ${newV}`)
}

const compPkg = path.resolve(__dirname, '..', 'packages', 'components', 'package.json')

try {
    update(compPkg)
} catch (e) {
    console.error('[bump-components] failed:', e.message)
    process.exit(1)
}