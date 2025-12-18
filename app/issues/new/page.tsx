"use client";

import dynamic from "next/dynamic";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import z from "zod";
import { Text } from "@radix-ui/themes/components/callout";
import ErrorMessage from "@/app/components/ErrorMessage";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const [error, setError] = useState("");
  const router = useRouter();

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            console.log(error);
            setError("An unexpected error occured.");
          }
        })}
      >
        <TextField.Root placeholder="Title" {...register("name")} />
        <ErrorMessage>{errors.name?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <div data-color-mode="light">
              <MDEditor
                value={field.value}
                onChange={(val) => field.onChange(val ?? "")}
                onBlur={field.onBlur}
                preview="edit"
                height={200}
              />
            </div>
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
