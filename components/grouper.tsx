import React, { useState, useEffect } from "react";

import Button from '@mui/material/Button';
import { Grid } from "@mui/material";
import { Stack } from "@mui/material";

import Selected from "./selected";
import { postGrouper } from "./request";
import { fetchFormData } from "./formSelector";

interface MBTI {
    mbti: string[],
    synergy: number,
}

export function Response() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    async function submit() {
        const {mbti, personnel} = fetchFormData()
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
                <small>시너지 지수는 2명일 경우 3이 가장 높습니다</small>
            </div>
        )
    }

    if (isLoading) return <p>Loading...</p>
    return (
        <Stack sx={{ marginTop: 2 }}>
            <Button sx={{ flex: 1 }} variant="contained" color="success" onClick={submit}>그룹 나누기</Button>
            {
                !data
                    ? <p>No MBTI data</p>
                    : <DataRender />
            }
        </Stack>
    )
}

export default function Grouper() {
    return (
        <Stack>
            <Selected submitTips="몇 명으로 나눌까요?" />
            <Response />
        </Stack>
    )
}