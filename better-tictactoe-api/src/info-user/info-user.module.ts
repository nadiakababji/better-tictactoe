import { Module } from '@nestjs/common';
import { InfoUserController } from './info-user.controller';
import { InfoUserService } from './info-user.service';

@Module({
  imports: [],
  controllers: [InfoUserController],
  providers: [InfoUserService],
})
export class InfoUserModule {}

