// src/pages/app/Explore.tsx

import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Auction } from "@/components/AuctionApp";
import { Users, Landmark, Gavel } from 'lucide-react'; // 아이콘 추가

type AuctionCardProps = {
  auction: Auction;
};

const AuctionCard = ({ auction }: AuctionCardProps) => {
  const now = new Date();
  const isEnded = new Date(auction.revealEnd) <= now;

  return (
    <Link to={`/app/auction/${auction.id}`}>
      <Card className="hover:border-primary transition-colors group flex flex-col h-full">
        <CardHeader className="p-0">
          <div className="aspect-video overflow-hidden rounded-t-lg">
            <img src={auction.imageUrl} alt={auction.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{auction.title}</CardTitle>
            <Badge variant="secondary">{auction.currency}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{auction.description.substring(0, 50)}...</p>
          <div className="text-sm text-muted-foreground mt-2">
              starts with <span className="font-bold text-primary">{auction.minPrice.toLocaleString()} </span>{auction.currency}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between text-sm text-muted-foreground items-center">
          <div className="flex gap-2">
            <Badge variant="outline">{auction.chain}</Badge>
            <Badge variant="outline">{auction.rule === 'vickrey' ? 'Vickrey' : 'First Price'}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{auction.commitCount.toLocaleString()}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

type ExplorePageProps = {
  auctions: Auction[];
};

export default function ExplorePage({ auctions }: ExplorePageProps) {
  const now = new Date();
  const activeAuctions = auctions.filter(a => new Date(a.revealEnd) > now);
  const endedAuctions = auctions.filter(a => new Date(a.revealEnd) <= now);

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-6">Active Auctions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeAuctions.map(auction => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      </div>
      {endedAuctions.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-6">Ended Auctions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {endedAuctions.map(auction => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}