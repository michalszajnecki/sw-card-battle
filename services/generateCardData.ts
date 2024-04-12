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
    const maxIndex = {
        people: 83,
        planets: 60,
        starships: 36,
    };
    const randomIndex = Math.floor(Math.random() * maxIndex[resourceType]) + 1;

    return generateCardData(resourceType, randomIndex.toString());
}

export function buildDeckForPlayer(resourceType: string): Card[] {
    const deck: Card[] = [];
    do {
        const newCard: Card = getRandomCard(resourceType);
        if (newCard) {
            const isCardAlreadyPresent = deck.find((card: Card) => card.uid === newCard.uid);
            if (!isCardAlreadyPresent) {
                deck.push(newCard);
            }
        }
    } while (deck.length !== 5);
    return deck;
}

export function getCardForComputerPlayer(resourceType: string): Card {
    return getRandomCard(resourceType);
}
