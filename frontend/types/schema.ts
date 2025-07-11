import { z } from "zod";
import { userSignupSchema } from "@/app/auth/signup/schema/signup.schema";
import { userLoginSchema } from "@/app/auth/login/schema/login.schema";
import { TaskFormSchema } from "@/app/dashboard/tasks/schema/task.schema";
import { SkillFormSchema } from "@/app/dashboard/skills/schema/skill.schema";
import { offerSchema } from "@/app/dashboard/offers/schema/offer.schema";
import {
  userPasswordSchema,
  userProfileSchema,
} from "@/app/dashboard/profile/schema/profile.schema";
import {
  createTaskProgressSchema,
  updateTaskProgressSchema,
} from "@/app/dashboard/task-progress/schema/taskProgress.schema";

export type UserSignupSchemaType = z.infer<typeof userSignupSchema>;
export type UserLoginSchemaType = z.infer<typeof userLoginSchema>;
export type TaskFormSchemaType = z.infer<typeof TaskFormSchema>;
export type SkillFormSchemaType = z.infer<typeof SkillFormSchema>;
export type OfferSchemaType = z.infer<typeof offerSchema>;
export type UserProfileSchemaType = z.infer<typeof userProfileSchema>;
export type UserPasswordType = z.infer<typeof userPasswordSchema>;
export type CreateTaskProgressSchemaType = z.infer<
  typeof createTaskProgressSchema
>;
export type UpdateTaskProgressSchemaType = z.infer<
  typeof updateTaskProgressSchema
>;
