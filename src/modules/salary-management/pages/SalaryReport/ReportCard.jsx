import { Card, Typography } from "@mui/material";

export default function ReportCard({ name, value }) {
    return <Card sx={{
        width: 200, height: 150,
        boxShadow: "0 2px 2px 2px rgba(0,0,0,0.3)",
        padding: 2,
    }} >
        <Typography fontWeight={"bold"} variant='h6' style={{ wordWrap: "break-word" }}
        >{value}</Typography>
        <Typography >{name}</Typography>
    </Card>;
}