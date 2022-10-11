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
import { useCreateUser } from "../../../../client/userService";
import { useFetchListRole } from "../../../../client/roleService";
import { useFetchListTeam } from "../../../../client/teamService";
import * as yup from "yup";

const getOptionLabel = (option) => {
    return option.name;
}

const isOptionEqualToValue = (option, value) => {
    return option.id === value.id
}


// userName: "",
// password: "",
// citizenId: "",
// gender: "",
// email: "",
// birthday: dayjs('2000-01-01'),
// baseSalary: 0,
// bankName: "",
// bankBranch: "",
// accountName: "",
// bankCode: "",
// team: { id: null, name: "" },
// role: { id: null, name: "" }

const validationSchema = yup.object().shape({
    userName: yup.string().min(6, "Tài khoản tối đa 6 kí tự")
        .required(),
    password: yup.string().min(6, "Mật khẩu có độ dài tối đa 6 kí tự")
        .required(),
    name: yup.string().min(5).required("Tên không được để trống"),
    citizenId: yup.number(),
    gender: yup.string().required("Giới tính không được để trống"),
    phoneNumber: yup.string(),
    email: yup.string().email("Email không hợp lệ"),
    baseSalary: yup.number().required(),
    bankBranch: yup.number(),
    bankCode: yup.number(),
})

export default function CreateUser({ closeDialogCb }) {

    const [teams, setTeams] = React.useState([]);
    const [roles, setRoles] = React.useState([]);

    const {
        method: createUser
    } = useCreateUser();

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
            userName: "",
            password: "",
            citizenId: "",
            address: "",
            name: "",
            gender: "",
            email: "",
            phoneNumber: "",
            birthday: dayjs('2000-01-01'),
            baseSalary: 0,
            bankName: "",
            bankBranch: "",
            accountName: "",
            bankCode: "",
            team: { id: null, name: "" },
            role: { id: null, name: "" }
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const teamId = values?.team.id;
            const roleId = values?.role.id;

            createUser({ ...values, teamId, roleId, sex: values.gender });
        }
    })

    React.useEffect(() => {
        fetchTeams();
    }, [])

    React.useEffect(() => {
        if (fetchedTeams) {
            const teams = fetchedTeams.data.map((team) => ({ id: team.id, name: team.name }))
            setTeams(teams);
        }
    }, [fetchedTeams])

    React.useEffect(() => {
        fetchRoles();
    }, [])

    React.useEffect(() => {
        if (fetchedRoles) {
            const roles = fetchedRoles.data.map((role) => ({
                id: role.id, name: role.name
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
        title="Tạo mới người dùng"
    >
        <DialogForm>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <Segment title={"Thông tin cơ bản"}>
                    <TwoColumnBox
                        firstSlot={
                            <Fragment>
                                <Label text={"Tên tài khoản"} />
                                <TextField
                                    id="userName"
                                    name="userName"
                                    value={formik.values.userName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.userName && Boolean(formik.errors.userName)}
                                    helperText={formik.touched.userName && formik.errors.userName}
                                />
                            </Fragment>
                        }

                        secondSlot={
                            <Fragment>
                                <Label text={"Mật khẩu"} />
                                <TextField
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Fragment>
                        }
                    />
                    <TwoColumnBox
                        firstSlot={
                            <Fragment>
                                <Label text={"Họ và tên"} />
                                <TextField
                                    id="name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Fragment>
                        }

                        secondSlot={
                            <Fragment>
                                <Label text={"Địa chỉ"} />
                                <TextField
                                    id="address"
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    error={formik.touched.address && Boolean(formik.errors.address)}
                                    helperText={formik.touched.address && formik.errors.address}
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
                                    onChange={formik.handleChange}
                                    error={formik.touched.citizenId && Boolean(formik.errors.citizenId)}
                                    helperText={formik.touched.citizenId && formik.errors.citizenId}
                                />
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
                                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
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


                <Segment title={"Thông tin lương"}>
                    <TwoColumnBox
                        firstSlot={
                            <Fragment>
                                <Label text={"Tiền lương"} />
                                <TextField id="baseSalary"
                                    name="baseSalary"
                                    type={"number"}
                                    value={formik.values.baseSalary}
                                    onChange={formik.handleChange} />
                            </Fragment>
                        }

                        secondSlot={
                            <Fragment>
                                <Label text={"Tên ngân hàng"} />
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
                                <Label text={"Tên chi nhánh"} />
                                <TextField id="bankBranch"
                                    name="bankBranch"
                                    value={formik.values.bankBranch}
                                    onChange={formik.handleChange} />
                            </Fragment>
                        }

                        secondSlot={
                            <Fragment>
                                <Label text={"Tên tài khoản"} />
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


                <Segment title={"Thông tin khác"}>
                    <TwoColumnBox
                        firstSlot={
                            <Fragment>
                                <Label text={"Chức vụ"} />
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
                                    value={formik.values.team}
                                    onChange={(event, value) => {
                                        formik.setFieldValue("team", value);
                                    }}
                                />
                            </Fragment>
                        }
                    />
                </Segment>
            </Box>
        </DialogForm>
    </Dialog >;
}