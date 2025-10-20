import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Loader2, Wallet, Star, Zap, Shield, Clock } from "lucide-react";
import { useWalletAuth } from "@/hooks/use-wallet-auth";
import { products, Product } from "@/data/products";
import { ConnectPrompt } from "@/components/ConnectPrompt";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'full' | 'partial'>('full');
  const [customAmount, setCustomAmount] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { address, isWalletAuthenticated } = useWalletAuth();

  // Allow viewing products without wallet connection
  // Only require connection for purchase attempts

  useEffect(() => {
    const fetchProduct = () => {
      if (!id) return;

      const foundProduct = products.find(p => p.id === id);
      
      if (!foundProduct) {
        toast({
          title: "Product Not Found",
          description: "The requested product could not be found",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setProduct(foundProduct);
      setIsLoading(false);
    };

    fetchProduct();
  }, [id, navigate, toast]);

  const handleWeb3Purchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !isWalletAuthenticated) return;

    const finalPrice = product.discount 
      ? product.price * (1 - product.discount / 100) 
      : product.price;

    const purchaseAmount = paymentMethod === 'full' 
      ? finalPrice 
      : parseFloat(customAmount);

    if (paymentMethod === 'partial') {
      if (isNaN(purchaseAmount) || purchaseAmount <= 0) {
        toast({
          title: "Invalid amount",
          description: "Please enter a valid amount",
          variant: "destructive",
        });
        return;
      }

      if (purchaseAmount > finalPrice) {
        toast({
          title: "Amount too high",
          description: `Maximum amount is $${finalPrice.toFixed(2)}`,
          variant: "destructive",
        });
        return;
      }
    }

    setIsProcessing(true);

    try {
      // Simulate Web3 payment processing
      toast({
        title: "Processing Payment",
        description: "Please confirm the transaction in your Base Wallet...",
      });

      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      const isFullPayment = purchaseAmount >= finalPrice;

      toast({
        title: isFullPayment ? "Purchase Complete! 🎉" : "Payment Successful! 💰",
        description: isFullPayment 
          ? `Successfully purchased ${product.name} for $${purchaseAmount.toFixed(2)}`
          : `Successfully paid $${purchaseAmount.toFixed(2)} towards ${product.name}`,
      });

      // Redirect to dashboard after successful payment
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      
      setCustomAmount("");
    } catch (error: any) {
      console.error("Error processing payment:", error);
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!product) return null;

  const finalPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;
  const savings = product.discount ? product.price - finalPrice : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-secondary/20">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 hover:bg-primary/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image and Info */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 shadow-2xl">
              {product.popular && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                    <Star className="h-3 w-3 mr-1" />
                    Popular
                  </Badge>
                </div>
              )}
              
              {product.discount && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-lg px-3 py-1">
                    -{product.discount}% OFF
                  </Badge>
                </div>
              )}

              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  What's Included
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details and Purchase */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-3 capitalize">
                {product.category}
              </Badge>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {product.name}
              </h1>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Pricing */}
              <div className="flex items-center gap-4 mb-6">
                {product.discount ? (
                  <>
                    <span className="text-4xl font-bold text-primary">
                      ${finalPrice.toFixed(2)}
                    </span>
                    <span className="text-2xl text-muted-foreground line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      Save ${savings.toFixed(2)}
                    </Badge>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Purchase Options */}
            {isWalletAuthenticated ? (
              <Card className="border-2 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Purchase with Base Wallet
                  </CardTitle>
                  <CardDescription>
                    Connected to {address?.slice(0, 6)}...{address?.slice(-4)}
                  </CardDescription>
                </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Method Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Payment Options</Label>
                  <div className="grid gap-3">
                    <div 
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === 'full' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setPaymentMethod('full')}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Full Payment</p>
                          <p className="text-sm text-muted-foreground">
                            Pay the complete amount and we'll ship your order
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">${finalPrice.toFixed(2)}</p>
                          {product.discount && (
                            <p className="text-xs text-green-600">Best Value!</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div 
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === 'partial' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setPaymentMethod('partial')}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Partial Payment</p>
                          <p className="text-sm text-muted-foreground">
                            Pay any amount towards this product
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">Custom</p>
                          <p className="text-xs text-blue-600">Flexible</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Custom Amount Input */}
                {paymentMethod === 'partial' && (
                  <div className="space-y-2">
                    <Label htmlFor="customAmount">Custom Amount ($)</Label>
                    <Input
                      id="customAmount"
                      type="number"
                      step="0.01"
                      min="1"
                      max={finalPrice}
                      placeholder={`Enter amount (max: $${finalPrice.toFixed(2)})`}
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      required
                    />
                  </div>
                )}

                {/* Security Features */}
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Secure Payment</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Fast shipping
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Blockchain secured
                    </div>
                  </div>
                </div>

                <form onSubmit={handleWeb3Purchase}>
                  <Button
                    type="submit"
                    className="w-full h-12 text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300"
                    disabled={isProcessing || !isWalletAuthenticated}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Wallet className="mr-2 h-5 w-5" />
                        {paymentMethod === 'full' 
                          ? `Purchase for $${finalPrice.toFixed(2)}` 
                          : 'Make Payment'
                        }
                      </>
                    )}
                  </Button>
                </form>

              </CardContent>
              </Card>
            ) : (
              <ConnectPrompt 
                title="Connect to Purchase"
                description={`Connect your Base Wallet to purchase ${product.name} securely on the blockchain`}
                actionText="Connect & Buy Now"
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;