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

import { useFormik } from "formik";
import { useFetchTeamListWithoutDepartment } from "../../../../client/teamService";
import { useFetchListUserWhoIsManager } from "../../../../client/userService";

import { useCreateDepartment, useFetchListDepartment } from "../../../../client/departmentService";
import LoadingOverlay from "../../../../components/LoadingOverlay/LoadingOverlay";

export default function CreateDepartment({ reloadList, closeDialogCb }) {
    const [departmentOptions, setDepartmentOptions] = React.useState([]);
    const [teamOptions, setTeamOptions] = React.useState([]);
    const [managerOptions, setManagerOptions] = React.useState([]);

    const {
        isPending,
        isSuccess,
        isError,
        method: createDepartment
    } = useCreateDepartment();

    const {
        isPending: isFetchListDepartmentPending,
        isSuccess: isFetchListDepartmentSuccess,
        isError: isFetchListDepartmentError,
        method: fetchDepartments,
        data: departments
    } = useFetchListDepartment();

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            teams: [],
            parentDepartment: { id: null, name: "" },
            manager: { id: null, name: "" },
        },
        onSubmit: (values) => {
            const teamIds = values.teams.map(team => team.id);
            const parentDepartmentId = values.parentDepartment?.id ?? null;
            const managerId = values.manager?.id ?? null;

            const { teams, description, parentDepartment, manager,
                ...rest } = values;

            createDepartment({
                ...rest,
                detail: description,
                teamIds,
                managerId,
                parentDepartmentId,
            })
        }
    })

    const {
        isPending: isFetchTeamsPending,
        isSuccess: isFetchTeamsSuccess,
        isError: isFetchTeamError,
        data: fetchedTeams,
        method: fetchTeams,
    } = useFetchTeamListWithoutDepartment();

    const {
        isPending: isFetchManagersPending,
        isSuccess: isFetchManagersSuccess,
        isError: isFetchManagersError,
        data: fetchedManagers,
        method: fetchManager,
    } = useFetchListUserWhoIsManager();

    React.useEffect(() => {
        fetchDepartments();
        fetchManager();
        fetchTeams();
    }, []);

    React.useEffect(() => {
        if (fetchedTeams) {
            const teamOptions = fetchedTeams.data
                .map((team) => ({ id: team.id, name: team.name }))

            setTeamOptions(teamOptions);
        }
    }, [fetchedTeams])

    React.useEffect(() => {
        if (fetchedManagers) {
            const managers = fetchedManagers.data.map((manager) => ({
                id: manager.id, name: manager.name
            }));

            setManagerOptions(managers)
        }
    }, [fetchedManagers])

    React.useEffect(() => {
        if (departments) {
            const department = departments.data.map((department) => ({
                id: department.id, name: department.name
            }));

            setDepartmentOptions(department)
        }
    }, [departments])

    React.useEffect(() => {
        if (isSuccess) {
            reloadList();
            closeDialogCb();
        }
    }, [isSuccess])


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
            <LoadingOverlay isLoading={
                isPending ||
                isFetchTeamsPending ||
                isFetchManagersPending} />

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
                            <Label text={"Manager"} />
                            <AutoComplete
                                id="manager"
                                name="manager"
                                options={managerOptions}
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                value={formik.values.manager}
                                onChange={(event, value) => {
                                    formik.setFieldValue("manager", value);
                                }}
                            />
                        </Fragment>
                    }
                />

                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Parent Department"} />
                            <AutoComplete
                                id="parentDepartment"
                                name="parentDepartment"
                                options={departmentOptions}
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                value={formik.values.parentDepartment}
                                onChange={(event, value) => {
                                    formik.setFieldValue("parentDepartment", value);
                                }}
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
                        <Label text={"Teams"} />
                        <AutoCompleteMultiple
                            id="teams"
                            name="teams"
                            getOptionLabel={(option) => option.name}
                            options={teamOptions}
                            value={formik.values.teams}
                            onChange={(event, value) => {
                                formik.setFieldValue("teams", value)
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