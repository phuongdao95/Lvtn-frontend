import React from "react";
import { Route, Routes } from "react-router";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import WorkFlows from "../../modules/approve-workflow/user/WorkFlows";
import MyRequests from "../../modules/approve-workflow/view-requests/MyRequests";
import MyToDoRequests from "../../modules/approve-workflow/view-requests/MyToDoRequest";

import ConfigNghiPhep from "../../modules/approve-workflow/nghi-phep/ConfigNghiPhep";
import ConfigNghiThaiSan from "../../modules/approve-workflow/nghi-thai-san/ConfigNghiThaiSan";
import ConfigCheckinout from "../../modules/approve-workflow/check-inout-manual/ConfigCheckinout";

import UserNghiPhep from "../../modules/approve-workflow/nghi-phep/UserNghiPhep";
import ViewNghiPhep from "../../modules/approve-workflow/nghi-phep/ViewNghiPhep";
import UserNghiThaiSan from "../../modules/approve-workflow/nghi-thai-san/UserNghiThaiSan";
import ViewNghiThaiSan from "../../modules/approve-workflow/nghi-thai-san/ViewNghiThaiSan";
import UserCheckinout from "../../modules/approve-workflow/check-inout-manual/UserCheckinout";
import ViewCheckInOut from "../../modules/approve-workflow/check-inout-manual/ViewCheckInOut";
import WorkflowConfig from "../../modules/approve-workflow/configs/WorkflowConfig";

const WorkFlows = React.lazy(() => import("../../modules/approve-workflow/user/WorkFlows"));
const MyRequests = React.lazy(() => import("../../modules/approve-workflow/view-requests/MyRequests"));
const ConfigNghiPhep = React.lazy(() => import("../../modules/approve-workflow/nghi-phep/ConfigNghiPhep"));
const ConfigNghiThaiSan = React.lazy(() => import("../../modules/approve-workflow/nghi-thai-san/ConfigNghiThaiSan"));
const UserNghiPhep = React.lazy(() => import("../../modules/approve-workflow/nghi-phep/UserNghiPhep"));
const UserNghiThaiSan = React.lazy(() => import("../../modules/approve-workflow/nghi-thai-san/UserNghiThaiSan"));
const Registe = React.lazy(() => import("../../modules/check-day/pages/Registe"));
const CheckIn = React.lazy(() => import("../../modules/check-day/pages/CheckIn"));
const WorkingShiftList = React.lazy(() => import("../../modules/check-day/pages/WorkingShiftList"));
const PayrollList = React.lazy(() => import("../../modules/salary-management/pages/PayRollList/PayrollList.jsx"));
const MyDABs = React.lazy(() => import("../../modules/salary-management/pages/MyDABs/MyDABs"));
const FormulaVariable = React.lazy(() => import("../../modules/salary-management/pages/FormulaVariable/FormulaVariable"));
const BoardDetail = React.lazy(() => import("../../modules/virtual-space/pages/BoardDetail"));
const BoardList = React.lazy(() => import("../../modules/virtual-space/pages/BoardList"));
const LabelList = React.lazy(() => import("../../modules/virtual-space/pages/LabelList"))
const SalaryGroupList = React.lazy(() => import("../../modules/salary-management/pages/SalaryGroup/SalaryGroupList"))
const ColumnList = React.lazy(() => import("../../modules/virtual-space/pages/ColumnList"))
const PayslipList = React.lazy(() => import("../../modules/salary-management/pages/PayRollList/PayslipList"))
const PayslipDetail = React.lazy(() => import("../../modules/salary-management/pages/PayRollList/PayslipDetail"));
const MyPayslipList = React.lazy(() => import("../../modules/salary-management/pages/MyPayslipList/MyPayslipList"))
const MyPayslipDetail = React.lazy(() => import("../../modules/salary-management/pages/MyPayslipList/MyPayslipDetail"))
const WorkingShiftRegistrationList = React.lazy(() => import("../../modules/check-day/pages/WorkingShiftRegistrationList"))
const NotFound = React.lazy(() => import("../../modules/shares/pages/NotFound"));
const TimekeepingSchedule = React.lazy(() => import("../../modules/check-day/pages/TimekeepingListSchedule"))
const RegisteredWorkingShiftList = React.lazy(() => import("../../modules/check-day/pages/RegisteredWorkingShiftList"));
const SalaryReport = React.lazy(() => import("../../modules/salary-management/pages/SalaryReport"));
const SalaryList = React.lazy(() => import('../../modules/salary-management/pages/SalaryList'));
const DABList = React.lazy(() => import("../../modules/salary-management/pages/DABList/DABList"));
const UserList = React.lazy(() => import("../../modules/administration/pages/UserList"));
const RoleList = React.lazy(() => import("../../modules/administration/pages/RoleList"));
const PermissionList = React.lazy(() => import("../../modules/administration/pages/PermissionList/PermissionList"));
const DepartmentList = React.lazy(() => import("../../modules/administration/pages/DepartmentList"));
const GroupList = React.lazy(() => import("../../modules/administration/pages/GroupList/GroupList"));
const TeamList = React.lazy(() => import("../../modules/administration/pages/TeamList"));
const WorkingShiftDayConfigList = React.lazy(() => import("../../modules/check-day/pages/WorkingShiftDayConfigList"));
const UserProfile = React.lazy(() => import("../../modules/shares/pages/UserProfile/UserProfile"))
const TaskBoardReport = React.lazy(() => import("../../modules/virtual-space/pages/TaskBoardReport"));



import NotFound from "../../modules/shares/404/NotFound";
import HomePage from "../../modules/shares/homepage/HomePage";

export default function Routings() {

    return <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path="/approve-workflows" element={<WorkFlows />} />
            <Route exact path="/approve-workflows/configs" element={<WorkflowConfig />} />
            <Route path="/approve-workflows/my-requests" element={<MyRequests />} />
            <Route path="/approve-workflows/my-todo-requests" element={<MyToDoRequests />} />
            <Route exact path="/approve-workflows/user-nghi-phep/:id" element={<UserNghiPhep />} /> { /*new and update*/}
            <Route exact path="/approve-workflows/user-nghi-phep/todo/:id" element={<ViewNghiPhep isApprover={true} />} /> { /*view and update flow for approver*/}
            <Route exact path="/approve-workflows/user-nghi-phep/view/:id" element={<ViewNghiPhep isApprover={false} />} /> { /*view the flow*/}
            <Route exact path="/approve-workflows/user-nghi-thai-san/:id" element={<UserNghiThaiSan />} />
            <Route exact path="/approve-workflows/user-nghi-thai-san/todo/:id" element={<ViewNghiThaiSan isApprover={true} />} /> { /*view and update flow for approver*/}
            <Route exact path="/approve-workflows/user-nghi-thai-san/view/:id" element={<ViewNghiThaiSan isApprover={false} />} /> { /*view the flow*/}
            <Route exact path="/approve-workflows/user-check-in-out/:id" element={<UserCheckinout />} />
            <Route exact path="/approve-workflows/user-check-in-out/view/:id" element={<ViewCheckInOut isApprover={false} />} /> { /*view the flow*/}
            <Route exact path="/approve-workflows/user-check-in-out/todo/:id" element={<ViewCheckInOut isApprover={true} />} /> { /*view and update flow for approver*/}
            <Route exact path="/approve-workflows/configs/config-nghi-phep" element={<ConfigNghiPhep />} />
            <Route exact path="/approve-workflows/configs/config-nghi-thai-san" element={<ConfigNghiThaiSan />} />
            <Route exact path="/approve-workflows/configs/config-check-in-out" element={<ConfigCheckinout />} />

            {/* Administration module */}
            <Route path="/user" element={<ProtectedRoute component={<UserList />} />} />
            <Route path="/role" element={<ProtectedRoute component={<RoleList />} />} />
            <Route path="/group" element={<ProtectedRoute component={<GroupList />} />} />
            <Route path="/team" element={<ProtectedRoute component={<TeamList />} />} />
            <Route path="/permission" element={<ProtectedRoute component={<PermissionList />} />} />
            <Route path="/department" element={<ProtectedRoute component={<DepartmentList />} />} />

            {/* Virtual space management */}
            <Route path="/taskboard" element={<ProtectedRoute component={<BoardList />} />} />
            <Route path="/taskboard/:id" element={<ProtectedRoute component={<BoardDetail />} />} />
            <Route path="/taskboard/:id/label" element={<ProtectedRoute component={<LabelList />} />} />
            <Route path="/taskboard/:id/column" element={<ProtectedRoute component={<ColumnList />} />} />
            <Route path="/taskboard-report/" element={<ProtectedRoute component={<TaskBoardReport />} />} />

            {/* Timekeeping module */}
            <Route path="/registe-image" element={<Registe />} />
            <Route path="/timekeeping-schedule" element={<ProtectedRoute component={<TimekeepingSchedule />} />} />
            <Route path="/workingshift-registration" element={<ProtectedRoute component={<WorkingShiftRegistrationList />} />} />
            <Route path="/workingshift" element={<ProtectedRoute component={<WorkingShiftList />} />} />
            <Route path="/registered-workingshift" element={<ProtectedRoute component={<RegisteredWorkingShiftList />} />} />
            <Route path="/workingshiftdayconfig" element={<ProtectedRoute component={<WorkingShiftDayConfigList />} />} />
            <Route path="/check-in" element={<ProtectedRoute component={<CheckIn />} />} />

            {/* Salary Management Module */}
            <Route path="/salary" element={<ProtectedRoute component={<SalaryList />} />} />
            <Route path="/dab" element={<ProtectedRoute component={<DABList />} />} />
            <Route path="/formula-variable" element={<ProtectedRoute component={<FormulaVariable />} />} />
            <Route path="/payroll" element={<ProtectedRoute component={<PayrollList />} />} />
            <Route path="/payroll/:id/payslip" element={<ProtectedRoute component={<PayslipList />} />} />
            <Route path="/payroll/:payrollId/payslip/:payslipId" element={<ProtectedRoute component={<PayslipDetail />} />} />
            <Route path="/salary-group/" element={<ProtectedRoute component={<SalaryGroupList />} />} />
            <Route path="/my-dab" element={<ProtectedRoute component={<MyDABs />} />} />
            <Route path="/my-payslips" element={<ProtectedRoute component={<MyPayslipList />} />} />
            <Route path="/my-payslips/:payslipId" element={<ProtectedRoute component={<MyPayslipDetail />} />} />
            <Route path="/salary-report/" element={<ProtectedRoute component={<SalaryReport />} />} />

            {/** Shared module */}
            <Route path="/profile" element={<ProtectedRoute component={<UserProfile />} />} />
            <Route path='*' element={<ProtectedRoute component={<NotFound />} />} />
        </Routes>
    </React.Suspense>
}