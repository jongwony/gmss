import React, { useState, useEffect } from "react";

import { Stack } from "@mui/material";
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

import Selected from "./selected";
import { postTeam } from "./request";
import { fetchOnlySelectedData } from "./formSelector";
import { SynergyRender, SummaryRender } from "./utils/synergyIndex";


export default function Team() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    async function submit() {
        const { mbti } = fetchOnlySelectedData()
        if (mbti.length > 1) {
            setLoading(true)
            const response = await postTeam(mbti)
            setData(response)
            setLoading(false)
        } else {
            setData({ submitError: true })
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
        if (data?.submitError) {
            return (
                <div>
                    <Typography variant="caption" color="error.light">최소 2명 이상의 MBTI를 지정해 주세요</Typography>
                </div>
            )
        } else if (data?.synergy >= 0 && data?.summary) {
            return (
                <div>
                    <SummaryRender summary={data.summary}></SummaryRender>

                    <Grid container sx={{ marginTop: 2 }} id="mbtiSelected">
                        <SynergyRender percent={data.synergy}></SynergyRender>
                    </Grid>

                    <Typography variant="caption">
                        시너지 지수는 선택했던 MBTI의 모든 경우의 수를 계산한 수치입니다. MBTI 궁합 표를 다차원 계산한 결과입니다.<br />
                        😭: 0 ~ 12% <br />
                        😢: 13 ~ 37% <br />
                        😐: 38 ~ 62% <br />
                        🙂: 63 ~ 87% <br />
                        😍: 88 ~ 100%
                    </Typography>
                </div>
            )
        }
    }

    const title = "우리 팀 MBTI 궁합 점수"
    const description = `
    우리 팀의 MBTI 는 얼마나 잘 맞을까요?
    팀에 속한 사람들의 MBTI를 눌러보세요.
    `
    return (
        <Stack sx={{ marginTop: 2 }}>
            <h1>{title}</h1>
            <Typography variant="subtitle1">{description}</Typography>
            <Selected submitTips="" submitText="시너지 점수 보기" submitCallback={submit} isLoading={!isLoading} />
            <DataRender />
        </Stack>
    )
}