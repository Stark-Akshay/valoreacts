"use client"
import React from 'react'
import { DataIncoming } from '../types/dataType'


type VideoPlayerType = {
    data: DataIncoming;
}

const VideoPlayer = ({ data }: VideoPlayerType) => {
    return (
        <div>
            <p className='text-white text-5xl font-bold'>Player IGN: {data.riotID}</p>
            <iframe width="893" height="502" src={`https://www.youtube.com/embed/${data.url}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </div>
    )
}

export default VideoPlayer