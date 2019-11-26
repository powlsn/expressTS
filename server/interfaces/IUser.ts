import { Photo } from "../entity/Photo.entity";

export interface IUser {
  id?: number;
  firstname: string;
  lastname: string;
  photos?: string[];
}
