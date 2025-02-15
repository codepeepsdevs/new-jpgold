/* eslint-disable @typescript-eslint/no-explicit-any */

import BuyNowCmp from '@/components/buy/BuyNowCmp';

interface PageProps {
    params: {
        id: any;
    };
}

const BuyNowPage = async ({ params }: PageProps) => {
    return (
        <BuyNowCmp params={params} />
    );
};

export default BuyNowPage; 