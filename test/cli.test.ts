import { createCli } from '../src/cli';

// Create spy to track console.log outputs
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
// Mock process.exit to prevent tests from exiting
const mockExit = jest.spyOn(process, 'exit').mockImplementation((code) => code as never);

describe('CLI', () => {
  beforeEach(() => {
    mockConsoleLog.mockClear();
    mockConsoleError.mockClear();
    mockExit.mockClear();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
    mockConsoleError.mockRestore();
    mockExit.mockRestore();
  });

  it('should find the nearest value', () => {
    const cli = createCli();
    cli.parse(['node', 'eseries', 'nearest', 'E24', '42']);
    
    expect(mockConsoleLog).toHaveBeenCalledWith('43');
  });

  it('should find the nearest value with SI symbol', () => {
    const cli = createCli();
    cli.parse(['node', 'eseries', 'nearest', 'E24', '4200', '--symbol']);
    
    expect(mockConsoleLog).toHaveBeenCalledWith('4.3 k');
  });

  it('should handle invalid series names', () => {
    const cli = createCli();
    cli.parse(['node', 'eseries', 'nearest', 'E99', '42']);
    
    expect(mockConsoleError).toHaveBeenCalled();
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('should handle invalid values', () => {
    const cli = createCli();
    cli.parse(['node', 'eseries', 'nearest', 'E24', 'not-a-number']);
    
    expect(mockConsoleError).toHaveBeenCalled();
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('should show tolerance', () => {
    const cli = createCli();
    cli.parse(['node', 'eseries', 'tolerance', 'E12']);
    
    expect(mockConsoleLog).toHaveBeenCalledWith(0.1);
  });

  it('should show tolerance as percentage', () => {
    const cli = createCli();
    cli.parse(['node', 'eseries', 'tolerance', 'E12', '--symbol']);
    
    expect(mockConsoleLog).toHaveBeenCalledWith('10%');
  });
});