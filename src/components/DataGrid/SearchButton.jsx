import { Button } from "@mui/material";

export default function SearchButton({ ...rest }) {
    return <Button {...rest} sx={{ fontWeight: 550, fontSize: 15 }} variant="outlined"> Search</Button>
}