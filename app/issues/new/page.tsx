"use client";

import dynamic from "next/dynamic";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import React, { useState } from "react";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const NewIssuePage = () => {
  const [description, setDescription] = useState("");

  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title" />

      <SimpleMDE
        value={description}
        onChange={setDescription}
        options={{
          placeholder: "Description",
        }}
      />

      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
