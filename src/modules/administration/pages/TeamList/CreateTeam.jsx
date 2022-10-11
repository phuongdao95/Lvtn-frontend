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
import { useCreateTeam } from "../../../../client/teamService";
import { useFetchListDepartment } from "../../../../client/departmentService";
import AutoComplete from "../../../../components/DialogForm/AutoComplete";


export default function CreateTeam({ closeDialogCb }) {
    const [userOptions, setUserOptions] = React.useState([]);
    const [departmentOptions, setDepartmentOptions] = React.useState([]);

    const {
        data: fetchedDepartments,
        method: fetchDepartments,
    } = useFetchListDepartment();

    const {
        isSuccess,
        method: fetchUsers,
        data: fetchedUsers
    } = useFetchListUserWithNoTeam();

    const {
        method: createTeam,
    } = useCreateTeam();

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
            leader: { id: null, name: "" },
            members: [],
            department: { id: null, name: "" },
        },
        onSubmit: (values) => {
            const memberIds = values.members.map((member) => (member.id))
            const leaderId = values.leader.id;
            const departmentId = values.department.id;

            const { leader, members, department, ...formData } = values;

            console.log(memberIds)

            createTeam({
                ...formData,
                memberIds,
                leaderId,
                departmentId
            });
        }
    })

    React.useEffect(() => {
        fetchDepartments();
    }, []);

    React.useEffect(() => {
        if (fetchedDepartments) {
            const departmentOptions = fetchedDepartments.data
                .map((department) => ({ id: department.id, name: department.name }));

            setDepartmentOptions(departmentOptions);
        }
    }, [fetchedDepartments])

    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => {
                formik.submitForm();
            },
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
                            <AutoComplete
                                id="department"
                                name="department"
                                value={formik.values.department}
                                options={departmentOptions}
                                onChange={(event, value) => formik.setFieldValue("department", value)}
                            />
                        </Fragment>
                    }
                />

                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Leader"} />
                            <AutoComplete
                                id="leader"
                                name="leader"
                                options={userOptions}
                                value={formik.values.leader}
                                onChange={(event, value) => formik.setFieldValue("leader", value)}
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