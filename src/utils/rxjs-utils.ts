import { defer, Observable } from 'rxjs';

export const doOnSubscribe = <T>(onSubscribe: () => void): ((source: Observable<T>) => Observable<T>) => {
    return (source: Observable<T>): Observable<T> =>
        defer(() => {
            onSubscribe();
            return source;
        });
};
