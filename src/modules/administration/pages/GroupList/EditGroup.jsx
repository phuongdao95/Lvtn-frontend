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
import { useFetchOneGroup, useFetchUsersOfGroup, useUpdateGroup } from "../../../../client/groupService";
import LoadingOverlay from "../../../../components/LoadingOverlay/LoadingOverlay";

export default function EditGroup({ groupId, closeDialogCb }) {
    const [userOptions, setUserOptions] = React.useState([]);

    const {
        isPending: isFetchOnePending,
        isSuccess: isFetchOneSuccess,
        method: fetchOne,
        data: fetchedOne,
    } = useFetchOneGroup();

    const {
        isPending: isFetchUserListPending,
        isSuccess: isFetchUserListSuccess,
        method: fetchUserList,
        data: fetchedUserList,
    } = useFetchListUser();

    const {
        isPending: isUpdateGroupPending,
        isSuccess: isUpdateGroupSuccess,
        method: updateGroup,
        data: groups,
    } = useUpdateGroup();

    const {
        isSuccess: isGroupUsersSuccess,
        isPending: isGroupUsersPending,
        isError: isGroupUsersError,
        method: fetchGroupUsers,
        data: groupUsers,
    } = useFetchUsersOfGroup();

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            users: [],
        },
        onSubmit: (values) => {
            const userIds = values.users.map((user) => user.id);
            updateGroup(groupId, {
                ...values,
                userIds,
            });
        }
    })

    React.useEffect(() => {
        fetchUserList()
        fetchGroupUsers(groupId);
        fetchOne(groupId);
    }, [isUpdateGroupSuccess]);

    React.useEffect(() => {
        if (isFetchOneSuccess) {
            formik.setFieldValue('name', fetchedOne.name);
            formik.setFieldValue('description', fetchedOne.description);
        }
    }, [isFetchOneSuccess])

    React.useEffect(() => {
        if (isFetchUserListSuccess) {
            const formatted = fetchedUserList
                .data.map((user) => ({ id: user.id, name: `${user.name} (${user.username})` }))
            setUserOptions(formatted);
        }
    }, [isFetchUserListSuccess])

    React.useEffect(() => {
        if (isGroupUsersSuccess) {
            const users = groupUsers.data.map((user) => ({
                id: user.id,
                name: `${user.name} (${user.username})`
            }))

            formik.setFieldValue('users', users);
        }
    }, [isGroupUsersSuccess])

    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { formik.submitForm(); },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Chỉnh sửa Nhóm"
    >
        <DialogForm>
            <LoadingOverlay isLoading={isFetchOnePending || isFetchUserListPending ||
                isUpdateGroupPending || isGroupUsersPending} />
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
                        <Label text={"Users"} />
                        <AutoCompleteMultiple
                            getOptionLabel={(option) => option.name}
                            options={userOptions}
                            value={formik.values.users}
                            onChange={(event, value) => {
                                formik.setFieldValue("users", value)
                            }}
                        />
                    </Fragment>}
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
            </Box>
        </DialogForm>
    </Dialog >;
}