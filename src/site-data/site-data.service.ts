import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { collectionName, SiteDataDocument } from './schemas/site-data.schema';

@Injectable()
export class SiteDataService {
  constructor(
    @InjectModel(collectionName) private model: Model<SiteDataDocument>,
  ) {}
}
