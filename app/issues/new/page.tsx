"use client";

import dynamic from "next/dynamic";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

interface IssueForm {
  name: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
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

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
