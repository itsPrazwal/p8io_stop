"use client";

import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  Building2,
  UserRound,
  UserRoundCog,
  UserRoundSearch,
} from "lucide-react";
import { UserSignupSchemaType } from "@/types/schema";

interface IProps {
  methods: UseFormReturn<UserSignupSchemaType>;
}

export function SignupSelection({ methods }: IProps) {
  const { setValue, watch } = methods;

  return (
    <div>
      <div className="grid gap-1 mb-12">
        <Label className="mb-4" htmlFor="Account Type">
          User Type
        </Label>
        <div className="grid grid-cols-2 gap-6">
          <Toggle
            pressed={watch("type") === "USER"}
            onPressedChange={(pressed) => {
              if (pressed) {
                setValue("type", "USER");
              }
            }}
            aria-label="Set user type to USER"
            className="border h-min py-6 text-md flex flex-col"
          >
            <UserRoundSearch className="!w-12 !h-12" />
            User
          </Toggle>
          <Toggle
            pressed={watch("type") === "PROVIDER"}
            onPressedChange={(pressed) => {
              if (pressed) {
                setValue("type", "PROVIDER");
              }
            }}
            aria-label="Set user type to PROVIDER"
            className="border h-min py-6 text-md flex flex-col"
          >
            <UserRoundCog className="!w-12 !h-12" />
            Provider
          </Toggle>
        </div>
      </div>
      <div className="grid gap-1">
        <Label className="mb-4" htmlFor="User Type">
          Account Type
        </Label>
        <div className="grid grid-cols-2 gap-6">
          <Toggle
            pressed={!watch("isCompany")}
            onPressedChange={(pressed) => {
              setValue("isCompany", !pressed);
            }}
            aria-label="Set account type to individual"
            className="border h-min py-6 text-md flex flex-col"
          >
            <UserRound className="!w-12 !h-12" />
            Individual
          </Toggle>
          <Toggle
            pressed={watch("isCompany")}
            onPressedChange={(pressed) => {
              setValue("isCompany", pressed);
            }}
            aria-label="Set account type to company"
            className="border h-min py-6 text-md flex flex-col"
          >
            <Building2 className="!w-12 !h-12" />
            Company
          </Toggle>
        </div>
      </div>
    </div>
  );
}
