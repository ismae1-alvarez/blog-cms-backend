import mongoose, { type Document, Schema } from "mongoose"

export interface IAuth extends Document {
  name: string
  email: string
  password: string
  description: string
  img: string
}

const AuthSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    toLowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
})

const Auth = mongoose.model<IAuth>("Auth", AuthSchema)

export default Auth
