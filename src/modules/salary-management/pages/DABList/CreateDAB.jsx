import { Fragment } from "react";
import { Box } from "@mui/system";
import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import OneColumnBox from "../../../../components/DialogForm/OneColumnBox"
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../../components/DialogForm/TextField";
import DialogForm from "../../../../components/DialogForm";

import { useCreateDAB } from "../../../../client/dabService";
import * as yup from 'yup';
import { useFormik } from "formik/dist";
import dayjs from "dayjs";

const validationSchema = yup.object().shape({
    name: yup.string().required(),
    type: yup.object().shape({
        name: yup.string(),
        value: yup.string()
    }),
    fromMonth: yup.date().required(),
    toMonth: yup.date().required()
});

export default function CreateDAB({ closeDialogCb }) {
    const { } = useCreateDAB();

    const formik = useFormik({
        initialValues: {
            name: "",
            type: { name: "Khấu trừ", value: "Deduction" },
            fromMonth: dayjs(),
            toMonth: dayjs().subtract(1, 'month'),
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    })

    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { formik.handleSubmit() },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Tạo mới khấu trừ, phụ cấp, thưởng"
    >
        <DialogForm>
            <Box>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Name"} />
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
                            <Label text={"Type"} />
                            <TextField />
                        </Fragment>
                    }
                />

                <TwoColumnBox
                    firstSlot={<Fragment>
                        <Label text={"From month"} />
                        <TextField />
                    </Fragment>}

                    secondSlot={<Fragment>
                        <Label text={"To month"} />
                        <TextField />
                    </Fragment>}
                />

                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Associated formula"} />
                            <TextField />
                        </Fragment>
                    }
                    secondSlot={
                        <Fragment>
                        </Fragment>
                    }
                />

                <OneColumnBox
                    slot={
                        <Fragment>
                            <Label text={""} />
                            <TextField />
                        </Fragment>
                    }
                />

                <OneColumnBox
                    slot={
                        <Fragment>
                            <Label text={"Description"} />
                            <TextField />
                        </Fragment>
                    }
                />
            </Box>
        </DialogForm>
    </Dialog >;
}