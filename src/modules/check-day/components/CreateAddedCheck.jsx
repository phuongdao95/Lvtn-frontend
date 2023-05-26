import React, { Fragment } from "react";
import { Box } from "@mui/system";
import Dialog from "../../../components/Dialog";
import Label from "../../../components/DialogForm/Label";
import TwoColumnBox from "../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../components/DialogForm/TextField";
import DialogForm from "../../../components/DialogForm";
import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay";
import Select from "../../../components/DialogForm/Select";

import DatePicker from "../../../components/DialogForm/DatePicker";
import * as yup from "yup";
import { useFormik } from "formik";
import { managerAddCheckTime } from "../../../client/timekeepingService";
import dayjs from "dayjs";

import TimePicker from "../../../components/DialogForm/TimePicker";
import AutoComplete from "../../../components/DialogForm/AutoComplete";

const validationSchema = yup.object().shape({
    id: yup.string(),
});

const typeOptions = [
    {id: '1', name: 'Chấm bù giờ vào'},
    {id: '2', name: 'Chấm bù giờ ra'},
]

export default function CreateAddedCheck({ workingShiftTimekeeping, closeDialogCb }) {
    const {
        isPending,
        isError,
        isSuccess,
        method: addCheckTime,
        data: addResponse
    } = managerAddCheckTime();

    const formik = useFormik({
        initialValues: {
            //name: "",
            id: workingShiftTimekeeping.id,
            time: dayjs(),
            type: {id: '1', name: 'Chấm bù giờ vào'}
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            addCheckTime(values.id, values.time.hour(), 
                        values.time.minute(), 
                        Number(values.type.id));
            closeDialogCb();
        }
    })
    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { formik.submitForm(); },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Chấm công bù"
    >
        <DialogForm>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"ID"}
                            />
                            <TextField
                                id="id"
                                name="id"
                                value={formik.values.id}
                                disabled={true}
                            />
                        </Fragment>
                    }
                />

                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Loại"} />
                            <AutoComplete
                                id="type"
                                name="type"
                                options={typeOptions}
                                value={formik.values.type}
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                onChange={(event, value) => {
                                    formik.setFieldValue("type", value);
                                }}
                            />
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Label text={"Giờ chấm công"} />
                            <TimePicker
                                value={formik.values.time}
                                onChange={(value) => {
                                    formik.setFieldValue("time", dayjs(value))
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Fragment>
                    }
                />
            </Box>
        </DialogForm>
    </Dialog >;
}