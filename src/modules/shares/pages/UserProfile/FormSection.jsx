import React from "react";
import { Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { getCurrentUserId } from "../../../../client/autheticationService";
import { useFetchOneUser } from "../../../../client/userService";
import Label from "../../../../components/DialogForm/Label";
import LoadingOverlay from "../../../../components/LoadingOverlay/LoadingOverlay";
import dayjs from "dayjs";
import EditProfile from "./EditProfile";


export default function FormSection() {
    const [user, setUser] = React.useState();
    const [isUpdateProfileOpen, setIsUpdateProfileOpen] = React.useState(false);

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
        display: "flex",
        gap: 1.25,
        flexDirection: "column"
    }}>
        <LoadingOverlay isLoading={isPending} />

        {isUpdateProfileOpen &&
            <EditProfile
                closeDialogCb={() => {
                    setIsUpdateProfileOpen(false);
                    fetchUser(getCurrentUserId());
                }}
                userId={getCurrentUserId()} />
        }

        {isSuccess &&
            <>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: 18, color: grey[700] }}>
                        Thông tin cơ bản
                    </Typography>

                    <Button size="small" onClick={() => { setIsUpdateProfileOpen(true); }}>
                        Cập nhật
                    </Button>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 3
                }}>
                    <Box sx={{ minWidth: '300px' }}>
                        <Label text={"Họ và Tên"} />
                        {user?.name ?? "unset"}
                    </Box>

                    <Box >
                        <Label text={"Email"} />
                        {user?.email ?? "unset"}
                    </Box>
                </Box>

                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 3
                }}>
                    <Box sx={{ minWidth: '300px' }}>
                        <Label text={"Tuổi"} />
                        {user?.birthday ? dayjs().get('year') - (dayjs(user?.birthday).get('year')) : "unset"}
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                        <Label text={"Ngày sinh"} />
                        {user?.birthday ? dayjs(user?.birthday).format('DD/MM/YYYY') : 'unset'}
                    </Box>
                </Box>


                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 3
                }}>

                    <Box sx={{ minWidth: '300px' }}>
                        <Label text={"Số điện thoại"} />
                        {user?.phoneNumber ?? "unset"}
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                        <Label text={"Giới tính"} />
                        {user?.gender === "male" ? "Nam" : user?.gender === "female" ? "Nữ" : "Chưa gán"}
                    </Box>
                </Box>

                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 3
                }}>
                    <Box sx={{ minWidth: '300px' }}>
                        <Label text={"Căn cước công dân"} />
                        {user?.citizenId ?? "unset"}
                    </Box>

                    <Box>
                        <Label text={"Địa chỉ"} />
                        {user?.address ?? "unset"}
                    </Box>
                </Box>

                <Box>
                    <Typography sx={{ fontWeight: 'bold', fontSize: 18, color: grey[700] }}>
                        Thông tin lương
                    </Typography>

                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 3
                    }}>

                        <Box sx={{ minWidth: '300px' }}>
                            <Label text={"Tên ngân hàng"} />
                            {user?.bankName ?? "unset"}
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                            <Label text={"Số tài khoản"} />
                            {user?.accountNumber ?? "unset"}
                        </Box>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 3
                    }}>

                        <Box sx={{ minWidth: '300px' }}>
                            <Label text={"Chi nhánh"} />
                            {user?.bankBranch ?? "unset"}
                        </Box>
                    </Box>
                </Box>


                <Box>
                    <Typography sx={{ fontWeight: 'bold', fontSize: 18, color: grey[700] }}>
                        Thông tin hành chính
                    </Typography>

                    <Box>
                        <Label text={"Chức vụ"} />
                        {user?.roleName ?? 'unset'}
                    </Box>

                    <Box>
                        <Label text={"Department"} />
                        {user?.departmentName ?? 'unset'}
                    </Box>
                </Box>
                <Box>
                    <Label text={"Team"} />
                    {user?.teamName ?? 'unset'}
                </Box>
            </>
        }
    </Box >
}