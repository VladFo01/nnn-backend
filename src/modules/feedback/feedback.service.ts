import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feedback } from './schemas/feedback.schema';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name) private readonly feedbackModel: Model<Feedback>,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const createdFeedback = await this.feedbackModel.create(createFeedbackDto);
    return createdFeedback;
  }

  async findAll(): Promise<Feedback[]> {
    return this.feedbackModel.find().exec();
  }

  async findOne(id: string): Promise<Feedback> {
    return this.feedbackModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedFeedback = await this.feedbackModel
      .findByIdAndDelete({ _id: id })
      .exec();
    return deletedFeedback;
  }
}
