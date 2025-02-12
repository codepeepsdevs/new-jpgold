import BuyNowCmp from '@/components/buy/BuyNowCmp';
import { FC } from 'react';

interface BuyNowPageProps {
    params: {
        id: string;
    };
}

const BuyNowPage: FC<BuyNowPageProps> = ({ params }) => {
    return (
        <BuyNowCmp params={params} />
    );
};

export default BuyNowPage; 