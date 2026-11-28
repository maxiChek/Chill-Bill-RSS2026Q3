import { moneySettings } from '../settings';

export function formatMoney(amountInMinorUnits: number): string {
  // округляем до целого и берем модуль
  const absAmount = Math.round(Math.abs(amountInMinorUnits));

  const major = Math.floor(absAmount / moneySettings.minorUnitsPerMajorUnit);
  const minor = absAmount % moneySettings.minorUnitsPerMajorUnit;

  const sign = amountInMinorUnits < 0 ? '-' : '';

  if (minor === 0) {
    return `${sign}${major}${moneySettings.symbol}`;
  }

  const minorText = String(minor).padStart(2, '0');
  return `${sign}${major}${moneySettings.minorSeparator}${minorText}${moneySettings.symbol}`;
}

export function toKopecks(amount: number): number {
  return Math.round(amount * 100);
}
