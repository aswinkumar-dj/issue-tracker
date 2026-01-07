import { Flex, Card, Box } from "@radix-ui/themes";

import Skeleton from "react-loading-skeleton";

const LoadingIssueDetailPage = () => {
  return (
    <Box>
      <Skeleton className="max-w-xl" />
      <Flex gap="3" align="center" my="4">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="p-4 max-w-200 ">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
