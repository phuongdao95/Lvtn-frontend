import React from "react";
import { Fragment } from "react";
import { Box } from "@mui/system";
import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../../components/DialogForm/TextField";
import DialogForm from "../../../../components/DialogForm";
import OneColumnBox from "../../../../components/DialogForm/OneColumnBox";
import AutoCompleteMultiple from "../../../../components/DialogForm/AutoCompleteMultiple";

import { useFormik } from "formik";
import { useFetchListUserWithNoTeam } from "../../../../client/userService";


export default function CreateTeam({ closeDialogCb }) {
    const [userOptions, setUserOptions] = React.useState([]);

    const {
        isPending,
        isSuccess,
        isError,
        method: fetchUsers,
        data: fetchedUsers
    } = useFetchListUserWithNoTeam();

    React.useEffect(() => {
        fetchUsers();
    }, [])

    React.useEffect(() => {
        if (isSuccess) {
            const userOptions = fetchedUsers.data
                .map((user) => ({ id: user.id, name: user.name }))
            setUserOptions(userOptions);
        }
    }, [isSuccess])

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            leader: "",
            members: [],
            department: "",
        },
        onSubmit: (values) => {

        }
    })

    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Tạo mới team"
    >
        <DialogForm>
            <Box>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Name"} />
                            <TextField
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Label text={"Department"} />
                            <TextField
                                id="department"
                                name="department"
                                value={formik.values.department}
                                onChange={formik.handleChange}
                            />
                        </Fragment>
                    }
                />

                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Leader"} />
                            <TextField
                                id="leader"
                                name="leader"
                                value={formik.values.leader}
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
                    slot={
                        <Fragment>
                            <Label text={"Description"} />
                            <TextField
                                multiline
                                id="description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                            />
                        </Fragment>
                    }
                />

                <OneColumnBox
                    slot={
                        <Fragment>
                            <Label text={"Members"} />
                            <AutoCompleteMultiple
                                value={formik.values.members}
                                onChange={(event, value) => {
                                    console.log(event.target.value);
                                    formik.setFieldValue("members", value)
                                }}
                                options={userOptions}
                            />
                        </Fragment>
                    }
                />

            </Box>
        </DialogForm>
    </Dialog >;
}