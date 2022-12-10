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
import LoadingOverlay from "../../../../components/LoadingOverlay/LoadingOverlay";

export default function EditProfile({ closeDialogCb, userId }) {
    const [teams, setTeams] = React.useState([]);
    const [roles, setRoles] = React.useState([]);

    const {
        data: fetchedUser,
        method: fetchUser,
        isPending: isFetchPending
    } = useFetchOneUser();

    const {
        method: updateUser,
        isPending: isUpdatePending
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
            text: "Lưu",
            handler: () => { formik.submitForm(); },
        }}
        secondaryAction={{
            text: "Hủy",
            handler: closeDialogCb
        }}
        title="Cập nhật thông tin cá nhân"
    >
        <DialogForm>
            <LoadingOverlay isLoading={isUpdatePending || isFetchPending} />

            <Box component="form" onSubmit={formik.handleSubmit}>
                <Segment title={"Thông tin cơ bản"}>
                    <TwoColumnBox
                        firstSlot={
                            <Fragment>
                                <Label text={"Tên tài khoản"} />
                                <TextField id="username"
                                    readOnly={true}
                                    name="username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange} />
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
                                <Label text={"Họ và tên"} />
                                <TextField id="name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange} />
                            </Fragment>
                        }

                        secondSlot={
                            <Fragment>
                                <Label text={"Địa chỉ"} />
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
                                <Label text={"Số CCCD/CMND"} />
                                <TextField id="citizenId"
                                    name="citizenId"
                                    value={formik.values.citizenId}
                                    onChange={formik.handleChange} />
                            </Fragment>
                        }

                        secondSlot={
                            <Fragment>
                                <Label text={"Số điện thoại"} />
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
                                <Label text={"Giới tính"} />
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
                                            value: "Male",
                                        },
                                        {
                                            label: "Nữ",
                                            value: "Female"
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
                                <Label text={"Ngày sinh"} />
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
            </Box>
        </DialogForm>
    </Dialog >;
}