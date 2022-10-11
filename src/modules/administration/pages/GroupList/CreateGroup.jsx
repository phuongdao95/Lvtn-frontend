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
        data: fetchedUserList,
    } = useFetchListUser();

    const {
        isSuccess: isCreateSuccess,
        method: createGroup,
    } = useCreateGroup();

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            users: [],
        },
        onSubmit: (values) => {

        }
    })

    React.useEffect(() => {
        fetchUserList()
    }, []);

    React.useEffect(() => {
        if (isFetchUserListSuccess) {
            const formatted = fetchedUserList.data.map((user) => ({ id: user.id, name: user.name }))
            setUserOptions(formatted);
        }
    }, [])


    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { formik.submitForm(); },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Tạo mới Department"
    >
        <DialogForm>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Tên Department"} />
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

                {/* <OneColumnBox
                    slot={<Fragment>
                        <Label text={"Teams"} />
                        <AutoCompleteMultiple
                            getOptionLabel={(option) => option.name}
                            options={teamOptions}
                            value={formik.values.teams}
                            onChange={(event, value) => {
                                formik.setFieldValue("teams", value)
                            }}
                        />
                    </Fragment>}
                /> */}

                <OneColumnBox
                    slot={<Fragment>
                        <Label text={"Description"} />
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