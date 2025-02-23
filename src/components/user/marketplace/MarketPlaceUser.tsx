import NFTList from "@/components/marketplace/nft-list/NFTList";
import UserCard from "@/components/UserCard";

export default function MarketPlaceUser() {
    return (
        <div className="w-full flex flex-col md:flex-row items-start justify-between gap-4">
            <UserCard className="w-full">
                <NFTList isUser={true} />
            </UserCard>
        </div>
    );
}
