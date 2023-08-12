import React, { useState, useEffect } from "react";

import { Stack } from "@mui/material";
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Selected from "./selected";
import { Header } from "./category";
import { postRecommend } from "./request";
import { fetchFormData } from "./formSelector";
import { SynergyRender } from "./utils/synergyIndex";


export default function Recommend() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    async function submit() {
        const { mbti, personnel } = fetchFormData()
        if (mbti.length > 0 && personnel > 0) {
            setLoading(true)
            const response = await postRecommend(mbti, personnel)
            setData(response)
            setLoading(false)
        } else {
            setData({submitError: true})
        }
    }

    useEffect(() => {
        submit().catch(() => {
            console.error()
            setLoading(false)
        })
    }, [])

    function DataRender() {
        if (isLoading) return <p>Loading...</p>
        if (data?.mbti) {
            return (
                <div>
                    <Grid container sx={{ marginTop: 2 }} id="mbtiSelected">
                        {data.mbti.map((mbti: string) => <Button variant="contained" key={Math.random().toString()}>{mbti}</Button>)}
                        <SynergyRender percent={data.synergy}></SynergyRender>
                    </Grid>
                    <Typography variant="caption">
                        시너지 지수는 선택했던 MBTI와 함께 계산한 수치입니다. MBTI 궁합 표를 다차원 계산한 결과입니다. <br />
                        😭: 0 ~ 12% <br />
                        😢: 13 ~ 37% <br />
                        😐: 38 ~ 62% <br />
                        🙂: 63 ~ 87% <br />
                        😍: 88 ~ 100%
                    </Typography>
                </div>
            )
        } else if (data?.submitError) {
            return (
                <div>
                    <Typography variant="caption" color="error.light">최소 1명 이상의 MBTI와 1명 이상의 추천 받을 인원을 지정해 주세요</Typography>
                </div>
            )
        }
    }

    const description = `
    잘 맞는 사람과 팀을 만들고 싶으신가요?
    시너지가 가장 높은 MBTI를 추천해 드릴게요.
    `
    return (
        <Stack sx={{ marginTop: 2 }}>
            <Header title="MBTI 친구 찾기" description={description} />
            <Selected submitTips="몇 명이 더 필요한가요?" submitText="추천 받기" submitCallback={submit} isLoading={!isLoading} />
            <DataRender />
        </Stack>
    )
}