import React from "react";
import { useFetchOneUser } from "../../../../client/userService";
import { Avatar, Button, Typography } from "@mui/material";
import { getCurrentUserId } from "../../../../client/autheticationService";
import { Box } from "@mui/system";
import { blue, grey } from "@mui/material/colors";
import UpdateAvatar from "./UpdateAvatar";

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

        {isUpdateAvatarOpen && <UpdateAvatar closeDialogCb={() => {
            setIsUpdateAvatarOpen(false)
            fetchUser(getCurrentUserId());
        }} />}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: .7 }}>

            <Avatar sx={{ width: 200, height: 200, border: `8px solid ${blue[400]}` }} src={fetchedUser?.urlImage}>
            </Avatar>

            <Button size="small" variant="outlined" onClick={() => setIsUpdateAvatarOpen(true)}>
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