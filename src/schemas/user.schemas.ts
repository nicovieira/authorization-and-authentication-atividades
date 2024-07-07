import { z } from "zod";

export const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1),
  email: z.string().min(1).email(),
  password: z.string().min(8),
});

export type tUser = z.infer<typeof userSchema>;

export const registerUserBodySchema = userSchema.omit({ id: true });

export type tRegisterUserBody = z.infer<typeof registerUserBodySchema>;

export const userReturnSchema = userSchema.omit({ password: true });

export type tUserReturn = z.infer<typeof userReturnSchema>;

export const loginUserBodySchema = userSchema.omit({ id: true, name: true });

export type tLoginUserBody = z.infer<typeof loginUserBodySchema>;

export type tLoginReturn = {
  accessToken: string;
  user: tUserReturn;
};
