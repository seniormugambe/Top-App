import { useWalletAuth } from '@/hooks/use-wallet-auth'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, AlertTriangle, Wifi, WifiOff, RefreshCw } from 'lucide-react'

export function ConnectionStatus() {
  const { 
    isConnected, 
    isWalletAuthenticated, 
    isCorrectNetwork, 
    connectionError,
    chainId,
    switchToBase,
    switchToBaseSepolia 
  } = useWalletAuth()

  const getNetworkName = (chainId: number) => {
    switch (chainId) {
      case 8453: return 'Base Mainnet'
      case 84532: return 'Base Sepolia'
      default: return 'Unknown Network'
    }
  }

  // Fully connected and authenticated
  if (isWalletAuthenticated) {
    return (
      <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="flex items-center justify-between">
          <span className="text-green-700 dark:text-green-300">
            Connected to {getNetworkName(chainId)}
          </span>
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            <Wifi className="h-3 w-3 mr-1" />
            Online
          </Badge>
        </AlertDescription>
      </Alert>
    )
  }

  // Connected but wrong network
  if (isConnected && !isCorrectNetwork) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="space-y-2">
          <p>Wrong network detected: {getNetworkName(chainId)}</p>
          <div className="flex gap-2">
            <Button 
              onClick={switchToBase}
              size="sm"
              variant="outline"
              className="h-7 text-xs"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Base Mainnet
            </Button>
            <Button 
              onClick={switchToBaseSepolia}
              size="sm"
              variant="outline"
              className="h-7 text-xs"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Base Sepolia
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    )
  }

  // Connection error
  if (connectionError) {
    return (
      <Alert variant="destructive">
        <WifiOff className="h-4 w-4" />
        <AlertDescription>
          {connectionError}
        </AlertDescription>
      </Alert>
    )
  }

  // Not connected
  if (!isConnected) {
    return (
      <Alert>
        <WifiOff className="h-4 w-4" />
        <AlertDescription>
          Wallet not connected. Please connect your Base Wallet to continue.
        </AlertDescription>
      </Alert>
    )
  }

  return null
}