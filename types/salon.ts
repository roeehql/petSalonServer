export interface Salons{
    id:string;
    name:string;
    tel: string;
    password:string;
    address:string
    canSissorCut: boolean;
    canCatCut: boolean;
    hasCctv:boolean;
    hasPickupService:boolean;
    createdAt: string,
    updatedAt: string,
}


export type SalonInput = Pick<Salons, "name" | "tel" | "password" |"address" | "canCatCut" | "canSissorCut" | "hasCctv" | "hasPickupService">