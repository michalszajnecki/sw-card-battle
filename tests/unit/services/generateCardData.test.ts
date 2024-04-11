import { describe, test, expect } from 'vitest';
import { generateCardData, buildDeckForPlayer, getCardForComputerPlayer } from '../../../services/generateCardData';

describe('Check generateCardData service', () => {
    test('Find Luke Skywalker in correct resource type', () => {
        expect(generateCardData('people', '1').name).toBe('Luke Skywalker');
    });

    test('Find Tatooine in correct resource type', () => {
        expect(generateCardData('planets', '1').name).toBe('Tatooine');
    });

    test('Find CR90 corvette in correct resource type', () => {
        expect(generateCardData('starships', '1').name).toBe('CR90 corvette');
    });

    test('Generate card for computer player from resource - people', () => {
        expect(getCardForComputerPlayer('people').description).toBe('A person within the Star Wars universe');
    });

    test('Generate card for computer player from resource - planets', () => {
        expect(getCardForComputerPlayer('planets').description).toBe('A planet.');
    });

    test('Generate card for computer player from resource - starships', () => {
        expect(getCardForComputerPlayer('starships').description).toBe('A Starship');
    });

    test('Build deck for a player with random cards in resource - people', () => {
        expect(buildDeckForPlayer('people').length).toBe(5);
        expect(buildDeckForPlayer('people')[0].description).toBe('A person within the Star Wars universe');
    });

    test('Build deck for a player with random cards in resource - planets', () => {
        expect(buildDeckForPlayer('planets').length).toBe(5);
        expect(buildDeckForPlayer('planets')[0].description).toBe('A planet.');
    });

    test('Build deck for a player with random cards in resource - starships', () => {
        expect(buildDeckForPlayer('starships').length).toBe(5);
        expect(buildDeckForPlayer('starships')[0].description).toBe('A Starship');
    });

    // test('does not increment the current number over the max', () => {
    //     expect(increment(10, 10)).toBe(10);
    // });

    // test('has a default max of 10', () => {
    //     expect(increment(10)).toBe(10);
    // });
});
