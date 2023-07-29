import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as salonService from "../services/salonService";
import { createError, createResponse } from "../utils/responseUtils";
import { loginValidator, RESERVATION_VALIDATION_ERRORS, USER_VALIDATION_ERRORS } from "../utils/validator";
import { createToken } from "../utils/authorizeUtils";

import type { SalonInput } from "../types/salon";

// 로그인
export const loginSalon = async (req: Request, res: Response) => {
  const { tel, password }: SalonInput = req.body;

  const { isValid, message } = loginValidator({ tel,password });
  if (!isValid) {
    return res.status(StatusCodes.BAD_REQUEST).send(createError(message));
  }
  const salon = salonService.findSalon(
    (salon) => salon.tel === tel && salon.password === password
    );

  if (salon) {
    const salonInfo = {...salon}
    salonInfo.password = ""
    return res.status(StatusCodes.OK).send({
      salonInfo,
      message: "성공적으로 로그인 했습니다",
      token: createToken(tel),
    });
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createError(USER_VALIDATION_ERRORS.USER_NOT_FOUND));
  }
};

// 회원 가입
export const signUpSalon = async (req: Request, res: Response) => {
  const { tel, address, name ,password, canSissorCut, canCatCut, hasPickupService, hasCctv }: SalonInput = req.body.salonData;

  const { isValid, message } = loginValidator({ tel,name,password });
  if (!isValid) {
    return res.status(StatusCodes.BAD_REQUEST).send(createError(message));
  }

  const existUser = salonService.findSalon((salon) => salon.tel === tel);
  if (existUser) {
    return res
      .status(StatusCodes.CONFLICT)
      .send(createError(USER_VALIDATION_ERRORS.EXIST_USER));
  } else {
    await salonService.createSalon({  tel, address, name ,password, canSissorCut, canCatCut, hasPickupService , hasCctv });
    const salon = salonService.findSalon(
      (salon) => salon.tel === tel && salon.password === password
      );
      const salonInfo = {...salon}
      salonInfo.password = ""
    return res.status(StatusCodes.OK).send({
      salonInfo,
      message: "계정이 성공적으로 생성되었습니다",
      token: createToken(tel),
    });
  }
};

export const getSalonList = (req: Request, res: Response) => {
  const salons = salonService.getSalon()

  if (salons) {
    const salonData = [...salons]
    return res.status(StatusCodes.OK).send(createResponse(
      salonData.map((salon)=> {
      salon.password = "password"
      return salon 
    })));
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createError(RESERVATION_VALIDATION_ERRORS.RESERVATION_SOMETHING_WRONG));
  }
};

export const updateSalon = async (req: Request, res: Response) => {
  const salonId = req.params.id;
  const editedData = req.body.editedData;

  const salons = salonService.findSalon((salon) => salon.id === salonId);

  if (salons) {
    await salonService.updateSalon(salons, editedData);

    return res.status(StatusCodes.OK).send(createResponse(salons));
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createError(RESERVATION_VALIDATION_ERRORS.RESERVATION_SOMETHING_WRONG));
  }
};
