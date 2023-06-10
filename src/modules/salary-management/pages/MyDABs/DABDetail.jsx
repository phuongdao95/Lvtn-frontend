import React, { Fragment } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import OneColumnBox from "../../../../components/DialogForm/OneColumnBox"
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import DialogForm from "../../../../components/DialogForm";

import { useFetchOneDAB } from "../../../../client/dabService";
import { useFormik } from "formik";
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

    const formik = useFormik({
        initialValues: {
            name: "",
            type: "",
            fromMonth: "",
            toMonth: "",
            associatedFormula: "",
            description: ""
        },
        onSubmit: (values) => {
        }
    })

    React.useEffect(() => {
        if (isSuccess) {
            formik.setValues({
                name: detail.name,
                type: detail.salaryDeltaType,
                fromMonth: detail.fromMonth,
                toMonth: detail.toMonth,
                associatedFormula: detail.formulaName,
                description: detail.description
            })
        }
    }, [isSuccess])


    return <Dialog
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
                            <Label text={"Tên"} />
                            <Typography>
                                {formik.values.name}
                            </Typography>
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Label text={"Loại"} />
                            <Typography>
                                {detail?.type ?? "NA"}
                            </Typography>
                        </Fragment>
                    }
                />

                <TwoColumnBox
                    firstSlot={<Fragment>
                        <Label text={"Từ đầu tháng"} />
                        <Typography>
                            {dayjs(formik.values.fromMonth).format('MM/YYYY')}
                        </Typography>
                    </Fragment>}

                    secondSlot={<Fragment>
                        <Label text={"Đến hết tháng"} />
                        <Typography>
                            {dayjs(formik.values.toMonth).format('MM/YYYY')}
                        </Typography>
                    </Fragment>}
                />

                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Công thức liên quan"} />
                            <Typography>
                                {detail?.formulaName ?? "NA"}
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