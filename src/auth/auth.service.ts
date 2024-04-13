import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    async login(auth: AuthDto){
        const user = await this.userService.handleLogin(auth.email)
        if(user && (await compare(auth.password, user.password))){
            const { password, createdAt, updatedAt, id, ...result } = user
            const payload = {
                sub: user.id,
                username: user.email
            }
            return {
                ...result,
                access_token: await this.jwtService.signAsync(payload,{
                    secret: 'qwerty',
                    expiresIn: '6000s'
                })
            }
        } else {
            return new UnauthorizedException()
        }

    }
}
