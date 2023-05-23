"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupRouter = void 0;
const express_1 = __importDefault(require("express"));
const signup_controller_js_1 = require("./signup.controller.js");
exports.signupRouter = express_1.default.Router();
exports.signupRouter.post('/', signup_controller_js_1.signup);
