"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playground = void 0;
const fs = require("fs");
const path = require("path");
function playground() {
    const playgroundPath = path.join(__dirname, "../playground/index.html");
    console.log(playgroundPath);
    const iphl = fs.readFileSync(playgroundPath, "utf-8");
    return iphl;
}
exports.playground = playground;
var phl_1 = require("./phl");
Object.defineProperty(exports, "Phl", { enumerable: true, get: function () { return phl_1.Phl; } });
