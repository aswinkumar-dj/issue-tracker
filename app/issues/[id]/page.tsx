import { IssueBadgeStatus } from "@/app/components";
import { prisma } from "@/lib/prisma";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
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
    <Grid gap="6" columns={{ initial: "1", md: "2" }}>
      <Box>
        <Heading>{issue.name}</Heading>
        <Flex gap="3" align="center" my="4">
          <IssueBadgeStatus status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="p-4 max-w-200 ">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
