import {
  buildSchema,
  getModelForClass,
  index,
  ModelOptions,
  post,
  prop,
  Severity,
} from '@typegoose/typegoose'
import mongoose from 'mongoose'

@post<UserClass>('save', function (doc) {
  if (doc) {
    doc.id = doc._id.toString()
    doc._id = doc.id
  }
})
@ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'users',
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@index({ email: 1 })
class UserClass {
  @prop()
  _id?: mongoose.Types.ObjectId

  @prop({ required: true, unique: true })
  email: string

  id: string

  @prop({ required: true })
  name: string

  @prop({ required: true })
  password: string
}

const User = getModelForClass(UserClass)
const UserSchema = buildSchema(UserClass)

export { User, UserClass, UserSchema }
