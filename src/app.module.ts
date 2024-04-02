import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroController } from './hero/hero.controller';
import { UserModule } from './user/user.module';
import { RoleController } from './role/role.controller';

@Module({
  imports: [UserModule],
  controllers: [AppController, HeroController, RoleController],
  providers: [AppService],
})
export class AppModule {}
