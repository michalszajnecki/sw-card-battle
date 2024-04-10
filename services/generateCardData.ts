import { staticSWData } from './getStaticSWData';

interface Card {
    description: string;
    attack: number;
    uid: string;
    name: string;
}

export function generateCardData(resourceType: string, cardId): Card {
    return staticSWData[resourceType][cardId];
}

function getRandomCard(resourceType: string): Card {
    const randomIndex = Math.floor(Math.random() * staticSWData[resourceType].length);
    return staticSWData[resourceType][randomIndex];
}

export function buildDeckForPlayer(resourceType: string): Card[] {
    const deck: Card[] = [];
    for (let index = 0; index < 5; index++) {
        deck[index] = getRandomCard(resourceType);
    }
    return deck;
}

export function getCardForComputerPlayer(resourceType: string): Card {
    return getRandomCard(resourceType);
}
