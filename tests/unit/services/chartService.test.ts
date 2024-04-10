import { describe, test, expect } from 'vitest';
import { calculateWinLossRatio, generateStyleObj } from '../../../services/chartService';

describe('Check chartService service', () => {
    test('Generate valid style object for given ratio value', () => {
        expect(generateStyleObj(50).background).toBe('conic-gradient(#FC0858 0% 50%, #0818fc 50% 100%)');
    });

    test('Calculate correct ratio for new user', () => {
        expect(calculateWinLossRatio({ won: 0, lost: 0 })).toBe(0);
    });

    test('Calculate correct ratio for win streak', () => {
        expect(calculateWinLossRatio({ won: 5, lost: 0 })).toBe(100);
    });

    test('Calculate correct ratio for loss streak', () => {
        expect(calculateWinLossRatio({ won: 0, lost: 5 })).toBe(0);
    });

    test('Calculate correct ratio for equal win-loss values', () => {
        expect(calculateWinLossRatio({ won: 5, lost: 5 })).toBe(50);
    });
});
