import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AirportService } from './airport.service';
import { AirportController } from './airport.controller';
import { AirportEntity } from './airport.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AirportEntity])],
  providers: [AirportService],
  controllers: [AirportController],
})
export class AirportModule {}
