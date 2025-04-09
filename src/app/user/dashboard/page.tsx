import Metrics from "@/components/user/dashboard/Metrics";
import Proceeds from "@/components/user/dashboard/Proceeds";
import UserCard from "@/components/UserCard";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-6 ">
      <UserCard className="w-full">
        <Metrics />
      </UserCard>

      <UserCard className="w-full">
        <Proceeds />
      </UserCard>
    </div>
  );
};

export default DashboardPage;
