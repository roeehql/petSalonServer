import { create, update, db } from "../models/db";
import type { Salons } from "../types/salon";

export const createSalon = async ({
    tel, address, name ,password, canSissorCut, canCatCut, hasPickupService ,hasCctv
}: Pick<Salons, "tel"| "address" | "name" |"password" | "canSissorCut" | "canCatCut" | "hasPickupService" |"hasCctv">) => {
  const newSalon = create<Salons>({ tel, address, name ,password, canSissorCut, canCatCut, hasPickupService, hasCctv });

  db.data?.salons.push(newSalon);
  await db.write();

  return newSalon;
};

export const findSalon = (predicate: (salon: Salons) => boolean) => {
  return db.data?.salons.find(predicate);
};

export const getSalon = () => {
  return db.data?.salons
}

export const updateSalon = async (salon: Salons, salonValue: Partial<Salons>) => {
  update<Salons>(Object.assign(salon, salonValue));

  await db.write();

  return salon;
};