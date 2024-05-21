import { Model } from "mongoose";

export type TVariant={
    type:string;
    value:string
}

export type TInventory={
    quantity:number;
    inStock:boolean;
}

export type TProduct={
    productId:string;
    name:string;
    description:string;
    price:number;
    category:string;
    tags:Array<string>;
    variants:Array<TVariant>;
    inventory:TInventory;
}

/**
 * Product custom instance methods
 */

export type ProductMethods={
    isExists(id:string):Promise<TProduct|null>
}

export type ProductModel=Model<TProduct,Record<string,never>,ProductMethods>