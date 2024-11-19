"use client"
import React from 'react'
import { DataIncoming } from '../types/dataType'


type VideoPlayerType = {
    data: DataIncoming;
}

const VideoPlayer = ({ data }: VideoPlayerType) => {
    return (
        <div>
            <p>{data.riotID}</p>
            <iframe width="893" height="502" src={data.url.replace("watch?v=", "embed/")}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            <p>{data.rank}</p>
        </div>
    )
}

export default VideoPlayer