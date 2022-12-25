"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// WordSchema，后面 const 定义 Word 实例要用
var ColSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    contract_address: { type: String, required: true, unique: true },
}, { collection: "collections", timestamps: true });
// Schema 的实例，就跟个对象 Object 一样；
var Collection = (0, mongoose_1.model)("Collection", ColSchema);
exports.default = Collection;
