import people from '../tools/people.json';
import planets from '../tools/planets.json';
import starships from '../tools/starships.json';

export function generateCardData(resourceType, cardId) {
    console.log('generate' + resourceType);
    console.log(people);

    const cardData = people[cardId];

    return cardData;
}

export function getCardForComputerPlayer(resourceType) {
    const randomIndex = Math.floor(Math.random() * people.length);
    const cardData = people[randomIndex];

    return cardData;
}
