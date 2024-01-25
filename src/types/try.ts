import {Result} from "./result/result"
import { Optional } from "./option/option";
import { $$escape } from "ts-macros";

function isOptional<T,E>(val: Result<T,E> | Optional<T>): val is Optional<T> {
    return (val as Optional<T>)._is_some !== undefined;
}
//dit geeft een error dat T niet returned wordt maar dit klopt niet
// code compiled wel en die T is nodig
// @ts-ignore
export function $try<T,E>(val: Result<T,E> | Optional<T>): T{
    $$escape!(()=> {
        if (isOptional(val)){
            if (val.isNone()) return val;
        } else {
            if (val.isErr()) return val;
        }
        return val.unwrap();
    })
}