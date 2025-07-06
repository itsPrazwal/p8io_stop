import { UseFormReturn } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { SkillFormSchemaType } from "@/types/schema"

interface IProps {
  methods: UseFormReturn<SkillFormSchemaType>
  onSubmit: (data: SkillFormSchemaType) => void
}

export function SkillForm({ methods, onSubmit }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = methods

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-6 mb-6">

        <div className="grid gap-1">
          <Label htmlFor="category">Category</Label>
          <Select
            onValueChange={(value) => setValue("category", value)}
            defaultValue={watch("category")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1 col-span-2">
          <Label htmlFor="experience">Experience</Label>
          <Input
            id="experience"
            type="number"
            step="0.01"
            placeholder="5"
            {...register("experience", { valueAsNumber: true })}
          />
        </div>

        <div className="grid gap-1">
          <Label htmlFor="category">Nature of Work</Label>
          <Select
            onValueChange={(value) => setValue("nature", value as "ONLINE" | "ONSITE")}
            defaultValue={watch("nature")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a nature" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ONLINE">Online</SelectItem>
              <SelectItem value="ONSITE">Onsite</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1">
          <Label htmlFor="hourlyRate">Hourly Rate</Label>
          <Input
            id="hourlyRate"
            type="number"
            step="0.01"
            placeholder="50"
            {...register("hourlyRate", { valueAsNumber: true })}
          />
        </div>

      </div>

      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive">
          <AlertTitle>Unable to submit the skill details..</AlertTitle>
          <AlertDescription>
            <p>Please verify your details and try again.</p>
            <ul className="list-inside list-disc text-sm">
              {Object.entries(errors).map(([key, error]) => (
                <li key={key}>{error.message}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col gap-3 mt-6">
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </div>
    </form>
  )
}
