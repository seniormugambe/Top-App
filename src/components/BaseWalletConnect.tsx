import { useConnect, useDisconnect, useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useToast } from '@/hooks/use-toast'
import { useWalletAuth } from '@/hooks/use-wallet-auth'
import { Wallet, LogOut, AlertTriangle, CheckCircle, ExternalLink, RefreshCw } from 'lucide-react'

export function BaseWalletConnect() {
  const { connect, connectors, isPending, error } = useConnect()
  const { disconnect } = useDisconnect()
  const { address, isConnected } = useAccount()
  const { toast } = useToast()
  const { 
    isWalletAuthenticated, 
    isCorrectNetwork, 
    connectionError, 
    chainId, 
    switchToBase,
    switchToBaseSepolia 
  } = useWalletAuth()

  const handleConnect = () => {
    const coinbaseConnector = connectors.find(
      (connector) => connector.id === 'coinbaseWalletSDK'
    )
    
    if (coinbaseConnector) {
      connect(
        { connector: coinbaseConnector },
        {
          onSuccess: () => {
            toast({
              title: 'Wallet Connected! 🎉',
              description: 'Successfully connected to Base Wallet. Redirecting...',
            })
          },
          onError: (error) => {
            toast({
              title: 'Connection Failed',
              description: error.message || 'Failed to connect wallet',
              variant: 'destructive',
            })
          },
        }
      )
    } else {
      toast({
        title: 'Wallet Not Found',
        description: 'Please install Coinbase Wallet to continue',
        variant: 'destructive',
      })
    }
  }

  const handleDisconnect = () => {
    disconnect()
    toast({
      title: 'Wallet Disconnected',
      description: 'Successfully disconnected from Base Wallet',
    })
  }

  const getNetworkName = (chainId: number) => {
    switch (chainId) {
      case 8453: return 'Base Mainnet'
      case 84532: return 'Base Sepolia'
      default: return 'Unknown Network'
    }
  }

  const getNetworkBadgeColor = (chainId: number) => {
    switch (chainId) {
      case 8453: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
      case 84532: return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100'
      default: return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
    }
  }

  // Connected and authenticated state
  if (isConnected && address && isWalletAuthenticated) {
    return (
      <Card className="w-full max-w-md border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <CheckCircle className="h-5 w-5" />
            Base Wallet Connected
          </CardTitle>
          <CardDescription className="space-y-2">
            <div className="font-mono text-sm">
              {`${address.slice(0, 8)}...${address.slice(-6)}`}
            </div>
            <Badge className={getNetworkBadgeColor(chainId)}>
              {getNetworkName(chainId)}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Button 
              onClick={handleDisconnect} 
              variant="outline" 
              size="sm"
              className="flex-1"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Disconnect
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(`https://basescan.org/address/${address}`, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Connected but wrong network
  if (isConnected && address && !isCorrectNetwork) {
    return (
      <Card className="w-full max-w-md border-orange-200 dark:border-orange-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
            <AlertTriangle className="h-5 w-5" />
            Wrong Network
          </CardTitle>
          <CardDescription>
            Please switch to a supported Base network
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              You're connected to {getNetworkName(chainId)}. Please switch to Base Mainnet or Base Sepolia.
            </AlertDescription>
          </Alert>
          
          <div className="grid gap-2">
            <Button 
              onClick={switchToBase}
              variant="outline"
              size="sm"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Switch to Base Mainnet
            </Button>
            <Button 
              onClick={switchToBaseSepolia}
              variant="outline"
              size="sm"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Switch to Base Sepolia
            </Button>
          </div>

          <Button 
            onClick={handleDisconnect} 
            variant="ghost" 
            size="sm"
            className="w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Not connected state
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Connect Base Wallet
        </CardTitle>
        <CardDescription>
          Connect your Base Wallet to shop premium products with crypto payments
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {(error || connectionError) && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {error?.message || connectionError}
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          <Button 
            onClick={handleConnect} 
            disabled={isPending}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isPending ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-4 w-4" />
                Connect Base Wallet
              </>
            )}
          </Button>

          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>Supports Base Mainnet & Base Sepolia</p>
            <p>Powered by Coinbase Smart Wallet</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}