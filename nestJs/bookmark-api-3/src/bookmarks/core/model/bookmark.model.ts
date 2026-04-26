import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddressBookDocument = AddressBook & Document;

@Schema({
  timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
  versionKey: false,
})
export class AddressBook {
  @Prop({ required: true, unique: true })
  id!: string;

  @Prop({ required: true })
  url!: string;

  @Prop({ required: true })
  title!: string;

  @Prop()
  description?: string;

  @Prop([String])
  tags?: string[];
}

export const AddressBookSchema = SchemaFactory.createForClass(AddressBook);
