import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as reservationService from "../services/reservationService";
import { createError, createResponse } from "../utils/responseUtils";
import { RESERVATION_VALIDATION_ERRORS } from "../utils/validator";
import type { ReservationInput } from "../types/reservation";

export const createReservation = async (req: Request, res: Response) => {
  const {shop ,date ,time}: ReservationInput = req.body.data;
  
  const duplicationCheck = () => {
    const findInfo = reservationService.findReservation((reservation)=>reservation.shop === shop);
    if(findInfo?.some((reservation)=>reservation.date === date && reservation.time === time)){
      return false;
    }else{
      return true;
    }
  }

  if (duplicationCheck()) {
    const reservation = await reservationService.createReservation(req.body.data);
    return res.status(StatusCodes.OK).send(createResponse(reservation));
  } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({message:"Pre-booking Existence"});
  }
};

export const getReservations = async (req: Request, res: Response) => {
  const { countOnly } = req.query;

  const reservations = reservationService.findReservations();

  if (reservations) {
    if (countOnly) {
      return res.status(StatusCodes.OK).send(createResponse(reservations.length));
    }
    return res.status(StatusCodes.OK).send(createResponse(reservations));
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createError(RESERVATION_VALIDATION_ERRORS.RESERVATION_SOMETHING_WRONG));
  }
};

export const getReservationByTel = (req: Request, res: Response) => {
  const { id: reservationTel } = req.params;
  const reservation = reservationService.findReservation((reservation) => reservation.tel === reservationTel);
  if (reservation) {
    return res.status(StatusCodes.OK).send(createResponse(reservation));
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createError(RESERVATION_VALIDATION_ERRORS.RESERVATION_SOMETHING_WRONG));
  }
};

export const getReservationByShop = (req: Request, res: Response) => {
    const {shop : shopName} = req.body;
    const reservation = reservationService.findReservationByShop((reservation) => reservation.shop === shopName);

    if (reservation) {
      return reservation.length === 0 ? res.status(StatusCodes.OK).send({message:"예약 내역이 없습니다."}):res.status(StatusCodes.OK).send(createResponse(reservation));
    }else{
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(createError(RESERVATION_VALIDATION_ERRORS.RESERVATION_SOMETHING_WRONG));
    }
};


export const updateReservation = async (req: Request, res: Response) => {
  const reservationId = req.params.id;
  const confirmData = req.body.confirmData;

  const reservation = reservationService.findReservation((reservation) => reservation.id === reservationId);
  

  if (reservation) {
    await reservationService.updateReservation(reservation[0], confirmData);

    return res.status(StatusCodes.OK).send(createResponse(reservation));
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createError(RESERVATION_VALIDATION_ERRORS.RESERVATION_SOMETHING_WRONG));
  }
};

export const deleteReservation = async (req: Request, res: Response) => {
  const { id: reservationId } = req.params;

  const reservation = reservationService.findReservation((reservation) => reservation.id === reservationId);

  if (!reservation) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createError(RESERVATION_VALIDATION_ERRORS.RESERVATION_SOMETHING_WRONG));
  }

  await reservationService.deleteReservation(reservation[0]);

  return res.status(StatusCodes.OK).send(createResponse(null));
};
