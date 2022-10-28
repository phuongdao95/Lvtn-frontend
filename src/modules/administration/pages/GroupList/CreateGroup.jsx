import React, { Fragment } from "react";
import { Box } from "@mui/system";
import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import OneColumnBox from "../../../../components/DialogForm/OneColumnBox"
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../../components/DialogForm/TextField";
import DialogForm from "../../../../components/DialogForm";
import AutoCompleteMultiple from "../../../../components/DialogForm/AutoCompleteMultiple";

import { useFetchListUser } from "../../../../client/userService";

import { useFormik } from "formik";
import { useCreateGroup } from "../../../../client/groupService";
import LoadingOverlay from "../../../../components/LoadingOverlay/LoadingOverlay";

export default function CreateGroup({ reloadList, closeDialogCb }) {
    const [userOptions, setUserOptions] = React.useState([]);
    const {
        isPending: isCreateGroupPending,
        isError: isCreateGroupError,
        isSuccess: isCreateGroupSuccess,
        method: createGroup,
    } = useCreateGroup();

    const {
        isPending: isFetchUserListPending,
        isSuccess: isFetchUserListSuccess,
        method: fetchUserList,
        data: fetchedUsers,
    } = useFetchListUser();

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            users: [],
        },
        onSubmit: (values) => {
            const userIds = values.users.map((user) => (user.id));
            createGroup({ ...values, userIds });
        }

    })

    React.useEffect(() => {
        if (isCreateGroupSuccess) {
            closeDialogCb();
            reloadList();
        }
    }, [isCreateGroupSuccess])

    React.useEffect(() => {
        fetchUserList()
    }, []);

    React.useEffect(() => {
        if (isFetchUserListSuccess) {
            const formatted = fetchedUsers.data.map((user) => ({ id: user.id, name: user.name }))
            setUserOptions(formatted);
        }
    }, [isFetchUserListSuccess])

    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { formik.submitForm(); },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Tạo mới Nhóm"
    >
        <DialogForm>
            <LoadingOverlay isLoading={isCreateGroupPending || isFetchUserListPending} />
            <Box component="form" onSubmit={formik.handleSubmit}>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Tên nhóm"} />
                            <TextField id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                        </Fragment>
                    }
                />

                <OneColumnBox
                    slot={<Fragment>
                        <Label text={"Mô tả"} />
                        <TextField
                            id="description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                    </Fragment>}
                />

                <OneColumnBox
                    slot={<Fragment>
                        <Label text={"Người dùng"} />
                        <AutoCompleteMultiple
                            id="users"
                            name="users"
                            getOptionLabel={(option) => option.name}
                            options={userOptions}
                            value={formik.values.users}
                            onChange={(event, value) => {
                                formik.setFieldValue("users", value);
                            }}
                        />
                    </Fragment>}
                />
            </Box>
        </DialogForm>
    </Dialog >;
}