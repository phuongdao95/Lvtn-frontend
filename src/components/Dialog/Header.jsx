import { Typography } from "@mui/material";

export default function Header({ children}) {
    return <Typography variant="h5" color="white" component="span">
        {children}
    </Typography>
}