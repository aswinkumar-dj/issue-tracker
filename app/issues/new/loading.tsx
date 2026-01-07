import { Box } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";
const LoadingNewIssuePage = () => {
  return (
    <Box>
      <Skeleton />
      <Skeleton height={20} />
    </Box>
  );
};

export default LoadingNewIssuePage;
