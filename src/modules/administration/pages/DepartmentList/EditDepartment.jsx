import React, { Fragment } from "react";
import { Box } from "@mui/system";
import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import OneColumnBox from "../../../../components/DialogForm/OneColumnBox"
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../../components/DialogForm/TextField";
import DialogForm from "../../../../components/DialogForm";

import { useFormik } from "formik";
import { useCreateTeam, useFetchTeamListWithoutDepartment } from "../../../../client/teamService";
import AutoCompleteMultiple from "../../../../components/DialogForm/AutoCompleteMultiple";


export default function EditDepartment({ closeDialogCb, departmentId }) {
    const [teamOptions, setTeamOptions] = React.useState([]);

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            teams: [],
            parentDepartment: "",
            manager: "",
        },
        onSubmit: (values) => {

        }
    })

    const {
        isSuccess: isFetchSuccess,
        data: fetchedTeams,
        method: fetchTeams,
    } = useFetchTeamListWithoutDepartment();

    const {
        isSuccess: isCreateSuccess,
        method: createDepartment
    } = useCreateTeam();

    React.useEffect(() => {
        fetchTeams();
    }, []);

    React.useEffect(() => {
        if (fetchedTeams) {
            const teamOptions = fetchedTeams.data
                .map((team) => ({ id: team.id, name: team.name }))
            setTeamOptions(teamOptions)
        }
    }, [isFetchSuccess])

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
                            <TextField
                                id="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                            />
                        </Fragment>
                    }
                />

                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Parent Department"} />
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
                        <Label text={"Teams"} />
                        <AutoCompleteMultiple
                            getOptionLabel={(option) => option.name}
                            options={teamOptions}
                            value={formik.values.teams}
                            onChange={(event, value) => {
                                console.log(value);
                                formik.setFieldValue("teams", value)
                            }}
                        />
                    </Fragment>}
                />
            </Box>
        </DialogForm>
    </Dialog >;
}