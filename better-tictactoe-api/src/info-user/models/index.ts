import { IsBoolean, IsDate, IsInt, isInt, IsNotEmpty, isNumber, IsString, Max, MaxLength, Min, MinLength, ValidateIf } from 'class-validator';
import { UpdateInfoUserRequest as UpdateInfoUserRequestInterface  } from '../interfaces';
import { isDateOfBirthCoherent } from '../validators/is-date-of-birth-coherent';
import { Type } from 'class-transformer';

export class UpdateInfoUserRequest implements UpdateInfoUserRequestInterface {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  name: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(150)
  age: number;

  @ValidateIf(x => x.age > 18)
  @IsNotEmpty({message: 'married should be provided if age>18'})
  @IsBoolean()
  married?: boolean;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @isDateOfBirthCoherent({message: "the age is not coherent"})
  dateOfBirth: Date;
}

