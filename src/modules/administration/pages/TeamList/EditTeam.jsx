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
import AutoComplete from "../../../../components/DialogForm/AutoComplete";

import { useFormik } from "formik";
import { useFetchListUserWithNoTeam } from "../../../../client/userService";
import { useFetchOneTeam, useUpdateTeam } from "../../../../client/teamService";
import { useFetchListDepartment } from "../../../../client/departmentService";
import LoadingOverlay from "../../../../components/LoadingOverlay/LoadingOverlay";

const getOptionLabel = (option) => {
    return option.name;
}

const isOptionEqualToValue = (option, value) => {
    return option.id === value.id
}

export default function EditTeam({ closeDialogCb, teamId }) {
    const [userOptions, setUserOptions] = React.useState([]);
    const [departmentOptions, setDepartmentOptions] = React.useState([]);

    const {
        isPending: isFetchListUserWithNoTeamPending,
        isSuccess: isFetchListUserWithNoTeamSuccess,
        method: fetchUsers,
        data: fetchedUsers
    } = useFetchListUserWithNoTeam();

    const {
        isPending: isFetchDepartmentPending,
        isSuccess: isFetchDepartmentsSuccess,
        method: fetchDepartments,
        data: departments
    } = useFetchListDepartment();

    const {
        isPending: isFetchPending,
        isSuccess: isFetchSuccess,
        method: fetchTeam,
        data: fetchedTeam,
    } = useFetchOneTeam();

    const {
        isPending: isUpdateTeamPending,
        isSuccess: isUpdateTeamSuccess,
        method: updateTeam,
    } = useUpdateTeam();


    React.useEffect(() => {
        fetchUsers();
        fetchTeam(teamId);
        fetchDepartments();
    }, [isUpdateTeamSuccess])

    React.useEffect(() => {
        if (isFetchDepartmentsSuccess) {
            setDepartmentOptions(departments.data)
        }
    }, [isFetchDepartmentsSuccess])

    React.useEffect(() => {
        if (isFetchListUserWithNoTeamSuccess) {
            const userOptions = fetchedUsers.data
                .map((user) => ({ id: user.id, name: user.name }))
            setUserOptions(userOptions);
        }
    }, [isFetchListUserWithNoTeamSuccess])


    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            leader: { id: 0, name: "None" },
            members: [],
            department: { id: 0, name: "None" },
        },
        onSubmit: (values) => {
            const leaderId = values.leader.id;
            const memberIds = values.members.map((member) => member.id);
            const departmentId = values.department.id;

            updateTeam(teamId, { ...values, leaderId, departmentId, memberIds, detail: values.description });
        }
    })

    React.useEffect(() => {
        if (isFetchSuccess) {
            const members = fetchedTeam.memberIds.map((value, index, array) =>
            ({
                id: fetchedTeam.memberIds[index],
                name: fetchedTeam.memberNames[index]
            }))

            formik.setValues({
                ...(fetchedTeam),
                department: {
                    id: fetchedTeam.departmentId,
                    name: fetchedTeam.departmentName
                },
                leader: {
                    id: fetchedTeam.leaderId,
                    name: fetchedTeam.leaderName
                },
                members: members
            })
        }
    }, [isFetchSuccess])

    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { formik.submitForm() },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Chỉnh sửa Team"
    >
        <DialogForm>
            <LoadingOverlay isLoading={isUpdateTeamPending || isFetchDepartmentPending || isFetchListUserWithNoTeamPending} />
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
                                getOptionLabel={getOptionLabel}
                                isOptionEqualToValue={isOptionEqualToValue}
                                name="department"
                                value={formik.values.department}
                                onChange={(event, value) => {
                                    console.log(event.target.value);
                                    formik.setFieldValue("department", value)
                                }}
                                options={departmentOptions}
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
                                getOptionLabel={getOptionLabel}
                                isOptionEqualToValue={isOptionEqualToValue}
                                value={formik.values.leader}
                                onChange={(event, value) => {
                                    console.log(event.target.value);
                                    formik.setFieldValue("leader", value)
                                }}
                                options={userOptions}
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