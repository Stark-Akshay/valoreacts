"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { DataIncoming, DataSchema } from "../types/dataType";
import VideoPlayer from "../components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { ValidRanks } from "../types/dataType";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti'

const WatchComponent = () => {
    const { width, height } = useWindowSize();
    const [data, setData] = useState<DataIncoming | null>(null);
    const [error, setError] = useState(false);
    const [noMoreVideos, setNoMoreVideos] = useState("");
    const [feedback, setFeedback] = useState<"success" | "failure" | null>(null);

    const nextVideo = async (id: string) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/deleteData/${id}`);
            if (res) {
                fetchData();
            }
        } catch (err) {
            setError(false);
        }
    };

    const playFailureAudio = () => {
        const audio = new Audio("https://od.lk/s/MjRfNjY0MzEwMjFf/1.mp3");
        audio.play();
    };

    const checkRank = (rank: string) => {
        if (rank === data?.rank) {
            setFeedback("success");
            setTimeout(() => {
                if (data?._id) nextVideo(data._id);
                setFeedback(null);
            }, 2000); // Show success feedback for 2 seconds
        } else {
            setFeedback("failure");
            playFailureAudio(); // External audio URL
            setTimeout(() => {
                if (data?._id) nextVideo(data._id);
                setFeedback(null);
            }, 3000); // Show failure feedback for 3 seconds
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/retriveOne');
            const data = DataSchema.parse(response.data);
            setData(data);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response && err.response.status === 400) {
                setNoMoreVideos(err.response.data.message);
            } else {
                setError(true);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (noMoreVideos) {
        return (
            <div className="flex flex-col justify-center items-center h-screen px-4 text-center">
                <p className="text-white text-4xl md:text-5xl lg:text-6xl">Sorry, no more videos!</p>
            </div>
        );
    } else if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-screen px-4 text-center">
                <p className="text-white text-4xl md:text-5xl lg:text-6xl">Failed loading data</p>
            </div>
        );
    }

    return data ? (
        <div className="flex flex-col justify-center items-center px-4 py-6">
            {feedback == "success" ? <Confetti
                width={width}
                height={height}
            /> : <></>}
            <VideoPlayer data={data} />
            {feedback === "failure" && <p className="text-red-500 text-lg mt-4">Incorrect Rank! Try Again!</p>}
            {feedback === "success" && <p className="text-green-500 text-lg mt-4">Well guessed!!</p>}
            <div className="flex flex-wrap justify-center gap-4 w-full max-w-3xl mt-6">
                {ValidRanks.map((rank) => (
                    <Button className="bg-white text-purple-700 p-3 text-sm md:text-lg" key={rank} onClick={() => checkRank(rank)}>
                        {rank}
                    </Button>
                ))}
            </div>
        </div>
    ) : (
        <div className="flex flex-col justify-center items-center px-4 py-6">
            <Skeleton enableAnimation={true} height={500} width={850} baseColor="#979797" borderRadius={0} />
            <div className="flex flex-wrap justify-center gap-4 w-full max-w-3xl mt-6">
                {Array.from({ length: 8 }, (_, index) => (
                    <Skeleton key={index} enableAnimation={true} height={50} width={100} baseColor="#d3d3d3" borderRadius={5} />
                ))}
            </div>
        </div>
    );
};

export default WatchComponent;
