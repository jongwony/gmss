
import React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

import Grouper from "./grouper"
import Recommend from "./recommend"
import { Stack } from "@mui/material";

export function Header(props: { title: string; description: string; }) {
    return (
        <div>
            <h1>
                {props.title}
            </h1>
            <Typography variant="subtitle1">
                {props.description}
            </Typography>
        </div>
    )
}

export default function Feature() {
    const [state, setState] = React.useState(1)

    function handleChange() {
        setState((state + 1) % 2)
    }

    function SwitchFeature() {
        switch (state) {
            case 0:
                return <Recommend />
            default:
                return <Grouper />
        }
    }
    return (
        <Stack sx={{ display: 'grid', flexGrow: 1, m: 2 }}>
            <ToggleButtonGroup
                color="primary"
                value={state ? "그룹 나누기" : "친구 찾기"}
                exclusive
                onChange={handleChange}
                aria-label="Category"
            >
                <ToggleButton value="그룹 나누기">그룹 나누기</ToggleButton>
                <ToggleButton value="친구 찾기">친구 찾기</ToggleButton>
            </ToggleButtonGroup>
            {SwitchFeature()}
        </Stack>
    )
}