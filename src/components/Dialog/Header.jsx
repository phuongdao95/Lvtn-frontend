import { Typography } from "@mui/material";

export default function Header({ children, ...rest }) {
    return <Typography variant="h5" color="white" component="span" {...rest}>
        {children}
    </Typography>
}