
export interface Reservation {
  id: string,
  name : string,
  tel: string,
  shop: string,
  petName: string,
  petWeight : string,
  date: string,
  time: string,
  requestMemo: string,
  sissorCut: boolean,
  catCut: boolean,
  pickUpService: boolean,
  createdAt : string;
  updatedAt : string;
  confirm: boolean;
  cancel : boolean;
}


export type ReservationInput = Pick<Reservation,"name" | "tel" |"shop" | "petName" | "petWeight" | "date" | "time" | "requestMemo" | "sissorCut" | "pickUpService" | "catCut" >;
