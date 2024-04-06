import { Body, Controller, Delete, Get, Header, Param, Post, Put, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { dataHero } from "src/utils/data-hero";
import { CreateHeroDto } from "./dto/create-hero.dto";
import { UpdateHeroDto } from "./dto/update-hero.dto";
import { HeroService } from "./hero.service";

@Controller("hero")
export class HeroController{

    constructor(private heroService: HeroService){

    }

    @Get("index")
    index(@Res() res: Response) {
        try {
            return res.status(200).json(
                {
                    status: true,
                    message: 'berhasil akses',
                    title: 'hero index',
                    data: this.heroService.findAll()
                }
            )
        } catch (error) {
            return res.status(500).json(
                {
                    status: false,
                    message: 'gagal akses',
                    title: 'gagal index'
                }
            )
        }
    }

    @Post('store')
    store(@Req() req: Request, @Body() createHeroDto: CreateHeroDto, @Res() res: Response){
        // console.log(req)
        const { name } = createHeroDto
        const namaValue: string = name

        return res.status(200).json({
            name: namaValue,
            data: createHeroDto // req.body,
            
        })
    }

    @Post('create')
    @Header('Content-Type', 'application/json')
    create(@Req() req: Request, @Res() res: Response){
        try {
            const contentType = req.headers['content-type'];
            if (contentType !== 'application/json') {
                return res.status(400).json({
                  status: false,
                  message: 'Content-Type harus application/json',
                });
            } else {
                const { id, name, type, image } = req.body;
                // console.log(id, name, type, image)
                const dataHeroReq = {
                    id, name, type, image
                }
                this.heroService.create(dataHeroReq)
                return res.status(200).json({
                    status: true,
                    message: {
                        title: 'berhasil membuat data',
                        data: dataHeroReq
                    },
                    data: this.heroService.findAll()
                })
            }
            
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: {
                    title: 'gagal membuat data hero',
                    data: null
                },
            })
        }
    }

    @Put('update/:id')
    update(@Param('id') id: number, @Body() updateHeroDto: UpdateHeroDto , @Res() res: Response){
        try {
            const index = this.heroService.findAll()?.findIndex((item) => Number(item.id) === Number(id))
            if(index === -1){
                return res.status(404).json({
                    status: false,
                    message: 'Data hero not found',
                    data: null
                })
            }

            const updatedHero = {
                ...dataHero[index],
                ...updateHeroDto,
            };
            
            this.heroService.findAll()[index] = updatedHero;

            return res.status(200).json({
                status: true,
                message: 'Data hero updated successfully',
                data: this.heroService.findAll()[index],
                fulldata: this.heroService.findAll()
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Failed to update data hero',
                data: null
            })
        }
    }

    @Get('detail/:id')
    show(@Param() params, @Res() res: Response){
        const { id } = params
        const result = this.heroService.findAll()?.find((item)=>Number(item.id) === Number(id))
        // console.log(result)
        return res.status(200).json({
            id: id,
            data: result
        })
    }

    @Delete('delete/:id')
    destroy(@Param('id') id: number, @Res() res: Response){
        this.heroService.delete(id)
        return res.status(200).json({
            message: `data dengan id ${id} berhasil dihapus`,
        })
        
    }
}