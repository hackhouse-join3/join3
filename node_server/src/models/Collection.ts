import mongoose, { Schema, Document, model } from "mongoose";
// import Wordbase from './Wordbase';


// Define 数据类型，TS 要用
export interface ICol extends Document {
  name: string; // collection name
  contract_address: string;
}

// WordSchema，后面 const 定义 Word 实例要用
const ColSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    contract_address: { type: String, required: true, unique: true },
  },
  { collection: "collections", timestamps: true }
);

// Schema 的实例，就跟个对象 Object 一样；
const Collection = model<ICol>("Collection", ColSchema);
export default Collection;