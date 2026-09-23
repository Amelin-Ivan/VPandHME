import {Brands, Transitions} from "./branding";

type ExtractBrandKey<T> = {
    [K in keyof typeof Brands]: (typeof Brands)[K] extends keyof T ? K : never
}[keyof typeof Brands];

type IsValidNext<PrevKey, CurrentKey> =
    [PrevKey] extends [never]
        ? true
        : PrevKey extends keyof Transitions
            ? CurrentKey extends Transitions[PrevKey]
                ? true
                : false
            : false;

export type ValidateSteps<Steps extends any[], PrevKey = never> =
    Steps extends [infer CurrentFunc, ...infer Tail]
        // 1. Извлекаем ключ
        ? ExtractBrandKey<CurrentFunc> extends infer CurrentKey
            // 2. Проверяем, что ключ не 'never' (т.е. бренд был найден)
            ? [CurrentKey] extends [never]
                // Если это не брендированная функция, пропускаем ее и проверяем хвост
                ? [CurrentFunc, ...ValidateSteps<Tail, PrevKey>]
                // 3. Если бренд найден, выполняем основную проверку
                : IsValidNext<PrevKey, CurrentKey> extends true
                    // УСПЕХ: рекурсивно проверяем хвост с новым ключом
                    ? [CurrentFunc, ...ValidateSteps<Tail, CurrentKey>]
                    // ОШИБКА: неверный переход
                    : ["ОШИБКА: недопустимый переход от", PrevKey, "к", CurrentKey]
            : never
        : [];
