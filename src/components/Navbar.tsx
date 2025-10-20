import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ShoppingBag, User, LogOut, Wallet } from "lucide-react";
import { useWalletAuth } from "@/hooks/use-wallet-auth";

const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { address, isWalletAuthenticated, signOut: walletSignOut } = useWalletAuth();

  const handleLogout = () => {
    walletSignOut();
    toast({
      title: "Wallet Disconnected",
      description: "You've been successfully logged out.",
    });
    navigate("/auth");
  };

  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            TopUp Shop
          </span>
        </Link>
        
        <div className="flex items-center gap-2">
          {/* Show wallet address if connected */}
          {isWalletAuthenticated && address && (
            <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-md border border-green-200 dark:border-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <Wallet className="h-4 w-4 text-green-600" />
              <span className="text-sm font-mono text-green-700 dark:text-green-300">
                {`${address.slice(0, 6)}...${address.slice(-4)}`}
              </span>
            </div>
          )}
          
          {isWalletAuthenticated ? (
            <>
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                <User className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Disconnect
              </Button>
            </>
          ) : (
            <Button onClick={() => navigate("/auth")}>
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
