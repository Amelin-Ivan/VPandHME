import { describe, it, expectTypeOf } from 'vitest';
import { Where, Sort, GroupBy, Having } from '../../src/lab5/types';
import { WhereBrand, SortBrand, GroupByBrand, HavingBrand } from '../../src/lab5/branding';
import {
    Where as WhereLab4,
    Sort as SortLab4,
    GroupBy as GroupByLab4,
    Having as HavingLab4
} from '../../src/lab4/lab4';

// Sample type for testing
type User = {
    id: number;
    name: string;
    age: number;
};

describe('Branded Types in types.ts', () => {

    it('should correctly brand the Where type', () => {
        // Check if it's a function
        expectTypeOf<Where<User, 'id'>>().toBeFunction();

        // Check parameters match the lab4 version
        expectTypeOf<Parameters<Where<User, 'id'>>>().toEqualTypeOf<Parameters<WhereLab4<User, 'id'>>>();

        // Check return type for the brand property
        expectTypeOf<ReturnType<Where<User, 'id'>>>().toHaveProperty(WhereBrand);
    });

    it('should correctly brand the Sort type', () => {
        // Check if it's a function
        expectTypeOf<Sort<User, 'name'>>().toBeFunction();

        // Check parameters match the lab4 version
        expectTypeOf<Parameters<Sort<User, 'name'>>>().toEqualTypeOf<Parameters<SortLab4<User, 'name'>>>();

        // Check return type for the brand property
        expectTypeOf<ReturnType<Sort<User, 'name'>>>().toHaveProperty(SortBrand);
    });

    it('should correctly brand the GroupBy type', () => {
        // Check if it's a function
        expectTypeOf<GroupBy<User, 'id'>>().toBeFunction();

        // Check parameters match the lab4 version
        expectTypeOf<Parameters<GroupBy<User, 'id'>>>().toEqualTypeOf<Parameters<GroupByLab4<User, 'id'>>>();

        // Check return type for the brand property
        expectTypeOf<ReturnType<GroupBy<User, 'id'>>>().toHaveProperty(GroupByBrand);
    });

    it('should correctly brand the Having type', () => {
        // Check if it's a function
        expectTypeOf<Having<User, 'id'>>().toBeFunction();

        // Check parameters match the lab4 version
        expectTypeOf<Parameters<Having<User, 'id'>>>().toEqualTypeOf<Parameters<HavingLab4<User, 'id'>>>();

        // Check return type for the brand property
        expectTypeOf<ReturnType<Having<User, 'id'>>>().toHaveProperty(HavingBrand);
    });

});
