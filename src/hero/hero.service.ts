import { Injectable } from "@nestjs/common";
import { Hero } from "./interfaces/hero.interface";
import { dataHero } from "src/utils/data-hero";

@Injectable()
export class HeroService {
    private readonly heroes: Hero[] = dataHero;

    create(hero: Hero): void {
        this.heroes.push(hero);
    }

    delete(id: number): void {
        const index = this.heroes.findIndex((item) => Number(item.id) === Number(id));
        if (index !== -1) {
            this.heroes.splice(index, 1);
        }
    }

    findAll(): Hero[] {
        return this.heroes;
    }
}
