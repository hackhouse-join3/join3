import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  wallet_address: string;
  bio?: string;
  avatar?: string;
  sbts: [{
    org: string;
    collection_address: string;
    token_id: Number;
    collection_type: string;  // proj / event/ skill
    collection_name: string;
    nft_name: string;
  }];
}

const UserSchema: Schema = new Schema(
  {
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
      collection_type: { type: String }, // proj / event/ skill
      collection_name: { type: String },
      nft_name: { type: String }
    }]
  },
  { collection: "users", timestamps: true }
);

const User = model<IUser>("User", UserSchema);
export default User;