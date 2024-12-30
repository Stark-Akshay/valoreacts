"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { DataIncoming, DataSchema } from "../types/dataType";
import VideoPlayer from "../components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { ValidRanks } from "../types/dataType";

const WatchComponent = () => {
    const [data, setData] = useState<DataIncoming | null>(null);
    const [error, setError] = useState(false);
    const [noMoreVideos, setNoMoreVideos] = useState("");
    const [feedback, setFeedback] = useState<"success" | "failure" | null>(null);

    const nextVideo = async (id: string) => {
        try {
            const res = await axios.delete(`https://valoreact-api.onrender.com/api/deleteData/${id}`);
            if (res) {
                fetchData();
            }
        } catch (err) {
            setError(false);
        }
    };

    const playFailureAudio = () => {
        const audio = new Audio("audio/1.mp3");
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
            }, 2000); // Show failure feedback for 2 seconds
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('https://valoreact-api.onrender.com/api/retriveOne');
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
        return <div className="w-auto flex justify-center items-center flex-col h-[80%]">
            <p className="text-white text-9xl">Sorry no more videos!</p>
        </div>
    } else if (error) {
        return <div className="w-auto flex justify-center items-center flex-col h-[80%]">
            <p className="text-white text-9xl">Failed loading data</p>
        </div>
    }

    return data ? (
        <div className={`w-auto flex justify-center items-center flex-col ${feedback === "success" ? "border-4 border-green-500" : ""}`}>
            <VideoPlayer data={data} />
            {feedback === "failure" && <p className="text-red-500 text-xl">Incorrect Rank! Try Again!</p>}
            <div className="flex flex-row flex-wrap justify-around w-[80%] py-5">
                {
                    ValidRanks.map(rank => (
                        <Button className="bg-white p-5 text-xl text-purple-700" key={rank} onClick={() => checkRank(rank)}>{rank}</Button>
                    ))
                }
            </div>
        </div>
    ) : <p>Loading...</p>;
};

export default WatchComponent;
