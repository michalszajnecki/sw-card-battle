import people from '../tools/people.json';
import planets from '../tools/planets.json';
import starships from '../tools/starships.json';

interface Card {
    description: string;
    attack: number;
    uid: string;
    name: string;
}

interface StaticSWData {
    people: Array<Card>;
    starships: Array<Card>;
    planets: Array<Card>;
}

export const staticSWData: StaticSWData = {
    people,
    planets,
    starships,
};
