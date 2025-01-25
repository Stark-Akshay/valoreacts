"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { DataIncoming, DataSchema } from "../types/dataType";
import VideoPlayer from "../components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { ValidRanks } from "../types/dataType";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import Image from "next/image";

const WatchComponent = () => {
    const { width, height } = useWindowSize();
    const [data, setData] = useState<DataIncoming | null>(null);
    const [error, setError] = useState(false);
    const [noMoreVideos, setNoMoreVideos] = useState("");
    const [feedback, setFeedback] = useState<"success" | "failure" | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [correctRank, setCorrectRank] = useState<string | null>(null);
    const [correctRankImg, setCorrectRankImg] = useState<string | null>(null);
    const [countdown, setCountdown] = useState(5);
    const audioList: string[] = ["https://od.lk/s/MjRfNjY0MzEwMjFf/1.mp3", "https://od.lk/s/MjRfNjY0ODEwNDZf/2.mp3", "https://od.lk/s/MjRfNjY0ODEwNDdf/3.mp3", "https://od.lk/s/MjRfNjY0ODEwNDdf/3.mp3"];

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
        let audioSelectIndex = Math.floor(Math.random() * audioList.length);
        console.log(audioList[audioSelectIndex]);
        const audio = new Audio(audioList[audioSelectIndex]);
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
            setCorrectRank(data?.rank || ""); // Set the correct rank for dialog
            const rankImg = ValidRanks.find((r) => r.rankName === data?.rank)?.rankImgL || null;
            setCorrectRankImg(rankImg); // Set the correct rank image
            setShowDialog(true); // Show the dialog
            setCountdown(5); // Reset countdown
        }
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (showDialog) {
            timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev === 1) {
                        closeDialogAndLoadNext();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [showDialog]);

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

    const closeDialogAndLoadNext = () => {
        setShowDialog(false);
        if (data?._id) nextVideo(data._id);
        setFeedback(null);
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
            {feedback == "success" ? <Confetti width={width} height={height} /> : <></>}
            <VideoPlayer data={data} />
            {feedback === "failure" && <p className="text-red-500 text-lg mt-4">Incorrect Rank! Try Again!</p>}
            {feedback === "success" && <p className="text-green-500 text-lg mt-4">Well guessed!!</p>}

            <div className="flex flex-wrap justify-center gap-4 w-full max-w-3xl mt-6">
                {ValidRanks.map((rank) => (
                    <Button className="bg-valoredColor text-white p-3 text-sm md:text-lg flex flex-row gap-2" key={rank.rankName} onClick={() => checkRank(rank.rankName)}>
                        <Image src={rank.rankImg} width={30} height={30} alt={rank.rankName} />
                        {rank.rankName}
                    </Button>
                ))}
            </div>

            {showDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-11/12 max-w-md transform transition-all duration-300">
                        <p className="text-lg font-semibold mb-4 text-center text-gray-800">The correct rank was:</p>
                        {correctRankImg && <Image src={correctRankImg} alt={correctRank || "Rank Image"} width={70} height={70} className="mx-auto mb-4 rounded-full" />}
                        <p className="text-blue-500 text-2xl font-bold mb-6 text-center">{correctRank}</p>
                        <p className="text-gray-600 mb-6 text-center">Loading next video in <span className="text-red-500 font-bold">{countdown}</span> seconds...</p>
                        <Button className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-200" onClick={closeDialogAndLoadNext}>Next Video</Button>
                    </div>
                </div>
            )}
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
