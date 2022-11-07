import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { collectionName, SiteDataDocument } from './schemas/site-data.schema';

@Injectable()
export class SiteDataService {
  constructor(
    @InjectModel(collectionName) private model: Model<SiteDataDocument>,
  ) {}

  public async Create() {
    const mock = new this.model({
      sectionIndex: 1,
      pageId: 'index',
      title: 'hello world',
      tiles: [
        {
          description: 'test',
          title: 'mock title',
          image: '',
          redirectionLink: 'https://google.com',
        },
      ],
    });

    return await mock.save().then(({ _id }) => _id);
  }
}
