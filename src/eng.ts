/**
 * Engineering notation formatting utilities
 */

import { roundSig } from './eseries';

/** SI prefixes from yocto to Yotta */
export const PREFIXES = ['y', 'z', 'a', 'f', 'p', 'n', 'µ', 'm', '', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

/**
 * Returns a number formatted in a simplified engineering format - 
 * using an exponent that is a multiple of 3.
 * 
 * @param x - The value to format
 * @param sigFigs - Number of significant figures (default: 3)
 * @param prefix - Whether to use SI prefix instead of exponent (default: true)
 * @returns Formatted string with engineering notation
 */
export function engString(x: number, sigFigs: number = 3, prefix: boolean = true): string {
  x = Number(x);
  let sign = '';
  
  if (x < 0) {
    x = -x;
    sign = '-';
  }

  if (x === 0) {
    return sign + '0';
  }

  const exp = Math.floor(Math.log10(x));
  const exp3 = exp - (exp % 3);
  let x3 = x / Math.pow(10, exp3);
  
  // Round to the specified significant figures
  x3 = roundSig(x3, sigFigs);
  
  // Check if it's an integer
  if (Math.floor(x3) === x3) {
    x3 = Math.floor(x3);
  }

  let exp3Text = '';
  
  if (prefix && (exp3 >= -24 && exp3 <= 24) && (exp3 !== 0)) {
    const prefixIndex = exp3 / 3 + 8;
    exp3Text = ' ' + PREFIXES[prefixIndex];
  } else if (exp3 !== 0) {
    if (!prefix) {
      // Format as plain number when prefix=false
      return sign + (x3 * Math.pow(10, exp3)).toString();
    }
    exp3Text = 'e' + exp3;
  }

  return sign + x3 + exp3Text;
}