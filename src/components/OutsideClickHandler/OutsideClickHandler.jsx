import { ClickAwayListener } from "@mui/material";

export default function OutsideClickHandler({ children, ...rest }) {
    return <ClickAwayListener {...rest}>
        {children}
    </ClickAwayListener>;
}