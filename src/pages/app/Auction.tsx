import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { WalletContext, Auction } from '@/components/AuctionApp';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Users, Loader2, Info } from 'lucide-react';

// ## UI 컴포넌트 ##

const ProofVisualizer = ({ startCount }: { startCount: number }) => {
  const [proofs, setProofs] = useState(startCount);

  useEffect(() => {
    setProofs(startCount);
    const interval = window.setInterval(() => {
      setProofs(prev => prev + Math.floor(Math.random() * 100) + 0);
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
  const [phase, setPhase] = useState<'LOADING' | 'COMMIT_OPEN' | 'REVEAL_OPEN' | 'SETTLED'>('LOADING');
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

  const [hasWinnerPaid, setHasWinnerPaid] = useState(false);
  const [hasRefunded, setHasRefunded] = useState(false);

  // 종료시각을 고정해두는 상태
  const [commitEndAt, setCommitEndAt] = useState<number | null>(null);
  const [revealEndAt, setRevealEndAt] = useState<number | null>(null);

  // 인터벌 ID 보관
  const intervalRef = useRef<number | null>(null);

  // 선택된 경매 고정
  useEffect(() => {
    const auctionId = parseInt(id || '0', 10);
    const foundAuction = auctions.find(a => a.id === auctionId);
    if (!foundAuction) return;

    setAuction(foundAuction);
    setSelectedImageUrl(foundAuction.imageUrl);
    setCommitEndAt(new Date(foundAuction.commitEnd).getTime());
    setRevealEndAt(new Date(foundAuction.revealEnd).getTime());
  }, [id, auctions]);

  // 카운트다운 인터벌 초기화. 종료시각만 의존
  useEffect(() => {
    if (!commitEndAt || !revealEndAt) return;

    const tick = () => {
      const now = Date.now();
      if (now < commitEndAt) {
        setPhase('COMMIT_OPEN');
        setTimeLeft(Math.max(0, Math.floor((commitEndAt - now) / 1000)));
      } else if (now < revealEndAt) {
        setPhase('REVEAL_OPEN');
        setTimeLeft(Math.max(0, Math.floor((revealEndAt - now) / 1000)));
      } else {
        setPhase('SETTLED');
        setTimeLeft(0);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    };

    // 즉시 1회 실행 후 1초 주기
    tick();
    intervalRef.current = window.setInterval(tick, 1000);

    // 탭 복귀시 드리프트 보정
    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        // 다음 프레임에 tick
        setTimeout(tick, 0);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [commitEndAt, revealEndAt]);

  // 경매 종료 후 1회 결과 계산
  useEffect(() => {
    if (phase !== 'SETTLED') return;
    if (finalResult) return;
    if (!walletContext?.address) return;
    if (!bidAmount) return;

    const userBid = parseFloat(bidAmount);
    let result;
    if (Math.random() < 0.5) {
      const winningPrice = userBid * (Math.random() * 0.1 + 0.85);
      result = { winner: walletContext.address, winningBid: winningPrice.toFixed(2) };
    } else {
      result = { winner: '0xOtherWinner...9ABC', winningBid: userBid.toFixed(2) };
    }
    setFinalResult(result);
  }, [phase, finalResult, bidAmount, walletContext?.address]);

  // 커밋카운트 자동 증가. phase와 auction.id만 의존
  useEffect(() => {
    if (phase !== 'COMMIT_OPEN' || !auction) return;
    const autoIncrementInterval = window.setInterval(() => {
      incrementCommitCount(auction.id, Math.floor(Math.random() * 25) + 1);
    }, 500);
    return () => clearInterval(autoIncrementInterval);
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

  const handleFinalDeposit = () => {
    toast.info("ℹ️ Processing final payment...");
    setTimeout(() => {
      setHasWinnerPaid(true);
      toast.success("✅ Payment successful! You can now claim your asset.");
    }, 3000);
  };

  const handleRefund = () => {
    toast.info("ℹ️ Refunding your bond...");
    setTimeout(() => {
      setHasRefunded(true);
      toast.success("✅ Your bond has been successfully refunded to your wallet.");
    }, 3000);
  };

  if (!auction) return <p className="text-center text-muted-foreground py-10">Loading auction...</p>;

  const securityMode = phase === 'COMMIT_OPEN' ? '⚡ Fast Mode' : phase === 'SETTLED' ? '🔒 Secure Mode' : null;
  const isWinner = finalResult && walletContext?.isConnected && walletContext.address === finalResult.winner;

  const bondAmount = auction.minPrice * 0.15;
  const remainingBalance = finalResult ? parseFloat(finalResult.winningBid) - bondAmount : 0;

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
              <button
                key={index}
                onClick={() => setSelectedImageUrl(url)}
                className={`aspect-square rounded-md overflow-hidden border-2 ${selectedImageUrl === url ? 'border-primary' : 'border-transparent'}`}
              >
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
          <div className="text-lg pt-2">
            <span className="text-muted-foreground">Min. Bid: </span>
            <span className="font-bold text-primary">{auction.minPrice.toLocaleString()} {auction.currency}</span>
          </div>
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
          <CardHeader>
            <CardTitle>
              {phase === 'COMMIT_OPEN' && 'Place Your Bid'}
              {phase === 'REVEAL_OPEN' && 'Reveal Phase'}
              {phase === 'SETTLED' && 'Auction Ended'}
            </CardTitle>
            {phase === 'COMMIT_OPEN' && !hasDeposited && (
              <CardDescription className="pt-2 flex items-start gap-2">
                <Info className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>A bond is required to ensure participation. It will be returned if you do not win. Winners must pay the remaining balance within 7 days or the bond will be forfeited.</span>
              </CardDescription>
            )}
          </CardHeader>
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
                  <Button className="w-full font-bold" onClick={handleDeposit} disabled={isDepositing}>
                    {isDepositing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isDepositing ? 'Processing Deposit...' : `1. Deposit Bond 15% (~${bondAmount.toLocaleString()} ${auction.currency})`}
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
                            <SelectItem value="Ethereum">Ethereum (~$5)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Your Bid ({auction.currency})</Label>
                        <Input type="number" value={bidAmount} onChange={e => setBidAmount(e.target.value)} placeholder={`min. ${auction.minPrice}`} />
                      </div>
                    </div>
                    <Button
                      className="w-full font-bold"
                      onClick={handleCommit}
                      disabled={isCommitting || commitStatus === 'VALID' || !bidAmount || parseFloat(bidAmount) < auction.minPrice}
                    >
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
                    hasWinnerPaid ? (
                      <Button className="w-full font-bold">Claim Asset</Button>
                    ) : (
                      <div className="space-y-4 pt-2">
                        <div className="p-4 border rounded-lg space-y-2">
                          <div className="flex justify-between text-sm">
                            <p className="text-muted-foreground">Final Price</p>
                            <p>{parseFloat(finalResult.winningBid).toLocaleString()} {auction.currency}</p>
                          </div>
                          <div className="flex justify-between text-sm">
                            <p className="text-muted-foreground">Bond Paid</p>
                            <p>- {bondAmount.toLocaleString()} {auction.currency}</p>
                          </div>
                          <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                            <p>Remaining Balance</p>
                            <p>{remainingBalance.toLocaleString()} {auction.currency}</p>
                          </div>
                        </div>
                        <Button className="w-full font-bold" onClick={handleFinalDeposit}>Deposit Final Amount</Button>
                        <CardDescription className="pt-2 flex items-start gap-2 text-primary">
                          <Info className="h-4 w-4 mt-1 flex-shrink-0" />
                          <span>You must deposit the final amount within 7 days to claim your asset. Failure to do so will result in the forfeiture of your bond.</span>
                        </CardDescription>
                      </div>
                    )
                  ) : (
                    hasRefunded ? (
                      <p className="text-sm text-center text-green-500 pt-2">Your bond has been returned.</p>
                    ) : (
                      <Button className="w-full font-bold" variant="secondary" onClick={handleRefund}>Refund Bond</Button>
                    )
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
