import React from "react"

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { schema } from "./schema";
import { Grid } from "@mui/material";
import { Stack } from "@mui/material";

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
    function SchemaRender() {
        return (
            <Grid container>
                {
                    schema.map(
                        (mbti) => (
                            <Button key={mbti} variant="outlined" onClick={() => setList(privState => mbtiAppend(privState, mbti))}>{mbti}</Button>
                        )
                    )
                }
            </Grid>
        )
    }
    function SelectedRender() {
        if (list.length > 0) {
            return (
                <Grid container id="mbtiSelected">
                    <Grid xs={12} md={9} sx={{ marginTop: 2}}>
                        {
                            list.map(selected =>
                                <Button variant="contained" key={selected.key} onClick={() => setList(privState => mbtiSubtract(privState, selected))}>{selected.mbti}</Button>
                            )
                        }

                    </Grid>
                    <Grid sx={{ marginTop: 2}} Offset="auto">
                        <TextField
                            required
                            sx={{ input: { color: "whitesmoke" }, label: { color: "whitesmoke" } }}
                            id="personnel"
                            label="몇 명이 필요하세요?"
                            defaultValue="2"
                        />
                    </Grid>
                </Grid>
            )
        }
    }
    return (
        <Stack>
            <SchemaRender />
            <SelectedRender />
        </Stack>
    )
}