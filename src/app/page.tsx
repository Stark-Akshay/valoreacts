"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // Import ShadCN Select components
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {};

const Home = (props: Props) => {
  const [formData, setFormData] = useState({
    url: '',
    rank: '',
    riotID: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRankChange = (value: string) => {
    console.log(formData);
    setFormData({ ...formData, rank: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/checking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Data submitted successfully!');
        setFormData({ url: '', rank: '', riotID: '' });
      } else {
        const data = await response.json();
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      toast.error('An error occurred while submitting the data.');
    }
  };

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Submit Your Data</CardTitle>
          <CardDescription>Enter your URL, Rank, and RiotID.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="Enter the URL"
                  required
                />
              </div>

              {/* Rank select dropdown */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="rank">Rank</Label>
                <Select value={formData.rank} onValueChange={handleRankChange} required>
                  <SelectTrigger id="rank" name="rank">
                    <SelectValue placeholder="Select your rank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Iron">Iron</SelectItem>
                    <SelectItem value="Bronze">Bronze</SelectItem>
                    <SelectItem value="Gold">Gold</SelectItem>
                    <SelectItem value="Platinum">Platinum</SelectItem>
                    <SelectItem value="Diamond">Diamond</SelectItem>
                    <SelectItem value="Ascendant">Ascendant</SelectItem>
                    <SelectItem value="Immortal">Immortal</SelectItem>
                    <SelectItem value="Radiant">Radiant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="riotID">RiotID</Label>
                <Input
                  id="riotID"
                  name="riotID"
                  value={formData.riotID}
                  onChange={handleChange}
                  placeholder="Enter your RiotID"
                  required
                />
              </div>
            </div>
            <CardFooter className="flex justify-between mt-4">
              <Button variant="outline" type="reset" onClick={() => setFormData({ url: '', rank: '', riotID: '' })}>
                Reset
              </Button>
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Home;
