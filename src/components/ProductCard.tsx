import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Star, Zap, Eye } from "lucide-react";
import { Product } from "@/data/products";
import { useWalletAuth } from "@/hooks/use-wallet-auth";

interface ProductCardProps extends Product {
  // Optional props for backward compatibility
  imageUrl?: string;
  stock?: number;
}

const ProductCard = ({ 
  id, 
  name, 
  description, 
  price, 
  image_url, 
  category, 
  features = [], // Default to empty array
  popular = false, // Default to false
  discount,
  imageUrl, // Backward compatibility
  stock // Backward compatibility
}: ProductCardProps) => {
  const navigate = useNavigate();
  const { isWalletAuthenticated } = useWalletAuth();

  const handleViewProduct = () => {
    navigate(`/product/${id}`);
  };

  const handleQuickPurchase = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    if (!isWalletAuthenticated) {
      navigate("/auth");
      return;
    }
    navigate(`/product/${id}`);
  };

  const discountedPrice = discount ? price * (1 - discount / 100) : price;
  const savings = discount ? price - discountedPrice : 0;

  return (
    <Card 
      className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card to-card/80 relative cursor-pointer"
      onClick={handleViewProduct}
    >
      {popular && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
            <Star className="h-3 w-3 mr-1" />
            Popular
          </Badge>
        </div>
      )}
      
      {discount && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
            -{discount}%
          </Badge>
        </div>
      )}

      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 relative">
        <img
          src={image_url || imageUrl || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="outline" className="text-xs capitalize">
            {category || 'general'}
          </Badge>
        </div>
        
        <CardTitle className="text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors">
          {name}
        </CardTitle>
        
        <CardDescription className="line-clamp-2 text-sm leading-relaxed">
          {description}
        </CardDescription>

        <div className="flex flex-wrap gap-1 mt-2">
          {features && features.slice(0, 2).map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              <Zap className="h-2 w-2 mr-1" />
              {feature}
            </Badge>
          ))}
          {features && features.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{features.length - 2} more
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {discount ? (
                <>
                  <p className="text-2xl font-bold text-primary">
                    ${discountedPrice.toFixed(2)}
                  </p>
                  <p className="text-lg text-muted-foreground line-through">
                    ${price.toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="text-2xl font-bold text-primary">
                  ${price.toFixed(2)}
                </p>
              )}
            </div>
            {discount && (
              <p className="text-xs text-green-600 font-medium">
                Save ${savings.toFixed(2)}
              </p>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleViewProduct}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button 
              onClick={handleQuickPurchase}
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {isWalletAuthenticated ? 'Buy' : 'Connect'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;