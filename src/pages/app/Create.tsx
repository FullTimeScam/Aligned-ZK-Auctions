import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Auction, WalletContext } from '@/components/AuctionApp';
import { toast } from "sonner";

type CreatePageProps = {
  addAuction: (newAuctionData: Omit<Auction, 'id' | 'owner' | 'commitCount' | 'status' | 'winner' | 'winningBid'>) => void;
};

export default function CreatePage({ addAuction }: CreatePageProps) {
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState(['']);
  const walletContext = useContext(WalletContext);


  const handleImageUrlChange = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const addImageUrlInput = () => setImageUrls([...imageUrls, '']);

  const removeImageUrlInput = (index: number) => {
    if (imageUrls.length > 1) {
      setImageUrls(imageUrls.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!walletContext?.isConnected) {
        toast.error("🚨 Please connect your wallet first.");
        return;
    }

    const formData = new FormData(e.currentTarget);
    const finalImageUrls = imageUrls.filter(url => url.trim() !== '');
    const minPrice = parseFloat(formData.get('minPrice') as string);

    if (finalImageUrls.length === 0) {
        toast.error("🚨 Please provide at least one image URL.");
        return;
    }
    
    const revealEnd = new Date(formData.get('endTime') as string);


    addAuction({
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      imageUrl: finalImageUrls[0],
      imageUrls: finalImageUrls,
      chain: formData.get('assetChain') as string,
      rule: formData.get('rule') as string,
      currency: formData.get('currency') as string,
      minPrice: minPrice,
      commitEnd: new Date(revealEnd.getTime() - 5 * 1000),
      revealEnd: revealEnd,
    });
    
    toast.success("✅ Auction created successfully! Redirecting...");
    setTimeout(() => navigate('/app'), 1500);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Auction</CardTitle>
          <CardDescription>Fill in the details below to launch your ZK-powered sealed-bid auction.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
              <div className="space-y-2">
                <Label htmlFor="title">Item Name</Label>
                <Input id="title" name="title" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" required />
              </div>
              <div className="space-y-2">
                <Label>Image URLs</Label>
                {imageUrls.map((url, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input value={url} onChange={(e) => handleImageUrlChange(index, e.target.value)} placeholder={`https://.../image-${index + 1}.png`} />
                    {imageUrls.length > 1 && <Button type="button" variant="destructive" size="icon" onClick={() => removeImageUrlInput(index)}>-</Button>}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addImageUrlInput}>+ Add Image URL</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Auction Rules</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Auction Type</Label>
                  <Select name="rule" defaultValue="vickrey">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vickrey">ZK Blind Auction (Vickrey)</SelectItem>
                      <SelectItem value="first_price">ZK Blind Auction (First Price)</SelectItem>
                      <SelectItem value="dutch">Public Auction (Dutch)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Payment Currency</Label>
                  <Select name="currency" defaultValue="USDC">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USDC">USDC</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Minimum Bid</Label>
                  <Input name="minPrice" type="number" step="0.01" required />
                </div>
                <div className="space-y-2">
                  <Label>Asset Chain</Label>
                   <Select name="assetChain" defaultValue="Ethereum">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ethereum">Ethereum</SelectItem>
                      <SelectItem value="Polygon">Polygon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">Auction End Time</Label>
                <Input id="endTime" name="endTime" type="datetime-local" required />
              </div>
            </div>
            
            <Button type="submit" className="w-full">Launch Auction</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}