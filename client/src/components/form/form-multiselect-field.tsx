import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { MultiSelect } from "../ui/multiselect";

interface Option {
  value: string;
  label: string;
}

interface FormMultiselectFieldProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: string;
  options: Option[];
}

export function FormMultiselectField({ name, label, control, options }: FormMultiselectFieldProps) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="w-full">
          <div className="grid gap-3">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <MultiSelect options={options} selected={field.value} {...field} />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
