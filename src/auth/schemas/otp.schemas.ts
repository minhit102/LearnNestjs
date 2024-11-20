import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/auth/role.enum';

export type OtpDocument = Otp & Document;

@Schema({ timestamps: true })
export class Otp {
  @Prop({
    type: String,
    required: true,
  })
  user_id: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  otp: string;

  @Prop({
    type: Date,
    default: Date.now,
    expires: 300,
  })
  createdAt: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  verified: string;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);

