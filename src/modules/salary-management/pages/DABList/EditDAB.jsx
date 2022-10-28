import React, { Fragment } from "react";
import { Box } from "@mui/system";
import Dialog from "../../../../components/Dialog";
import Label from "../../../../components/DialogForm/Label";
import OneColumnBox from "../../../../components/DialogForm/OneColumnBox"
import TwoColumnBox from "../../../../components/DialogForm/TwoColumnBox";
import TextField from "../../../../components/DialogForm/TextField";
import DialogForm from "../../../../components/DialogForm";
import Select from "../../../../components/DialogForm/Select";
import AutoComplete from "../../../../components/DialogForm/AutoComplete";
import LoadingOverlay from "../../../../components/LoadingOverlay/LoadingOverlay";
import { useFetchOneDAB, useUpdateDAB } from "../../../../client/dabService";
import { useFormik } from "formik";
import { useFetchListGroup } from "../../../../client/groupService";
import dayjs from "dayjs";

function generateYears() {
    return Array.from({ length: 200 }, (_, i) => i + 2020)
}

export default function EditDAB({ dabId, closeDialogCb }) {
    const [groupOptions, setGroupOptions] = React.useState([]);

    const {
        isSuccess: isFetchGroupsSuccess,
        isPending: isFetchGroupsPending,
        isError: isFetchGroupsError,
        data: groups,
        method: fetchGroupList
    } = useFetchListGroup();

    const {
        isSuccess,
        isPending,
        isError,
        method: fetchDetail,
        data: detail,
    } = useFetchOneDAB();

    const {
        isSuccess: isUpdateSuccess,
        isPending: isUpdatePending,
        isError: isUpdateError,
        method: updateDAB,
        data: dab
    } = useUpdateDAB();

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            type: "",
            fromMonth: 1,
            toMonth: 1,
            year: 2022,
            group: null,
        },
        onSubmit: (values) => {
            updateDAB(dabId, {
                ...values,
                groupId: values.group.id,
            })
        }
    });

    React.useEffect(() => {
        fetchDetail(dabId);
        fetchGroupList();
    }, []);

    React.useEffect(() => {
        if (isFetchGroupsSuccess) {
            setGroupOptions(groups.data.map(group => ({ id: group.id, name: group.name })))
        }
    }, [isFetchGroupsSuccess])

    React.useEffect(() => {
        if (isSuccess) {
            console.log(detail);
            formik.setValues({
                name: detail.name,
                type: detail.type,
                description: detail.description,
                group: {
                    id: detail.groupId,
                    name: detail.groupName,
                },
                fromMonth: dayjs(detail.fromMonth).month(),
                toMonth: dayjs(detail.toMonth).month(),
                year: dayjs(detail.fromMonth).year(),
                formulaName: detail.formulaName
            })
        }
    }, [isSuccess])

    return <Dialog
        primaryAction={{
            text: "Submit",
            handler: () => {
                formik.submitForm();
            },
        }}
        secondaryAction={{
            text: "Cancel",
            handler: closeDialogCb
        }}
        title="Chỉnh sửa khấu trừ, phụ cấp, thưởng"
    >
        <DialogForm>
            <LoadingOverlay isLoading={isUpdatePending} />
            <Box>
                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Tên"} />
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
                            <Label text={"Loại"} />
                            <Select
                                id="type"
                                name="type"
                                value={formik.values.type}
                                onChange={formik.handleChange}
                                menu={[
                                    {
                                        label: "Khấu trừ",
                                        value: "Deduction"
                                    },
                                    {
                                        label: "Phụ cấp",
                                        value: "Allowance",
                                    },
                                    {
                                        label: "Thưởng",
                                        value: "Bonus"
                                    }
                                ]}
                            />
                        </Fragment>
                    }
                />

                <TwoColumnBox
                    firstSlot={<Fragment>
                        <Label text={"Tháng bắt đầu"} />
                        <Select
                            value={formik.values.fromMonth}
                            onChange={(event) => {
                                formik.setFieldValue("fromMonth", event.target.value);
                            }}
                            menu={[
                                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
                            ].map((value) => ({ label: `Tháng ${value}`, value: value }))}
                        />
                    </Fragment>}

                    secondSlot={<Fragment>
                        <Label text={"Tháng kết thúc"} />
                        <Select
                            value={formik.values.toMonth}
                            onChange={(event) => {
                                formik.setFieldValue("toMonth", event.target.value);
                            }}
                            menu={[
                                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
                            ].map((value) => ({ label: `Tháng ${value}`, value: value }))}
                        />
                    </Fragment>}
                />

                <TwoColumnBox
                    firstSlot={<Fragment>
                        <Label text={"Năm"} />
                        <Select
                            value={formik.values.year}
                            onChange={(event) => {
                                formik.setFieldValue("year", event.target.value)
                            }}
                            menu={generateYears().map((value) =>
                                ({ label: `Năm ${value}`, value: value }))}
                        />
                    </Fragment>}

                    secondSlot={<Fragment>
                    </Fragment>}
                />


                <TwoColumnBox
                    firstSlot={
                        <Fragment>
                            <Label text={"Nhóm"} />
                            <AutoComplete
                                id="group"
                                name="group"
                                options={groupOptions}
                                value={formik.values.group}
                                onChange={(event, value) => {
                                    formik.setFieldValue("group", value);
                                }}
                            />
                        </Fragment>
                    }
                    secondSlot={
                        <Fragment>
                            <Label text={"Công thức"} />
                            <TextField
                                id="formulaName"
                                name="formulaName"
                                value={formik.values.formulaName}
                                onChange={formik.handleChange}
                            />
                        </Fragment>}
                />

                <OneColumnBox
                    slot={
                        <Fragment>
                            <Label text={"Mô tả"} />
                            <TextField />
                        </Fragment>
                    }
                />

            </Box>
        </DialogForm>
    </Dialog >
}