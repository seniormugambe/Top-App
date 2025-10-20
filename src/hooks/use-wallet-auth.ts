import { useAccount, useDisconnect, useChainId, useSwitchChain } from 'wagmi'
import { useEffect, useState } from 'react'
import { base, baseSepolia } from 'wagmi/chains'

export function useWalletAuth() {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()
  
  const [isWalletAuthenticated, setIsWalletAuthenticated] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false)

  // Check if user is on supported network
  useEffect(() => {
    const supportedChainIds = [base.id, baseSepolia.id]
    setIsCorrectNetwork(supportedChainIds.includes(chainId))
  }, [chainId])

  // Update authentication state
  useEffect(() => {
    if (isConnected && address && isCorrectNetwork) {
      setIsWalletAuthenticated(true)
      setConnectionError(null)
    } else {
      setIsWalletAuthenticated(false)
      
      if (isConnected && !isCorrectNetwork) {
        setConnectionError('Please switch to Base network')
      } else if (!isConnected) {
        setConnectionError(null)
      }
    }
  }, [isConnected, address, isCorrectNetwork])

  const signOut = () => {
    try {
      disconnect()
      setIsWalletAuthenticated(false)
      setConnectionError(null)
    } catch (error) {
      console.error('Error disconnecting wallet:', error)
    }
  }

  const switchToBase = async () => {
    try {
      await switchChain({ chainId: base.id })
      setConnectionError(null)
    } catch (error) {
      console.error('Error switching to Base network:', error)
      setConnectionError('Failed to switch to Base network')
    }
  }

  const switchToBaseSepolia = async () => {
    try {
      await switchChain({ chainId: baseSepolia.id })
      setConnectionError(null)
    } catch (error) {
      console.error('Error switching to Base Sepolia network:', error)
      setConnectionError('Failed to switch to Base Sepolia network')
    }
  }

  return {
    address,
    isConnected,
    isConnecting,
    isReconnecting,
    isWalletAuthenticated,
    isCorrectNetwork,
    connectionError,
    chainId,
    signOut,
    switchToBase,
    switchToBaseSepolia,
  }
}