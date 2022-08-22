import React, { useState, useEffect } from "react";

import { Stack } from "@mui/material";
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';

import Selected from "./selected";
import {Header} from "./category";
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
                <small>시너지 지수는 제공해주신 MBTI와 합친 수치입니다. 2명일 경우 3이 가장 높습니다</small>
            </div>
        )
    }

    if (isLoading) return <p>Loading...</p>
    return (
        <Stack sx={{ marginTop: 2 }}>
            <Button sx={{ flex: 1 }} variant="contained" color="success" onClick={submit}>추천 받기</Button>
            {
                data && <DataRender />
            }
        </Stack>
    )
}

export default function Recommend() {
    const description = `
    잘 맞는 사람과 팀을 만들고 싶으신가요?
    시너지가 가장 높은 MBTI를 추천해 드릴게요
    `
    return (
        <Stack>
            <Header title="MBTI 친구 찾기" description={description} />
            <Selected submitTips="몇 명이 더 필요한가요?" />
            <Response />
        </Stack>
    )
}