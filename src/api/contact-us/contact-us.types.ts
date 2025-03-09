import { IResponse } from "@/constants/types";

export interface IContactUs {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

export type RContactUs = IResponse;
