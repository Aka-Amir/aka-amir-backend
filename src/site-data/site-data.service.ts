import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { siteDataServiceTypes } from './types';
import {
  collectionName,
  SiteData,
  SiteDataDocument,
} from './schemas/site-data.schema';
import TileData from './schemas/tile.data';

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

  public async DeleteByPageId(id: string) {
    return await this.db.deleteMany({ pageId: id }).exec();
  }

  public async Delete(id: string): Promise<SiteDataDocument> {
    return await this.db.findOneAndDelete({ _id: id }, { __v: 0 }).exec();
  }

  public async DeleteTile(id: string, tileIndex: number) {
    await this.db
      .updateOne(
        { _id: id },
        {
          $unset: {
            [`tiles.${tileIndex}`]: 1,
          },
        },
      )
      .exec();
    return await this.db
      .findOneAndUpdate(
        { _id: id },
        {
          $pull: {
            [`tiles`]: null,
          },
        },
      )
      .exec();
  }

  public async GetAll() {
    return await this.db.find({}, { __v: 0 }).exec();
  }

  public async GetByPageId(pageID: string) {
    return await this.db.find({ pageId: pageID }, { __v: 0 }).exec();
  }

  public async GetGroupByPageIds() {
    return await this.db
      .aggregate([
        { $match: { pageId: { $not: { $regex: /^layout_/ } } } },
        { $group: { _id: '$pageId', datas: { $push: '$$ROOT' } } },
      ])
      .exec();
  }

  public async PushToTile(id: string, tileData: TileData) {
    const response = await this.db
      .findOneAndUpdate(
        {
          _id: id,
        },
        {
          $push: {
            tiles: tileData,
          },
        },
      )
      .exec();
    return response;
  }

  public async UpdateTileData(
    id: string,
    tileIndex: number,
    updatingData: TileData,
  ) {
    const response = await this.db
      .findOneAndUpdate(
        {
          _id: id,
        },
        {
          $set: {
            [`tiles.${tileIndex}`]: updatingData,
          },
        },
      )
      .exec();
    return response;
  }

  public async Update(id: string, updatingData: SiteData) {
    const response = await this.db
      .updateOne(
        {
          _id: id,
        },
        {
          $set: updatingData,
          $inc: { __v: 1 },
        },
      )
      .exec();

    return response.matchedCount != 0;
  }
}
