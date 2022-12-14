import React, { Fragment } from "react";
import { Box } from "@mui/system";
import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../../components/DialogForm/TextField";
import DialogForm from "../../../../components/DialogForm";
import AutoComplete from "../../../../components/DialogForm/AutoComplete";
import Segment from "../../../../components/DialogForm/Segment";
import Select from "../../../../components/DialogForm/Select";
import DatePicker from "../../../../components/DialogForm/DatePicker";
import dayjs from "dayjs";

import { useFormik } from "formik";
import { useFetchOneUser, useUpdateUser } from "../../../../client/userService";
import { useFetchListRole } from "../../../../client/roleService";
import { useFetchListTeam } from "../../../../client/teamService";

const getOptionLabel = (option) => {
    return option.name;
}

const isOptionEqualToValue = (option, value) => {
    return option.id === value.id
}

export default function EditUser({ closeDialogCb, userId }) {
    const [teams, setTeams] = React.useState([]);
    const [roles, setRoles] = React.useState([]);


    const {
        data: fetchedUser,
        method: fetchUser
    } = useFetchOneUser();

    const {
        method: updateUser
    } = useUpdateUser();

    const {
        data: fetchedTeams,
        method: fetchTeams
    } = useFetchListTeam();

    const {
        data: fetchedRoles,
        method: fetchRoles
    } = useFetchListRole();

    const formik = useFormik({
        initialValues: {
            username: "",
            citizenId: "",
            gender: "",
            email: "",
            birthday: dayjs('2000-01-01'),
            baseSalary: 0,
            bankName: "",
            bankBranch: "",
            accountName: "",
            bankCode: "",
            team: { id: null, name: "" },
            role: { id: null, name: "" }
        },
        onSubmit: (values) => {
            let teamId = values?.team.id;
            let roleId = values?.role.id;

            teamId = teamId == -1 ? null : teamId
            roleId = roleId == -1 ? null : roleId

            const { team, role, ...formdata } = { ...values, teamId, roleId };

            updateUser(userId, formdata)
        }
    })

    React.useEffect(() => {
        fetchUser(userId);
    }, [])

    React.useEffect(() => {
        if (fetchedUser) {
            formik.setValues({
                ...(fetchedUser),
                role: {
                    id: fetchedUser.roleId ?? -1,
                    name: fetchedUser.roleName ?? ""
                },
                team: {
                    id: fetchedUser.teamId ?? -1,
                    name: fetchedUser.teamName ?? ""
                }
            })
        }
    }, [fetchedRoles, fetchedTeams])

    React.useEffect(() => {
        fetchTeams();
    }, [])

    React.useEffect(() => {
        if (fetchedTeams) {
            const teams = fetchedTeams.data.map((team) =>
            ({
                id: team.id,
                name: team.name
            }))
            setTeams(teams);
        }
    }, [fetchedTeams])

    React.useEffect(() => {
        fetchRoles();
    }, [])

    React.useEffect(() => {
        if (fetchedRoles) {
            const roles = fetchedRoles.data.map((role) => ({
                id: role.id,
                name: role.name
            }));

            setRoles(roles);
        }
    }, [fetchedRoles])

    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { formik.submitForm(); },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Ch???nh s???a ng?????i d??ng"
    >
        <DialogForm>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <Segment title={"Th??ng tin c?? b???n"}>
                    <TwoColumnBox
                        firstSlot={
                            <Fragment>
                                <Label text={"T??n t??i kho???n"} />
                                <TextField id="username"
                                    readOnly={true}
                                    name="username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                />
                            </Fragment>
                        }

                        secondSlot={
                            <Fragment>
                            </Fragment>
                        }
                    />
                    <TwoColumnBox
                        firstSlot={
                            <Fragment>
                                <Label text={"H??? v?? t??n"} />
                                <TextField id="name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange} />
                            </Fragment>
                        }

                        secondSlot={
                            <Fragment>
                                <Label text={"?????a ch???"} />
                                <TextField
                                    id="address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}

                                />
                            </Fragment>
                        }
                    />

                    <TwoColumnBox
                        firstSlot={
                            <Fragment>
                                <Label text={"S??? CCCD/CMND"} />
                                <TextField id="citizenId"
                                    name="citizenId"
                                    value={formik.values.citizenId}
                                    onChange={formik.handleChange} />
                            </Fragment>
                        }

                        secondSlot={
                            <Fragment>
                                <Label text={"S??? ??i???n tho???i"} />
                                <TextField
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                />
                            </Fragment>
                        }
                    />

                    <TwoColumnBox
                        firstSlot={
                            <Fragment>
                                <Label text={"Gi???i t??nh"} />
                                <Select
                                    id="gender"
                                    name="gender"
                                    value={formik.values.gender}
                                    onChange={formik.handleChange}
                                    menu={[
                                        {
                                            label: "-- None --",
                                            value: ""
                                        },
                                        {
                                            label: "Nam",
                                            value: "male",
                                        },
                                        {
                                            label: "N???",
                                            value: "female"
                                        }
                                    ]}
                                />
                            </Fragment>
                        }

                        secondSlot={
                            <Fragment>
                                <Label text={"Email"}
                                    id="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                />
                                <TextField />
                            </Fragment>
                        }
                    />


                    <TwoColumnBox
                        firstSlot={
                            <Fragment>
                                <Label text={"Ng??y sinh"} />
                                <DatePicker id="birhtday"
                                    name="birthday"
                                    value={formik.values.birthday}
                                    onChange={(value) => formik.setFieldValue("birthday", value)}
                                />
                            </Fragment>
                        }

                        secondSlot={
                            <Fragment>
                            </Fragment>
                        }
                    />
                </Segment>


                <Segment title={"Th??ng tin l????ng"}>
                    <TwoColumnBox
                        firstSlot={
                            <Fragment>
                                <Label text={"Ti???n l????ng"} />
                                <TextField id="baseSalary"
                                    name="baseSalary"
                                    value={formik.values.baseSalary}
                                    onChange={formik.handleChange} />
                            </Fragment>
                        }

                        secondSlot={
                            <Fragment>
                                <Label text={"T??n ng??n h??ng"} />
                                <TextField
                                    id="bankName"
                                    name="bankName"
                                    value={formik.values.bankName}
                                    onChange={formik.handleChange}
                                />
                            </Fragment>
                        }
                    />

                    <TwoColumnBox
                        firstSlot={
                            <Fragment>
                                <Label text={"T??n chi nh??nh"} />
                                <TextField id="bankBranch"
                                    name="bankBranch"
                                    value={formik.values.bankBranch}
                                    onChange={formik.handleChange} />
                            </Fragment>
                        }

                        secondSlot={
                            <Fragment>
                                <Label text={"T??n t??i kho???n"} />
                                <TextField
                                    id="accountName"
                                    name="accountName"
                                    value={formik.values.accountName}
                                    onChange={formik.handleChange}
                                />
                            </Fragment>
                        }
                    />
                </Segment>


                <Segment title={"Th??ng tin kh??c"}>
                    <TwoColumnBox
                        firstSlot={
                            <Fragment>
                                <Label text={"Ch???c v???"} />
                                <AutoComplete id="role"
                                    getOptionLabel={getOptionLabel}
                                    isOptionEqualToValue={isOptionEqualToValue}
                                    options={roles}
                                    name="role"
                                    onChange={(event, value) => {
                                        formik.setFieldValue("role", value);
                                    }}
                                    value={formik.values.role}
                                />
                            </Fragment>
                        }

                        secondSlot={
                            <Fragment>
                                <Label text={"Team"} />
                                <AutoComplete
                                    getOptionLabel={getOptionLabel}
                                    isOptionEqualToValue={isOptionEqualToValue}
                                    options={teams}
                                    id="team"
                                    name="team"
                                    onChange={(event, value) => {
                                        formik.setFieldValue("team", value);
                                    }}
                                    value={formik.values.team}
                                />
                            </Fragment>
                        }
                    />
                </Segment>
            </Box>
        </DialogForm>
    </Dialog >;
}