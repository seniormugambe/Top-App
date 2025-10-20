import { useState } from 'react'
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Send } from 'lucide-react'

export function Web3Transaction() {
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')
  const { address, isConnected } = useAccount()
  const { toast } = useToast()

  const { 
    data: hash, 
    sendTransaction, 
    isPending: isSending 
  } = useSendTransaction()

  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed 
  } = useWaitForTransactionReceipt({
    hash,
  })

  const handleSendTransaction = () => {
    if (!to || !amount) {
      toast({
        title: 'Invalid Input',
        description: 'Please enter both recipient address and amount',
        variant: 'destructive',
      })
      return
    }

    try {
      sendTransaction({
        to: to as `0x${string}`,
        value: parseEther(amount),
      })
    } catch (error) {
      toast({
        title: 'Transaction Failed',
        description: 'Failed to send transaction',
        variant: 'destructive',
      })
    }
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Web3 Transaction</CardTitle>
          <CardDescription>
            Connect your Base Wallet to send transactions
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Send ETH on Base
        </CardTitle>
        <CardDescription>
          Send ETH to any address on the Base network
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient Address</Label>
          <Input
            id="recipient"
            placeholder="0x..."
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (ETH)</Label>
          <Input
            id="amount"
            type="number"
            step="0.001"
            placeholder="0.001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <Button 
          onClick={handleSendTransaction}
          disabled={isSending || isConfirming}
          className="w-full"
        >
          {isSending || isConfirming ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isSending ? 'Sending...' : 'Confirming...'}
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Transaction
            </>
          )}
        </Button>

        {hash && (
          <div className="text-sm text-muted-foreground">
            <p>Transaction Hash:</p>
            <p className="font-mono break-all">{hash}</p>
          </div>
        )}

        {isConfirmed && (
          <div className="text-sm text-green-600">
            Transaction confirmed!
          </div>
        )}
      </CardContent>
    </Card>
  )
}