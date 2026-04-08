import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

// Tạo ra Document -> Tham chiếu xuống database, để tạo ra table
export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true }) // Decorator: đánh dấu Class này là 1 schema trong MongoDB
export class Company {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  description: string;

  @Prop()
  logo: string;

  @Prop({ type: Object })
  createdBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  deletedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };
}

// Chuyển đổi Class Company thành Schema mà Mongoose có thể hiểu được
export const CompanySchema = SchemaFactory.createForClass(Company);
