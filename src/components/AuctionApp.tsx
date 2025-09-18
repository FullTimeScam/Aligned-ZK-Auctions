import React, { useState, createContext } from 'react';
import { Route, Routes, Link, NavLink } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner"; // Toaster는 이미 import 되어 있습니다.
import { Button, buttonVariants } from "@/components/ui/button"; // ✅ buttonVariants 추가
import { cn } from "@/lib/utils"; // ✅ cn 유틸리티 추가

// 페이지 임포트
import ExplorePage from '@/pages/app/Explore';
import CreatePage from '@/pages/app/Create';
import AuctionPage from '@/pages/app/Auction';

// 데이터 임포트
import { mockAuctions as initialAuctions } from '@/data/mock-data.js';

// 타입 정의
export type Auction = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageUrls: string[];
  chain: string;
  owner: string;
  rule: string;
  currency: string;
  minPrice: number;
  commitCount: number;
  status: 'active' | 'ended';
  commitEnd: Date;
  revealEnd: Date;
  winner: string | null;
  winningBid: number | null;
};

// 컨텍스트 정의
type WalletContextType = {
  isConnected: boolean;
  address: string | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
};

export const WalletContext = createContext<WalletContextType | null>(null);

// 헤더 컴포넌트
const AppHeader = () => {
  const walletContext = React.useContext(WalletContext);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Aligned Auction Forge</span>
          </Link>
          {/* ✅ NavLink에 버튼 스타일을 적용합니다. */}
          <nav className="flex items-center gap-2 text-sm">
            <NavLink 
              to="/app" 
              end 
              className={({ isActive }) => cn(
                buttonVariants({ variant: isActive ? "secondary" : "ghost", size: "sm" }),
                "px-4"
              )}
            >
              Explore
            </NavLink>
            <NavLink 
              to="/app/create" 
              className={({ isActive }) => cn(
                buttonVariants({ variant: isActive ? "secondary" : "ghost", size: "sm" }),
                "px-4"
              )}
            >
              Create
            </NavLink>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {walletContext?.isConnected ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono bg-muted text-muted-foreground px-3 py-1 rounded-md">{walletContext.address}</span>
              <Button variant="secondary" onClick={walletContext.disconnectWallet}>Disconnect</Button>
            </div>
          ) : (
            <Button onClick={walletContext?.connectWallet}>Connect Wallet</Button>
          )}
        </div>
      </div>
    </header>
  );
};

// 메인 앱 컴포넌트
export default function AuctionApp() {
  const [wallet, setWallet] = useState({ isConnected: false, address: null });
  const [auctions, setAuctions] = useState<Auction[]>(initialAuctions);

  const connectWallet = () => setWallet({ isConnected: true, address: '0xAbCd...1234' });
  const disconnectWallet = () => setWallet({ isConnected: false, address: null });

  const addAuction = (newAuctionData: Omit<Auction, 'id' | 'owner' | 'commitCount' | 'status' | 'winner' | 'winningBid'>) => {
    const newAuction: Auction = {
      ...newAuctionData,
      id: Date.now(),
      owner: wallet.address || '0xNewOwner...0000',
      commitCount: 0,
      status: 'active',
      winner: null,
      winningBid: null,
    };
    setAuctions(prev => [newAuction, ...prev]);
  };

  const incrementCommitCount = (auctionId: number, amount: number) => {
    setAuctions(prev =>
      prev.map(auc =>
        auc.id === auctionId ? { ...auc, commitCount: auc.commitCount + amount } : auc
      )
    );
  };
  
  return (
    <WalletContext.Provider value={{ ...wallet, connectWallet, disconnectWallet }}>
      <div className="relative flex min-h-screen flex-col bg-background">
        {/* ✅ Toaster 설정을 수정하여 디자인과 크기, 위치를 변경합니다. */}
        <Toaster 
          position="top-center" 
          richColors
          toastOptions={{
            classNames: {
              toast: 'p-6 border-border text-base',
              title: 'text-lg font-bold',
            },
          }}
        />
        <AppHeader />
        <main className="flex-1 container py-8">
          <Routes>
            <Route index element={<ExplorePage auctions={auctions} />} />
            <Route path="create" element={<CreatePage addAuction={addAuction} />} />
            <Route path="auction/:id" element={<AuctionPage auctions={auctions} incrementCommitCount={incrementCommitCount} />} />
          </Routes>
        </main>
      </div>
    </WalletContext.Provider>
  );
}