import { Document, Schema } from 'mongoose';

export type AddressBook = {
  id: string;
  url: string;
  title: string;
  description?: string;
  tags?: string[];
  createdDate?: Date;
  updatedDate?: Date;
};

export type AddressBookDocument = AddressBook & Document;

export const AddressBookSchema = new Schema<AddressBookDocument>(
  {
    id: { type: String, required: true },
    url: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    tags: [{ type: String }],
  },
  {
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'updatedDate',
    },
    versionKey: false,
  },
);

AddressBookSchema.index({ id: 1 }, { unique: true });
