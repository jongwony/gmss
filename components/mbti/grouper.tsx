import React, { useState, useEffect } from "react";

import Button from '@mui/material/Button';

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
                            <div>
                                {
                                    mbti.mbti.map((x: string) => <Button key={x}>{x}</Button>)
                                }
                                <p>{mbti.synergy}</p>
                                <br />
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    if (isLoading) return <p>Loading...</p>
    return (
        <div>
            <Button onClick={submit}>그룹 나누기</Button>
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
                MBTI 그룹 나누기
            </h1>
            <p className={styles.description}>
                MBTI 의 가장 시너지가 높은 그룹으로 나눠볼게요
            </p>
            <Selected />
            <hr />
            <Response />
        </div>
    )
}