import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post("login")
    async login(@Body() dto: AuthDto, @Res() res: Response){
        try {
            const payload: any = await this.authService.login(dto)
            if(payload?.access_token){
                return res.status(200).json({
                    status: true,
                    message: 'berhasil login',
                    data: payload
                })
            }

            return res.status(400).json({
                status: false,
                message: 'gagal login',
                data: {
                    ...payload.response
                }
            })

        } catch (error) {
            console.log(error)
        }
    }
}
