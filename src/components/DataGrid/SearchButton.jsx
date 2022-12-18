import { Button } from "@mui/material";

export default function SearchButton({ ...rest }) {
    return <Button {...rest} size="small" sx={{ fontWeight: 550 }} variant="outlined">
        Tìm kiếm
    </Button>
}