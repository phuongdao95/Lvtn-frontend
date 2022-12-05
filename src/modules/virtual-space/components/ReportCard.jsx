import { Card, Typography } from "@mui/material";

export default function ReportCard({ name, value }) {
    return <Card sx={{
        width: 150, height: 150,
        boxShadow: "0 3px 3px 3px rgba(0,0,0,0.2)",
        padding: 2,
    }} >
        <Typography fontWeight={"bold"} variant="h5">{value}</Typography>
        <Typography >{name}</Typography>
    </Card>;
}