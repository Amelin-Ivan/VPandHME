import { describe, it, expect, vi } from 'vitest';
import { StrongQuery } from '../../src/lab5/query';

// Mock the dependency from lab4 without importing from it directly
const mockedLab4 = {
  query: vi.fn(),
};
vi.mock('../../src/lab4/lab4', () => mockedLab4);

describe('StrongQuery', () => {
  it('should call the underlying query function from lab4 with the correct arguments', () => {
    // Arrange
    const step1 = (n: number) => n * 2;
    const step2 = (n: number) => n.toString();
    const steps = [step1, step2];

    // Act
    StrongQuery(...steps);

    // Assert
    expect(mockedLab4.query).toHaveBeenCalledTimes(1);
    expect(mockedLab4.query).toHaveBeenCalledWith(...steps);
  });
});
