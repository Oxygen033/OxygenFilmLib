import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    return await this.reviewsRepository.create(createReviewDto);
  }

  async findAll() {
    return await this.reviewsRepository.find();
  }

  async findOne(id: number) {
    return await this.reviewsRepository.findOne({where: {id: id}});
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    return await this.reviewsRepository.update({id: id}, updateReviewDto);
  }

  async remove(id: number) {
    return await this.reviewsRepository.delete({id: id});
  }
}
