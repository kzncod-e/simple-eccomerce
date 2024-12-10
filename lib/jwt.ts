import { sign, verify } from "jsonwebtoken";
const secret_key = process.env.SECRET_KEY || "secret";
export const signToken = (payload: object) => sign(payload, secret_key);
export const verifToken = (token: string) => verify(token, secret_key);
