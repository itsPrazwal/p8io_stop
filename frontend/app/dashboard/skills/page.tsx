"use client";

import { useSkills } from "@/lib/hooks/skill.queries";
import { SkillListTable } from "@/app/dashboard/skills/components/SkillList";
import { SkillHeader } from "@/app/dashboard/skills/components/SkillHeader";

export default function SkillPage() {
  const { data } = useSkills();

  return (
    <div className="w-full mx-auto p-4">
      <SkillHeader />
      <SkillListTable
        skills={data?.skills || []}
      />
    </div>
  );
}
