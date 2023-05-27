import React from "react";
import { Route, Routes } from "react-router";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const WorkFlows = React.lazy(() => import("../../modules/approve-workflow/user/WorkFlows"));
const MyRequests = React.lazy(() => import("../../modules/approve-workflow/view-requests/MyRequests"));
const MyToDoRequests = React.lazy(() => import("../../modules/approve-workflow/view-requests/MyToDoRequest"));
const ConfigNghiPhep = React.lazy(() => import("../../modules/approve-workflow/nghi-phep/ConfigNghiPhep"));
const ConfigNghiThaiSan = React.lazy(() => import("../../modules/approve-workflow/nghi-thai-san/ConfigNghiThaiSan"));
const ConfigCheckinout = React.lazy(() => import("../../modules/approve-workflow/check-inout-manual/ConfigCheckinout"));
const UserNghiPhep = React.lazy(() => import("../../modules/approve-workflow/nghi-phep/UserNghiPhep"));
const ViewNghiPhep = React.lazy(() => import("../../modules/approve-workflow/nghi-phep/ViewNghiPhep"));
const UserNghiThaiSan = React.lazy(() => import("../../modules/approve-workflow/nghi-thai-san/UserNghiThaiSan"));
const ViewNghiThaiSan = React.lazy(() => import("../../modules/approve-workflow/nghi-thai-san/ViewNghiThaiSan"));
const UserCheckinout = React.lazy(() => import("../../modules/approve-workflow/check-inout-manual/UserCheckinout"));
const ViewCheckInOut = React.lazy(() => import("../../modules/approve-workflow/check-inout-manual/ViewCheckInOut"));
const WorkflowConfig = React.lazy(() => import("../../modules/approve-workflow/configs/WorkflowConfig"));

const ViewMemberBalances = React.lazy(() => import("../../modules/leave-balance/ViewMemberBalances"));
const ViewMyBalances = React.lazy(() => import("../../modules/leave-balance/ViewMyBalances"));
const EditMemberLeaveBalance = React.lazy(() => import("../../modules/leave-balance/EditMemberLeaveBalance"));

const MyTeam = React.lazy(() => import("../../modules/virtual-space/pages/MyTeam"));
const Registe = React.lazy(() => import("../../modules/check-day/pages/Registe"));
const CheckIn = React.lazy(() => import("../../modules/check-day/pages/CheckIn"));
const CheckinConfig = React.lazy(() => import("../../modules/check-day/pages/CheckinConfig"));
const WorkingShiftList = React.lazy(() => import("../../modules/check-day/pages/WorkingShiftList"));
const TimekeepingManage = React.lazy(() => import("../../modules/check-day/pages/TimekeepingManage"));
const EmployeeScheduleManager = React.lazy(() => import("../../modules/check-day/pages/EmployeeScheduleManager"));
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
const Unauthorizied = React.lazy(() => import("../../modules/shares/pages/Unauthorized"));
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
const TaskEstimationReport = React.lazy(() => import("../../modules/virtual-space/pages/TaskEstimationReport"));

export default function Routings() {

    return <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
            <Route path="/approve-workflows" element={<ProtectedRoute component={<WorkFlows />} pageName={"approve_workflow_list"} />} />
            <Route exact path="/approve-workflows/configs" element={<ProtectedRoute component={<WorkflowConfig />} pageName={"approve_workflow_config_list"} />} />
            <Route path="/approve-workflows/my-requests" element={<ProtectedRoute component={<MyRequests />} pageName={"my_requests"} />} />
            <Route path="/approve-workflows/my-todo-requests" element={<ProtectedRoute component={<MyToDoRequests />} pageName={"my_todo_requests"} />} />
            <Route exact path="/approve-workflows/user-nghi-phep/:id" element={<ProtectedRoute component={<UserNghiPhep />} pageName={"user_nghi_phep"} />} />
            <Route exact path="/approve-workflows/user-nghi-thai-san/:id" element={<ProtectedRoute component={<UserNghiThaiSan />} pageName={"user_nghi_thai_san"} />} />
            <Route exact path="/approve-workflows/user-check-in-out/:id" element={<ProtectedRoute component={<UserCheckinout />} pageName={"user_check_in_out"} />} />
            <Route exact path="/approve-workflows/configs/config-nghi-phep" element={<ProtectedRoute component={<ConfigNghiPhep />} pageName={"config_nghi_phep"} />} />
            <Route exact path="/approve-workflows/configs/config-nghi-thai-san" element={<ProtectedRoute component={<ConfigNghiThaiSan />} pageName={"config_nghi_thai_san"} />} />
            <Route exact path="/approve-workflows/configs/config-check-in-out" element={<ProtectedRoute component={<ConfigCheckinout />} pageName={"config_check_in_out"} />} />

            <Route exact path="/approve-workflows/user-nghi-phep/view/:id" element={<ProtectedRoute component={<ViewNghiPhep isApprover={false} />} pageName={"user_nghi_phep_view"} />} />
            <Route exact path="/approve-workflows/user-nghi-thai-san/view/:id" element={<ProtectedRoute component={<ViewNghiThaiSan isApprover={false} />} pageName={"user_nghi_thai_san_view"} />} />
            <Route exact path="/approve-workflows/user-check-in-out/view/:id" element={<ProtectedRoute component={<ViewCheckInOut isApprover={false} />} pageName={"user_check_in_out_view"} />} />
            <Route exact path="/approve-workflows/user-nghi-phep/todo/:id" element={<ProtectedRoute component={<ViewNghiPhep isApprover={true} />} pageName={"user_nghi_phep_todo"} />} />
            <Route exact path="/approve-workflows/user-nghi-thai-san/todo/:id" element={<ProtectedRoute component={<ViewNghiThaiSan isApprover={true} />} pageName={"user_nghi_thai_san_todo"} />} />
            <Route exact path="/approve-workflows/user-check-in-out/todo/:id" element={<ProtectedRoute component={<ViewCheckInOut isApprover={true} />} pageName={"user_check_in_out_todo"} />} />

            {/* Administration module */}
            <Route path="/user" element={<ProtectedRoute component={<UserList />} pageName={"user_list"} />} />
            <Route path="/role" element={<ProtectedRoute component={<RoleList />} pageName={"role_list"} />} />
            <Route path="/group" element={<ProtectedRoute component={<GroupList />} pageName={"group_list"} />} />
            <Route path="/team" element={<ProtectedRoute component={<TeamList />} pageName={"team_list"} />} />
            <Route path="/permission" element={<ProtectedRoute component={<PermissionList />} pageName={"permission_list"} />} />
            <Route path="/department" element={<ProtectedRoute component={<DepartmentList />} pageName={"department_list"} />} />

            {/* Leave Balance  */}
            <Route exact path="/leave-balance/members" element={<ProtectedRoute component={<ViewMemberBalances />} />} />
            <Route exact path="/leave-balance/member/:id" element={<ProtectedRoute component={<EditMemberLeaveBalance />} />} />
            <Route exact path="/leave-balance/me" element={<ProtectedRoute component={<ViewMyBalances />} />} />

            {/* Virtual Space  */}
            <Route path="/taskboard" element={<ProtectedRoute component={<BoardList />} pageName={"taskboard_list"} />} />
            <Route path="/taskboard/:id" element={<ProtectedRoute component={<BoardDetail />} pageName={"taskboard_detail"} />} />
            <Route path="/taskboard/:id/label" element={<ProtectedRoute component={<LabelList />} pageName={"taskboard_label_list"} />} />
            <Route path="/taskboard/:id/column" element={<ProtectedRoute component={<ColumnList />} pageName={"taskboard_column_list"} />} />
            <Route path="/taskboard-report/" element={<ProtectedRoute component={<TaskBoardReport />} pageName={"taskboard_report"} />} />
            <Route path="/my-team/" element={<ProtectedRoute component={<MyTeam />} pageName={"my_team"} />} />

            {/* Timekeeping */}
            <Route path="/registe-image" element={<Registe />} pageName={"image_registration"} />
            <Route path="/timekeeping-schedule" element={<ProtectedRoute component={<TimekeepingSchedule />} pageName={"timekeeping_schedule"} />} />
            <Route path="/workingshift-registration" element={<ProtectedRoute component={<WorkingShiftRegistrationList />} pageName={"workingshift_registration"} />} />
            <Route path="/workingshift" element={<ProtectedRoute component={<WorkingShiftList />} pageName={"workingshift"} />} />
            <Route path="/registered-workingshift" element={<ProtectedRoute component={<RegisteredWorkingShiftList />} pageName={"registered_workingshift"} />} />
            <Route path="/workingshiftdayconfig" element={<ProtectedRoute component={<WorkingShiftDayConfigList />} pageName={"workingshift_dayconfig"} />} />
            <Route path="/check-in" element={<ProtectedRoute component={<CheckIn />} pageName={"check_in"} />} />
            <Route path="/check-in/configs" element={<ProtectedRoute component={<CheckinConfig />} pageName={"check_in_config"} />} />
            <Route path="/timekeeping-manage" element={<ProtectedRoute component={<TimekeepingManage />} pageName={"timekeeping_manage"} />} />
            <Route path="/timekeeping-manage-schedule/:month/:year/:id" element={<ProtectedRoute component={<EmployeeScheduleManager />} pageName={"timekeeping_manage_schedule"} />} />

            {/* Salary Management */}
            <Route path="/salary" element={<ProtectedRoute component={<SalaryList />} pageName={"salary_list"} />} />
            <Route path="/dab" element={<ProtectedRoute component={<DABList />} pageName={"dab_list"} />} />
            <Route path="/formula-variable" element={<ProtectedRoute component={<FormulaVariable />} pageName={"formula_variable_list"} />} />
            <Route path="/payroll" element={<ProtectedRoute component={<PayrollList />} pageName={"payroll_list"} />} />
            <Route path="/payroll/:id/payslip" element={<ProtectedRoute component={<PayslipList />} pageName={"payroll_detail"} />} />
            <Route path="/payroll/:payrollId/payslip/:payslipId" element={<ProtectedRoute component={<PayslipDetail />} pageName={"payslip_detail"} />} />
            <Route path="/salary-group/" element={<ProtectedRoute component={<SalaryGroupList />} pageName={"salary_group_list"} />} />
            <Route path="/my-dab" element={<ProtectedRoute component={<MyDABs />} pageName={"my_dab"} />} />
            <Route path="/my-payslips" element={<ProtectedRoute component={<MyPayslipList />} pageName={"my_payslip"} />} />
            <Route path="/my-payslips/:payslipId" element={<ProtectedRoute component={<MyPayslipDetail />} pageName={"my_payslip_detail"} />} />
            <Route path="/salary-report/" element={<ProtectedRoute component={<SalaryReport />} pageName={"salary_report"} />} />

            <Route path="/profile" element={<ProtectedRoute component={<UserProfile />} pageName="profile" />} />
            <Route path="/403" element={<Unauthorizied />} />
            <Route path='*' element={<NotFound />} />
        </Routes>

    </React.Suspense>
}