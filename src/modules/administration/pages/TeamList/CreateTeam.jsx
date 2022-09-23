import { Fragment } from "react";
import { Box } from "@mui/system";
import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../../components/DialogForm/TextField";
import DialogForm from "../../../../components/DialogForm";


export default function CreateDAB({ closeDialogCb }) {

    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Tạo mới team"
    >
        <DialogForm>
            <Box>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Name"} />
                            <TextField />
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Label text={"Department"} />
                            <TextField />
                        </Fragment>
                    }
                />

                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Description"} />
                            <TextField />
                        </Fragment>
                    }
                    secondSlot={
                        <Fragment>
                        </Fragment>
                    }
                />

            </Box>
        </DialogForm>
    </Dialog >;
}