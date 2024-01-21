import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { title } from 'process';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const review = new Review();
    review.title = createReviewDto.title;
    review.text = createReviewDto.text;
    return await this.reviewsRepository.save(review);
  }

  async findAll(creatorId: number) {
    return await this.reviewsRepository.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  async remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
