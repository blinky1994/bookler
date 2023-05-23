"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserInDB = void 0;
const db_1 = __importDefault(require("../../services/db"));
const bcrypt_1 = require("../../utils/bcrypt");
function checkUserInDB(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let sql = `
        SELECT id, email, password FROM users WHERE email = '${email}';
    `;
        const response = yield db_1.default.query(sql);
        if (!response[0][0])
            throw new Error('User does not exist');
        const hashedPassword = yield response[0][0].password;
        const validatePassword = yield (0, bcrypt_1.comparePassword)(password, hashedPassword);
        if (!validatePassword)
            throw new Error('Wrong user or password');
        return {
            id: response[0][0].id,
            email: response[0][0].email,
        };
    });
}
exports.checkUserInDB = checkUserInDB;
