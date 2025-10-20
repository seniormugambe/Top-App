import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ExternalLink, Smartphone, Globe, Shield, Zap } from 'lucide-react'

export function WalletGuide() {
  const steps = [
    {
      step: 1,
      title: "Install Coinbase Wallet",
      description: "Download the Coinbase Wallet app or browser extension",
      action: "Download Now",
      link: "https://www.coinbase.com/wallet"
    },
    {
      step: 2,
      title: "Create or Import Wallet",
      description: "Set up a new wallet or import an existing one",
      action: "Learn How",
      link: "https://help.coinbase.com/en/wallet/getting-started"
    },
    {
      step: 3,
      title: "Connect to Base Network",
      description: "Ensure you're connected to Base Mainnet or Base Sepolia",
      action: "Network Guide",
      link: "https://docs.base.org/using-base"
    },
    {
      step: 4,
      title: "Connect to TopUp Shop",
      description: "Click 'Connect Base Wallet' and approve the connection",
      action: "Connect Now",
      link: "#"
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "Your private keys never leave your device"
    },
    {
      icon: Zap,
      title: "Fast Transactions",
      description: "Lightning-fast payments on Base network"
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Shop from anywhere in the world"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Getting Started */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Getting Started with Base Wallet
          </CardTitle>
          <CardDescription>
            Follow these simple steps to connect your Base Wallet and start shopping
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.step}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  {step.link !== "#" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(step.link, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-2" />
                      {step.action}
                    </Button>
                  )}
                </div>
              </div>
              {index < steps.length - 1 && <Separator className="my-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Why Use Base Wallet?</CardTitle>
          <CardDescription>
            Experience the future of digital commerce with Web3 technology
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <benefit.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Network Information */}
      <Card>
        <CardHeader>
          <CardTitle>Supported Networks</CardTitle>
          <CardDescription>
            TopUp Shop works on these Base networks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <div>
              <p className="font-medium">Base Mainnet</p>
              <p className="text-xs text-muted-foreground">Chain ID: 8453</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
              Production
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
            <div>
              <p className="font-medium">Base Sepolia</p>
              <p className="text-xs text-muted-foreground">Chain ID: 84532</p>
            </div>
            <Badge variant="outline">
              Testnet
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}