import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, TrendingUp, Sparkles } from "lucide-react";
import { products, productCategories } from "@/data/products";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'popular' | 'discount'>('popular');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.features.some(feature => 
          feature.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.discount ? a.price * (1 - a.discount / 100) : a.price) - 
                 (b.discount ? b.price * (1 - b.discount / 100) : b.price);
        case 'price-high':
          return (b.discount ? b.price * (1 - b.discount / 100) : b.price) - 
                 (a.discount ? a.price * (1 - a.discount / 100) : a.price);
        case 'popular':
          return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
        case 'discount':
          return (b.discount || 0) - (a.discount || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, searchQuery, sortBy]);

  const popularProducts = products.filter(product => product.popular);
  const discountedProducts = products.filter(product => product.discount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-secondary/20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Web3 Digital Marketplace
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Premium Products
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Shop premium physical products with your Base Wallet. 
              Secure payments, fast shipping, quality guaranteed.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        {/* Featured Sections */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Popular Products */}
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200 dark:border-orange-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                <h2 className="text-xl font-bold text-orange-900 dark:text-orange-100">
                  Popular This Week
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {popularProducts.slice(0, 4).map((product) => (
                  <div key={product.id} className="text-sm">
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-orange-600 font-bold">${product.price}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Discounted Products */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-green-600" />
                <h2 className="text-xl font-bold text-green-900 dark:text-green-100">
                  Special Offers
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {discountedProducts.slice(0, 4).map((product) => (
                  <div key={product.id} className="text-sm">
                    <p className="font-medium truncate">{product.name}</p>
                    <div className="flex items-center gap-1">
                      <p className="text-green-600 font-bold">
                        ${(product.price * (1 - (product.discount || 0) / 100)).toFixed(2)}
                      </p>
                      <Badge className="bg-green-600 text-white text-xs">
                        -{product.discount}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="space-y-6 mb-8">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products, features, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className="rounded-full"
            >
              All Products
            </Button>
            {productCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full"
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center justify-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <div className="flex gap-1">
              {[
                { key: 'popular', label: 'Popular' },
                { key: 'price-low', label: 'Price: Low to High' },
                { key: 'price-high', label: 'Price: High to Low' },
                { key: 'discount', label: 'Best Deals' },
              ].map((option) => (
                <Button
                  key={option.key}
                  variant={sortBy === option.key ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSortBy(option.key as any)}
                  className="text-xs"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing {filteredAndSortedProducts.length} of {products.length} products
            {selectedCategory !== 'all' && (
              <span className="ml-2">
                in <Badge variant="outline" className="capitalize">{selectedCategory}</Badge>
              </span>
            )}
          </p>
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;