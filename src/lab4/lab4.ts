
export type Transform<T> = (array: T[]) => T[];

export type Where<T, K extends keyof T> = (key: K, value: T[K]) => Transform<T>;

export type Sort<T, K extends keyof T> = (key: K) => Transform<T>;

export type Group<T, K extends keyof T> = {key: T[K], items: T[]};
export type GroupBy<T, K extends keyof T> = (key: K) => (data: T[]) => Group<T, K>[];
export type GroupTransform<T, K extends keyof T> = Transform<Group<T, K>>;
export type Having<T, K extends keyof T> = (pridicate: ((group: Group<T, K>) => boolean))=>GroupTransform<T, K>;

export function query<T>(...steps: Function[]): Transform<T> {
    return (arrayOfData: T[]) => {
        let currentData = arrayOfData;
        steps.forEach(step => {
            currentData = step(currentData);
        })
        return currentData;
    }
}
