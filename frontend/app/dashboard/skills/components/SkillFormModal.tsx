"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { SkillForm } from "./SkillForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SkillFormSchemaType } from "@/types/schema";
import { useCreateSkill, useUpdateSkill } from "@/lib/hooks/skill.queries";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { ISkill } from "@/types/skill";
import { SkillFormSchema } from "@/app/dashboard/skills/schema/skill.schema";

interface IProps {
  skill?: ISkill;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function SkillFormModal({ skill, open, setOpen }: IProps) {
  const methods = useForm<SkillFormSchemaType>({
    resolver: zodResolver(SkillFormSchema),
    defaultValues: {
      experience: 0,
      nature: "ONSITE",
      category: "design",
      hourlyRate: 0,
    },
  });

  const { reset } = methods;
  const createSkill = useCreateSkill();
  const updateSkill = useUpdateSkill(skill?.id);

  const isSuccess = useMemo(() => {
    if(!skill) {
      return createSkill.isSuccess;
    }else{
      return updateSkill.isSuccess;
    }
  }, [skill, createSkill, updateSkill])

  const handleSubmit = (data: SkillFormSchemaType) => {
    if (!!skill) {
      updateSkill.mutate(data);
    } else {
      createSkill.mutate(data);
    }
  };

  useEffect(() => {
    // If a skill is provided, populate the form with its data
    if (skill) {
      reset({
        experience: Number(skill.experience),
        category: skill.category,
        nature: skill.nature,
        hourlyRate: skill.hourlyRate,
      });
      setOpen(true);
    }
  }, [skill, reset, setOpen]);

  // Close dialog and reset form when skill is created
  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      reset();
    }
  }, [isSuccess, reset, setOpen]);

  // Reset form when dialog is closed manually
  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{!!skill ? "Update" : "Create New"} Skill</DialogTitle>
          <DialogDescription>Fill in the details.</DialogDescription>
        </DialogHeader>
        <SkillForm methods={methods} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
