import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminsDocument, collectionName } from './schemas/admins.schema';
import { UpdateType } from './types/UpdateType';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(collectionName) private model: Model<AdminsDocument>,
  ) {}

  async Create(username: string, password: string): Promise<string> {
    const adminDocument = new this.model({
      username,
      password,
    });

    const { _id } = await adminDocument.save();
    return _id;
  }

  async FindAll(): Promise<AdminsDocument[]> {
    return this.model.find({}, { __v: 0 }).exec();
  }

  async HasAdmin(): Promise<boolean> {
    const response = await this.model.findOne().exec();
    return !!response;
  }

  async FindById(id: string): Promise<AdminsDocument> {
    return this.model.findById(id, { __v: 0 }).exec();
  }

  async FindByUsername(username: string): Promise<AdminsDocument> {
    return this.model.findOne({ username }, { __v: 0 }).exec();
  }

  async Delete(id: string): Promise<AdminsDocument> {
    return this.model.findOneAndDelete({ _id: id }).exec();
  }

  async UpdateUser(id: string, updateData: UpdateType) {
    return this.model
      .findOneAndUpdate({ _id: id }, { $set: updateData })
      .exec();
  }
}
