import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PerformanceMetrics } from "@/components/PerformanceMetrics";
import { AuctionInterface } from "@/components/AuctionInterface";
import { ArrowRight, Zap, Shield, Globe, Cpu } from "lucide-react";
import heroImage from "@/assets/zk-auction-hero.jpg";

const FeatureCard = ({ icon: Icon, title, description }: { 
  icon: any; 
  title: string; 
  description: string; 
}) => (
  <Card className="p-8 bg-card border-border hover:bg-card-hover transition-all duration-300 hover:glow-effect group">
    <div className="mb-4">
      <Icon className="h-12 w-12 text-primary group-hover:text-accent transition-colors duration-300" />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </Card>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
              <span className="text-xl font-bold">ZK Auctions</span>
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
              <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">
                Launch App
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 min-h-screen flex items-center">
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
                <Button size="lg" className="bg-primary hover:bg-primary-dark text-primary-foreground group">
                  Start Bidding
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
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

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why <span className="performance-text">Aligned Layer</span> Changes Everything
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
      <PerformanceMetrics />

      {/* Live Auctions */}
      <div id="auctions">
        <AuctionInterface />
      </div>

      {/* CTA Section */}
      <section className="py-20 px-6">
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
                <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-white/90">
                  Launch Platform
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Read Documentation
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
                <span className="text-xl font-bold">ZK Auctions</span>
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
            © 2024 ZK Auctions. Built on Aligned Layer.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;