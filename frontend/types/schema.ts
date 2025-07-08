import { z } from "zod";
import { userSignupSchema } from "@/app/auth/signup/schema/signup.schema";
import { userLoginSchema } from "@/app/auth/login/schema/login.schema";
import { TaskFormSchema } from "@/app/dashboard/tasks/schema/task.schema";
import { SkillFormSchema } from "@/app/dashboard/skills/schema/skill.schema";
import { offerSchema } from "@/app/dashboard/offers/schema/offer.schema";

export type UserSignupSchemaType = z.infer<typeof userSignupSchema>
export type UserLoginSchemaType = z.infer<typeof userLoginSchema>
export type TaskFormSchemaType = z.infer<typeof TaskFormSchema>
export type SkillFormSchemaType = z.infer<typeof SkillFormSchema>;
export type OfferSchemaType = z.infer<typeof offerSchema>
