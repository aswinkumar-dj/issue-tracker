import { IssueBadgeStatus } from "@/app/components";
import { Issues } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issues }) => {
  return (
    <>
      <Heading>{issue.name}</Heading>
      <Flex gap="3" align="center" my="4">
        <IssueBadgeStatus status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="p-4 max-w-200 ">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
