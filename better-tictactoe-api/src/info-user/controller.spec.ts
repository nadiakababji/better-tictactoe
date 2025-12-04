import { BaseResponse } from "src/interfaces";
import { InfoUserController } from "./info-user.controller"
import { InfoUserService } from "./info-user.service";
import { UpdateInfoUserRequest } from "./interfaces";
import { ValidationError } from "class-validator";
import { BadRequestException } from "@nestjs/common";

describe('InfoUserController',()=>{
    let controller: InfoUserController;
    let service: InfoUserService;


    beforeEach(()=>{
        service= new InfoUserService()
        controller= new InfoUserController(service)
    })

    it('should return success response', async()=>{
        const payload: UpdateInfoUserRequest ={
            name: 'Nadia',
            age: 23,
            married: false,
            dateOfBirth: '21-12-2001' as any
        }

        const mockResult : BaseResponse = {
            success: true,
            data: payload
        }

        jest.spyOn(service, 'validateInfo').mockResolvedValue(mockResult);
        expect(await controller.getConfig(payload)).toBe(mockResult)
    })

    it('should throw an exception', async()=>{
         const payload: UpdateInfoUserRequest ={
            name: 'Na',
            age: 23,
            married: false,
            dateOfBirth: '21-12-2001' as any
        }

        const mockResult: BaseResponse={
            success: false,
            errors: [{ property: 'name', constraints: { minLength: 'Name too short' } } as ValidationError],
            
        }

        jest.spyOn(service, 'validateInfo').mockResolvedValue(mockResult);
        await expect(controller.getConfig(payload)).rejects.toThrow(BadRequestException);
    })
})

