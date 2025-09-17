// src/pages/app/Auction.tsx

import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { WalletContext, Auction } from '@/components/AuctionApp';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// 컴포넌트들
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

// 메인 페이지
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
                incrementCommitCount(auction.id, Math.floor(Math.random() * 5) + 1);
            }, 3000);
            return () => clearInterval(autoIncrementInterval);
        }
    }, [phase, auction, incrementCommitCount]);

    if (!auction) return <p>Loading auction...</p>;
    
    const handleCommit = () => {
        if (!hasDeposited) { toast.warning("Please deposit a bond first."); return; }
        if (parseFloat(bidAmount) < auction.minPrice) { toast.error(`Bid must be at least ${auction.minPrice} ${auction.currency}.`); return; }
        
        toast.info(`Requesting ZK proof from Aligned Meta-Proving Service... (from ${biddingChain})`);
        setCommitStatus('PENDING');
        setTimeout(() => {
            setCommitStatus('VALID');
            toast.success("Commit has been successfully verified!");
            incrementCommitCount(auction.id, 1);
        }, 2500);
    };

    const securityMode = phase === 'COMMIT_OPEN' ? '⚡ Fast Mode' : phase === 'SETTLED' ? '🔒 Secure Mode' : null;
    const isWinner = finalResult && walletContext?.isConnected && walletContext.address === finalResult.winner;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
                <div className="aspect-video w-full overflow-hidden rounded-lg border">
                    <img src={selectedImageUrl || auction.imageUrl} alt={auction.title} className="w-full h-full object-cover" />
                </div>
                {auction.imageUrls && auction.imageUrls.length > 1 && (
                    <div className="grid grid-cols-5 gap-2">
                        {auction.imageUrls.map((url, index) => (
                            <button key={index} onClick={() => setSelectedImageUrl(url)} className={`aspect-square rounded-md overflow-hidden border-2 ${selectedImageUrl === url ? 'border-primary' : 'border-transparent'}`}>
                                <img src={url} alt={`thumbnail ${index}`} className="w-full h-full object-cover"/>
                            </button>
                        ))}
                    </div>
                )}
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
                
                {phase === 'COMMIT_OPEN' && <ProofVisualizer startCount={auction.commitCount} />}

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
                                {!hasDeposited ? (
                                    <Button className="w-full" onClick={() => {setHasDeposited(true); toast.info("Bond deposited successfully.")}}>1. Deposit Bond</Button>
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
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                             <div className="space-y-2">
                                                <Label>Your Bid ({auction.currency})</Label>
                                                <Input type="number" value={bidAmount} onChange={e => setBidAmount(e.target.value)} placeholder={`min. ${auction.minPrice}`} />
                                            </div>
                                        </div>
                                        <Button className="w-full" onClick={handleCommit} disabled={commitStatus === 'VALID'}>2. Commit Bid</Button>
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
                                    {isWinner && <Button className="w-full">Claim Asset</Button>}
                                </div>
                            ) : <p>You did not participate in this auction.</p>
                         )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}