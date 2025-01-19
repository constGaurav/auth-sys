import { z } from "zod";

export const UserSignUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const UserBasicData = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

export type TUserBasicData = z.infer<typeof UserBasicData>;

export const UserWithPassword = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TUserWithPassword = z.infer<typeof UserWithPassword>;

export const VerifyOtpRequestSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  otp: z.string(),
});
