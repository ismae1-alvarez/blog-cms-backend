import mongoose, { type Document, Schema } from "mongoose";

export type ContentBlockType = "text" | "link" | "image";

export interface ContentBlock {
  type: ContentBlockType;
  value: string;
  meta?: {
    url?: string;
    caption?: string;
    position?: number;
  };
};


export interface IPost extends Document {
  title: string;
  content: ContentBlock[];
};

const ContentBlockSchema: Schema = new Schema(
  {
    type: {
      type: String,
      enum: ["text", "link", "image"],
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    meta: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  { _id: false } // MUY importante
);


const PostSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  content: {
    type: [ContentBlockSchema],
    required: true,
  },
},
  {
    timestamps: true,
  }
);

const Post = mongoose.model<IPost>("Post", PostSchema);

export default Post;
