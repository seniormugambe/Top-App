import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Loader2, ShoppingBag } from "lucide-react";
import { User } from "@supabase/supabase-js";

interface TopUpWithProduct {
  id: string;
  amount_paid: number;
  status: string;
  created_at: string;
  products: {
    id: string;
    name: string;
    price: number;
    image_url: string | null;
  };
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [topUps, setTopUps] = useState<TopUpWithProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
    const fetchTopUps = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("user_topups")
        .select(`
          *,
          products (
            id,
            name,
            price,
            image_url
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching top-ups:", error);
      } else {
        setTopUps(data || []);
      }
      setIsLoading(false);
    };

    fetchTopUps();
  }, [user]);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            My Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your top-up progress and purchases
          </p>
        </div>

        {topUps.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent className="space-y-4">
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
              <div>
                <h3 className="text-xl font-semibold mb-2">No top-ups yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start shopping to begin your top-up journey
                </p>
                <Button onClick={() => navigate("/")}>
                  Browse Products
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {topUps.map((topUp) => {
              const progress = (Number(topUp.amount_paid) / Number(topUp.products.price)) * 100;
              const remaining = Number(topUp.products.price) - Number(topUp.amount_paid);

              return (
                <Card key={topUp.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-48 h-48 bg-muted">
                      <img
                        src={topUp.products.image_url || ""}
                        alt={topUp.products.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{topUp.products.name}</CardTitle>
                            <CardDescription>
                              Started on {new Date(topUp.created_at).toLocaleDateString()}
                            </CardDescription>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              topUp.status === "completed"
                                ? "bg-success/10 text-success"
                                : topUp.status === "cancelled"
                                ? "bg-destructive/10 text-destructive"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            {topUp.status === "in_progress" ? "In Progress" : topUp.status.charAt(0).toUpperCase() + topUp.status.slice(1)}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-semibold">{progress.toFixed(1)}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                          <div className="flex justify-between text-sm">
                            <span className="font-medium text-success">
                              ${Number(topUp.amount_paid).toFixed(2)} paid
                            </span>
                            <span className="font-medium text-muted-foreground">
                              {topUp.status === "completed" 
                                ? "Completed!" 
                                : `$${remaining.toFixed(2)} remaining`}
                            </span>
                          </div>
                        </div>
                        {topUp.status === "in_progress" && (
                          <Button
                            onClick={() => navigate(`/product/${topUp.products.id}`)}
                            className="w-full md:w-auto"
                          >
                            Continue Top-Up
                          </Button>
                        )}
                      </CardContent>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
