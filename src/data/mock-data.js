// src/data/mock-data.js

const getTimeFromNow = (minutes) => {
  return new Date(Date.now() + minutes * 60 * 1000);
};

export const mockAuctions = [
  {
    id: 1,
    title: "CryptoPunk #1234",
    description: "희귀한 좀비 크립토펑크입니다.",
    imageUrl: "https://github.com/FullTimeScam/aligned-auction-forge/blob/a506c21a748d659981fe6dbd2d2bc66ac0fc7947/public/FullTimeScam.jpg?raw=true",
    imageUrls: [
      "https://github.com/FullTimeScam/aligned-auction-forge/blob/a506c21a748d659981fe6dbd2d2bc66ac0fc7947/public/FullTimeScam.jpg?raw=true",
      "https://github.com/FullTimeScam/aligned-auction-forge/blob/a506c21a748d659981fe6dbd2d2bc66ac0fc7947/public/FullTimeScam.jpg?raw=true",
      "https://github.com/FullTimeScam/aligned-auction-forge/blob/a506c21a748d659981fe6dbd2d2bc66ac0fc7947/public/FullTimeScam.jpg?raw=true",
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
    imageUrl: "https://github.com/FullTimeScam/aligned-auction-forge/blob/a506c21a748d659981fe6dbd2d2bc66ac0fc7947/public/FullTimeScam.jpg?raw=true",
    imageUrls: ["https://github.com/FullTimeScam/aligned-auction-forge/blob/a506c21a748d659981fe6dbd2d2bc66ac0fc7947/public/FullTimeScam.jpg?raw=true"],
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