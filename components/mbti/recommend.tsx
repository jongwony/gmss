import React, { useState, useEffect } from "react";


const base_url = 'https://9e240d7v0k.execute-api.ap-northeast-2.amazonaws.com/api'

export default function Recommend() {

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    const recommend_path = base_url + '/mbti/recommend'
    useEffect(() => {
        setLoading(true)
        fetch(recommend_path, {
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ 'mbti': ['ISFP'], 'personnel': 3 }),
            method: 'POST',
            mode: "cors",
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [])
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No MBTI data</p>

    return (
        <div>
            {data.mbti.map((mbti) => (
                <li key={mbti}>{mbti}</li>
            ))}
            <small>{data.synergy}</small>
        </div>
    )
}