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
exports.BaseCollection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class BaseCollection {
    constructor(collectionName, schema) {
        this.model = mongoose_1.default.model(collectionName, schema);
    }
    fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const items = yield this.model.find();
                return items;
            }
            catch (err) {
                console.error(`Failed to fetch items from ${this.model.collection.name}`, err);
                return undefined;
            }
        });
    }
    ;
    getId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.findById(id);
                return result;
            }
            catch (error) {
                console.error(`Error: ${error}`);
                return undefined;
            }
        });
    }
    ;
    add(newItem) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = new this.model(newItem);
                const result = yield item.save();
                return result;
            }
            catch (err) {
                console.error(`Failed to add item to ${this.model.collection.name}`, err);
                return undefined;
            }
        });
    }
    ;
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.model.deleteOne({ _id: id });
                return result;
            }
            catch (error) {
                console.error(`Error: ${error}`);
                return undefined;
            }
        });
    }
    ;
    update(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateQuery = { $set: newData };
                console.log('updata and id', updateQuery, id);
                const result = yield this.model.findByIdAndUpdate(id, updateQuery, { new: true });
                console.log('model', result);
                return result;
            }
            catch (error) {
                console.error(`Error: ${error}`);
                return undefined;
            }
        });
    }
    ;
    updateSubcollection(parentId, subId, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateQuery = {
                    $set: {
                        "subcategories.$.name": newData.name,
                        "subcategories.$.slug": newData.slug,
                        "subcategories.$.updatedAt": newData.updatedAt
                    }
                };
                console.log('update and id', updateQuery, subId);
                const result = yield this.model.findOneAndUpdate({ "_id": parentId, "subcategories._id": subId }, updateQuery, { new: true });
                console.log('model', result);
                return result;
            }
            catch (error) {
                console.error(`Error: ${error}`);
                return undefined;
            }
        });
    }
    ;
    deleteSubcollection(parentId, subId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateQuery = {
                    $pull: {
                        "subcategories": { _id: subId }
                    }
                };
                console.log('delete and id', updateQuery, subId);
                const result = yield this.model.findOneAndUpdate({ "_id": parentId }, updateQuery, { new: true });
                console.log('model', result);
                return result;
            }
            catch (error) {
                console.error(`Error: ${error}`);
                return undefined;
            }
        });
    }
    ;
    addSubcollection(parentId, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateQuery = {
                    $push: {
                        "subcategories": newData
                    }
                };
                console.log('add and id', updateQuery, parentId);
                const result = yield this.model.findOneAndUpdate({ "_id": parentId }, updateQuery, { new: true });
                console.log('model', result);
                return result;
            }
            catch (error) {
                console.error(`Error: ${error}`);
                return undefined;
            }
        });
    }
    ;
    updateComment(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateQuery = {
                    $set: {
                        "content": newData.content,
                        "updatedAt": newData.updatedAt
                    }
                };
                const result = yield this.model.findOneAndUpdate({ "_id": id }, updateQuery, { new: true });
                if (!result) {
                    console.log(`Document with ID ${id} not found.`);
                    return null;
                }
                console.log('Updated document:', result);
                return result;
            }
            catch (error) {
                console.error(`Error updating document: ${error}`);
                return undefined;
            }
        });
    }
    ;
    getArticlesByCategoryId(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articles = yield this.model.find({ categoryId: categoryId });
                return articles;
            }
            catch (error) {
                console.error(`Error: ${error}`);
                return undefined;
            }
        });
    }
    ;
    updateArt(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateQuery = {
                    $set: {
                        "title": newData.title,
                        "img": newData.img,
                        "categoryId": newData.categoryId,
                        "content": newData.content,
                        "updatedAt": newData.updatedAt
                    }
                };
                const result = yield this.model.findOneAndUpdate({ "_id": id }, updateQuery, { new: true });
                if (!result) {
                    console.log(`Document with ID ${id} not found.`);
                    return null;
                }
                console.log('Updated document:', result);
                return result;
            }
            catch (error) {
                console.error(`Error updating document: ${error}`);
                return undefined;
            }
        });
    }
    ;
    deleteSubcmtOnArt(parentId, sub) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateQuery = {
                    $pull: {
                        "comments": sub
                    }
                };
                console.log('delete and id', updateQuery, sub);
                const result = yield this.model.findOneAndUpdate({ "_id": parentId }, updateQuery, { new: true });
                console.log('model', result);
                return result;
            }
            catch (error) {
                console.error(`Error: ${error}`);
                return undefined;
            }
        });
    }
    ;
    getUser(username, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = { usernameExists: false, emailExists: false };
            console.log('band', username, email);
            try {
                const usernameResult = yield this.model.findOne({ username });
                console.log('user', usernameResult);
                if (usernameResult) {
                    result.usernameExists = true;
                    return result;
                }
            }
            catch (error) {
                console.error(`Error: ${error}`);
            }
            try {
                const emailResult = yield this.model.findOne({ email });
                console.log('user', emailResult);
                if (emailResult) {
                    result.emailExists = true;
                }
            }
            catch (error) {
                console.error(`Error: ${error}`);
            }
            return result;
        });
    }
    ;
    getCommentOnArt(listid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield this.model.find({
                    '_id': { $in: listid }
                });
                return comments;
            }
            catch (error) {
                console.error(`Error: ${error}`);
                return undefined;
            }
        });
    }
    ;
    addSubcmtOnArt(parentId, sub) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateQuery = {
                    $push: {
                        "comments": sub
                    }
                };
                console.log('add and id', updateQuery, sub);
                const result = yield this.model.findOneAndUpdate({ "_id": parentId }, updateQuery, { new: true });
                console.log('model', result);
                return result;
            }
            catch (error) {
                console.error(`Error: ${error}`);
                return undefined;
            }
        });
    }
    ;
}
exports.BaseCollection = BaseCollection;
