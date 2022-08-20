import React from "react"

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';

import { schema } from "./schema";

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
    return (
        <div>
            <ButtonGroup>
                {
                    schema.map(
                        mbti => <Button key={mbti} onClick={() => setList(privState => mbtiAppend(privState, mbti))}>{mbti}</Button>
                    )
                }
            </ButtonGroup>
            <hr />
            <div id="mbtiSelected">
                {
                    list.map(selected =>
                        <Button variant="contained" key={selected.key} onClick={() => setList(privState => mbtiSubtract(privState, selected))}>{selected.mbti}</Button>
                    )
                }
            </div>
            <div>
                <TextField
                    required
                    id="personnel"
                    label="Required"
                    defaultValue="1"
                />
            </div>
        </div>
    )
}