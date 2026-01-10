import IssueForm from "../../_components/IssueForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const EditIssueForm = async ({ params }: Props) => {
  const { id } = await params;

  const issueId = Number(id);
  if (isNaN(issueId)) notFound();

  const issue = await prisma.issues.findUnique({
    where: { id: issueId },
  });

  if (!issue) notFound();
  console.log(issue);

  return <IssueForm issue={issue} />;
};

export default EditIssueForm;
