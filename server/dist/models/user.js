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
exports.Users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const collections_1 = require("./collections");
const postSchema = new mongoose_1.default.Schema({
    username: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: String,
}, { versionKey: false });
class Users extends collections_1.BaseCollection {
    constructor() {
        super('users', postSchema);
    }
    getLogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = { user: null, emailExists: false, passwordMatches: false };
            console.log('band', email, password);
            try {
                const userResult = yield this.model.findOne({ email });
                console.log('user', userResult);
                if (userResult) {
                    result.user = userResult;
                    result.emailExists = true;
                    result.passwordMatches = (userResult.password === password);
                }
            }
            catch (error) {
                console.error(`Error: ${error}`);
            }
            return result;
        });
    }
    ;
}
exports.Users = Users;
