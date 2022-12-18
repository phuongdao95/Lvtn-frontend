import React, { Fragment } from "react";
import { Box } from "@mui/system";
import Dialog from "../../../components/Dialog";
import Label from "../../../components/DialogForm/Label";
import OneColumnBox from "../../../components/DialogForm/OneColumnBox"
import TwoColumnBox from "../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../components/DialogForm/TextField";
import DialogForm from "../../../components/DialogForm";
import Select from "../../../components/DialogForm/Select";
import AutoComplete from "../../../components/DialogForm/AutoComplete";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay";
import TimePicker from "../../../components/DialogForm/TimePicker";
import DatePicker from "../../../components/DialogForm/DatePicker";
import { useCreateWorkingShiftOvertime } from "../../../client/workingShiftService";
import { useFetchListFormula } from "../../../client/formulaService";
import { useFormik } from "formik";
import { useFetchListGroup } from "../../../client/groupService";

import dayjs from "dayjs";

export default function CreateWorkingShift({ closeDialogCb, reload }) {
    const [groupOptions, setGroupOptions] = React.useState([]);
    const [formulaOptions, setFormulaOptions] = React.useState([]);

    const {
        isSuccess: isFetchGroupsSuccess,
        isPending: isFetchGroupsPending,
        isError: isFetchGroupsError,
        data: groups,
        method: fetchGroupList
    } = useFetchListGroup();

    const {
        isSuccess: isUpdateSuccess,
        isPending: isUpdatePending,
        isError: isUpdateError,
        method: createWorkingShift,
    } = useCreateWorkingShiftOvertime();

    const {
        isSuccess: isFetchListFormulaSuccess,
        isPending: isFetchListFormulaPending,
        isError: isFetchListFormulaError,
        method: fetchFormulaList,
        data: fetchedFormulaList
    } = useFetchListFormula();

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            date: dayjs(),
            startTime: dayjs(),
            endTime: dayjs(),
            registrationStartDate: dayjs(),
            registrationEndDate: dayjs(),
            description: "",
            formulaName: null,
            group: null
        },
        onSubmit: (values) => {
            const offset = new Date().getTimezoneOffset();
            const startTime = dayjs(values.startTime).add(-offset, 'minute');
            const endTime = dayjs(values.endTime).add(-offset, 'minute');
            createWorkingShift({
                ...values,
                formulaName: values.formulaName.id,
                groupId: values.group.id,
                startTime,
                endTime
            })
        }
    });

    React.useEffect(() => {
        fetchFormulaList();
        fetchGroupList();
    }, []);

    React.useEffect(() => {
        if (isFetchListFormulaSuccess) {
            setFormulaOptions(fetchedFormulaList.data.map((formula) => ({ id: formula.name })))
        }
    }, [isFetchListFormulaSuccess])

    React.useEffect(() => {
        if (isUpdateSuccess) {
            reload();
            closeDialogCb();
        }
    }, [isUpdateSuccess])

    React.useEffect(() => {
        if (isFetchGroupsSuccess) {
            setGroupOptions(groups.data.map(group => ({ id: group.id, name: group.name })))
        }
    }, [isFetchGroupsSuccess])

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
        title="Tạo mới ca ngoài giờ"
    >
        <DialogForm>
            <LoadingOverlay isLoading={isUpdatePending} />
            <Box>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Tên"} />
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
                        </Fragment>
                    }
                />

                <TwoColumnBox
                    firstSlot={<Fragment>
                        <Label text={"Ngày"} />
                        <DatePicker
                            id="date"
                            name="date"
                            value={formik.values.date}
                            onChange={(value) => formik.setFieldValue("date", value)}
                            error={formik.touched.date && Boolean(formik.errors.date)}
                            helperText={formik.touched.date && formik.errors.date}
                        />
                    </Fragment>}

                    secondSlot={<Fragment>
                    </Fragment>}
                />

                <TwoColumnBox
                    firstSlot={<Fragment>
                        <Label text={"Bắt đầu"} />
                        <TimePicker
                            value={formik.values.startTime}
                            onChange={(value) => {
                                formik.setFieldValue("startTime", dayjs(value))
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Fragment>}

                    secondSlot={<Fragment>
                        <Label text={"Kết thúc"} />
                        <TimePicker
                            value={formik.values.endTime}
                            onChange={(value) => formik.setFieldValue("endTime", dayjs(value))}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Fragment>}
                />


                <TwoColumnBox
                    firstSlot={<Fragment>
                        <Label text={"Ngày Bắt đầu đăng ký"} />
                        <DatePicker
                            id="registrationStartDate"
                            name="registrationStartDate"
                            value={formik.values.registrationStartDate}
                            onChange={(value) => formik.setFieldValue("registrationStartDate", value)}
                            error={formik.touched.registrationStartDate && Boolean(formik.errors.registrationStartDate)}
                            helperText={formik.touched.registrationStartDate && formik.errors.registrationStartDate}
                        />
                    </Fragment>}

                    secondSlot={<Fragment>
                        <Label text={"Ngày Kết thúc đăng ký"} />
                        <DatePicker
                            id="registrationEndDate"
                            name="registrationEndDate"
                            value={formik.values.registrationEndDate}
                            onChange={(value) => formik.setFieldValue("registrationEndDate", value)}
                            error={formik.touched.registrationEndDate && Boolean(formik.errors.registrationEndDate)}
                            helperText={formik.touched.registrationEndDate && formik.errors.registrationEndDate}
                        />
                    </Fragment>}
                />

                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Nhóm"} />
                            <AutoComplete
                                id="group"
                                name="group"
                                options={groupOptions}
                                value={formik.values.group}
                                onChange={(event, value) => {
                                    formik.setFieldValue("group", value);
                                }}
                            />
                        </Fragment>
                    }
                    secondSlot={
                        <Fragment>
                            <Label text={"Công thức"} />
                            <AutoComplete
                                id="formulaName"
                                name="formulaName"
                                options={formulaOptions}
                                value={formik.values.formulaName}
                                getOptionLabel={(option) => option.id}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                onChange={(event, value) => {
                                    formik.setFieldValue("formulaName", value);
                                }}
                            />
                        </Fragment>}
                />

                <OneColumnBox
                    slot={
                        <Fragment>
                            <Label text={"Mô tả"} />
                            <TextField
                                id="description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                            />
                        </Fragment>
                    }
                />

            </Box>
        </DialogForm>
    </Dialog >
}