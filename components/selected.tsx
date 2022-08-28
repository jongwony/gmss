import React from "react"
import { styled } from '@mui/material/styles';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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

export default function Selected(props: { submitTips: string; submitText: string; submitCallback: () => any; isLoading: boolean }) {
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
                            placeholder="숫자를 입력해 주세요."
                        />
                    </Grid>
                </Grid>
            )
        }
        else {
            return <Typography variant="subtitle1">☝️ MBTI 버튼을 눌러보세요</Typography>
        }
    }

    function SelectedTips() {
        if (list.length > 0) {
            return <Typography variant="caption">여러 번 눌러 중복 추가할 수도 있고 추가한 버튼을 다시 눌러서 지울 수도 있어요.</Typography>
        }
    }

    function SubmitButton() {
        if (list.length > 0 && props.isLoading) {
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
            <SelectedTips />
            <SubmitButton />
        </Stack>
    )
}