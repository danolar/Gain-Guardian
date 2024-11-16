'use client'

import { useState } from 'react'
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { BirdIcon as Owl, Plus, X } from 'lucide-react'

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

export default function Home() {
  const { } = useAccount();
  const [fromToken, setFromToken] = useState('')
  const [toToken, setToToken] = useState('')
  const [orders, setOrders] = useState([
    { percentage: 10, multiplier: 1.5 }
  ])
  const [expiration, setExpiration] = useState('')

  const calculateTokenAmount = (percentage: number) => {
    const asset = mockWalletAssets.find(a => a.token === fromToken)
    if (!asset) return '0'
    return ((parseFloat(asset.balance) * percentage) / 100).toFixed(4)
  }

  const calculateUsdValue = (percentage: number, multiplier: number) => {
    const asset = mockWalletAssets.find(a => a.token === fromToken)
    if (!asset) return 0
    return (asset.valueUSD * percentage / 100 * multiplier).toFixed(2)
  }

  const addOrder = () => {
    setOrders([...orders, { percentage: 10, multiplier: 1.5 }])
  }

  const removeOrder = (index: number) => {
    setOrders(orders.filter((_, i) => i !== index))
  }

  const updateOrder = (index: number, field: keyof typeof orders[number], value: number) => {
    const newOrders = [...orders]
    newOrders[index][field] = value
    setOrders(newOrders)
  }

  const generateOrder = () => {
    console.log('Generating order:', { fromToken, toToken, orders, expiration })
  }

  return (
    <div className="min-h-screen bg-[#36454F] text-[#F5F5F5]">
      <header className="bg-[#2C3A47] p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Owl className="h-8 w-8 text-[#F5F5F5]" />
            <h1 className="text-2xl font-bold">Gains Guardian</h1>
          </div>
          <div className="flex items-center">
            <w3m-button />
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 space-y-6">
        {/* {isWalletConnected && (
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
        )} */}

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

            {orders.map((order, index) => (
              <Card key={index} className="bg-white p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Order {index + 1}</h3>
                  {index > 0 && (
                    <Button variant="ghost" size="sm" onClick={() => removeOrder(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4 border-r pr-4">
                    <div className="flex justify-between items-baseline">
                      <Label>Percentage</Label>
                      <div className="text-right">
                        <div className="text-3xl font-bold">{order.percentage}%</div>
                        <div className="text-sm">{calculateTokenAmount(order.percentage)} {fromToken}</div>
                      </div>
                    </div>
                    <div className="flex justify-between gap-2 mt-2">
                      {percentageOptions.map((percent) => (
                        <Button
                          key={percent}
                          variant={order.percentage === percent ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateOrder(index, 'percentage', percent)}
                        >
                          {percent}%
                        </Button>
                      ))}
                    </div>
                    <Slider
                      value={[order.percentage]}
                      onValueChange={(value) => updateOrder(index, 'percentage', value[0])}
                      min={0}
                      max={100}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  <div className="space-y-4 pl-4">
                    <div className="flex justify-between items-baseline">
                      <Label>Multiplier</Label>
                      <div className="text-right">
                        <div className="text-3xl font-bold">{order.multiplier}x</div>
                        <div className="text-sm">${calculateUsdValue(order.percentage, order.multiplier)}</div>
                      </div>
                    </div>
                    <div className="flex justify-between gap-2 mt-2">
                      {multiplierOptions.map((multiplier) => (
                        <Button
                          key={multiplier}
                          variant={order.multiplier === multiplier ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateOrder(index, 'multiplier', multiplier)}
                        >
                          {multiplier}x
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            <Button onClick={addOrder} variant="outline" className="w-full mt-4">
              <Plus className="mr-2 h-4 w-4" /> Add Order
            </Button>

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