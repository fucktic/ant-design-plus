#!/usr/bin/env node
/* Auto bump versions on build with custom rule:
   - x.y.z => x.y.(z+1) if z < 9
   - x.y.9 => x.(y+1).0 if y < 9
   - x.9.9 => (x+1).0.0
   It updates both the components package and the monorepo root package.json.
*/
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
    console.log(`[bump-on-build] ${pkgPath}: ${oldV} -> ${newV}`)
}

const rootPkg = path.resolve(__dirname, '..', 'package.json')
const compPkg = path.resolve(__dirname, '..', 'packages', 'components', 'package.json')

try {
    update(compPkg)
    update(rootPkg)
} catch (e) {
    console.error('[bump-on-build] failed:', e.message)
    process.exit(1)
}