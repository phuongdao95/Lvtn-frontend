import { useState } from "react";
import { Box } from "@mui/system";
import { Button, Menu, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function MenuButton({ text, menu, variant = "contained" }) {
    const [anchorElement, setAnchorElement] = useState(null);

    const open = Boolean(anchorElement);

    const handleCloseMenu = () => {
        setAnchorElement(null);
    };

    const handleClickButton = (event) => {
        setAnchorElement(event.currentTarget);
    };

    console.log(menu);

    return (
        <Box>
            <Button
                variant={variant}
                onClick={handleClickButton}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ textTransform: "Capitalize" }}
            >
                {text}
            </Button>
            {
                menu &&
                <Menu
                    anchorEl={anchorElement}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={open}
                    onClose={handleCloseMenu}
                >
                    {menu.map((item) => (
                        <MenuItem key={item.text} onClick={() => { item.handler(); handleCloseMenu(); }}>
                            {item.text}
                        </MenuItem>
                    ))}
                </Menu>
            }
        </Box>
    );
}
