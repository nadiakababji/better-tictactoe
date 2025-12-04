import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { BaseResponse } from 'src/interfaces';
import { UpdateInfoUserRequest } from './interfaces';
import { InfoUserService } from './info-user.service';


@Controller('info-user')
export class InfoUserController {
    constructor(private readonly infoUserService: InfoUserService) {}
    
    @Post('/validate')
    async getConfig( @Body() bodyRequest: UpdateInfoUserRequest): Promise<BaseResponse> {
        const result = await this.infoUserService.validateInfo(bodyRequest);
        if (!result.success) {
            throw new BadRequestException(result.errors);
        }
        return result;
    }
}
