import React from "react"

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';

import { schema } from "./schema";
import styles from "../../styles/Home.module.css";

interface Selected {
    key: number;
    mbti: string;
}

function mbtiAppend(privState: Selected[], mbti: string) {
    let selected: Selected = {
        key: Date.now(),
        mbti: mbti
    }
    return [...privState, selected]
}

function mbtiSubtract(privState: Selected[], selected: Selected) {
    return privState.filter(s => s.key !== selected.key)
}

export default function Selected() {
    const [list, setList] = React.useState([])
    function SelectedRender() {
        if (list.length > 0) {
            return (
                <div id="mbtiSelected">
                    {
                        list.map(selected =>
                            <Button variant="contained" className={styles.mbtiSelected} key={selected.key} onClick={() => setList(privState => mbtiSubtract(privState, selected))}>{selected.mbti}</Button>
                        )
                    }
                    <br />
                    <TextField
                        required
                        sx={{ input: { color: "white" }, label: { color: "white" } }}
                        color="primary"
                        variant="outlined"
                        id="personnel"
                        label="몇 명이 필요하세요?"
                        defaultValue="2"
                    />
                </div>
            )
        }
    }
    return (
        <div>
            <ButtonGroup>
                {
                    schema.map(
                        mbti => <Button key={mbti} onClick={() => setList(privState => mbtiAppend(privState, mbti))}>{mbti}</Button>
                    )
                }
            </ButtonGroup>
            <SelectedRender />
        </div>
    )
}