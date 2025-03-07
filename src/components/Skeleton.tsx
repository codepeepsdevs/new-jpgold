import { useTheme } from "@/store/theme.store";
import Skeleton from "react-loading-skeleton";

const SkeletonComponent = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => {
  const theme = useTheme();
  return (
    <Skeleton
      style={style}
      className={className}
      baseColor={theme === "light" ? "#e0e0e0" : "#202020"}
      highlightColor={theme === "light" ? "#f5f5f5" : "#444444"}
    />
  );
};

export default SkeletonComponent;
