import React, { useState, useEffect } from "react";

import Button from '@mui/material/Button';
import { Grid } from "@mui/material";
import { Stack } from "@mui/material";

import Selected from "./selected";
import { postGrouper } from "./request";
import styles from "../../styles/Home.module.css";

interface MBTI {
    mbti: string[],
    synergy: number,
}

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
            const response = await postGrouper(mbti, personnel)
            console.log(response)
            setData(response)
            setLoading(false)
        }
    }

    useEffect(() => {
        submit().catch(console.error)
    }, [])

    function DataRender() {
        return (
            <div>
                {
                    data.map((mbti: MBTI) => {
                        return (
                            <Grid key={Math.random().toString()} sx={{marginTop: 2}}>
                                {
                                    mbti.mbti.map((x: string) => <Button key={Math.random().toString()} variant="contained" className={styles.mbtiResult}>{x}</Button>)
                                }
                                <Button color="secondary" variant="contained">
                                    시너지 지수: {mbti.synergy}
                                </Button>
                            </Grid>
                        )
                    })
                }
            </div>
        )
    }

    if (isLoading) return <p>Loading...</p>
    return (
        <Stack sx={{ marginTop: 2 }}>
            <Button variant="contained" color="success" onClick={submit}>그룹 나누기</Button>
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
            <h1 className={styles.title}>
                MBTI 그룹 나누기
            </h1>
            <p className={styles.description}>
                가장 시너지가 높은 MBTI 그룹들로 나눠볼게요
            </p>
            <Selected />
            <Response />
        </Stack>
    )
}