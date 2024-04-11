import { describe, test, expect } from 'vitest';
import { validatePassword, validateEmail } from '../../../services/inputValidators';

describe('Check inputValidators service', () => {
    test('Test strong password', () => {
        expect(validatePassword('VeryStrongPassword')).toBe(true);
    });
    test('Test password with foreign characters', () => {
        expect(validatePassword('罗马尼亚罗马尼亚')).toBe(true);
    });
    test('Test weak password', () => {
        expect(validatePassword('weak')).toBe('Password is too short');
    });
    test('Test example email', () => {
        expect(validateEmail('admin@example.com')).toBe(true);
    });
    test('Test example email with foreign characters', () => {
        expect(validateEmail('罗马尼亚罗马尼亚@example.com')).toBe(true);
    });
    test('Test broken email', () => {
        expect(validateEmail('admin@example.')).toBe('Enter correct e-mail address');
    });
});
