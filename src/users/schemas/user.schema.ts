import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// Tạo ra Document -> Tham chiếu xuống database, để tạo ra table
export type UserDocument = HydratedDocument<User>;

@Schema() // Decorator: đánh dấu Class này là 1 schema trong MongoDB
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  age: number;

  @Prop()
  address: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

// Chuyển đổi Class User thành Schema mà Mongoose có thể hiểu được
export const UserSchema = SchemaFactory.createForClass(User);
