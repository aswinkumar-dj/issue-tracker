import { Box } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";

const LoadingNewIssuePage = () => {
  return (
    <Box>
      <Skeleton />
      <Skeleton height={20} />
    </Box>
  );
};

export default LoadingNewIssuePage;
