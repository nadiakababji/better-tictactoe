import { Module } from '@nestjs/common';
import { InfoModule } from './info/info.module';
import { InfoUserModule } from './info-user/info-user.module';

@Module({
  imports: [InfoModule, InfoUserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
