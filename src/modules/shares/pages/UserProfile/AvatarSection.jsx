import React from "react";
import { useFetchOneUser } from "../../../../client/userService";
import { Avatar, Button, Typography } from "@mui/material";
import { getCurrentUserId } from "../../../../client/autheticationService";
import { Box } from "@mui/system";
import { grey } from "@mui/material/colors";

export default function AvatarSection() {
    const [user, setUser] = React.useState();
    const [isUpdateAvatarOpen, setIsUpdateAvatarOpen] = React.useState(false);

    const {
        isPending,
        isSuccess,
        isError,
        method: fetchUser,
        data: fetchedUser,
    } = useFetchOneUser();

    React.useEffect(() => {
        fetchUser(getCurrentUserId());
    }, []);

    React.useEffect(() => {
        if (isSuccess) {
            setUser(fetchedUser);
        }
    }, [isSuccess])

    return <Box sx={{
        padding: 3,
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        gap: 2
    }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: .7 }}>
            <Avatar sx={{ width: 200, height: 200 }}>
            </Avatar>

            <Button size="small" variant="outlined">
                Cập nhật avatar
            </Button>
        </Box>

        <Box sx={{
            display: 'flex',
            flexDirection: "column",
            gap: 1,
            alignItems: 'center'
        }}>
            <Typography variant="h6" fontWeight={"bold"} color={grey[700]}  >
                {user?.name}
            </Typography>

            <Typography>
                {user?.roleName}
            </Typography>
        </Box>
    </Box>
}