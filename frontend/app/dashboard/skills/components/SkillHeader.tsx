"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SkillFormModal } from "@/app/dashboard/skills/components/SkillFormModal";

export function SkillHeader() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-2xl font-semibold">Skills</h1>
      <Button onClick={() => setOpen(true)}>Create Skill</Button>
      <SkillFormModal open={open} setOpen={setOpen} />
    </div>
  );
}
