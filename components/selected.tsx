import React from "react"
import { styled } from '@mui/material/styles';

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

export default function Selected(props: { submitTips: string; submitText: string; submitCallback: () => any; }) {
    const [list, setList] = React.useState([])
    function SchemaRender() {
        return (
            <Grid container>
                {
                    schema.map(
                        (mbti) => (
                            <Button key={mbti} variant="outlined" color="secondary" onClick={() => setList(privState => mbtiAppend(privState, mbti))}>{mbti}</Button>
                        )
                    )
                }
            </Grid>
        )
    }
    const MaterialUIField = styled(TextField)(({ theme }) => ({
        "& .MuiOutlinedTextInput": {
            color: theme.palette.mode === "dark" ? "white" : "black",
            backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        }
    }))
    function SelectedRender(props: { label: string; }) {
        if (list.length > 0) {
            return (
                <Grid container id="mbtiSelected">
                    <Grid item={true} xs={12} md={9} sx={{ marginTop: 2 }}>
                        {
                            list.map(selected =>
                                <Button variant="contained" key={selected.key} onClick={() => setList(privState => mbtiSubtract(privState, selected))}>{selected.mbti}</Button>
                            )
                        }
                    </Grid>
                    <Grid sx={{ marginTop: 2 }} offset="auto">
                        <MaterialUIField
                            required
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            variant="outlined"
                            id="personnel"
                            label={props.label}
                            defaultValue="2"
                        />
                    </Grid>
                </Grid>
            )
        }
        else {
            return <p>☝️ MBTI 버튼을 눌러보세요</p>
        }
    }

    function SubmitButton() {
        if (list.length > 0) {
            return (
                <Button sx={{ marginTop: 2 }} variant="contained" color="success" onClick={props.submitCallback}>
                    {props.submitText}
                </Button>
            )
        }
    }

    return (
        <Stack sx={{ marginTop: 2 }}>
            <SchemaRender />
            <SelectedRender label={props.submitTips} />
            <SubmitButton />
        </Stack>
    )
}