"use client"
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiResetLeftFill } from "react-icons/ri";
import { FaArrowRight, FaInfoCircle } from "react-icons/fa";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AiOutlineLoading } from "react-icons/ai";
import { ValidRanks } from "./types/dataType";


type Props = {};

const Home = (props: Props) => {
  const [formData, setFormData] = useState({
    url: "",
    rank: "",
    riotID: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const hasSeenInstructions = localStorage.getItem("hasSeenInstructions");
    if (!hasSeenInstructions) {
      setIsModalOpen(true);
    }
  }, []);

  const handleAcceptInstructions = () => {
    localStorage.setItem("hasSeenInstructions", "true");
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRankChange = (value: string) => {
    setFormData({ ...formData, rank: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://valoreact-api.onrender.com/api/checking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Video submitted successfully!");
        setIsSubmitted(true);
        setFormData({ url: "", rank: "", riotID: "" });
      } else {
        const data = await response.json();
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the data.");
    }
    setLoading(false);
    setIsSubmitted(false);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-watchpagebg bg-cover">
      {/* Modal for instructions */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-[300px] sm:w-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Instructions</DialogTitle>
          </DialogHeader>
          <CardContent className="text-gray-800 text-sm pt-3 p-0">
            <div>
              <ol>
                <li className="pb-2">1. By submitting the video you accept that this video will be played online in a live stream of <a href="https://www.youtube.com/@MenAtArmsGaMing/streams" className="font-bold" target="_blank">MenAtArms Gaming</a></li>
                <li>2. Please refrain from uploading video with music or any copyright content.</li>
              </ol>
            </div>
          </CardContent>
          <DialogFooter>
            <Button onClick={handleAcceptInstructions}>Accept</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className="w-[380px] h-[400px] sm:w-[450px] sm:h-[500px] bg-white rounded-none">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">Submit your video clip</CardTitle>
            <FaInfoCircle
              className="text-xl cursor-pointer"
              onClick={() => setIsModalOpen(true)}
              title="View Instructions"
            />
          </div>
          <CardDescription className="text-md">Enter your YouTube URL, Rank, and RiotID.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="Enter the URL"
                  required
                  className="text-md h-[3rem] sm:!text-xl sm:h-[4rem] border-none border-0 bg-[#ededed] placeholder:text-[#535353] placeholder:font-semibold placeholder:text-md"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Select value={formData.rank} onValueChange={handleRankChange} required>
                  <SelectTrigger
                    className="text-md h-[3rem] sm:!text-xl sm:h-[4rem] border-none border-0 bg-[#ededed] placeholder:text-[#535353] placeholder:font-semibold placeholder:text-md"
                    id="rank"
                    name="rank"
                  >
                    <SelectValue placeholder="Select your rank" />
                  </SelectTrigger>
                  <SelectContent>
                    {ValidRanks.map((rank, index) => (
                      <SelectItem key={index} value={rank.rankName}>{rank.rankName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Input
                  id="riotID"
                  name="riotID"
                  value={formData.riotID}
                  onChange={handleChange}
                  placeholder="Enter your RiotID"
                  required
                  className="text-md h-[3rem] sm:!text-xl sm:h-[4rem] border-none border-0 bg-[#ededed] placeholder:text-[#535353] placeholder:font-semibold placeholder:text-md"
                />
              </div>
            </div>
            <CardFooter className="flex flex-col justify-between mt-4">
              <div className="flex flex-row w-full justify-between">
                <Button
                  className="h-[4rem] w-[4rem] rounded-xl"
                  variant="outline"
                  type="reset"
                  onClick={() => setFormData({ url: "", rank: "", riotID: "" })}
                >
                  <RiResetLeftFill />
                </Button>
                <Button type="submit" className={loading ? `bg-[#111823] h-[4rem] w-[4rem] rounded-xl` : `bg-[#ff4654] h-[4rem] w-[4rem] rounded-xl`}>
                  {loading ? <AiOutlineLoading className="!w-[2rem] !h-[2rem] animate-spin" /> : <FaArrowRight />}
                </Button>
              </div>
              {loading && <p className="text-gray-800 pt-2 text-center">Submitting your data, Please wait until submitted!</p>}
              {isSubmitted && <p className="text-green-800 pt-1 text-center">Your Data is successfully submitted</p>}
              <div className="flex flex-row justify-center w-full py-5">
                <a href="https://www.youtube.com/hashtag/letsbuildvalocommunity" className="text-gray-500 font-bold underline">#letsbuildvalocommunity</a>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Home;