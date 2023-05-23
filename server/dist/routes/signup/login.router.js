"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = void 0;
const express_1 = __importDefault(require("express"));
const login_controller_js_1 = require("./login.controller.js");
exports.loginRouter = express_1.default.Router();
exports.loginRouter.get('/', login_controller_js_1.login);
