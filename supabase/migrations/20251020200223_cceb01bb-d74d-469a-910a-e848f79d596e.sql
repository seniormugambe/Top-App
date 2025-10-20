-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
  image_url TEXT,
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user_topups table to track payment progress
CREATE TABLE public.user_topups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  amount_paid DECIMAL(10, 2) NOT NULL DEFAULT 0 CHECK (amount_paid >= 0),
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_user_topups_user_id ON public.user_topups(user_id);
CREATE INDEX idx_user_topups_status ON public.user_topups(user_id, status);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_topups ENABLE ROW LEVEL SECURITY;

-- Products are viewable by everyone
CREATE POLICY "Products are viewable by everyone"
ON public.products FOR SELECT
USING (true);

-- Users can view their own top-ups
CREATE POLICY "Users can view their own top-ups"
ON public.user_topups FOR SELECT
USING (auth.uid() = user_id);

-- Users can create their own top-ups
CREATE POLICY "Users can create their own top-ups"
ON public.user_topups FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own top-ups
CREATE POLICY "Users can update their own top-ups"
ON public.user_topups FOR UPDATE
USING (auth.uid() = user_id);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for automatic timestamp updates
CREATE TRIGGER update_user_topups_updated_at
BEFORE UPDATE ON public.user_topups
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Insert some sample products
INSERT INTO public.products (name, description, price, stock, image_url) VALUES
  ('Premium Wireless Headphones', 'High-quality noise-canceling headphones with 30-hour battery life', 299.99, 50, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'),
  ('Smart Fitness Watch', 'Track your health and fitness with advanced sensors and GPS', 199.99, 75, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'),
  ('Professional Camera', 'Mirrorless camera with 24MP sensor and 4K video recording', 899.99, 30, 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80'),
  ('Laptop Backpack', 'Durable and stylish backpack with padded laptop compartment', 79.99, 100, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80');