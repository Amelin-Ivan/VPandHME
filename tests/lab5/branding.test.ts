import { describe, it, expect, expectTypeOf } from 'vitest';
import { WhereBrand, SortBrand, GroupByBrand, HavingBrand, Brands, Transitions } from '../../src/lab5/branding';

describe('Branding Module', () => {
  describe('Brand Symbols', () => {
    it('should be unique symbols', () => {
      const symbols = [WhereBrand, SortBrand, GroupByBrand, HavingBrand];
      const uniqueSymbols = new Set(symbols);
      expect(uniqueSymbols.size).toBe(symbols.length);
      symbols.forEach(s => expect(typeof s).toBe('symbol'));
    });
  });

  describe('Brands Constant', () => {
    it('should map brand names to their respective symbols', () => {
      expect(Brands.where).toBe(WhereBrand);
      expect(Brands.sort).toBe(SortBrand);
      expect(Brands.groupby).toBe(GroupByBrand);
      expect(Brands.having).toBe(HavingBrand);
    });

    it('should be deeply readonly', () => {
      type BrandsType = typeof Brands;
      type ExpectedType = {
        readonly where: typeof WhereBrand;
        readonly sort: typeof SortBrand;
        readonly groupby: typeof GroupByBrand;
        readonly having: typeof HavingBrand;
      };
      expectTypeOf<BrandsType>().toEqualTypeOf<ExpectedType>();
    });
  });

  describe('Transitions Type', () => {
    it('should define correct state transitions for each operation', () => {
      expectTypeOf<Transitions['where']>().toEqualTypeOf<'where' | 'groupby' | 'having' | 'sort'>();
      expectTypeOf<Transitions['groupby']>().toEqualTypeOf<'groupby' | 'having' | 'sort'>();
      expectTypeOf<Transitions['having']>().toEqualTypeOf<'having' | 'sort'>();
      expectTypeOf<Transitions['sort']>().toEqualTypeOf<'sort'>();
    });
  });
});
