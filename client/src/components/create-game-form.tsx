"use client";

import { createGameAction } from "@/app/games/actions";
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { MultiSelect } from "./ui/multiselect";
import { Textarea } from "./ui/textarea";

const options = [
  { value: "8f4b86d2-77a1-4eb5-b3b2-1f7bde01b29b", label: "Apple" },
  { value: "c6f0b646-8080-4ccf-a58f-59c3de3c132b", label: "Banana" },
  { value: "e90f6f30-2f28-43e4-a1fb-6307e0c07a2c", label: "Cherry" },
  { value: "2cc67d8f-d6a2-4eb0-a0b6-8479dcaa9e9c", label: "Mango" },
  { value: "ad2e8cc4-f42e-43d1-970e-2c0291b04b84", label: "Orange" },
  { value: "1bc28df2-5dd3-4e46-9cfd-0888e9b52bfb", label: "Watermelon" },
];

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
          <CardTitle>Create Game</CardTitle>
        </CardHeader>
        <CardContent className="max-h-[50svh] overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6 text-left">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-3">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-3">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  name="releaseDate"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-3">
                        <FormLabel>Release Date</FormLabel>
                        <FormControl>
                          <Input placeholder="YYYY-MM-DD" {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <div className="flex space-x-2">
                  <FormField
                    name="metascore"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <div className="grid gap-3">
                          <FormLabel>Metascore</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="userScore"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <div className="grid gap-3">
                          <FormLabel>User Score</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex space-x-2">
                  <FormField
                    name="developer"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <div className="grid gap-3">
                          <FormLabel>Developer</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="publisher"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <div className="grid gap-3">
                          <FormLabel>Publisher</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  name="genreIds"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div className="grid gap-3">
                        <FormLabel>Genres</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={genres.map((genre) => ({
                              label: genre.name,
                              value: genre.id,
                            }))}
                            selected={field.value}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  name="platformIds"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div className="grid gap-3">
                        <FormLabel>Platforms</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={platforms.map((platform) => ({
                              label: platform.name,
                              value: platform.id,
                            }))}
                            selected={field.value}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

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
