import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Permission } from 'src/permissions/schemas/permission.entity';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: true })
  isActive: boolean;

  // Điểm quan trọng: Một mảng chứa các ObjectId tham chiếu sang bảng Permission
  @Prop({
    type: [{ type: [mongoose.Schema.Types.ObjectId], ref: Permission.name }],
  })
  permissions: Permission[];

  // --- Các trường Tracking ---
  @Prop({ type: Object })
  createdBy: { _id: mongoose.Schema.Types.ObjectId; email: string };

  @Prop({ type: Object })
  updatedBy: { _id: mongoose.Schema.Types.ObjectId; email: string };

  @Prop({ type: Object })
  deletedBy: { _id: mongoose.Schema.Types.ObjectId; email: string };

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
