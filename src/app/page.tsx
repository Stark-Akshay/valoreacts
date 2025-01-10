"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // Import ShadCN Select components
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Instruction } from './(components)/Instruction';
import { FaArrowRight } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";


type Props = {};

const Home = (props: Props) => {

  const [formData, setFormData] = useState({
    url: '',
    rank: '',
    riotID: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRankChange = (value: string) => {
    // console.log(formData);
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
        toast.success('Video submitted successfully!');
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
    <div className='w-full h-screen flex flex-col justify-center items-center bg-watchpagebg bg-cover '>
      <Card className="w-[360px] h-[400px] sm:w-[450px] sm:h-[450px] bg-white rounded-none">
        <CardHeader>
          <CardTitle className='text-2xl'>Submit your video clip</CardTitle>
          <CardDescription className='text-md'>Enter your YouTube URL, Rank, and RiotID.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                {/* <Label htmlFor="url">URL</Label> */}
                <Input
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="Enter the URL"
                  required
                  className='text-md h-[3rem] sm:!text-xl sm:h-[4rem] border-none border-0 bg-[#ededed] placeholder:text-[#535353] placeholder:font-semibold placeholder:text-md'
                />
              </div>

              {/* Rank select dropdown */}
              <div className="flex flex-col space-y-1.5">
                {/* <Label htmlFor="rank">Rank</Label> */}
                <Select value={formData.rank} onValueChange={handleRankChange} required>
                  <SelectTrigger className='text-md h-[3rem] sm:!text-xl sm:h-[4rem] border-none border-0 bg-[#ededed] placeholder:text-[#535353] placeholder:font-semibold placeholder:text-md' id="rank" name="rank">
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
                {/* <Label htmlFor="riotID">RiotID</Label> */}
                <Input
                  id="riotID"
                  name="riotID"
                  value={formData.riotID}
                  onChange={handleChange}
                  placeholder="Enter your RiotID"
                  required
                  className='text-md h-[3rem] sm:!text-xl sm:h-[4rem] border-none border-0 bg-[#ededed] placeholder:text-[#535353] placeholder:font-semibold placeholder:text-md'
                />
              </div>
            </div>
            <CardFooter className="flex flex-col justify-between mt-4">
              <div className='flex flex-row w-full justify-between'>
                <Button className='h-[3rem] w-[3rem] sm:h-[4rem] sm:w-[4rem] rounded-xl' variant="outline" type="reset" onClick={() => setFormData({ url: '', rank: '', riotID: '' })}>
                  <RiResetLeftFill />
                </Button>
                <Button type="submit" className='bg-[#ff4654] h-[3rem] w-[3rem] sm:h-[4rem] sm:w-[4rem] rounded-xl'><FaArrowRight /></Button>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
      {/* <Instruction /> */}
      <div className='w-full'>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Home;
