import { staticSWData } from './getStaticSWData';

interface Card {
    description: string;
    attack: number;
    uid: string;
    name: string;
}

export function generateCardData(resourceType: string, cardId: string): Card {
    return staticSWData[resourceType].find((card) => card.uid === cardId);
}

function getRandomCard(resourceType: string): Card {
    const randomIndex = Math.floor(Math.random() * staticSWData[resourceType].length);
    return generateCardData(resourceType, randomIndex.toString());
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
