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
import FormControlLabel from "@mui/material/FormControlLabel";
import DatePicker from "../../../components/DialogForm/DatePicker";
import { useCreateDAB } from "../../../client/dabService";
import { useFetchListFormula } from "../../../client/formulaService";
import { useFormik } from "formik";
import { useFetchListGroup } from "../../../client/groupService";
import { Checkbox } from "@mui/material";
import dayjs from "dayjs";
import { useCreateWorkingShiftFixed } from "../../../client/workingShiftService";

const generateMonth = () => {
    const date = dayjs();
    const sixMonthsBeforeNow = date.subtract(6, 'month');
    const sixMonthsAfterNow = date.add(6, 'month');

    const result = [];
    for (let month = sixMonthsBeforeNow;
        month.isBefore(sixMonthsAfterNow, 'month');
        month = month.add(1, 'month')
    ) {
        result.push(month.format('MM/YYYY'))
    }
    return result;
}

export default function CreateMultipleWorkingShift({ closeDialogCb, reload }) {
    const [currentMonth, setCurrentMonth] = React.useState(0);
    const [groupOptions, setGroupOptions] = React.useState([]);
    const [formulaOptions, setFormulaOptions] = React.useState([]);
    const [weekDayConfigs, setWeekDayConfigs] = React.useState([true, true, true, true, true, false, false]);

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
        method: createDAB,
    } = useCreateWorkingShiftFixed();

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
            type: "overtime",
            fromMonth: 1,
            toMonth: 1,
            year: 2022,
            group: null,
            formulaName: null,
            startTime: dayjs(),
            endTime: dayjs(),
            registrationStartDate: dayjs(),
            registrationEndDate: dayjs(),
        },
        onSubmit: (values) => {
            createDAB({
                ...values,
                groupId: values.group?.id,
                formulaName: values.formulaName?.id
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
        title="Tạo mới ca hằng ngày"
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
                            <Label text={"Loại"} />
                            <Select
                                id="type"
                                name="type"
                                value={formik.values.type}
                                onChange={formik.handleChange}
                                menu={[
                                    {
                                        label: "Fixed Shift",
                                        value: "basic",
                                    },
                                ]}
                            />
                        </Fragment>
                    }
                />

                <TwoColumnBox
                    firstSlot={<Fragment>
                        <Label text={"Tháng"} />
                        <Select
                            id="month"
                            name="month"
                            value={currentMonth}
                            onChange={(event) => {
                                setCurrentMonth(event.target.value);
                            }}
                            menu={generateMonth().map((month) => ({
                                label: month,
                                value: month
                            }))}
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
                            onChange={(value) => formik.setFieldValue("startTime", value)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Fragment>}

                    secondSlot={<Fragment>
                        <Label text={"Kết thúc"} />
                        <TimePicker
                            value={formik.values.startTime}
                            onChange={(value) => formik.setFieldError("endTime", value)}
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
                            <Label text={"Ngày trong tuần"} />
                            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                                <div>
                                    <FormControlLabel control={
                                        <Checkbox checked={weekDayConfigs[0]}
                                            onChange={(event) => {
                                                let cloned = [...weekDayConfigs];
                                                cloned[0] = event.target.checked;
                                                setWeekDayConfigs(cloned)
                                            }}
                                        />}
                                        label="T2" />
                                </div>
                                <div>
                                    <FormControlLabel control={
                                        <Checkbox checked={weekDayConfigs[1]}
                                            onChange={(event) => {
                                                let cloned = [...weekDayConfigs];
                                                cloned[1] = event.target.checked;
                                                setWeekDayConfigs(cloned)
                                            }}
                                        />}
                                        label="T3" />
                                </div>
                                <div>
                                    <FormControlLabel control={
                                        <Checkbox checked={weekDayConfigs[2]}
                                            onChange={(event) => {
                                                let cloned = [...weekDayConfigs];
                                                cloned[2] = event.target.checked;
                                                setWeekDayConfigs(cloned)
                                            }}
                                        />}
                                        label="T4" />
                                </div>
                                <div>
                                    <FormControlLabel control={
                                        <Checkbox checked={weekDayConfigs[3]}
                                            onChange={(event) => {
                                                let cloned = [...weekDayConfigs];
                                                cloned[3] = event.target.checked;
                                                setWeekDayConfigs(cloned)
                                            }}
                                        />}
                                        label="T5" />
                                </div>
                                <div>
                                    <FormControlLabel control={
                                        <Checkbox checked={weekDayConfigs[4]}
                                            onChange={(event) => {
                                                let cloned = [...weekDayConfigs];
                                                cloned[4] = event.target.checked;
                                                setWeekDayConfigs(cloned)
                                            }}
                                        />}
                                        label="T6" />
                                </div>
                                <div>
                                    <FormControlLabel control={
                                        <Checkbox checked={weekDayConfigs[5]}
                                            onChange={(event) => {
                                                let cloned = [...weekDayConfigs];
                                                cloned[5] = event.target.checked;
                                                setWeekDayConfigs(cloned)
                                            }}
                                        />}
                                        label="T7" />
                                </div>
                                <div>
                                    <FormControlLabel control={
                                        <Checkbox checked={weekDayConfigs[6]}
                                            onChange={(event) => {
                                                let cloned = [...weekDayConfigs];
                                                cloned[6] = event.target.checked;
                                                setWeekDayConfigs(cloned)
                                            }}
                                        />}
                                        label="CN" />
                                </div>
                            </Box>
                        </Fragment>
                    }
                />

            </Box>
        </DialogForm>
    </Dialog >
}