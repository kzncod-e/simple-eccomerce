import { hashSync, compareSync } from "bcryptjs";
export const hash = (pass: string): string => hashSync(pass);
export const compare = (pass: string, hashedPass: string): boolean =>
  compareSync(pass, hashedPass);
