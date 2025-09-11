/*
 * @Author: xuwei
 * @Date: 2025-09-11 14:43:48
 * @LastEditors: lisaxw lisaxw@qq.com
 * @LastEditTime: 2025-09-11 15:10:02
 * @Description: Do not edit
 */
"use strict"
/* eslint-disable */
// @ts-nocheck
const fs = require("fs")
const path = require("path")

function bumpSemver(v) {
    const parts = v.split(".").map((n) => parseInt(n, 10) || 0)
    while (parts.length < 3) parts.push(0)
    let [x, y, z] = parts
    z += 1
    if (z >= 10) {
        z = 0
        y += 1
    }
    if (y >= 10) {
        y = 0
        x += 1
    }
    return [x, y, z].join(".")
}

function main() {
    const pkgPathArg = process.argv[2]
    if (!pkgPathArg) {
        console.error("[bump-version] missing package.json path")
        process.exit(2)
    }
    const pkgPath = path.resolve(process.cwd(), pkgPathArg)
    if (!fs.existsSync(pkgPath)) {
        console.error(`[bump-version] file not found: ${pkgPath}`)
        process.exit(3)
    }
    const json = JSON.parse(fs.readFileSync(pkgPath, "utf8"))
    const prev = json.version || "1.0.0"
    const next = bumpSemver(prev)
    json.version = next
    fs.writeFileSync(pkgPath, JSON.stringify(json, null, 2))
    console.log(`[bump-version] ${json.name || ""}: ${prev} -> ${next}`)
}

try {
    main()
} catch (e) {
    console.error("[bump-version] failed:", e && e.message ? e.message : e)
    process.exit(1)
}