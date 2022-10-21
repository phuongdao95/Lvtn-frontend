import React, { Fragment } from "react";
import { Box } from "@mui/system";
import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import OneColumnBox from "../../../../components/DialogForm/OneColumnBox"
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../../components/DialogForm/TextField";
import DialogForm from "../../../../components/DialogForm";
import AutoCompleteMultiple from "../../../../components/DialogForm/AutoCompleteMultiple";
import AutoComplete from "../../../../components/DialogForm/AutoComplete";

import { useFetchListUser } from "../../../../client/userService";

import { useFormik } from "formik";
import { useCreateGroup } from "../../../../client/groupService";

export default function CreateGroup({ closeDialogCb }) {
    const [userOptions, setUserOptions] = React.useState([]);

    const {
        isSuccess: isFetchUserListSuccess,
        method: fetchUserList,
        data: fetchedUsers,
    } = useFetchListUser();

    const {
        isPending,
        isError,
        isSuccess,
        method: createGroup,
    } = useCreateGroup();

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            users: [],
        },
        onSubmit: (values) => {
            createGroup(values);
        }
    })

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