import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PerformanceMetrics } from "@/components/PerformanceMetrics";
import { AuctionInterface } from "@/components/AuctionInterface";
import { ArrowRight, Zap, Shield, Globe, Cpu, EyeOff, FileLock, UserCheck, TrafficCone, ShieldCheck, Fingerprint, Calculator, Recycle, Eye, HelpCircle, Network, Trophy, Vote, Users, TrendingUp, CandlestickChart, Gamepad2, ShoppingCart, Landmark, Building, Briefcase, LandPlot } from "lucide-react";
import heroImage from "@/assets/zk-auction-hero.jpg";

const FeatureCard = ({ icon: Icon, title, description }: {
  icon: any;
  title: string;
  description: React.ReactNode;
}) => (
  <Card className="p-8 bg-card border-border hover:bg-card-hover transition-all duration-300 hover:glow-effect group h-full">
    <div className="mb-4">
      <Icon className="h-12 w-12 text-primary group-hover:text-accent transition-colors duration-300" />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <div className="text-muted-foreground">{description}</div>
  </Card>
);

const VisionCard = ({ step, icon: Icon, title, description, how }: {
  step: number;
  icon: any;
  title: string;
  description: string;
  how: string;
}) => (
    <div className="relative pl-12">
        <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl ring-8 ring-background">
            {step}
        </div>
        <div className="pl-4">
            <div className="flex items-center gap-4 mb-2">
                <Icon className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-bold">{title}</h3>
            </div>
            <p className="text-muted-foreground mb-3">{description}</p>
            <p className="text-sm bg-muted text-muted-foreground p-3 rounded-lg"><span className="font-bold text-foreground">How:</span> {how}</p>
        </div>
    </div>
);


const Index = () => {
  return (
    <div className="min-h-screen bg-background h-screen snap-y snap-mandatory overflow-y-scroll">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
              <span className="text-xl font-bold">Aligned ZK Auctions</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#auctions" className="text-muted-foreground hover:text-foreground transition-colors">
                Live Auctions
              </a>
              <a href="#docs" className="text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </a>
              <Link to="/app">
                <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">
                  Launch App
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 min-h-screen flex items-center snap-start">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20 animate-pulse">
                  Powered by Aligned Layer
                </Badge>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="performance-text">30,000 Proofs</span>
                  <br />
                  <span className="text-foreground">1 Second</span>
                  <br />
                  <span className="text-accent">Any Chain</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  The first ZK auction platform that processes 30,000 sealed bids in under a second,
                  with native cross-chain support and Rust-powered smart auctions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/app">
                  <Button size="lg" className="bg-primary hover:bg-primary-dark text-primary-foreground group">
                    Start Bidding
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-border hover:bg-card">
                  View Demo
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                <div>
                  <div className="text-3xl font-bold performance-text">180x</div>
                  <div className="text-sm text-muted-foreground">Faster Processing</div>
                </div>
                <div>
                  <div className="text-3xl font-bold performance-text">99%</div>
                  <div className="text-sm text-muted-foreground">Cost Reduction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold performance-text">∞</div>
                  <div className="text-sm text-muted-foreground">Chain Support</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-3xl blur-3xl"></div>
              <img
                src={heroImage}
                alt="ZK Auction Platform"
                className="relative rounded-3xl border border-border shadow-card floating"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="problem" className="py-20 px-6 bg-muted/20 min-h-screen flex items-center snap-start">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              The <span className="text-accent">Problem</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Traditional auction methods have inherent limitations in trust, fairness, and scalability.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={EyeOff}
              title="Blockchain Hyper-Transparency"
              description="All bid details are public, compromising participant privacy and exposing strategic information."
            />
            <FeatureCard
              icon={FileLock}
              title="Strategic Information Leakage"
              description={<>
                Competitors can see bids and adjust their own, leading to unfair practices:
                <ul className="mt-2 list-disc list-inside text-left text-sm space-y-1">
                  <li>Price Inflation</li>
                  <li>Collusion</li>
                  <li>Shill Bidding</li>
                  <li>Front-running</li>
                </ul>
              </>}
            />
            <FeatureCard
              icon={UserCheck}
              title="Reliance on Centralized Trust"
              description="Fairness and transparency depend on a central operator, creating risks of manipulation and collusion."
            />
            <FeatureCard
              icon={TrafficCone}
              title="Throughput Bottlenecks"
              description="Limited capacity to process numerous concurrent bids makes it difficult to conduct large-scale auctions efficiently."
            />
          </div>
        </div>
      </section>

      {/* ZK & Blockchain Synergy Section */}
      <section id="synergy" className="py-20 px-6 bg-background min-h-screen flex items-center snap-start">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Why did 40-year-old ZK tech become crucial after meeting blockchain?
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              A perfect match: ZK proofs and blockchain solve each other's inherent limitations, unlocking unprecedented capabilities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 bg-card border-destructive/50">
              <h3 className="text-2xl font-bold mb-4 text-destructive-foreground flex items-center gap-3"><Eye className="text-destructive" /> Blockchain's Dilemma: Radical Transparency</h3>
              <p className="text-muted-foreground">Every transaction is public. This is a critical barrier for businesses and users who require privacy for financial transactions, strategic actions, and personal data.</p>
            </Card>
            <Card className="p-8 bg-card border-success/50">
              <h3 className="text-2xl font-bold mb-4 text-success flex items-center gap-3"><ShieldCheck className="text-success" /> ZK's Answer: Verifiable Privacy</h3>
              <p className="text-muted-foreground">Zero-Knowledge Proofs allow verification of computations without revealing the underlying data. This enables private transactions on a public ledger, solving blockchain's privacy problem.</p>
            </Card>
            <Card className="p-8 bg-card border-destructive/50">
              <h3 className="text-2xl font-bold mb-4 text-destructive-foreground flex items-center gap-3"><HelpCircle className="text-destructive" /> ZK's Dilemma: The Trust Anchor</h3>
              <p className="text-muted-foreground">A ZK proof is just a piece of data. For it to be useful, it needs a universally trusted platform to be published and verified. Who do you trust to verify the proof?</p>
            </Card>
            <Card className="p-8 bg-card border-success/50">
              <h3 className="text-2xl font-bold mb-4 text-success flex items-center gap-3"><Network className="text-success" /> Blockchain's Answer: Trustless Verification</h3>
              <p className="text-muted-foreground">Blockchains provide a decentralized, trustless, and immutable platform. A smart contract can act as a universal verifier for ZK proofs that anyone can trust without relying on a central party.</p>
            </Card>
          </div>
        </div>
      </section>
      
      {/* The Solution Section */}
      <section id="solution" className="py-20 px-6 min-h-screen flex items-center snap-start">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Our <span className="performance-text">Solution</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The ZK Sealed-Bid Auction solves the problems of traditional auctions and introduces a new paradigm.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Fingerprint}
              title="On-Chain Verification"
              description="All bids are verified on-chain, ensuring transparency and trust while preventing any possibility of manipulation."
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Confidential Bidding"
              description="Zero-Knowledge Proofs keep bidder amounts completely private, protecting user privacy."
            />
            <FeatureCard
              icon={Calculator}
              title="Operatorless & Fair"
              description="The entire process is automated by smart contracts, guaranteeing mathematical fairness without a central operator."
            />
            <FeatureCard
              icon={Recycle}
              title="Automated Settlement"
              description="If a winner fails to pay, their deposit is automatically redistributed to all other bidders, enhancing reliability and incentivizing fair play."
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 px-6 min-h-screen flex items-center snap-start">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="performance-text">Aligned Layer</span> Changes Everything
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The only ZK infrastructure that can handle enterprise-scale auctions with mathematical security
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Zap}
              title="Lightning Speed"
              description="30,000 proofs per block vs industry standard of 180. Experience auctions at the speed of thought."
            />
            <FeatureCard
              icon={Shield}
              title="Dual Security"
              description="Fast verification with EigenLayer security, final settlement with L1 mathematical guarantees."
            />
            <FeatureCard
              icon={Globe}
              title="Universal Cross-Chain"
              description="One ZK proof validates across all chains. Bid on Ethereum from Polygon, settle on your preferred chain."
            />
            <FeatureCard
              icon={Cpu}
              title="Rust Native"
              description="Build complex auction algorithms with SP1/Risc0. No circuit constraints, pure computational freedom."
            />
          </div>
        </div>
      </section>


      {/* Performance Metrics */}
      <section className="py-20 px-6 snap-start">
      <PerformanceMetrics />
      </section>


      {/* Live Auctions */}
      <section id="auctions" className="snap-start">
        <AuctionInterface />
      </section>

            
      {/* Real-World Applications Section */}
      <section id="applications" className="py-20 px-6 bg-muted/20 min-h-screen flex items-center snap-start">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Real-World <span className="text-accent">Applications</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our blind auction platform can be applied to various industries to ensure fairness and transparency.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Gamepad2}
              title="Gaming & NFTs"
              description={<>
                <p className="mb-2">Fairly distribute rare digital items or characters through a sealed-bid process.</p>
                <p className="text-sm text-primary">Benefits: Prevents insider trading, ensures equal opportunity, increases user trust.</p>
              </>}
            />
            <FeatureCard
              icon={ShoppingCart}
              title="Second-hand Markets"
              description={<>
                <p className="mb-2">Allow users to privately bid on unique or high-value second-hand goods.</p>
                <p className="text-sm text-primary">Benefits: Maximizes seller profit, protects buyer privacy, eliminates bid sniping.</p>
              </>}
            />
            <FeatureCard
              icon={Landmark}
              title="DeFi & Finance"
              description={<>
                <p className="mb-2">Execute collateral auctions for liquidations without revealing strategies to the public.</p>
                <p className="text-sm text-primary">Benefits: Reduces market manipulation, protects bidders from front-running, stabilizes protocols.</p>
              </>}
            />
            <FeatureCard
              icon={Building}
              title="IPO Stock Allocation"
              description={<>
                <p className="mb-2">Allocate shares to institutional and retail investors based on privately submitted bids.</p>
                <p className="text-sm text-primary">Benefits: Fair price discovery, equal access, transparent and auditable allocation.</p>
              </>}
            />
            <FeatureCard
              icon={LandPlot}
              title="Real Estate PF"
              description={<>
                <p className="mb-2">Allow multiple investors to confidentially bid on shares of a real estate project financing deal.</p>
                <p className="text-sm text-primary">Benefits: Protects investor privacy, prevents collusion, ensures market-driven valuations.</p>
              </>}
            />
            <FeatureCard
              icon={Briefcase}
              title="Government Bidding"
              description={<>
                <p className="mb-2">Manage public sector procurement and tenders with verifiable confidentiality and fairness.</p>
                <p className="text-sm text-primary">Benefits: Prevents corruption and bribery, increases public trust, ensures fair competition.</p>
              </>}
            />
          </div>
        </div>
      </section>

      {/* The Vision Section */}
      <section id="vision" className="py-20 px-6 min-h-screen flex items-center snap-start">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">From Auction to a Universal Proving Infrastructure</h2>
                <p className="text-xl text-muted-foreground">Our blind auction is just the beginning. The core logic can be extended to various applications.</p>
            </div>
            <div className="space-y-12 relative border-l-2 border-dashed border-primary/50 ml-6">
                <VisionCard
                    step={1}
                    icon={Trophy}
                    title="ZK Blind Auction (Current)"
                    description="Our starting point: a secure and scalable auction system that protects user privacy and ensures fair outcomes."
                    how="A single winner is determined based on the highest sealed bid, all verified with ZK proofs."
                />
                <VisionCard
                    step={2}
                    icon={Vote}
                    title="Private Governance (DAO Voting)"
                    description="Enable private and coercion-resistant voting for decentralized autonomous organizations."
                    how="An auction's logic can be modified to have multiple 'winners.' Instead of one highest bidder, all who 'bid' (vote) for a specific proposal are counted, with their choice remaining private."
                />
                <VisionCard
                    step={3}
                    icon={Users}
                    title="Public Goods Funding (Quadratic Funding)"
                    description="A more democratic way to fund public goods, where the number of contributors matters more than the total amount funded."
                    how="Think of it as an auction where projects are 'items' and contributions are 'bids'. Instead of one winner, the projects with the broadest support (most individual bidders) win the largest matching funds. Our ZK system proves the result is fair without revealing who contributed what."
                />
                <VisionCard
                    step={4}
                    icon={TrendingUp}
                    title="Prediction Markets"
                    description="Create markets for future events where users can bet on outcomes without revealing their positions."
                    how="An auction where participants bid on the probability of an event. The 'winning' bids are those that correctly predict the outcome. The sealed-bid nature prevents early bets from influencing later ones."
                />
                <VisionCard
                    step={5}
                    icon={CandlestickChart}
                    title="Fully Anonymous DEX / MEV-Resistant DEX (Batch Auctions)"
                    description="A decentralized exchange that is resistant to Miner Extractable Value (MEV) by executing trades in batches."
                    how="Instead of 'first come, first served', all trades within a block are collected and settled at one uniform price. This batching neutralizes the speed advantage, making front-running impossible. ZK proofs can further enhance this by keeping orders confidential until settlement."
                />
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 snap-start">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-12 bg-gradient-primary text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Experience the Future of Auctions?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join the revolution in sealed-bid auctions. Scale without limits,
                verify instantly, and auction across any blockchain.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/app">
                  <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-white/90">
                    Launch Platform
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Read Documentation
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border snap-start">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
                <span className="text-xl font-bold">Aligned ZK Auctions</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Powered by Aligned Layer's revolutionary ZK infrastructure.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Live Auctions</div>
                <div>Create Auction</div>
                <div>Analytics</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Developers</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Documentation</div>
                <div>SDK</div>
                <div>API Reference</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Discord</div>
                <div>Twitter</div>
                <div>GitHub</div>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 Aligned ZK Auctions. Built on Aligned Layer.
          </div>
          <div> github :
          <a
            href="https://github.com/FullTimeScam/Aligned-ZK-Auctions"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline border-t border-border mt-8 pt-8 text-center text-sm"
          >
            https://github.com/FullTimeScam/Aligned-ZK-Auctions
          </a>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default Index;