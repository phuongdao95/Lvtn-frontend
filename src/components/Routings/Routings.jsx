import { Route, Routes } from "react-router";

import WorkFlows from "../../modules/approve-workflow/user/WorkFlows";
import MyRequests from "../../modules/approve-workflow/view-requests/MyRequests";

import ConfigNghiPhep from "../../modules/approve-workflow/nghi-phep/ConfigNghiPhep";
import ConfigNghiThaiSan from "../../modules/approve-workflow/nghi-thai-san/ConfigNghiThaiSan";

import UserNghiPhep from "../../modules/approve-workflow/nghi-phep/UserNghiPhep";
import UserNghiThaiSan from "../../modules/approve-workflow/nghi-thai-san/UserNghiThaiSan";

import ListUsers from "../../modules/shares/pages/ListUsers/ListUsers";
import Timekeeping from "../../modules/check-day/pages/Timekeeping";
import Registe from "../../modules/check-day/pages/Registe";
import CheckIn from "../../modules/check-day/pages/CheckIn";
import Calendar from "../../modules/check-day/pages/Calendar";
import TableConfig from "../../modules/settings/virtual-space-config/TableConfig/TableConfig";
import LabelConfig from "../../modules/settings/virtual-space-config/LabelConfig/LabelConfig";
import TypeWorkDayConfig from "../../modules/settings/check-day-config/TypeWorkDayConfig/TypeWorkDayConfig";
import RulesWorkDayConfig from "../../modules/settings/check-day-config/RulesWorkDayConfig/RulesWorkDayConfig";
import PunishWorkDayConfig from "../../modules/settings/check-day-config/PunishWorkDayConfig/PunishWorkDayConfig";
import HolidayConfig from "../../modules/settings/check-day-config/HolidayConfig/HolidayConfig";
import TypeWorkShiftConfig from "../../modules/settings/check-day-config/TypeWorkShiftConfig/TypeWorkShiftConfig";
import SelectTypeWorkShift from "../../modules/check-day/pages/SelectTypeWorkShift"

import DABList from "../../modules/salary-management/pages/DABList/DABList";
import SalaryList from "../../modules/salary-management/pages/SalaryList";

import GroupList from "../../modules/administration/pages/GroupList/GroupList";
import PermissionList from "../../modules/administration/pages/PermissionList/PermissionList";
import UserList from "../../modules/administration/pages/UserList";
import RoleList from "../../modules/administration/pages/RoleList/RoleList";
import DepartmentList from "../../modules/administration/pages/DepartmentList";
import TeamList from "../../modules/administration/pages/TeamList";
import PayrollList from "../../modules/salary-management/pages/PayRollList/PayrollList.jsx";
import UserProfile from "../../modules/shares/pages/UserProfile/UserProfile";
import MyDABs from "../../modules/salary-management/pages/MyDABs/MyDABs";
import FormulaVariable from "../../modules/salary-management/pages/FormulaVariable/FormulaVariable";
import BoardDetail from "../../modules/virtual-space/pages/BoardDetail";
import BoardList from "../../modules/virtual-space/pages/BoardList";
import LabelList from "../../modules/virtual-space/pages/LabelList";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SalaryGroupList from "../../modules/salary-management/pages/SalaryGroup/SalaryGroupList";
import ColumnList from "../../modules/virtual-space/pages/ColumnList";
import PayslipList from "../../modules/salary-management/pages/PayRollList/PayslipList";

export default function Routings() {
    return <Routes>
        <Route path="/approve-workflows" element={<WorkFlows />} />
        <Route path="/approve-workflows/my-requests" element={<MyRequests />} />

        <Route exact path="/approve-workflows/user-nghi-phep" element={<UserNghiPhep />} />
        <Route exact path="/approve-workflows/user-nghi-thai-san" element={<UserNghiThaiSan />} />

        <Route exact path="/approve-workflows/config-nghi-phep" element={<ConfigNghiPhep />} />
        <Route exact path="/approve-workflows/config-nghi-thai-san" element={<ConfigNghiThaiSan />} />

        <Route path="/check-in-2" element={<Timekeeping />} />
        <Route path="/check-in" element={<CheckIn />} />
        {/* <Route path="/check-out" element={<Timekeeping />} /> */}
        <Route path="/registe-image" element={<Registe />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/select-type-work-shift" element={<SelectTypeWorkShift />} />

        <Route path="/taskboard" element={<BoardList />} />
        <Route path="/taskboard/:id" element={<BoardDetail />} />
        <Route path="/taskboard/:id/label" element={<LabelList />} />
        <Route path="/taskboard/:id/column" element={<ColumnList />} />

        <Route path="/check-day-config/type-work-day" element={<TypeWorkDayConfig />} />
        <Route path="/check-day-config/rules-work-day" element={<RulesWorkDayConfig />} />
        <Route path="/check-day-config/punish-work-day" element={<PunishWorkDayConfig />} />
        <Route path="/check-day-config/holiday" element={<HolidayConfig />} />
        <Route path="/check-day-config/type-work-shift-day" element={<TypeWorkShiftConfig />} />

        <Route path="/list-users" element={<ListUsers />} />

        {/* Administration module */}

        <Route path="/user" element={
            <ProtectedRoute>
                <UserList />
            </ProtectedRoute>
        } />

        <Route path="/role" element={
            <ProtectedRoute>
                <RoleList />
            </ProtectedRoute>
        } />
        <Route path="/group" element={<GroupList />} />
        <Route path="/team" element={<TeamList />} />
        <Route path="/permission" element={<PermissionList />} />
        <Route path="/department" element={<DepartmentList />} />

        {/* Salary Management Module */}
        <Route path="/salary" element={<SalaryList />} />
        <Route path="/dab" element={<DABList />} />
        <Route path="/my-dab" element={<MyDABs />} />
        <Route path="/formula-variable" element={<FormulaVariable />} />
        <Route path="/payroll" element={<PayrollList />} />
        <Route path="/payroll/:id/payslip" element={<PayslipList />} />
        <Route path="/salary-group/" element={<SalaryGroupList />} />



        {/** Shared module */}
        <Route path="/my-profile" element={<UserProfile />} />

    </Routes>
}