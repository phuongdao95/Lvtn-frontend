import React, { Fragment } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import OneColumnBox from "../../../../components/DialogForm/OneColumnBox"
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../../components/DialogForm/TextField";
import DialogForm from "../../../../components/DialogForm";

import { useFetchOneDAB } from "../../../../client/dabService";
import { useFormik } from "formik/dist";
import dayjs from "dayjs";


export default function DABDetail({ dabId, closeDialogCb }) {
    const {
        isPending,
        isSuccess,
        isError,
        method: fetchDetail,
        data: detail
    } = useFetchOneDAB();

    React.useEffect(() => {
        fetchDetail(dabId);
    }, [])

    React.useEffect(() => {
        if (isSuccess) {
            console.log(detail);
            formik.setValues({
                name: detail.name,
                type: detail.salaryDeltaType,
                fromMonth: detail.fromMonth,
                toMonth: detail.toMonth,
                associatedFormula: detail.formula,
                description: detail.description
            })
        }
    }, [isSuccess])

    const formik = useFormik({
        initialValues: {
            name: "",
            type: "",
            fromMonth: "",
            toMonth: "",
        },
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
        title="Chi tiết khấu trừ, phụ cấp, thưởng"
    >
        <DialogForm>
            <Box>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Name"} />
                            <Typography>
                                {formik.values.name}
                            </Typography>
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Label text={"Type"} />
                            <Typography>
                                {formik.values.type}
                            </Typography>
                        </Fragment>
                    }
                />

                <TwoColumnBox
                    firstSlot={<Fragment>
                        <Label text={"Từ đầu tháng"} />
                        <Typography>
                            {dayjs(formik.values.fromMonth).format('MM')}
                        </Typography>
                    </Fragment>}

                    secondSlot={<Fragment>
                        <Label text={"Đến hết tháng"} />
                        <Typography>
                            {dayjs(formik.values.toMonth).format('MM')}
                        </Typography>
                    </Fragment>}
                />

                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Associated formula"} />
                            <Typography>
                                {formik.values.formula ?? "NaS"}
                            </Typography>
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
                            <Label text={"Mô tả"} />
                            <Typography>
                                {formik.values.description}
                            </Typography>
                        </Fragment>
                    }
                />
            </Box>
        </DialogForm>
    </Dialog >;
}