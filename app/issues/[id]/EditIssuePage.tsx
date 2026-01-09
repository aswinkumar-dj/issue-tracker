import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { issue } from "@uiw/react-md-editor";
import Link from "next/link";
import React from "react";

const EditIssuePage = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIssuePage;
