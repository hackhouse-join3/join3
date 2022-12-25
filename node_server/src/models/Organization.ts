import mongoose, { Schema, Document, model } from "mongoose";
import Collection from './Collection';


// Define 数据类型，TS 要用
export interface IOrg extends Document {
  name: string;
  image: string;
  description: string;
  projects: [{
    name: string,
    address: string;
  }],
  events: [{
    name: string,
    address: string;
  }],
  skills: [{
    name: string,
    address: string;
  }]
}

// WordSchema，后面 const 定义 Word 实例要用
const OrgSchema: Schema = new Schema(
  {
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
    }]    // project: [{ type: Schema.Types.ObjectId, ref: 'Collection' }], // Collection
    // event: [{ type: Schema.Types.ObjectId, ref: 'Collection' }], // Collection
    // skill: [{ type: Schema.Types.ObjectId, ref: 'Collection' }], // Collection
  },
  { collection: "organizations", timestamps: true }
);

// Schema 的实例，就跟个对象 Object 一样；
const Organization = model<IOrg>("Organization", OrgSchema);
export default Organization;