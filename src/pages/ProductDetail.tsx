import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Loader2, Plus } from "lucide-react";
import { User } from "@supabase/supabase-js";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  stock: number;
}

interface TopUp {
  id: string;
  amount_paid: number;
  status: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [topUp, setTopUp] = useState<TopUp | null>(null);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id || !user) return;

      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (productError) {
        console.error("Error fetching product:", productError);
        toast({
          title: "Error",
          description: "Failed to load product details",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setProduct(productData);

      const { data: topUpData } = await supabase
        .from("user_topups")
        .select("*")
        .eq("product_id", id)
        .eq("user_id", user.id)
        .eq("status", "in_progress")
        .maybeSingle();

      setTopUp(topUpData);
      setIsLoading(false);
    };

    fetchData();
  }, [id, user, navigate, toast]);

  const handleTopUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !user) return;

    const topUpAmount = parseFloat(amount);
    if (isNaN(topUpAmount) || topUpAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      if (!topUp) {
        const { data, error } = await supabase
          .from("user_topups")
          .insert({
            user_id: user.id,
            product_id: product.id,
            amount_paid: topUpAmount,
            status: "in_progress",
          })
          .select()
          .single();

        if (error) throw error;
        setTopUp(data);
      } else {
        const newAmount = Number(topUp.amount_paid) + topUpAmount;
        const newStatus = newAmount >= product.price ? "completed" : "in_progress";

        const { data, error } = await supabase
          .from("user_topups")
          .update({
            amount_paid: newAmount,
            status: newStatus,
          })
          .eq("id", topUp.id)
          .select()
          .single();

        if (error) throw error;
        setTopUp(data);

        if (newStatus === "completed") {
          toast({
            title: "Congratulations! 🎉",
            description: "You've completed your top-up! Your order will be processed.",
          });
          setTimeout(() => navigate("/dashboard"), 2000);
        }
      }

      toast({
        title: "Top-up successful",
        description: `Added $${topUpAmount.toFixed(2)} to your purchase`,
      });
      setAmount("");
    } catch (error: any) {
      console.error("Error processing top-up:", error);
      toast({
        title: "Error",
        description: error.message,
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

  const amountPaid = Number(topUp?.amount_paid || 0);
  const progress = (amountPaid / product.price) * 100;
  const remaining = product.price - amountPaid;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-muted shadow-lg">
              <img
                src={product.image_url || ""}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground text-lg">{product.description}</p>
              <div className="mt-4">
                <span className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</span>
              </div>
            </div>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Your Top-Up Progress</CardTitle>
                <CardDescription>
                  Track your payment progress towards this purchase
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-success">${amountPaid.toFixed(2)} paid</span>
                    <span className="font-medium text-muted-foreground">${remaining.toFixed(2)} remaining</span>
                  </div>
                </div>

                <form onSubmit={handleTopUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Add Amount ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isProcessing || progress >= 100}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Top-Up
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
