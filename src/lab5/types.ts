import {
    Where as WhereLab4,
    Sort as SortLab4,
    GroupBy as GroupByLab4,
    Having as HavingLab4,
    Transform as TransformLab4
} from "../lab4/lab4";
import { WhereBrand, SortBrand, GroupByBrand, HavingBrand } from "./branding";

export type Where<T, K extends keyof T> =
    (...args: Parameters<WhereLab4<T, K>>) => ReturnType<WhereLab4<T, K>> & { readonly [WhereBrand]: never };

export type Sort<T, K extends keyof T> =
    (...args: Parameters<SortLab4<T, K>>) => ReturnType<SortLab4<T, K>> & { readonly [SortBrand]: never };

export type GroupBy<T, K extends keyof T> =
    (...args: Parameters<GroupByLab4<T, K>>) => ReturnType<GroupByLab4<T, K>> & { readonly [GroupByBrand]: never };

export type Having<T, K extends keyof T> =
    (...args: Parameters<HavingLab4<T, K>>) => ReturnType<HavingLab4<T, K>> & { readonly [HavingBrand]: never };

export type Transform<T> = TransformLab4<T>;
