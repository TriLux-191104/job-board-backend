import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

// Tạo ra Document -> Tham chiếu xuống database, để tạo ra table
export type JobDocument = HydratedDocument<Job>;

@Schema({ timestamps: true }) // Decorator: đánh dấu Class này là 1 schema trong MongoDB
export class Job {
  @Prop()
  name: string;

  @Prop()
  skills: string[];

  @Prop({ type: Object })
  company: {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
  };

  @Prop()
  salary: number;

  @Prop()
  quantity: number;

  @Prop()
  level: string;

  @Prop()
  description: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  isActive: boolean;

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

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

// Chuyển đổi Class Job thành Schema mà Mongoose có thể hiểu được
export const JobSchema = SchemaFactory.createForClass(Job);
