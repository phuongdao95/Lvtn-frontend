import { Button } from "@mui/material";

export default function ActionButton({ children, variant = "outlined", color = "primary", ...rest }) {
    return <Button variant={variant} color={color} size="small" {...rest} >
        {children}
    </Button>
}