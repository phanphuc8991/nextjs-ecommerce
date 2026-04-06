import { addUserSchema } from "./constants";
import * as z from "zod";

export type CreateUserPayload = z.infer<typeof addUserSchema>;