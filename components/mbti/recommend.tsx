import React, { useState, useEffect } from "react";

import { Stack } from "@mui/material";
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';

import Selected from "./selected";
import { postRecommend } from "./request";
import styles from "../../styles/Home.module.css";


export function Response() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    async function submit() {
        const mbtiSelected = document.getElementById('mbtiSelected')
        const personnelElement: HTMLInputElement = document.getElementById('personnel')
        const mbtiElements = mbtiSelected.getElementsByTagName('button')
        let mbti = Array.from(mbtiElements).map(x => x.innerText)
        let personnel = parseInt(personnelElement.value)

        if (mbti.length > 0) {
            setLoading(true)
            const response = await postRecommend(mbti, personnel)
            setData(response)
            setLoading(false)
        }
    }

    useEffect(() => {
        submit().catch(console.error)
    }, [])

    function DataRender() {
        return (
            <Grid container sx={{ marginTop: 2 }} id="mbtiSelected">
                {data.mbti.map((mbti: string) => <Button variant="contained" key={Math.random().toString()}>{mbti}</Button>)}
                <Button color="secondary" variant="contained">
                    시너지 지수: {data.synergy}
                </Button>
            </Grid>
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
            <h1 className={styles.title}>
                MBTI 친구 찾기
            </h1>
            <p className={styles.description}>
                선택한 친구를 포함해 가장 시너지가 높은 MBTI를 찾아보세요
            </p>
            <Selected />
            <Response />
        </Stack>
    )
}