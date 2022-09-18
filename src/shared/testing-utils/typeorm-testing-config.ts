/* eslint-disable prettier/prettier */
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
import { AirportEntity } from './../../airport/airport.entity';
import { AirlineEntity } from './../../airline/airline.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [AirlineEntity, AirportEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([AirlineEntity, AirportEntity]),
];
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/