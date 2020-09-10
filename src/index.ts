const fs = require("fs")
const path = require("path")

export function playground(): string {
  const playgroundPath = path.join(__dirname, "../playground/index.html")
  console.log(playgroundPath)

  const iphl = fs.readFileSync(playgroundPath, "utf-8")
  return iphl
}

export { Prj } from "./prj"
