import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import { ShoppingBag } from "lucide-react";
import { Web3Transaction } from "@/components/Web3Transaction";
import { BaseWalletConnect } from "@/components/BaseWalletConnect";
import { RouteGuard } from "@/components/RouteGuard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <RouteGuard requireAuth={true}>
      <DashboardContent navigate={navigate} />
    </RouteGuard>
  );
};

const DashboardContent = ({ navigate }: { navigate: any }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            My Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your orders, manage your wallet, and view transaction history
          </p>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="wallet">Base Wallet</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="wallet" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <BaseWalletConnect />
              <Card>
                <CardHeader>
                  <CardTitle>Base Network Info</CardTitle>
                  <CardDescription>
                    You're connected to the Base blockchain network
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Network:</span>
                    <span className="font-medium">Base</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Chain ID:</span>
                    <span className="font-medium">8453</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Currency:</span>
                    <span className="font-medium">ETH</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Web3Transaction />
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card className="text-center py-12">
              <CardContent className="space-y-4">
                <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start shopping to see your order history and tracking information
                  </p>
                  <Button onClick={() => navigate("/")}>
                    Browse Products
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;