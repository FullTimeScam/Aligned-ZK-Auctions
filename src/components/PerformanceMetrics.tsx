import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  badge?: string;
  gradient?: boolean;
}

const MetricCard = ({ title, value, subtitle, badge, gradient = false }: MetricCardProps) => (
  <Card className={`p-6 bg-card border-border hover:bg-card-hover transition-all duration-300 ${gradient ? 'glow-effect' : ''}`}>
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      {badge && (
        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
          {badge}
        </Badge>
      )}
    </div>
    <div className={`text-3xl font-bold mb-1 ${gradient ? 'performance-text' : 'text-foreground'}`}>
      {value}
    </div>
    {subtitle && (
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    )}
  </Card>
);

export const PerformanceMetrics = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="performance-text">Performance That Redefines</span> Auctions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Aligned Layer's revolutionary infrastructure enables unprecedented scale and speed
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard
            title="Proof Processing"
            value="30,000"
            subtitle="proofs per block"
            badge="180x faster"
            gradient
          />
          <MetricCard
            title="Verification Speed"
            value="< 1s"
            subtitle="instant confirmation"
            badge="Real-time"
            gradient
          />
          <MetricCard
            title="Gas Cost"
            value="2,100"
            subtitle="gas per proof"
            badge="99% reduction"
            gradient
          />
          <MetricCard
            title="Cross-Chain"
            value="∞"
            subtitle="supported chains"
            badge="Universal"
            gradient
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-8 bg-card border-border col-span-1 lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Dual-Mode Security</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-accent animate-pulse"></div>
                <div>
                  <h4 className="font-semibold text-accent">Fast Mode - Verification Layer</h4>
                  <p className="text-sm text-muted-foreground">Instant bid validation with EigenLayer security</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <div>
                  <h4 className="font-semibold text-primary">Secure Mode - Aggregation Layer</h4>
                  <p className="text-sm text-muted-foreground">Final settlement with L1 mathematical security</p>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="p-8 bg-gradient-primary text-primary-foreground">
            <h3 className="text-2xl font-bold mb-4">Rust Native</h3>
            <p className="text-sm opacity-90 mb-4">
              Build complex auction algorithms with SP1/Risc0 support
            </p>
            <div className="text-lg font-mono bg-black/20 p-3 rounded">
              fn optimize_allocation() → ZKProof
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};