// src/data/mock-data.js

const getTimeFromNow = (minutes) => {
  return new Date(Date.now() + minutes * 60 * 1000);
};

export const mockAuctions = [
  {
    id: 1,
    title: "CryptoPunk #1234",
    description: "희귀한 좀비 크립토펑크입니다.",
    imageUrl: "https://via.placeholder.com/400x400.png?text=CryptoPunk",
    imageUrls: [
      "https://via.placeholder.com/400x400.png?text=Punk+View+1",
      "https://via.placeholder.com/400x400.png?text=Punk+View+2",
      "https://via.placeholder.com/400x400.png?text=Punk+View+3",
    ],
    chain: "Ethereum",
    owner: '0xOwner...5678',
    rule: "vickrey",
    currency: "USDC",
    minPrice: 5000.0,
    commitCount: 4180,
    status: 'active',
    commitEnd: getTimeFromNow(5),
    revealEnd: getTimeFromNow(10),
    winner: '0xAbCd...1234',
    winningBid: 5500.0,
  },
  {
    id: 2,
    title: "Bored Ape Yacht Club #5678",
    description: "황금 털을 가진 BAYC NFT입니다.",
    imageUrl: "https://via.placeholder.com/400x400.png?text=BAYC",
    imageUrls: ["https://via.placeholder.com/400x400.png?text=BAYC"],
    chain: "Polygon",
    owner: '0xCreator...abcd',
    rule: "first_price",
    currency: "USDT",
    minPrice: 10000.0,
    commitCount: 123,
    status: 'ended',
    commitEnd: getTimeFromNow(-10),
    revealEnd: getTimeFromNow(-5),
    winner: '0xWinner...WXYZ',
    winningBid: 15500.0,
  }
];