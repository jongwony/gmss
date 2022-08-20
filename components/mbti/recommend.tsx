import React, { useState, useEffect } from "react";

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
            <div key={Math.random().toString()}>
                {data.mbti.map((mbti: string) => <Button color="success" className={styles.mbtiSelected} variant="contained" key={Math.random().toString()}>{mbti}</Button>)}
                <Button color="secondary" className={styles.mbtiSelected} variant="contained">
                    시너지 지수: {data.synergy}
                </Button>
            </div>
        )
    }

    if (isLoading) return <p>Loading...</p>
    return (
        <div>
            <Button onClick={submit}>추천 받기</Button>
            <hr />
            {
                !data
                    ? <p>No MBTI data</p>
                    : <DataRender />
            }
        </div>
    )
}

export default function Recommend() {
    return (
        <div>
            <h1 className={styles.title}>
                MBTI 친구 찾기
            </h1>
            <p className={styles.description}>
                선택한 친구를 포함해 가장 시너지가 높은 MBTI를 찾아보세요
            </p>
            <Selected />
            <hr />
            <Response />
        </div>
    )
}