import { ResponseModel } from "./responseModel";

export interface ListResponceModel<T> extends ResponseModel{
    data:T[]
}