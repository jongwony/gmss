import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function SynergyRange(percent: number) {
    // 0 ~ 100 구간에서 0 ~ 12, 13 ~ 37, 38 ~ 62, 63 ~ 87, 88 ~ 100 구간으로 나누기
    // 구간 데이터를 이모지로 표현 (😭: 0 ~ 12%, 😢: 13 ~ 37%, 😐: 38 ~ 62%, 🙂: 63 ~ 87%, 😍: 88 ~ 100%)
    if (percent <= 12) {
        return {'score': percent, 'emoji': '😭'}
    } else if (percent <= 37) {
        return {'score': percent, 'emoji': '😢'}
    } else if (percent <= 62) {
        return {'score': percent, 'emoji': '😐'}
    } else if (percent <= 87) {
        return {'score': percent, 'emoji': '🙂'}
    } else {
        return {'score': percent, 'emoji': '😍'}
    }
}

export function SynergyRender(props: {percent: number}) {
    // SynergyRange 함수를 통해 button 렌더링
    const { score, emoji } = SynergyRange(props.percent)
    return (
        <Button color="secondary" variant="contained">
            시너지 지수: {emoji} {score}%
        </Button>
    )
}

export function SummaryRender(props: { summary: { [key: string]: number } }) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableBody>
                    <TableRow
                        key="EI"
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell>E: {Math.round(props.summary['E'])}%</TableCell>
                        <TableCell>I: {Math.round(props.summary['I'])}%</TableCell>
                    </TableRow>
                    <TableRow
                        key="NS"
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell>N: {Math.round(props.summary['N'])}%</TableCell>
                        <TableCell>S: {Math.round(props.summary['S'])}%</TableCell>
                    </TableRow>
                    <TableRow
                        key="TF"
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell>T: {Math.round(props.summary['T'])}%</TableCell>
                        <TableCell>F: {Math.round(props.summary['F'])}%</TableCell>
                    </TableRow>
                    <TableRow
                        key="NS"
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell>P: {Math.round(props.summary['P'])}%</TableCell>
                        <TableCell>J: {Math.round(props.summary['J'])}%</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}