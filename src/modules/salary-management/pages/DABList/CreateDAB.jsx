import { Fragment } from "react";
import { Box } from "@mui/system";
import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import OneColumnBox from "../../../../components/DialogForm/OneColumnBox"
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../../components/DialogForm/TextField";
import DialogForm from "../../../../components/DialogForm";

import { useCreateDAB } from "../../../../client/dabService";


export default function CreateDAB({ closeDialogCb }) {
    const { } = useCreateDAB();

    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { },
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
                            <TextField />
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
                            <Label text={"Apply list"} />
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