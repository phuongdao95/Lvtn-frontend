import { Dialog as MuiDialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Box } from "@mui/system";
import Header from "./Header";

const DEFAULT_ACTION = null;

export default function Dialog({
    title,
    primaryAction = DEFAULT_ACTION,
    secondaryAction = DEFAULT_ACTION,
    tertiaryAction = DEFAULT_ACTION,
    maxWidth = '680px',
    children
}) {
    return (
        <MuiDialog
            open={true}
            onClose={() => { }}
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: maxWidth,
                        position: "relative"
                    },
                },
            }}

        >
            <DialogTitle bgcolor={blue[500]} mb={2}>
                <Header>
                    {title}
                </Header>
            </DialogTitle>

            <Box sx={{ padding: 2 }}>
                {children}
            </Box>

            <DialogActions>
                {
                    tertiaryAction &&
                    <Button onClick={tertiaryAction.handler} autoFocus>
                        {tertiaryAction.text}
                    </Button>
                }
                {
                    secondaryAction &&
                    <Button onClick={secondaryAction.handler}>
                        {secondaryAction.text}
                    </Button>
                }

                {
                    primaryAction &&
                    <Button onClick={primaryAction.handler} autoFocus variant="contained">
                        {primaryAction.text}
                    </Button>
                }
            </DialogActions>
        </MuiDialog>
    );
}
