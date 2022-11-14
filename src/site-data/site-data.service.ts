import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { siteDataServiceTypes } from './types';
import {
  collectionName,
  SiteData,
  SiteDataDocument,
} from './schemas/site-data.schema';

@Injectable()
export class SiteDataService {
  constructor(
    @InjectModel(collectionName) private db: Model<SiteDataDocument>,
  ) {}

  public async Create(
    data: SiteData,
  ): Promise<siteDataServiceTypes.CreateResponse> {
    const document = new this.db(data);
    return await document.save().then(({ _id }) => ({ id: _id })); // filter data
  }

  public async Delete(id: string): Promise<SiteDataDocument> {
    return await this.db.findOneAndDelete({ _id: id }, { __v: 0 }).exec();
  }

  public async GetAll() {
    return await this.db.find({}, { __v: 0 }).exec();
  }

  public async GetByPageId(pageID: string) {
    return await this.db.findOne({ pageId: pageID }, { __v: 0 }).exec();
  }

  public async Update(id: string, updatingData: SiteData) {
    this.db.updateOne(
      {
        _id: id,
      },
      {
        $set: updatingData,
      },
    );
  }
}
