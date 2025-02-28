/**
 * Command-line interface for the eseries package
 */

import { 
  ESeries, 
  seriesKeyFromName, 
  series,
  findNearest, 
  findNearestFew, 
  findGreaterThanOrEqual, 
  findGreaterThan,
  findLessThan, 
  findLessThanOrEqual, 
  tolerance,
  erange,
  lowerToleranceLimit,
  upperToleranceLimit,
  toleranceLimits
} from './eseries';
import { engString } from './eng';
import { Command } from 'commander';
import { version } from './version';

// Helper functions
function extractSeriesKey(seriesName: string): ESeries {
  return seriesKeyFromName(seriesName.toUpperCase());
}

function extractValue(valueStr: string): number {
  const value = parseFloat(valueStr);
  if (isNaN(value)) {
    throw new Error(`'${valueStr}' could not be interpreted as a number`);
  }
  return value;
}

function presentValue(value: number, useSymbol: boolean): string {
  return engString(value, 3, useSymbol);
}

interface CommandOptions {
  symbol?: boolean;
}

export function createCli() {
  // Create a new Commander instance
  const newProgram = new Command();
  
  newProgram
    .name('eseries')
    .description('E-series preferred values utility')
    .version(version);

  newProgram
    .command('nearest')
    .description('The nearest value in an E-Series')
    .argument('<e-series>', 'E-series name (E12, E24, etc.)')
    .argument('<value>', 'The target value')
    .option('-s, --symbol', 'Use the SI magnitude prefix symbol')
    .action((seriesName: string, valueStr: string, options: CommandOptions) => {
      try {
        const seriesKey = extractSeriesKey(seriesName);
        const value = extractValue(valueStr);
        const nearest = findNearest(seriesKey, value);
        console.log(presentValue(nearest, options.symbol || false));
      } catch (error) {
        console.error((error as Error).message);
        process.exit(1);
      }
    });

  newProgram
    .command('nearby')
    .description('At least three nearby values in an E-Series')
    .argument('<e-series>', 'E-series name (E12, E24, etc.)')
    .argument('<value>', 'The target value')
    .option('-s, --symbol', 'Use the SI magnitude prefix symbol')
    .action((seriesName: string, valueStr: string, options: CommandOptions) => {
      try {
        const seriesKey = extractSeriesKey(seriesName);
        const value = extractValue(valueStr);
        const nearby = findNearestFew(seriesKey, value);
        nearby.forEach(item => {
          console.log(presentValue(item, options.symbol || false));
        });
      } catch (error) {
        console.error((error as Error).message);
        process.exit(1);
      }
    });

  newProgram
    .command('gt')
    .description('The smallest value greater than the given value')
    .argument('<e-series>', 'E-series name (E12, E24, etc.)')
    .argument('<value>', 'The target value')
    .option('-s, --symbol', 'Use the SI magnitude prefix symbol')
    .action((seriesName: string, valueStr: string, options: CommandOptions) => {
      try {
        const seriesKey = extractSeriesKey(seriesName);
        const value = extractValue(valueStr);
        const result = findGreaterThan(seriesKey, value);
        console.log(presentValue(result, options.symbol || false));
      } catch (error) {
        console.error((error as Error).message);
        process.exit(1);
      }
    });

  newProgram
    .command('ge')
    .description('The smallest value greater than or equal to the given value')
    .argument('<e-series>', 'E-series name (E12, E24, etc.)')
    .argument('<value>', 'The target value')
    .option('-s, --symbol', 'Use the SI magnitude prefix symbol')
    .action((seriesName: string, valueStr: string, options: CommandOptions) => {
      try {
        const seriesKey = extractSeriesKey(seriesName);
        const value = extractValue(valueStr);
        const result = findGreaterThanOrEqual(seriesKey, value);
        console.log(presentValue(result, options.symbol || false));
      } catch (error) {
        console.error((error as Error).message);
        process.exit(1);
      }
    });

  newProgram
    .command('lt')
    .description('The largest value less than the given value')
    .argument('<e-series>', 'E-series name (E12, E24, etc.)')
    .argument('<value>', 'The target value')
    .option('-s, --symbol', 'Use the SI magnitude prefix symbol')
    .action((seriesName: string, valueStr: string, options: CommandOptions) => {
      try {
        const seriesKey = extractSeriesKey(seriesName);
        const value = extractValue(valueStr);
        const result = findLessThan(seriesKey, value);
        console.log(presentValue(result, options.symbol || false));
      } catch (error) {
        console.error((error as Error).message);
        process.exit(1);
      }
    });

  newProgram
    .command('le')
    .description('The largest value less than or equal to the given value')
    .argument('<e-series>', 'E-series name (E12, E24, etc.)')
    .argument('<value>', 'The target value')
    .option('-s, --symbol', 'Use the SI magnitude prefix symbol')
    .action((seriesName: string, valueStr: string, options: CommandOptions) => {
      try {
        const seriesKey = extractSeriesKey(seriesName);
        const value = extractValue(valueStr);
        const result = findLessThanOrEqual(seriesKey, value);
        console.log(presentValue(result, options.symbol || false));
      } catch (error) {
        console.error((error as Error).message);
        process.exit(1);
      }
    });

  newProgram
    .command('tolerance')
    .description('The tolerance of the given E-Series')
    .argument('<e-series>', 'E-series name (E12, E24, etc.)')
    .option('-s, --symbol', 'Display as a percentage')
    .action((seriesName: string, options: CommandOptions) => {
      try {
        const seriesKey = extractSeriesKey(seriesName);
        const tol = tolerance(seriesKey);
        if (options.symbol) {
          const percent = tol * 100;
          console.log(`${Number.isInteger(percent) ? percent : percent}%`);
        } else {
          console.log(tol);
        }
      } catch (error) {
        console.error((error as Error).message);
        process.exit(1);
      }
    });

  newProgram
    .command('series')
    .description('The base values for the given E-Series')
    .argument('<e-series>', 'E-series name (E12, E24, etc.)')
    .action((seriesName: string) => {
      try {
        const seriesKey = extractSeriesKey(seriesName);
        series(seriesKey).forEach(item => {
          console.log(item);
        });
      } catch (error) {
        console.error((error as Error).message);
        process.exit(1);
      }
    });

  newProgram
    .command('range')
    .description('All values in the given E-series from start-value to stop-value inclusive')
    .argument('<e-series>', 'E-series name (E12, E24, etc.)')
    .argument('<start-value>', 'The start value')
    .argument('<stop-value>', 'The stop value')
    .option('-s, --symbol', 'Use the SI magnitude prefix symbol')
    .action((seriesName: string, startValueStr: string, stopValueStr: string, options: CommandOptions) => {
      try {
        const seriesKey = extractSeriesKey(seriesName);
        const startValue = extractValue(startValueStr);
        const stopValue = extractValue(stopValueStr);
        const items = erange(seriesKey, startValue, stopValue);
        items.forEach(item => {
          console.log(presentValue(item, options.symbol || false));
        });
      } catch (error) {
        console.error((error as Error).message);
        process.exit(1);
      }
    });

  newProgram
    .command('lower-tolerance-limit')
    .description('The lower tolerance limit of a nominal value')
    .argument('<e-series>', 'E-series name (E12, E24, etc.)')
    .argument('<value>', 'The nominal value')
    .option('-s, --symbol', 'Use the SI magnitude prefix symbol')
    .action((seriesName: string, valueStr: string, options: CommandOptions) => {
      try {
        const seriesKey = extractSeriesKey(seriesName);
        const value = extractValue(valueStr);
        const lower = lowerToleranceLimit(seriesKey, value);
        console.log(presentValue(lower, options.symbol || false));
      } catch (error) {
        console.error((error as Error).message);
        process.exit(1);
      }
    });

  newProgram
    .command('upper-tolerance-limit')
    .description('The upper tolerance limit of a nominal value')
    .argument('<e-series>', 'E-series name (E12, E24, etc.)')
    .argument('<value>', 'The nominal value')
    .option('-s, --symbol', 'Use the SI magnitude prefix symbol')
    .action((seriesName: string, valueStr: string, options: CommandOptions) => {
      try {
        const seriesKey = extractSeriesKey(seriesName);
        const value = extractValue(valueStr);
        const upper = upperToleranceLimit(seriesKey, value);
        console.log(presentValue(upper, options.symbol || false));
      } catch (error) {
        console.error((error as Error).message);
        process.exit(1);
      }
    });

  newProgram
    .command('tolerance-limits')
    .description('The upper and lower tolerance limits of a nominal value')
    .argument('<e-series>', 'E-series name (E12, E24, etc.)')
    .argument('<value>', 'The nominal value')
    .option('-s, --symbol', 'Use the SI magnitude prefix symbol')
    .action((seriesName: string, valueStr: string, options: CommandOptions) => {
      try {
        const seriesKey = extractSeriesKey(seriesName);
        const value = extractValue(valueStr);
        const [lower, upper] = toleranceLimits(seriesKey, value);
        console.log(presentValue(lower, options.symbol || false));
        console.log(presentValue(upper, options.symbol || false));
      } catch (error) {
        console.error((error as Error).message);
        process.exit(1);
      }
    });

  return newProgram;
}

export function main(args?: string[]) {
  const cli = createCli();
  try {
    cli.parse(args || process.argv);
    return 0;
  } catch (error) {
    console.error((error as Error).message);
    return 1;
  }
}