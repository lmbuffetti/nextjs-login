import {
  buildSchema, getModelForClass,
  ModelOptions,
  post,
  prop,
  Severity,
} from '@typegoose/typegoose'
import mongoose from 'mongoose'

@post<UserClass>('save', function (doc) {
  if (doc) {
    doc.id = doc._id.toString()
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
