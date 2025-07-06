import { UseFormReturn } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { TaskFormSchemaType } from "@/types/schema"

interface IProps {
  methods: UseFormReturn<TaskFormSchemaType>
  onSubmit: (data: TaskFormSchemaType) => void
}

export function TaskForm({ methods, onSubmit }: IProps) {
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
        <div className="grid gap-1 col-span-2">
          <Label htmlFor="name">Task Name</Label>
          <Input
            id="name"
            placeholder="Design a website"
            {...register("name")}
          />
        </div>

        <div className="grid gap-1 col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Brief about the task..."
            {...register("description")}
          />
        </div>

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

        <div className="grid gap-1">
          <Label htmlFor="expectedStart">Expected Start Date</Label>
          <Input
            id="expectedStart"
            type="date"
            {...register("expectedStart")}
          />
        </div>

        <div className="grid gap-1">
          <Label htmlFor="hours">Expected Working Hours</Label>
          <Input
            id="hours"
            type="number"
            min="1"
            placeholder="10"
            {...register("hours", { valueAsNumber: true })}
          />
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

        <div className="grid gap-1">
          <Label htmlFor="currency">Currency</Label>
          <Select
            onValueChange={(value) => setValue("currency", value)}
            defaultValue={watch("currency")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="AUD">AUD</SelectItem>
              <SelectItem value="SGD">GBP</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive">
          <AlertTitle>Unable to submit task.</AlertTitle>
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
