import { Injectable } from '@nestjs/common';
import { UpdateInfoUserRequest } from './models';
import { BaseResponse } from 'src/interfaces';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class InfoUserService {
  async validateInfo (rawData: UpdateInfoUserRequest, ): Promise<BaseResponse> {
    const data = plainToInstance(UpdateInfoUserRequest, rawData);
    const validationErrors = await validate(data);
    if (validationErrors.length > 0) {
      console.log('Validation errors: ', validationErrors)
      return { 
        success: false,
        errors: validationErrors,
      };
    }
    return {
      success: true,
      data: data,
    };
  }
}
