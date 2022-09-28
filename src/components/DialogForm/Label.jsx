import { Typography } from "@mui/material"
import { grey } from "@mui/material/colors"

export default function Label({ text, required }) {
    return <Typography
        sx={{
            fontWeight: "550",
            color: grey[700],
            fontSize: 14
        }}
    >
        {text}{required ? " *" : "" }
    </Typography>

}