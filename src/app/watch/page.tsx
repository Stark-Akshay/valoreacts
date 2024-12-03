"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataIncoming, DataSchema } from '../types/dataType';
import VideoPlayer from '../components/VideoPlayer';
import { Button } from '@/components/ui/button';
import { signIn } from "next-auth/react";

const WatchPage = () => {
    const [data, setData] = useState<DataIncoming | null>(null);
    const [error, setError] = useState(false);
    const [noMoreVideos, setNoMoreVideos] = useState("");
    const nextVideo = async (id: string) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/deleteData/${id}`);
            if (res) {
                fetchData();
            }
        } catch (err) {
            setError(false);
            // console.log(err);
        }
    }

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/retriveOne');

            const data = DataSchema.parse(response.data);
            setData(data);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response && err.response.status == 400) {
                setNoMoreVideos(err.response.data.message);
            }
            else {
                setError(true);
            }

        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    if (noMoreVideos) {
        return <p>Sorry no more videos</p>
    }
    else if (error) {
        return <p>Failed Loading Data</p>;
    }

    return data ? (
        <div>
            <VideoPlayer data={data} />
            <Button onClick={() => { nextVideo(data._id) }}>Next Video</Button>
        </div>
    ) : <p>Loading...</p>;
}

export default WatchPage;
