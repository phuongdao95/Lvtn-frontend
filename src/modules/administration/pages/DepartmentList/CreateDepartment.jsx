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
import { useCreateTeam, useFetchTeamListWithoutDepartment } from "../../../../client/teamService";
import { useFetchListUserWhoIsManager } from "../../../../client/userService";

import * as yup from "yup";
import { useCreateDepartment } from "../../../../client/departmentService";

export default function CreateDepartment({ closeDialogCb }) {
    const [teamOptions, setTeamOptions] = React.useState([]);
    const [managerOptions, setManagerOptions] = React.useState([]);

    const {
        isSuccess: isCreateSuccess,
        method: createDepartment
    } = useCreateDepartment();

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            teams: [],
            parentDepartment: {},
            manager: { id: null, name: "" },
        },
        onSubmit: (values) => {
            const teamIds = values.teams.map(team => team.id);
            const parentDepartmentId = values.parentDepartment.id;
            const managerId = values.manager.id;

            const { teams, parentDepartment, manager,
                ...rest } = values;

            createDepartment({
                ...rest,
                teamIds,
                managerId,
                parentDepartmentId,
            })
        }
    })

    const {
        isSuccess: isFetchSuccess,
        data: fetchedTeams,
        method: fetchTeams,
    } = useFetchTeamListWithoutDepartment();

    const {
        data: fetchedManagers,
        method: fetchManager,
    } = useFetchListUserWhoIsManager();

    React.useEffect(() => {
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
        fetchManager();
    }, [])

    React.useEffect(() => {
        if (fetchedManagers) {
            const managers = fetchedManagers.data.map((manager) => ({
                id: manager.id, name: manager.name
            }));

            setManagerOptions(managers)
        }
    }, [fetchedManagers])


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
            </Box>
        </DialogForm>
    </Dialog >;
}