import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { WalletContext, Auction } from '@/components/AuctionApp';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Users, Loader2 } from 'lucide-react';

// ## UI 컴포넌트 ##

const ProofVisualizer = ({ startCount }: { startCount: number }) => {
    const [proofs, setProofs] = useState(startCount);
    useEffect(() => {
        setProofs(startCount);
        const interval = setInterval(() => {
            setProofs(prev => prev + Math.floor(Math.random() * 500) + 100);
        }, 300);
        return () => clearInterval(interval);
    }, [startCount]);

    return (
        <Card>
            <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Aligned Layer Real-time Throughput</p>
                <p className="text-2xl font-bold font-mono text-primary">{proofs.toLocaleString()} proofs / block</p>
            </CardContent>
        </Card>
    );
};

const StatusBadge = ({ status, mode }: { status: string, mode?: string | null }) => {
    const variant = status === 'COMMIT_OPEN' ? 'default' : status === 'REVEAL_OPEN' ? 'secondary' : 'outline';
    return <Badge variant={variant} className="text-sm">{status} {mode && <span className="ml-2 opacity-70">{mode}</span>}</Badge>;
};

// ## 메인 페이지 컴포넌트 ##

type AuctionPageProps = {
    auctions: Auction[];
    incrementCommitCount: (auctionId: number, amount: number) => void;
};

export default function AuctionPage({ auctions, incrementCommitCount }: AuctionPageProps) {
    const { id } = useParams<{ id: string }>();
    const walletContext = useContext(WalletContext);

    const [auction, setAuction] = useState<Auction | null>(null);
    const [phase, setPhase] = useState('LOADING');
    const [timeLeft, setTimeLeft] = useState(0);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
    
    const [hasDeposited, setHasDeposited] = useState(false);
    const [commitStatus, setCommitStatus] = useState<string | null>(null);
    const [bidAmount, setBidAmount] = useState('');
    const [biddingChain, setBiddingChain] = useState('Polygon');
    const [finalResult, setFinalResult] = useState<{ winner: string; winningBid: string } | null>(null);
    const [committedBid, setCommittedBid] = useState<string | null>(null);
    const [isDepositing, setIsDepositing] = useState(false);
    const [isCommitting, setIsCommitting] = useState(false);

    useEffect(() => {
        const auctionId = parseInt(id || '0');
        const foundAuction = auctions.find(a => a.id === auctionId);

        if (foundAuction) {
            setAuction(foundAuction);
            setSelectedImageUrl(foundAuction.imageUrl);
            
            const interval = setInterval(() => {
                const now = new Date();
                const commitEnd = new Date(foundAuction.commitEnd);
                const revealEnd = new Date(foundAuction.revealEnd);

                if (now < commitEnd) {
                    setPhase('COMMIT_OPEN');
                    setTimeLeft(Math.floor((commitEnd.getTime() - now.getTime()) / 1000));
                } else if (now < revealEnd) {
                    setPhase('REVEAL_OPEN');
                    setTimeLeft(Math.floor((revealEnd.getTime() - now.getTime()) / 1000));
                } else {
                    setPhase('SETTLED');
                    setTimeLeft(0);
                    if (!finalResult && bidAmount && walletContext?.address) {
                        const userBid = parseFloat(bidAmount);
                        let result;
                        if (Math.random() < 0.5) {
                            const winningPrice = userBid * (Math.random() * 0.1 + 0.85);
                            result = { winner: walletContext.address, winningBid: winningPrice.toFixed(2) };
                        } else {
                            result = { winner: '0xOtherWinner...9ABC', winningBid: userBid.toFixed(2) };
                        }
                        setFinalResult(result);
                    }
                    clearInterval(interval);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [id, auctions, finalResult, bidAmount, walletContext]);
    
    useEffect(() => {
        if (phase === 'COMMIT_OPEN' && auction) {
            const autoIncrementInterval = setInterval(() => {
                incrementCommitCount(auction.id, Math.floor(Math.random() * 25) + 1);
            }, 500);
            return () => clearInterval(autoIncrementInterval);
        }
    }, [phase, auction, incrementCommitCount]);

    const handleDeposit = () => {
        setIsDepositing(true);
        setTimeout(() => {
            setHasDeposited(true);
            toast.info("ℹ️ Bond deposited successfully.");
            setIsDepositing(false);
        }, 5000);
    };

    const handleCommit = () => {
        if (!walletContext?.isConnected) { toast.error("🚨 Please connect your wallet first."); return; }
        if (!hasDeposited) { toast.warning("⚠️ Please deposit a bond first."); return; }
        if (!auction || parseFloat(bidAmount) < auction.minPrice) { toast.error(`🚨 Bid must be at least ${auction?.minPrice} ${auction?.currency}.`); return; }
        
        setIsCommitting(true);
        setCommitStatus('PENDING');
        toast.info(`ℹ️ Requesting ZK proof from Aligned Meta-Proving Service...`);
        
        setTimeout(() => {
            setCommitStatus('VALID');
            setCommittedBid(bidAmount);
            toast.success("✅ Commit has been successfully verified!");
            incrementCommitCount(auction.id, 1);
            setIsCommitting(false);
        }, 5000);
    };

    if (!auction) return <p className="text-center text-muted-foreground py-10">Loading auction...</p>;
    
    const securityMode = phase === 'COMMIT_OPEN' ? '⚡ Fast Mode' : phase === 'SETTLED' ? '🔒 Secure Mode' : null;
    const isWinner = finalResult && walletContext?.isConnected && walletContext.address === finalResult.winner;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
                <div className="aspect-video w-full overflow-hidden rounded-lg border">
                    <img src={selectedImageUrl || auction.imageUrl} alt={auction.title} className="w-full h-full object-cover" />
                </div>
                {/* ✅ 썸네일 목록을 보여주던 코드를 이 위치에서 삭제했습니다. */}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
                <div className="space-y-2">
                    <Badge variant="outline">{auction.chain}</Badge>
                    <h1 className="text-4xl font-bold tracking-tighter">{auction.title}</h1>
                    <p className="text-muted-foreground">{auction.description}</p>
                </div>
                
                <Card>
                    <CardContent className="p-4 flex justify-between items-center">
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Current Phase</p>
                            <StatusBadge status={phase} mode={securityMode} />
                        </div>
                         <div className="space-y-1 text-right">
                            <p className="text-sm text-muted-foreground">Time Left</p>
                            <p className="text-2xl font-mono">{timeLeft > 0 ? new Date(timeLeft * 1000).toISOString().substr(14, 5) : '00:00'}</p>
                        </div>
                    </CardContent>
                </Card>
                
                {phase === 'COMMIT_OPEN' && (
                    <div className="grid grid-cols-2 gap-4">
                        <ProofVisualizer startCount={auction.commitCount} />
                        <Card>
                             <CardContent className="p-4 text-center">
                                <p className="text-sm text-muted-foreground">Current Participants</p>
                                <div className="flex items-center justify-center gap-2">
                                    <Users className="h-6 w-6 text-primary" />
                                    <p className="text-2xl font-bold font-mono text-primary">{auction.commitCount.toLocaleString()}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Action Card */}
                <Card>
                    <CardHeader><CardTitle>
                        {phase === 'COMMIT_OPEN' && 'Place Your Bid'}
                        {phase === 'REVEAL_OPEN' && 'Reveal Phase'}
                        {phase === 'SETTLED' && 'Auction Ended'}
                    </CardTitle></CardHeader>
                    <CardContent>
                         {phase === 'COMMIT_OPEN' && (
                            <div className="space-y-4">
                                {committedBid ? (
                                    <div className="text-center p-4 bg-muted rounded-lg">
                                        <p className="text-sm text-muted-foreground">Your Committed Bid</p>
                                        <p className="text-2xl font-bold">{committedBid} {auction.currency}</p>
                                        <p className="text-xs text-muted-foreground mt-2">Your bid is sealed until the reveal phase.</p>
                                    </div>
                                ) : !hasDeposited ? (
                                    <Button className="w-full" onClick={handleDeposit} disabled={isDepositing}>
                                        {isDepositing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {isDepositing ? 'Processing Deposit...' : '1. Deposit Bond'}
                                    </Button>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Bidding Chain</Label>
                                                <Select value={biddingChain} onValueChange={setBiddingChain}>
                                                    <SelectTrigger><SelectValue/></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Polygon">Polygon (~$0.01)</SelectItem>
                                                        <SelectItem value="Arbitrum">Arbitrum (~$0.05)</SelectItem>
                                                        <SelectItem value="Base">Base (~$0.005)</SelectItem>
                                                        <SelectItem value="Polygon">Etherium (~$5)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                             <div className="space-y-2">
                                                <Label>Your Bid ({auction.currency})</Label>
                                                <Input type="number" value={bidAmount} onChange={e => setBidAmount(e.target.value)} placeholder={`min. ${auction.minPrice}`} />
                                            </div>
                                        </div>
                                        <Button className="w-full" onClick={handleCommit} disabled={isCommitting || commitStatus === 'VALID' || !bidAmount || parseFloat(bidAmount) < auction.minPrice}>
                                            {isCommitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            {isCommitting ? 'Committing...' : '2. Commit Bid'}
                                        </Button>
                                    </div>
                                )}
                            </div>
                         )}
                         {phase === 'REVEAL_OPEN' && <p className="text-muted-foreground">Bids are currently being revealed. The winner will be announced shortly.</p>}
                         {phase === 'SETTLED' && (
                            finalResult ? (
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <p className="text-muted-foreground">Winning Bid</p>
                                        <p className="font-bold">{finalResult.winningBid} {auction.currency}</p>
                                    </div>
                                     <div className="flex justify-between">
                                        <p className="text-muted-foreground">Winner</p>
                                        <p className="font-mono text-sm">{finalResult.winner}</p>
                                    </div>
                                    {isWinner ? (
                                        <Button className="w-full">Claim Asset</Button>
                                    ) : (
                                        <p className="text-sm text-center text-destructive pt-2">You were not the winner.</p>
                                    )}
                                </div>
                            ) : <p>You did not participate in this auction.</p>
                         )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}