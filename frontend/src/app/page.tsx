'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Slider } from "@/components/ui/slider"
import { Wallet, BirdIcon as Owl } from 'lucide-react'

// Mock wallet assets
const mockWalletAssets = [
  { token: 'ETH', balance: '1.5', valueUSD: 3000 },
  { token: 'USDC', balance: '1000', valueUSD: 1000 },
  { token: 'WBTC', balance: '0.05', valueUSD: 2000 },
]

// Available tokens
const availableTokens = ['ETH', 'USDC', 'WBTC', 'DAI', 'LINK']

// Predefined percentages
const percentageOptions = [10, 25, 50, 70, 100]

// Predefined multipliers
const multiplierOptions = [1.5, 2, 2.5, 3, 5]

export default function TradingInterface() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [fromToken, setFromToken] = useState('')
  const [toToken, setToToken] = useState('')
  const [selectedPercentage, setSelectedPercentage] = useState(10)
  const [selectedMultiplier, setSelectedMultiplier] = useState(1.5)
  const [expiration, setExpiration] = useState('')

  const connectWallet = () => {
    setIsWalletConnected(true)
    setWalletAddress('0x1234...5678')
  }

  const disconnectWallet = () => {
    setIsWalletConnected(false)
    setWalletAddress('')
  }

  const calculateTokenAmount = () => {
    const asset = mockWalletAssets.find(a => a.token === fromToken)
    if (!asset) return '0'
    return ((parseFloat(asset.balance) * selectedPercentage) / 100).toFixed(4)
  }

  const calculateUsdValue = () => {
    const asset = mockWalletAssets.find(a => a.token === fromToken)
    if (!asset) return 0
    return (asset.valueUSD * selectedPercentage / 100 * selectedMultiplier).toFixed(2)
  }

  const generateOrder = () => {
    console.log('Generating order:', { fromToken, toToken, percentage: selectedPercentage, multiplier: selectedMultiplier, expiration })
  }

  return (
    <div className="min-h-screen bg-[#36454F] text-[#F5F5F5]">
      <header className="bg-[#2C3A47] p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Owl className="h-8 w-8 text-[#F5F5F5]" />
            <h1 className="text-2xl font-bold">Gains Guardian</h1>
          </div>
          {isWalletConnected ? (
            <div className="flex items-center space-x-4">
              <span className="text-[#708090]">{walletAddress}</span>
              <Button onClick={disconnectWallet} variant="outline" className="bg-transparent border-[#708090] text-[#708090] hover:bg-[#708090] hover:text-[#F5F5F5]">
                Disconnect
              </Button>
            </div>
          ) : (
            <Button onClick={connectWallet} className="bg-[#708090] text-[#F5F5F5] hover:bg-[#5D6D7E]">
              <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto p-4 space-y-6">
        {isWalletConnected && (
          <Card className="bg-[#F5F5F5] text-[#36454F] shadow-lg">
            <CardHeader>
              <CardTitle>Wallet Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>USD Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockWalletAssets.map((asset) => (
                    <TableRow key={asset.token}>
                      <TableCell className="font-medium">{asset.token}</TableCell>
                      <TableCell>{asset.balance}</TableCell>
                      <TableCell>${asset.valueUSD}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        <Card className="bg-[#F5F5F5] text-[#36454F] shadow-lg">
          <CardHeader>
            <CardTitle>Create Trading Strategy</CardTitle>
            <CardDescription>Define your trading parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>From</Label>
                <Select onValueChange={setFromToken}>
                  <SelectTrigger className="bg-white border-[#708090] text-[#36454F]">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTokens.map(token => (
                      <SelectItem key={token} value={token}>{token}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>To</Label>
                <Select onValueChange={setToToken}>
                  <SelectTrigger className="bg-white border-[#708090] text-[#36454F]">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTokens.map(token => (
                      <SelectItem key={token} value={token}>{token}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="text-6xl font-bold">{selectedPercentage}%</div>
                <div className="text-xl">{calculateTokenAmount()} {fromToken}</div>
              </div>

              <div className="space-y-4">
                <Label>Percentage</Label>
                <div className="flex justify-between gap-2">
                  {percentageOptions.map((percent) => (
                    <Button
                      key={percent}
                      variant={selectedPercentage === percent ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setSelectedPercentage(percent)}
                    >
                      {percent}%
                    </Button>
                  ))}
                </div>
                <Slider
                  value={[selectedPercentage]}
                  onValueChange={(value) => setSelectedPercentage(value[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div className="text-center space-y-2">
                <div className="text-6xl font-bold">{selectedMultiplier}x</div>
                <div className="text-xl">${calculateUsdValue()}</div>
              </div>

              <div className="space-y-4">
                <Label>Multiplier</Label>
                <div className="flex justify-between gap-2">
                  {multiplierOptions.map((multiplier) => (
                    <Button
                      key={multiplier}
                      variant={selectedMultiplier === multiplier ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setSelectedMultiplier(multiplier)}
                    >
                      {multiplier}x
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Expiration Time</Label>
                <Select onValueChange={setExpiration}>
                  <SelectTrigger className="bg-white border-[#708090] text-[#36454F]">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 hour</SelectItem>
                    <SelectItem value="4h">4 hours</SelectItem>
                    <SelectItem value="24h">24 hours</SelectItem>
                    <SelectItem value="7d">7 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={generateOrder} className="w-full bg-[#708090] text-[#F5F5F5] hover:bg-[#5D6D7E]">
              Generate Order
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}