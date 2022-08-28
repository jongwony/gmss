
import React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

import Grouper from "./grouper"
import Recommend from "./recommend"
import OurSynergy from "./synergy"
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
    const [state, setState] = React.useState('0')

    function handleChange(event: React.MouseEvent<HTMLElement>, value: string) {
        if (value !== null) {
            setState(value)
        }
    }

    function SwitchFeature() {
        switch (state) {
            case '1':
                return <Recommend />
            case '2':
                return <Grouper />
            default:
                return <OurSynergy />
        }
    }
    return (
        <Stack sx={{ display: 'grid', flexGrow: 1, m: 2 }}>
            <ToggleButtonGroup
                color="primary"
                value={state}
                exclusive
                onChange={handleChange}
                aria-label="Category"
            >
                <ToggleButton value="0">우리 팀 점수는?</ToggleButton>
                <ToggleButton value="1">그룹 나누기</ToggleButton>
                <ToggleButton value="2">친구 찾기</ToggleButton>
            </ToggleButtonGroup>
            {SwitchFeature()}
        </Stack>
    )
}