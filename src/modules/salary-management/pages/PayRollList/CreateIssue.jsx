import React, { Fragment } from "react";
import { Box } from "@mui/system";
import Dialog from "../../../../components/Dialog";
import DialogForm from "../../../../components/DialogForm";
import Label from "../../../../components/DialogForm/Label";
import TextField from "../../../../components/DialogForm/TextField";
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";

import { useFormik } from "formik";

import OneColumnBox from "../../../../components/DialogForm/OneColumnBox";
import LoadingOverlay from "../../../../components/LoadingOverlay/LoadingOverlay";

import * as yup from "yup";
import { getCurrentUserId } from "../../../../client/autheticationService";
import { useFetchOnePayslip } from "../../../../client/payrollService";
import api from "../../../../client/api";

const validationSchema = yup.object().shape({
    content: yup.string().required("Mô tả là trường bắt buộc"),
    name: yup.string().required("Tiêu đề là trường bắt buộc"),
});

const useCreateIssue = () => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [isPending, setIsPending] = React.useState(false);

    const [data, setData] = React.useState({});

    const method = async (payslipId, createData) => {
        try {
            setIsPending(true);
            const response = await api.post(`/api/payslip/${payslipId}/issue/`, createData);

            if (!response) {
                throw response.err;
            }

            setData(response.data);
            setIsSuccess(true);

        } catch (err) {
            console.error(err);
            setIsSuccess(false);
            setIsError(true);
        } finally {
            setIsPending(false);
        }
    }

    return { isSuccess, isError, isPending, method, data };
}

const CreateError = ({ closeDialogCb }) => {
    return <Dialog
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Oops, có lỗi xảy ra"
    >
        Có lỗi xảy ra khi tạo phản hồi. Vui lòng thử lại sau.
    </Dialog>
}

const CreateSuccess = ({ closeDialogCb }) => {
    return <Dialog
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Thành công"
    >
        Tạo mới thành công.
    </Dialog>
}

export default function CreateIssue({ payslipId, closeDialogCb, reloadCb = () => { } }) {
    const [payslip, setPayslip] = React.useState({});
    const [showCreated, setShowCreated] = React.useState(false);
    const [showError, setShowError] = React.useState(false);

    const createIssueHook = useCreateIssue();
    const fetchPayslipHook = useFetchOnePayslip();

    React.useEffect(
        () => {
            fetchPayslipHook.method(payslipId);
        },
        []
    )

    React.useEffect(
        () => {
            if (fetchPayslipHook.isSuccess) {
                setPayslip(fetchPayslipHook.data);
            }
        },
        [fetchPayslipHook.isSuccess, fetchPayslipHook.data]
    )

    React.useEffect(
        () => {
            if (createIssueHook.isSuccess) {
                setShowCreated(true);
                reloadCb();
            } else if (createIssueHook.isError) {
                setShowError(true);
            }
        },
        [
            createIssueHook.isSuccess,
            createIssueHook.isError
        ]
    );

    const formik = useFormik({
        initialValues: {
            name: '',
            payslipId: payslipId,
            payslipName: payslip.name,
            userId: getCurrentUserId(),
            content: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            createIssueHook.method(payslipId, {
                name: values.name,
                payslipId: values.payslipId,
                payslipName: payslip.name,
                content: values.content,
                userId: values.userId
            })
        }
    });

    return <Dialog
        primaryAction={{
            text: "Gửi",
            handler: () => {
                formik.submitForm()
            },
        }}
        secondaryAction={{
            text: "Hủy",
            handler: closeDialogCb
        }}
        title="Gửi phản hồi"
    >
        {showError && <CreateError closeDialogCb={() => { setShowError(false) }} />}
        {showCreated && <CreateSuccess closeDialogCb={() => { setShowCreated(false) }} />}

        <DialogForm>
            <LoadingOverlay isLoading={createIssueHook.isPending} />
            <Box component="form" onSubmit={formik.handleSubmit}>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Tiêu đề"} />
                            <TextField id="name"
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
                        </Fragment>
                    }
                />

                <OneColumnBox
                    slot={<Fragment>
                        <Label text={"Mô tả"} />
                        <TextField
                            id="content"
                            multiline
                            rows={3}
                            value={formik.values.content}
                            onChange={formik.handleChange}
                            error={formik.touched.content && Boolean(formik.errors.content)}
                            helperText={formik.touched.content && formik.errors.content}

                        />
                    </Fragment>
                    }
                />
            </Box>
        </DialogForm>
    </Dialog >
}