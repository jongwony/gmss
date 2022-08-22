import React, { useState, useEffect } from "react";

import Button from '@mui/material/Button';
import { Grid } from "@mui/material";
import { Stack } from "@mui/material";

import Selected from "./selected";
import { Header } from "./category";
import { postGrouper } from "./request";
import { fetchFormData } from "./formSelector";

interface MBTI {
    mbti: string[],
    synergy: number,
}

export default function Grouper() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    async function submit() {
        const { mbti, personnel } = fetchFormData()
        if (mbti.length > 0) {
            setLoading(true)
            const response = await postGrouper(mbti, personnel)
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
        if (isLoading) return <p>Loading...</p>
        if (data) {
            return (
                <div>
                    {
                        data.map((mbti: MBTI) => {
                            return (
                                <Grid key={Math.random().toString()} sx={{ marginTop: 2 }}>
                                    {
                                        mbti.mbti.map((x: string) => <Button key={Math.random().toString()} variant="contained">{x}</Button>)
                                    }
                                    <Button color="secondary" variant="contained">
                                        시너지 지수: {mbti.synergy}
                                    </Button>
                                </Grid>
                            )
                        })
                    }
                    <small>MBTI 궁합 표를 다차원 계산한 결과입니다. 두 명일 경우 3이 가장 높은 수치입니다.</small>
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