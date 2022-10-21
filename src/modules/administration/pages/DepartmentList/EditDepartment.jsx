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

import { useUpdateDepartment, useFetchOneDepartment, useFetchListDepartment } from "../../../../client/departmentService";
import LoadingOverlay from "../../../../components/LoadingOverlay/LoadingOverlay";

export default function EditDepartment({ reloadList, closeDialogCb, departmentId }) {
    const [teamOptions, setTeamOptions] = React.useState([]);
    const [managerOptions, setManagerOptions] = React.useState([]);
    const [departmentOptions, setDepartmentOptions] = React.useState([]);

    const {
        isPending: isFetchOnePending,
        isSuccess: isFetchOneSuccess,
        method: fetchOneDepartment,
        data: oneDepartment,
    } = useFetchOneDepartment();

    const {
        isPending: isFetchListPending,
        isSuccess: isFetchListSuccess,
        method: fetchListDepartment,
        data: fetchedDepartments
    } = useFetchListDepartment();

    const {
        isPending,
        isSuccess,
        isError,
        method: updateDepartment
    } = useUpdateDepartment();

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
            const parentDepartmentId = values.parentDepartment.id;
            const managerId = values.manager.id;

            const { teams, parentDepartment, manager,
                ...rest } = values;

            updateDepartment(departmentId, {
                ...rest,
                teamIds,
                managerId,
                parentDepartmentId,
            })
        }
    })

    const {
        isPending: isFetchTeamsPending,
        isSuccess: isFetchTeamsSuccess,
        isError: isFetchTeamsError,
        data: fetchedTeams,
        method: fetchTeams,
    } = useFetchTeamListWithoutDepartment();

    const {
        isPending: isFetchManagerPending,
        isSuccess: isFetchmanagerSuccess,
        isError: isFetchManagerError,
        data: fetchedManagers,
        method: fetchManager,
    } = useFetchListUserWhoIsManager();

    React.useEffect(() => {
        fetchTeams();
        fetchManager();
        fetchListDepartment();
        fetchOneDepartment(departmentId);
    }, []);

    React.useEffect(() => {
        if (isFetchOneSuccess) {
            formik.setValues({
                name: oneDepartment.name,
                description: oneDepartment.detail,
                manager: oneDepartment.managerId ? {
                    id: oneDepartment.managerId,
                    name: oneDepartment.managerName
                } : {
                    id: 0,
                    name: "None",
                },
                teams: formik.values.teams,
                parentDepartment: formik.values.parentDepartment,
            })
        }
    }, [isFetchOneSuccess])

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
        if (isFetchListSuccess) {
            const depOptions = fetchedDepartments.data.map((dep) => ({ id: dep.id, name: dep.name }))
            setDepartmentOptions(depOptions);
        }
    }, [fetchedDepartments])

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
        title="Chỉnh sửa Department"
    >
        <DialogForm>
            <LoadingOverlay isLoading={isPending} />
            <LoadingOverlay isLoading={isFetchManagerPending || isFetchTeamsPending || isFetchManagerPending} />
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