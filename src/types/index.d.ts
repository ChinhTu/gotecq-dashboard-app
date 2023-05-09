// import { PayloadAction } from '@reduxjs/toolkit';

declare module '*.png' {
    const value: any;
    export = value;
}

declare global {
    export type Collection<T = any> = Record<string, T>;
    export type Optional<T> = undefined | T;
    export type Not<T, U> = T extends U ? never : T;
    export type ElementOfArray<ArrayType extends readonly unknown[]> = ArrayType[number];
    export type Override<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
    // export type PayloadOfAction<A extends PayloadAction> = ReturnType<A>['payload'];
    // export type ActionTypeFromPayloadAction<A> = PayloadAction<PayloadOfAction<A>>;
    export type AnyFunction = (...args: any[]) => any;
    export type AnyAsyncFunction = (...args: any[]) => Promise<any>;
    export type ContentOfPromise<T> = T extends PromiseLike<infer U> ? U : T;

    // TODO: remove it when remove temporary dashboards
    export type CommandResponse = {
        _resp: [
            {
                command: string;
                data: {
                    _id: string;
                    receipt_id: string;
                };
                transact: string;
                _cqrs: string;
                _id: string;
                _kind: number;
                _vers: number;
            }
        ],
        _status: string;
    }
}

export { };