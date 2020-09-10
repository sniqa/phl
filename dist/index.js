"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rpj = exports.playground = void 0;
const fs = require("fs");
const path = require("path");
function playground() {
    const playgroundPath = path.join(__dirname, "../playground/index.html");
    console.log(playgroundPath);
    const iphl = fs.readFileSync(playgroundPath, "utf-8");
    return iphl;
}
exports.playground = playground;
var rpj_1 = require("./rpj");
Object.defineProperty(exports, "Rpj", { enumerable: true, get: function () { return rpj_1.Rpj; } });
