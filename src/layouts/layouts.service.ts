import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { UpdateLayoutDto } from './dto/update-layout.dto';
import { LayoutsDocument, collectionName } from './entities/layout.entity';
import { InjectModel } from '@nestjs/mongoose';
import { from } from 'rxjs';

@Injectable()
export class LayoutsService {
  constructor(
    @InjectModel(collectionName)
    private readonly model: Model<LayoutsDocument>,
  ) {}

  create(createLayoutDto: CreateLayoutDto) {
    return from(new this.model(createLayoutDto).save());
  }

  createMany(createLayoutDto: CreateLayoutDto[]) {
    return from(this.model.insertMany(createLayoutDto));
  }

  findAll() {
    return from(this.model.find({}, { __v: 0 }).exec());
  }

  findOne(id: string) {
    return from(this.model.findOne({ layoutId: id }, { __v: 0 }).exec());
  }

  update(id: string, updateLayoutDto: UpdateLayoutDto) {
    Logger.log(updateLayoutDto);
    return from(
      this.model
        .updateOne(
          { _id: id },
          {
            $set: {
              ...updateLayoutDto,
              lastModifiedDate: Date.now(),
            },
          },
        )
        .exec(),
    );
  }

  remove(id: string) {
    return from(this.model.findOneAndDelete({ _id: id }).exec());
  }
}
