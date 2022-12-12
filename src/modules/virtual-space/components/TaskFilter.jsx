import React, { Fragment } from "react";
import Dialog from "../../../components/Dialog";
import DialogForm from "../../../components/DialogForm";
import Label from "../../../components/DialogForm/Label";
import AutoCompleteMultiple from "../../../components/DialogForm/AutoCompleteMultiple";
import TwoColumnBox from "../../../components/DialogForm/TwoColumnBox";
import OneColumnBox from "../../../components/DialogForm/OneColumnBox";
import DatePicker from "../../../components/DialogForm/DatePicker";
import Select from "../../../components/DialogForm/Select";
import { useFetchTaskLabelsOfBoard, useFetchUsersOfBoard } from "../../../client/taskboardService";
import { Box, Checkbox } from "@mui/material";


export default function TaskFilter({ closeDialogCb, boardId, filters, setFilters }) {
    const [userOptions, setUserOptions] = React.useState([]);
    const [labelOptions, setLabelOptions] = React.useState([]);

    const {
        isPending: isFetchUsersPending,
        isSuccess: isFetchUsersSuccess,
        isError: isFetchUsersError,
        method: fetchUsers,
        data: fetchedUsers
    } = useFetchUsersOfBoard();

    const {
        isPending: isFetchLabelsPending,
        isSuccess: isFetchLabelsSuccess,
        isError: isFetchLabelsError,
        method: fetchLabels,
        data: fetchedLabels
    } = useFetchTaskLabelsOfBoard();

    React.useEffect(() => {
        if (boardId) {
            fetchUsers(boardId);
            fetchLabels(boardId);
        }
    }, [])

    React.useEffect(() => {
        if (isFetchUsersSuccess) {
            const options = fetchedUsers.data.map((user) => ({
                id: user.id,
                name: user.name
            }))

            setUserOptions(options);
        }
    }, [isFetchUsersSuccess])

    React.useEffect(() => {
        if (isFetchLabelsSuccess) {
            const options = fetchedLabels.data.map((label) => ({
                id: label.id,
                name: label.name
            }));

            setLabelOptions(options);
        }
    }, [isFetchUsersSuccess])


    return <Dialog
        primaryAction={{
            text: "Áp dụng",
            handler: () => {

            },
        }}
        secondaryAction={{
            text: "Hủy",
            handler: closeDialogCb
        }}
        title="Bộ lọc task"
    >
        <DialogForm>

            <label style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', fontWeight: 'bold' }}>
                <Checkbox checked={filters.isDisabled} onChange={(event) => {
                    setFilters({ ...filters, isDisabled: event.target.checked })
                }} />
                Bật / tắt bộ lọc
            </label>



            <TwoColumnBox
                firstSlot={
                    <Fragment>
                        <Label text={"Loại task"} />
                        <Select
                            id="gender"
                            name="gender"
                            disabled={filters.isDisabled}
                            value={filters.taskType}
                            onChange={(event) => {
                                console.log(event.target.value)
                                setFilters({
                                    ...filters,
                                    taskType: event.target.value
                                })
                            }}
                            menu={[
                                {
                                    label: "Basic & Epic",
                                    value: "empty",
                                },
                                {
                                    label: "Basic",
                                    value: "basic",
                                },
                                {
                                    label: "Epic",
                                    value: "epic"
                                }
                            ]}
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
                    <Label text={"Danh sách nhãn"} />
                    <AutoCompleteMultiple
                        id="inChargeds"
                        name="inChargeds"
                        disabled={filters.isDisabled}
                        getOptionLabel={(option) => option.name}
                        options={labelOptions}
                        value={filters.labels}
                        onChange={(event, value) => {
                            setFilters({
                                ...filters,
                                labels: value
                            });
                        }}
                    />
                </Fragment>}
            />

            <TwoColumnBox
                firstSlot={
                    <Fragment>
                        <Label text={"Ngày bắt đầu"} />
                        <DatePicker id="startDate"
                            name="startDate"
                            disabled={filters.isDisabled}
                            value={filters.startDate}
                            onChange={(value) => {
                                setFilters({ ...filters, startDate: value })
                            }}
                        />
                    </Fragment>
                }

                secondSlot={
                    <Fragment>
                        <Label text={"Ngày kết thúc"} />
                        <DatePicker id="endDate"
                            name="endDate"
                            disabled={filters.isDisabled}
                            value={filters.endDate}
                            onChange={(value) => {
                                setFilters({ ...filters, endDate: value })
                            }}
                        />
                    </Fragment>
                }
            />

            <OneColumnBox
                slot={<Fragment>
                    <Label text={"Đảm nhận bởi"} />
                    <AutoCompleteMultiple
                        id="inChargeds"
                        name="inChargeds"
                        disabled={filters.isDisabled}
                        getOptionLabel={(option) => option.name}
                        options={userOptions}
                        value={filters.inChargeds}
                        onChange={(event, value) => {
                            setFilters({
                                ...filters,
                                inChargeds: value
                            });
                        }}
                    />
                </Fragment>}
            />

            <OneColumnBox
                slot={<Fragment>
                    <Label text={"Báo cáo đến"} />
                    <AutoCompleteMultiple
                        id="inChargeds"
                        disabled={filters.isDisabled}
                        name="inChargeds"
                        getOptionLabel={(option) => option.name}
                        options={userOptions}
                        value={filters.inChargeds}
                        onChange={(event, value) => {
                            setFilters({
                                ...filters,
                                reportTos: value
                            });
                        }}
                    />
                </Fragment>}
            />


        </DialogForm>
    </Dialog >;
}