"use client";

import { createGameAction } from "@/app/games/actions";
import { FormInputField } from "@/components/form/form-input-field";
import { FormMultiselectField } from "@/components/form/form-multiselect-field";
import { FormTextareaField } from "@/components/form/form-textarea-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Genre } from "@/types/genre";
import { Platform } from "@/types/platform";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Form } from "../../../components/ui/form";

const formSchema = z.object({
  name: z.string().nonempty({ error: "Name is required." }),
  description: z.string().nonempty({ error: "Description is required." }),
  releaseDate: z
    .string()
    .nonempty({ message: "Release date is required." })
    .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), { message: "Date format must be YYYY-MM-DD." }),
  metascore: z
    .string()
    .nonempty({ error: "Metascore is required." })
    .refine((val) => !isNaN(Number(val)), {
      message: "Metascore must be a valid number.",
    })
    .refine((val) => Number(val) >= 0, {
      message: "Metascore cannot be less than 0.",
    })
    .refine((val) => Number(val) <= 100, {
      message: "Metascore cannot be more than 100.",
    }),
  userScore: z
    .string()
    .nonempty({ error: "User score is required." })
    .refine((val) => !isNaN(Number(val)), {
      message: "User score must be a valid number.",
    })
    .refine((val) => Number(val) >= 0, {
      message: "User score cannot be less than 0.",
    })
    .refine((val) => Number(val) <= 100, {
      message: "User score cannot be more than 100.",
    }),
  developer: z.string().nonempty({ error: "Developer is required." }),
  publisher: z.string().nonempty({ error: "Publisher is required." }),
  genreIds: z.array(z.uuidv4()).nonempty({ error: "At least one genre must be selected." }),
  platformIds: z.array(z.uuidv4()).nonempty({ error: "At least one platform must be selected." }),
});

type CreateGameFormProps = {
  platforms: Platform[];
  genres: Genre[];
};

export function CreateGameForm({
  className,
  platforms,
  genres,
  ...props
}: CreateGameFormProps & React.ComponentProps<"div">) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      releaseDate: "",
      metascore: "",
      userScore: "",
      developer: "",
      publisher: "",
      genreIds: [],
      platformIds: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const res = await createGameAction(values);

      if (res.success) {
        toast.success(res.message, { position: "bottom-center", closeButton: true });
        form.reset();
      } else {
        const messages = Array.isArray(res.message) ? res.message : [res.message];
        messages.forEach((message) => {
          toast.error(message, {
            position: "bottom-center",
            closeButton: true,
          });
        });
      }
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Create Game</CardTitle>
        </CardHeader>
        <CardContent className="max-h-[50svh] overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6 text-left">
                <FormInputField name="name" control={form.control} label="Name" />

                <FormTextareaField name="description" control={form.control} label="Description" />

                <FormInputField
                  name="releaseDate"
                  control={form.control}
                  label="Release Date"
                  placeholder="YYYY-MM-DD"
                />

                <div className="flex space-x-2">
                  <FormInputField name="metascore" control={form.control} label="Metascore" />

                  <FormInputField name="userScore" control={form.control} label="User Score" />
                </div>

                <div className="flex space-x-2">
                  <FormInputField name="developer" control={form.control} label="Developer" />

                  <FormInputField name="publisher" control={form.control} label="Publisher" />
                </div>

                <div className="flex flex-col gap-6 md:flex-row md:gap-2">
                  <FormMultiselectField
                    name="genreIds"
                    control={form.control}
                    label="Genres"
                    options={genres.map((genre) => ({
                      label: genre.name,
                      value: genre.id,
                    }))}
                  />

                  <FormMultiselectField
                    name="platformIds"
                    control={form.control}
                    label="Platforms"
                    options={platforms.map((platform) => ({
                      label: platform.name,
                      value: platform.id,
                    }))}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? <Loader2 className="animate-spin" /> : "Create"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
