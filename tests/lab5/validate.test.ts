import { describe, it, expectTypeOf } from 'vitest';
import { ValidateSteps } from '../../src/lab5/validate';
import { Where, Sort, GroupBy, Having } from '../../src/lab5/types';

type User = { id: number; name: string; };
type Unbranded = (data: any) => any;

describe('ValidateSteps Type-Level Validation', () => {
  it('should approve a valid sequence: where -> where -> groupby -> having -> sort', () => {
    type Steps = [
      Where<User, 'id'>,
      Where<User, 'name'>,
      GroupBy<User, 'id'>,
      Having<User, 'id'>,
      Sort<User, 'name'>
    ];
    expectTypeOf<ValidateSteps<Steps>>().toEqualTypeOf<Steps>();
  });

  it('should reject an invalid sequence: sort -> where', () => {
    type Steps = [
      Sort<User, 'name'>,
      Where<User, 'id'>
    ];
    expectTypeOf<ValidateSteps<Steps>>().toBeNever;
  });

  it('should reject an invalid sequence: having -> groupby', () => {
    type Steps = [
      Having<User, 'id'>,
      GroupBy<User, 'id'>
    ];
    expectTypeOf<ValidateSteps<Steps>>().toBeNever;
  });

  it('should reject a sequence with repeated terminal operations like sort', () => {
    type Steps = [
      Sort<User, 'name'>,
      Sort<User, 'id'>
    ];
    expectTypeOf<ValidateSteps<Steps>>().toBeNever;
  });

  it('should correctly ignore unbranded functions and still validate the branded ones', () => {
    type Steps = [
      Where<User, 'id'>,
      Unbranded,
      GroupBy<User, 'id'>,
      Sort<User, 'name'>
    ];
    expectTypeOf<ValidateSteps<Steps>>().toEqualTypeOf<Steps>();
  });

  it('should identify an error even with unbranded functions interspersed', () => {
    type Steps = [
      Sort<User, 'name'>,
      Unbranded,
      Where<User, 'id'>
    ];
    expectTypeOf<ValidateSteps<Steps>>().toBeNever;
  });

  it('should approve an empty sequence', () => {
    expectTypeOf<ValidateSteps<[]>>().toEqualTypeOf<[]>();
  });
});
