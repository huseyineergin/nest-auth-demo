import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";

interface FormTextareaFieldProps extends React.ComponentProps<"textarea"> {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: string;
}

export function FormTextareaField({ name, label, control, ...props }: FormTextareaFieldProps) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="w-full">
          <div className="grid gap-3">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Textarea {...field} {...props} />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
