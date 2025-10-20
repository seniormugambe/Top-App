import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BaseWalletConnect } from "@/components/BaseWalletConnect";
import { useWalletAuth } from "@/hooks/use-wallet-auth";
import { useAuthReturn } from "@/components/RouteGuard";
import { Shield, Zap, Globe, ArrowRight, Sparkles } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { address, isWalletAuthenticated, isConnected } = useWalletAuth();
  const { handleAuthSuccess } = useAuthReturn();
  const [redirectCountdown, setRedirectCountdown] = useState(0);

  // Check if there's a return URL
  const params = new URLSearchParams(location.search);
  const returnTo = params.get('returnTo');

  // Handle Base Wallet connection and redirect
  useEffect(() => {
    if (isWalletAuthenticated && address) {
      toast({
        title: "Base Wallet Connected! 🎉",
        description: `Welcome! Connected with ${address.slice(0, 6)}...${address.slice(-4)}`,
      });
      
      // Start countdown
      setRedirectCountdown(3);
      const interval = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleAuthSuccess();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isWalletAuthenticated, address, toast, navigate]);

  const features = [
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Blockchain-secured transactions with no credit card required"
    },
    {
      icon: Zap,
      title: "Fast Checkout",
      description: "Quick ETH payments with instant confirmation"
    },
    {
      icon: Globe,
      title: "Global Shipping",
      description: "Worldwide delivery with decentralized payment processing"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-secondary/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center space-y-6 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Web3 Authentication
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Welcome to TopUp Shop
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The future of e-commerce. Connect your Base Wallet to shop premium physical products with blockchain security.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Connection Card */}
          <div className="w-full lg:w-1/2 space-y-6">
            <BaseWalletConnect />
            
            {/* Redirect Notice */}
            {redirectCountdown > 0 && (
              <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-sm text-green-700 dark:text-green-300">
                      {returnTo 
                        ? `Redirecting back in ${redirectCountdown} seconds...`
                        : `Redirecting to shop in ${redirectCountdown} seconds...`
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            {isConnected && (
              <div className="space-y-3">
                <Button 
                  onClick={handleAuthSuccess}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  {returnTo ? 'Continue' : 'Continue to Shop'}
                </Button>
                <Button 
                  onClick={() => navigate("/dashboard")}
                  variant="outline"
                  className="w-full"
                >
                  Go to Dashboard
                </Button>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Why Choose Web3?</h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Network Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Supported Networks</CardTitle>
                <CardDescription>
                  Connect to any of these Base networks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div>
                    <p className="font-medium">Base Mainnet</p>
                    <p className="text-sm text-muted-foreground">Production network</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                    Recommended
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <div>
                    <p className="font-medium">Base Sepolia</p>
                    <p className="text-sm text-muted-foreground">Test network</p>
                  </div>
                  <Badge variant="outline">
                    Testnet
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
