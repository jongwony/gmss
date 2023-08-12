import React, { useState, useEffect } from "react";

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";
import { Stack } from "@mui/material";

import Selected from "./selected";
import { Header } from "./category";
import { postGrouper } from "./request";
import { fetchFormData } from "./formSelector";
import { SynergyRender } from "./utils/synergyIndex";

interface MBTI {
    mbti: string[],
    synergy: number,
}

export default function Grouper() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    async function submit() {
        const { mbti, personnel } = fetchFormData()
        if (mbti.length > 1 && personnel > 1) {
            setLoading(true)
            const response = await postGrouper(mbti, personnel)
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
        if (data instanceof Array) {
            return (
                <div>
                    {
                        data.map((mbti: MBTI) => {
                            return (
                                <Grid key={Math.random().toString()} sx={{ marginTop: 2 }}>
                                    {
                                        mbti.mbti.map((x: string) => <Button key={Math.random().toString()} variant="contained">{x}</Button>)
                                    }
                                    <SynergyRender percent={mbti.synergy}></SynergyRender>
                                </Grid>
                            )
                        })
                    }
                    <Typography variant="caption">
                        MBTI 궁합 표를 다차원 계산하여 나온 최적의 결과입니다. <br />
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
                    <Typography variant="caption" color="error.light">최소 2명 이상의 MBTI와 한 팀이 2명 이상으로 구성되도록 지정해 주세요</Typography>
                </div>
            )
        }
    }

    const description = `
    조직이나 모임에서 팀을 나눌 때, 조별 과제에서 조를 짤 때 사용해보세요.
    MBTI 시너지가 가장 높은 팀으로 나누어 볼게요.
    `
    return (
        <Stack sx={{ marginTop: 2 }}>
            <Header title="MBTI 그룹 나누기" description={description} />
            <Selected submitTips="한 팀의 인원은 몇 명인가요?" submitText="그룹 나누기" submitCallback={submit} isLoading={!isLoading} />
            <DataRender />
        </Stack>
    )
}