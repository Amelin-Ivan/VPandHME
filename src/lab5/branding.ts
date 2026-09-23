export const WhereBrand: unique symbol = Symbol('Where');
export const SortBrand: unique symbol = Symbol('Sort');
export const GroupByBrand: unique symbol = Symbol('GroupBy');
export const HavingBrand: unique symbol = Symbol('Having');

export const Brands = {
    where: WhereBrand,
    sort: SortBrand,
    groupby: GroupByBrand,
    having: HavingBrand
} as const;

export type Transitions = {
    where:   'where' | 'groupby' | 'having' | 'sort';
    groupby: 'groupby' | 'having' | 'sort';
    having:  'having' | 'sort';
    sort:    'sort';
};
