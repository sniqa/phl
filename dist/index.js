"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prj = exports.playground = void 0;
const fs = require("fs");
const path = require("path");
function playground() {
    const playgroundPath = path.join(__dirname, "../playground/index.html");
    console.log(playgroundPath);
    const iphl = fs.readFileSync(playgroundPath, "utf-8");
    return iphl;
}
exports.playground = playground;
var prj_1 = require("./prj");
Object.defineProperty(exports, "Prj", { enumerable: true, get: function () { return prj_1.Prj; } });
