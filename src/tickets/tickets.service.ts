import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  collectionName,
  Tickets,
  TicketsDocument,
} from './schemas/tickets.schema';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(collectionName) private model: Model<TicketsDocument>,
  ) {}
  async Create(email: string, problem: string): Promise<string> {
    const document = new this.model({
      email,
      problem,
    });
    const { _id } = await document.save();
    return _id;
  }

  async FindByEmail(email: string): Promise<Tickets[]> {
    return await this.model.find({ email }, { __v: 0 }).exec();
  }

  async FindAll(): Promise<Tickets[]> {
    return await this.model.find({}, { __v: 0 }).exec();
  }

  async Delete(id: string): Promise<Tickets> {
    return await this.model.findOneAndDelete({ _id: id }).exec();
  }
}
