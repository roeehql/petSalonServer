import { createItem, Data, db, update } from "../models/db";
import type { Reservation, ReservationInput } from "../types/reservation";

export const createReservation = async ({tel, name, shop, petName ,petWeight ,date ,time , requestMemo, sissorCut ,pickUpService , catCut}: ReservationInput) => {
  const reservation = createItem<Reservation>({tel, name, shop, petName ,petWeight ,date ,time , requestMemo, sissorCut ,pickUpService , catCut});

  db.data?.reservations.push(reservation);
  await db.write();

  return reservation;
};

export const findReservations = () => {
  return db.data?.reservations;
};

export const findReservation = (predicate: (reservation: Reservation) => boolean) => {
  return db.data?.reservations.filter(predicate);
};

export const findReservationByShop = (predicate: (reservation: Reservation) => boolean) => {
  return db.data?.reservations.filter(predicate);
}

export const updateReservation = async (reservation: Reservation, reservationValue: Partial<Reservation>) => {
  update<Reservation>(Object.assign(reservation, reservationValue));

  await db.write();

  return reservation;
};

export const deleteReservation = async (reservationToDelete: Reservation) => {
  const filteredReservations = db.data?.reservations.filter(
    (reservation) => reservation.id !== reservationToDelete.id
  )!;

  (db.data as Data).reservations = filteredReservations;

  await db.write();

  return reservationToDelete;
};
