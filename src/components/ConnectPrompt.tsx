import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useNavigate } from 'react-router-dom'
import { Wallet, AlertTriangle, ArrowRight } from 'lucide-react'

interface ConnectPromptProps {
  title?: string
  description?: string
  actionText?: string
  showAlert?: boolean
}

export function ConnectPrompt({ 
  title = "Connect Your Wallet",
  description = "Please connect your Base Wallet to make purchases and access Web3 features",
  actionText = "Connect Base Wallet",
  showAlert = true
}: ConnectPromptProps) {
  const navigate = useNavigate()

  return (
    <Card className="border-orange-200 dark:border-orange-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
          <Wallet className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {showAlert && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              You need to connect your Base Wallet to make purchases. This ensures secure, 
              decentralized transactions on the blockchain.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          <Button 
            onClick={() => navigate('/auth')}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Wallet className="mr-2 h-4 w-4" />
            {actionText}
          </Button>

          <div className="text-center">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              Continue Browsing
            </Button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>✓ Secure blockchain transactions</p>
          <p>✓ No passwords required</p>
          <p>✓ Full control of your funds</p>
        </div>
      </CardContent>
    </Card>
  )
}