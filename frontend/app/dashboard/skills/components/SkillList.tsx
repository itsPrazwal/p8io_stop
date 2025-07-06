"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SkillFormModal } from "@/app/dashboard/skills/components/SkillFormModal";
import { ISkill } from "@/types/skill";

interface IProps {
  skills: ISkill[];
}

export function SkillListTable({ skills }: IProps) {
  const [open, setOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<ISkill | undefined>(
    undefined,
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Nature of work</TableHead>
            <TableHead>Hourly Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skills?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No skills found.
              </TableCell>
            </TableRow>
          ) : (
            skills?.map((skill) => (
              <TableRow key={skill.id}>
                <TableCell className="font-medium">{skill.category}</TableCell>
                <TableCell className="capitalize">{skill.experience} Years</TableCell>
                <TableCell className="font-medium">{skill.nature}</TableCell>
                <TableCell>
                  {skill.hourlyRate.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setOpen(true);
                      setSelectedSkill(skill);
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <SkillFormModal skill={selectedSkill} open={open} setOpen={setOpen} />
    </div>
  );
}
