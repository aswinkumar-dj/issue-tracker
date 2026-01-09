import { IssueBadgeStatus } from "@/app/components";
import { prisma } from "@/lib/prisma";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import EditIssuePage from "./EditIssuePage";
import IssueDetails from "./IssueDetails";
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
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssuePage issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
