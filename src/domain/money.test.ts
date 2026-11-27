import { describe, expect, it } from 'vitest';
import { moneySettings } from '../settings';
import { formatMoney, toKopecks } from './money';

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

describe('toKopecks', () => {
  it('конвертирует целые рубли в копейки', () => {
    expect(toKopecks(100)).toBe(10000);
    expect(toKopecks(5)).toBe(500);
  });

  it('конве ртирует рубли с копейками', () => {
    expect(toKopecks(12.34)).toBe(1234);
    expect(toKopecks(0.5)).toBe(50);
  });

  it('корректно обрабатывает проблему плавающей запятой (floating-point)', () => {
    // 10.1 * 100 в JS дает 1009.9999999999999. Math.round должен исправить ситуацию
    expect(toKopecks(10.1)).toBe(1010);
    expect(toKopecks(10.15)).toBe(1015);
    expect(toKopecks(0.07)).toBe(7);
  });

  it('возвращает 0 при вводе 0', () => {
    expect(toKopecks(0)).toBe(0);
  });

  it('возвращает 1 для одной копейки', () => {
    expect(toKopecks(0.01)).toBe(1);
  });

  it('корректно работает с большими суммами', () => {
    expect(toKopecks(1000000.99)).toBe(100000099);
  });
});
