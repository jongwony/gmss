import React, { useState, useEffect } from "react";

import { Stack } from "@mui/material";
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';

import Selected from "./selected";
import { postRecommend } from "./request";
import { fetchFormData } from "./formSelector";


export function Response() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    async function submit() {
        const { mbti, personnel } = fetchFormData()

        if (mbti.length > 0) {
            setLoading(true)
            const response = await postRecommend(mbti, personnel)
            setData(response)
            setLoading(false)
        }
    }

    useEffect(() => {
        submit().catch(() => {
            console.error()
            setLoading(false)
        })
    }, [])

    function DataRender() {
        return (
            <div>
                <Grid container sx={{ marginTop: 2 }} id="mbtiSelected">
                    {data.mbti.map((mbti: string) => <Button variant="contained" key={Math.random().toString()}>{mbti}</Button>)}
                    <Button color="secondary" variant="contained">
                        시너지 지수: {data.synergy}
                    </Button>
                </Grid>
                <small>시너지 지수는 2명일 경우 3이 가장 높습니다</small>
            </div>
        )
    }

    if (isLoading) return <p>Loading...</p>
    return (
        <Stack sx={{ marginTop: 2 }}>
            <Button sx={{ flex: 1 }} variant="contained" color="success" onClick={submit}>추천 받기</Button>
            {
                !data
                    ? <p>No MBTI data</p>
                    : <DataRender />
            }
        </Stack>
    )
}

export default function Recommend() {
    return (
        <Stack>
            <Selected submitTips="제시한 MBTI와 함께 추천될 MBTI 수" />
            <Response />
        </Stack>
    )
}