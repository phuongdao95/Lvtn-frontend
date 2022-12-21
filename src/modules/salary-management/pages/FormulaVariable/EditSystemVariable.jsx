import { Fragment } from "react";
import { Box } from "@mui/system";

import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import OneColumnBox from "../../../../components/DialogForm/OneColumnBox"
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../../components/DialogForm/TextField";
import DialogForm from "../../../../components/DialogForm";

export default function EditSystemVariable({ variableDetail, closeDialogCb }) {
    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Chỉnh sửa biến"
    >
        <DialogForm>
            <Box>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Tên biến"} />
                            <TextField
                                id="name"
                                name="name"
                                readOnly={true}
                                value={variableDetail.name}
                            />
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Label text={"Tên hiển thị"} />
                            <TextField
                                id="displayName"
                                name="displayName"
                                value={variableDetail.displayName}
                            />
                        </Fragment>
                    }
                />

                <TwoColumnBox
                    firstSlot={<Fragment>
                        <Label text={"Kiểu"} />
                        <TextField
                            id="dataType"
                            name="dataType"
                            value={variableDetail.dataType}
                        />
                    </Fragment>}

                    secondSlot={<Fragment>
                    </Fragment>}
                />

                <OneColumnBox
                    slot={
                        <Fragment>
                            <Label text={"Mô tả"} />
                            <TextField
                                id="description"
                                name="description"
                                value={variableDetail.description}
                            />
                        </Fragment>
                    }
                />
            </Box>
        </DialogForm>
    </Dialog >;
}