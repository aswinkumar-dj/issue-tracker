"use client";

import dynamic from "next/dynamic";
import { Button, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

interface IssueForm {
  name: string;
  description: string;
}

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
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
  );
};

export default NewIssuePage;
