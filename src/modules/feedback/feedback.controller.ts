import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Feedback } from './schemas/feedback.schema';
import { Roles } from '../auth/roles.decorator';
import { ROLES } from '../../utils/constants';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @ApiOperation({ summary: 'Add feedback' })
  @ApiResponse({ status: 200 })
  @Post()
  async create(
    @Body() createFeedbackDto: CreateFeedbackDto,
  ): Promise<Feedback> {
    return this.feedbackService.create(createFeedbackDto);
  }

  @ApiOperation({ summary: 'Get all feedback' })
  @ApiResponse({ status: 200, type: [Feedback] })
  @Get()
  async findAll(): Promise<Feedback[]> {
    return this.feedbackService.findAll();
  }

  @ApiOperation({ summary: 'Get feedback by id' })
  @ApiResponse({ status: 200, type: Feedback })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Feedback> {
    return this.feedbackService.findOne(id);
  }

  @ApiOperation({ summary: 'Delete feedback' })
  @ApiResponse({ status: 200 })
  @Roles(ROLES.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.feedbackService.delete(id);
  }
}
