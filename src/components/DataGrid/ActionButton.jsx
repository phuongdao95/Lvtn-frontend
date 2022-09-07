import { Button } from "@mui/material";

export default function ActionButton({ children, ...rest }) {
    return <Button variant="outlined" color="primary" size="small" {...rest} >
        {children}
    </Button>
}