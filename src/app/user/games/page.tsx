import ComingSoon from "@/components/common/ComingSoon";
import UserCard from "@/components/UserCard";
import images from "../../../../public/images";
const GamesPage = () => {
  return (
    <div className="w-full min-h-screen flex-1 flex-col md:flex-row items-start justify-between gap-4 pb-10">
      <UserCard className="w-full md:w-[95%] mx-auto">
        <ComingSoon
          title="Gaming Feature Coming Soon!"
          description="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit"
          Icon={{
            light: images.user.gameDocIcon,
            dark: images.user.gameDocIconDark
          }}
        />
      </UserCard>
    </div>
  );
};

export default GamesPage;
