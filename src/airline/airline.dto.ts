/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString} from 'class-validator';
export class AirlineDto {

 @IsString()
 @IsNotEmpty()
 readonly name: string;
 
 @IsString()
 @IsNotEmpty()
 readonly description: string;
 
 @IsString()
 @IsNotEmpty()
 readonly fundationDate: Date;
 
 @IsString()
 @IsNotEmpty()
 readonly website: string;

}
/* archivo: src/airline/airline.dto.ts */
