"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// WordSchema，后面 const 定义 Word 实例要用
var OrgSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, },
    description: { type: String, },
    projects: [{
            name: {
                type: String,
                // required: true,
            },
            address: {
                type: String,
                // required: true, // required informs for missing fields
            }
        }],
    events: [{
            name: {
                type: String,
                // required: true,
            },
            address: {
                type: String,
                // required: true, // required informs for missing fields
            }
        }],
    skills: [{
            name: {
                type: String,
                // required: true,
            },
            address: {
                type: String,
                // required: true, // required informs for missing fields
            }
        }] // project: [{ type: Schema.Types.ObjectId, ref: 'Collection' }], // Collection
    // event: [{ type: Schema.Types.ObjectId, ref: 'Collection' }], // Collection
    // skill: [{ type: Schema.Types.ObjectId, ref: 'Collection' }], // Collection
}, { collection: "organizations", timestamps: true });
// Schema 的实例，就跟个对象 Object 一样；
var Organization = (0, mongoose_1.model)("Organization", OrgSchema);
exports.default = Organization;
