import React, { Fragment } from "react";
import { Box } from "@mui/system";
import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../../components/DialogForm/TextField";
import DialogForm from "../../../../components/DialogForm";
import { useFetchOnePermission } from "../../../../client/permisisonService";
import { useFormik } from "formik";


export default function PermissionDetail({ closeDialogCb, permissionId }) {
    const {
        isPending,
        isError,
        isSuccess,
        data,
        method: fetchPermission
    } = useFetchOnePermission(permissionId);

    const formik = useFormik({
        initialValues: {
            id: null,
            name: null,
            description: null,
        },
    })

    React.useEffect(() => {
        if (permissionId) {
            fetchPermission(permissionId);
        }
    }, [])

    React.useEffect(() => {
        if (data) {
            formik.setValues({
                id: data?.id,
                name: data?.name,
                description: data?.description
            });

        }
    }, [data])


    return <Dialog
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Thông tin quyền"
    >
        <DialogForm>
            <Box>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Id"} />
                            <TextField
                                readOnly={true}
                                fullWidth
                                id="id"
                                name="id"
                                value={formik.values.id}
                            />
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Label text={"Tên quyền"} />
                            <TextField
                                readOnly={true}
                                fullWidth
                                id="name"
                                name="name"
                                value={formik.values.name}
                            />
                        </Fragment>
                    }
                />

                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Mô tả"} />
                            <TextField
                                readOnly={true}
                                fullWidth
                                id="description"
                                name="description"
                                value={formik.values.description}
                                multiline={true}
                                rows={2}
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
                            <Label text={"Ngày tạo"} />
                            <TextField />
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Label text={"Người tạo"} />
                            <TextField />
                        </Fragment>
                    }
                />
            </Box>
        </DialogForm>
    </Dialog >;
}