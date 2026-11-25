import { moneySettings } from '../settings';

export function formatMoney(amountInMinorUnits: number): string {
  const major = Math.floor(amountInMinorUnits / moneySettings.minorUnitsPerMajorUnit);
  const minor = amountInMinorUnits % moneySettings.minorUnitsPerMajorUnit;

  if (minor === 0) {
    return `${major}${moneySettings.symbol}`;
  }

  const minorText = String(minor).padStart(2, '0');
  return `${major}${moneySettings.minorSeparator}${minorText}${moneySettings.symbol}`;
}
