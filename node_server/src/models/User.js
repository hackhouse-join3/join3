"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true, },
    wallet_address: { type: String, required: true, unique: true, },
    bio: { type: String },
    avatar: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdGr3fTJlsjdAEiSCDznslzUJXqeI22hIB20aDOvQsf9Hz93yoOiLaxnlPEA&s",
    },
    sbts: [{
            org: { type: String },
            collection_address: { type: String },
            token_id: { type: Number },
            collection_type: { type: String },
            collection_name: { type: String },
            nft_name: { type: String }
        }]
}, { collection: "users", timestamps: true });
var User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
