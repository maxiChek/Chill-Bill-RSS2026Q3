import { describe, expect, it } from 'vitest';
import { moneySettings } from '../settings';
import { formatMoney } from './money';

const { symbol, minorSeparator, minorUnitsPerMajorUnit: unit } = moneySettings;

describe('formatMoney', () => {
  it('выводит копейки как часть того же числа', () => {
    expect(formatMoney(15 * unit + 77)).toBe(`15${minorSeparator}77${symbol}`);
  });

  it('добивает однозначную минорную часть до двух цифр', () => {
    expect(formatMoney(15 * unit + 5)).toBe(`15${minorSeparator}05${symbol}`);
  });

  it('не выводит копейки, если их нет', () => {
    const result = formatMoney(15 * unit);
    expect(result).toBe(`15${symbol}`);
    expect(result).not.toContain(minorSeparator);
  });

  it('форматирует ноль', () => {
    expect(formatMoney(0)).toBe(`0${symbol}`);
  });
});
