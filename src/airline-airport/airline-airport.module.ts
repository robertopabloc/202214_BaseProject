/*archivo src/airline-airport/airline-airport.module.ts*/
import { AirlineEntity } from './../airline/airline.entity';
import { AirportEntity } from './../airport/airport.entity';
import { AirlineAirportService } from './airline-airport.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirlineAirportController } from './airline-airport.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AirlineEntity, AirportEntity])],
  providers: [AirlineAirportService],
  controllers: [AirlineAirportController],
})
export class AirlineAirportModule {}
