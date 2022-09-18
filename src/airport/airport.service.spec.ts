/* eslint-disable prettier/prettier */
/*archivo src/airport/airport.service.spec.ts*/
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AirportService } from './airport.service';
import { AirportEntity } from './airport.entity';

import { faker } from '@faker-js/faker';

describe('AirportService', () => {
  let service: AirportService;
  let repository: Repository<AirportEntity>;
  let airportsList: AirportEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AirportService],
    }).compile();

    service = module.get<AirportService>(AirportService);
    repository = module.get<Repository<AirportEntity>>(getRepositoryToken(AirportEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    airportsList = [];
    for(let i = 0; i < 5; i++){
        const airport: AirportEntity = await repository.save({
        name: faker.company.name(), 
        code: faker.random.alphaNumeric(5), 
        country: faker.address.country(), 
        city: faker.address.city()})
        airportsList.push(airport);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all airports', async () => {
    const airports: AirportEntity[] = await service.findAll();
    expect(airports).not.toBeNull();
    expect(airports).toHaveLength(airportsList.length);
  });

  it('findOne should return a airport by id', async () => {
    const storedAirport: AirportEntity = airportsList[0];
    const airport: AirportEntity = await service.findOne(storedAirport.id);
    expect(airport).not.toBeNull();
    expect(airport.name).toEqual(storedAirport.name)
    expect(airport.code).toEqual(storedAirport.code)
    expect(airport.country).toEqual(storedAirport.country)
    expect(airport.city).toEqual(storedAirport.city)
  });

  it('findOne should throw an exception for an invalid airport', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The airport with the given id was not found")
  });

  it('create should return a new airport', async () => {
    const airport: AirportEntity = {
      id: "",
      name: faker.company.name(), 
      code: faker.random.alphaNumeric(5), 
      country: faker.address.country(), 
      city: faker.address.city(),
      airlines:[]
    }

    const newAirport: AirportEntity = await service.create(airport);
    expect(newAirport).not.toBeNull();

    const storedAirport: AirportEntity = await repository.findOne({where: {id: newAirport.id}})
    expect(storedAirport).not.toBeNull();
    expect(storedAirport.name).toEqual(newAirport.name)
    expect(storedAirport.code).toEqual(newAirport.code)
    expect(storedAirport.country).toEqual(newAirport.country)
    expect(storedAirport.city).toEqual(newAirport.city)
  });

  it('update should modify a airport', async () => {
    const airport: AirportEntity = airportsList[0];
    airport.name = "New name";
    airport.code = "New code";
  
    const updatedAirport: AirportEntity = await service.update(airport.id, airport);
    expect(updatedAirport).not.toBeNull();
  
    const storedAirport: AirportEntity = await repository.findOne({ where: { id: airport.id } })
    expect(storedAirport).not.toBeNull();
    expect(storedAirport.name).toEqual(airport.name)
    expect(storedAirport.code).toEqual(airport.code)
  });
 
  it('update should throw an exception for an invalid airport', async () => {
    let airport: AirportEntity = airportsList[0];
    airport = {
      ...airport, name: "New name", code: "New code"
    }
    await expect(() => service.update("0", airport)).rejects.toHaveProperty("message", "The airport with the given id was not found")
  });

  it('delete should remove a airport', async () => {
    const airport: AirportEntity = airportsList[0];
    await service.delete(airport.id);
  
    const deletedAirport: AirportEntity = await repository.findOne({ where: { id: airport.id } })
    expect(deletedAirport).toBeNull();
  });

  it('delete should throw an exception for an invalid airport', async () => {
    const airport: AirportEntity = airportsList[0];
    await service.delete(airport.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The airport with the given id was not found")
  });

});

/*archivo src/airport/airport.service.spec.ts*/
