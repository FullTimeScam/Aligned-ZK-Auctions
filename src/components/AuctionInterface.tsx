import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AuctionItem {
  id: string;
  title: string;
  description: string;
  currentBid: number;
  endTime: Date;
  bids: number;
  verified: boolean;
}

const mockAuctions: AuctionItem[] = [
  {
    id: "1",
    title: "Premium NFT Collection #001",
    description: "Rare digital artwork with verified provenance",
    currentBid: 2.5,
    endTime: new Date(Date.now() + 3600000),
    bids: 47,
    verified: true,
  },
  {
    id: "2", 
    title: "Cross-Chain Asset Bundle",
    description: "Multi-chain compatible token package",
    currentBid: 1.8,
    endTime: new Date(Date.now() + 7200000),
    bids: 23,
    verified: true,
  },
];

const AuctionCard = ({ auction }: { auction: AuctionItem }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitBid = async () => {
    setIsSubmitting(true);
    // Simulate ZK proof generation and submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setBidAmount("");
  };

  const timeLeft = Math.floor((auction.endTime.getTime() - Date.now()) / 1000 / 60);

  return (
    <Card className="p-6 bg-card border-border hover:bg-card-hover transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold mb-2">{auction.title}</h3>
          <p className="text-muted-foreground text-sm mb-3">{auction.description}</p>
        </div>
        {auction.verified && (
          <Badge className="bg-success/10 text-success border-success/20">
            ZK Verified
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-muted-foreground">Current Bid</p>
          <p className="text-2xl font-bold performance-text">{auction.currentBid} ETH</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Time Left</p>
          <p className="text-2xl font-bold text-warning">{timeLeft}m</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>{auction.bids} sealed bids</span>
          <span>End: {auction.endTime.toLocaleTimeString()}</span>
        </div>
        <Progress value={(auction.bids / 50) * 100} className="h-2" />
      </div>

      <div className="flex gap-3">
        <Input
          placeholder="Your bid (ETH)"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          className="flex-1"
        />
        <Button 
          onClick={handleSubmitBid}
          disabled={!bidAmount || isSubmitting}
          className="bg-primary hover:bg-primary-dark text-primary-foreground"
        >
          {isSubmitting ? "Proving..." : "Sealed Bid"}
        </Button>
      </div>
      
      {isSubmitting && (
        <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded">
          <div className="flex items-center gap-2 text-sm text-primary">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            Generating ZK proof for sealed bid...
          </div>
        </div>
      )}
    </Card>
  );
};

export const AuctionInterface = () => {
  return (
    <section className="py-20 px-6 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Live <span className="performance-text">ZK Auctions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience sealed-bid auctions with instant verification and cross-chain support
          </p>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="active">Active Auctions</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockAuctions.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming" className="space-y-6">
            <Card className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
              <p className="text-muted-foreground">New auctions will be available shortly.</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-6">
            <Card className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Recent Completions</h3>
              <p className="text-muted-foreground">View auction results and ZK proofs.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};