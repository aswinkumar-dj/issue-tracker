import IssueBadgeStatus from "@/app/components/IssueBadgeStatus";
import { prisma } from "@/lib/prisma";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
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
      <Heading>{issue.name}</Heading>
      <Flex gap="3" align="center" my="4">
        <IssueBadgeStatus status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="p-4 max-w-200 ">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
