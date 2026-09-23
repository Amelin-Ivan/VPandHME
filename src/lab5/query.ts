import { ValidateSteps } from "./validate";
import { query } from "../lab4/lab4";
import { Transform } from "./types";
// ... (здесь импорты ValidateSteps и прочей магии типов)

export function StrongQuery<T, S extends any[]>(
    ...steps: S & ValidateSteps<S>
): Transform<T> {
    // В момент выполнения (runtime) мы просто прокидываем аргументы дальше.
    // С точки зрения JS — это обычный прокси.
    return query(...(steps as unknown as Function[]));
}
