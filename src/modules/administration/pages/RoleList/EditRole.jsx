import { Fragment } from "react";
import { Box } from "@mui/system";
import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import OneColumnBox from "../../../../components/DialogForm/OneColumnBox"
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../../components/DialogForm/TextField";
import DialogForm from "../../../../components/DialogForm";
import DialogFormTableLayout from "../../../../layouts/DialogFormTableLayout";
import BasicTable from "../../../../components/BasicTable/BasicTable";
import SearchField from "../../../../components/SearchField";

const getPermissionColumnConfig = () => {
    return [
        {
            field: "id",
            headerName: "Id",
        },
        {
            field: "name",
            headerName: "Name",
        },
        {
            field: "description",
            headerName: "description"
        }

    ]
}

export default function CreateRole({ closeDialogCb }) {

    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => { },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Tạo mới chức vụ"
    >
        <DialogForm>
            <Box>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Tên chức vụ"} />
                            <TextField />
                        </Fragment>
                    }

                    secondSlot={
                        <Fragment>
                            <Label text={"Mô tả"} />
                            <TextField />
                        </Fragment>
                    }
                />

                <OneColumnBox>
                    <DialogFormTableLayout
                        title={"Danh sách quyền"}
                        actionSection={<SearchField />}
                        searchSection={<Fragment></Fragment>}
                        tableSection={<BasicTable rows={[]} columns={getPermissionColumnConfig()} />}
                    />
                </OneColumnBox>
            </Box>
        </DialogForm>
    </Dialog >;
}