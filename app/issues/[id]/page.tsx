import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  const issueId = Number(id);
  if (!Number.isInteger(issueId)) notFound();

  const issue = await prisma.issues.findUnique({
    where: { id: issueId },
  });

  if (!issue) notFound();

  return (
    <div>
      <p>{issue.name}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetailPage;
