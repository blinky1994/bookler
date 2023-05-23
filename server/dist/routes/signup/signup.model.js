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
exports.createUser = void 0;
const db_1 = __importDefault(require("../../services/db"));
const bcrypt_1 = require("../../utils/bcrypt");
function createUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let sql = `
    SELECT email FROM users WHERE email = '${email}';
    `;
        const response = yield db_1.default.query(sql);
        console.log('create user:', response[0][0]);
        if (response[0][0])
            throw new Error('User already exists!');
        let hashedPassword = yield (0, bcrypt_1.hashPassword)(password);
        yield insertUserIntoDB(email, hashedPassword);
        return yield getUserFromDB(email);
    });
}
exports.createUser = createUser;
function getUserFromDB(email) {
    return __awaiter(this, void 0, void 0, function* () {
        let sql = `
        SELECT id, email FROM users WHERE email = '${email}';
    `;
        const response = yield db_1.default.query(sql);
        return {
            id: response[0][0].id,
            email: response[0][0].email
        };
    });
}
function insertUserIntoDB(email, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        let sql = `
    INSERT INTO users (
        email, password
    )
    VALUES (
        '${email}', '${hashedPassword}' 
    );
    `;
        return yield db_1.default.query(sql);
    });
}
