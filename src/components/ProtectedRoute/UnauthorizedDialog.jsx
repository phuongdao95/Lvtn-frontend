import { useNavigate } from "react-router";
import InfoDialog from "../Dialog/InfoDialog";

export default function UnauthorizedDialog(cb) {
    const navigate = useNavigate();

    return <InfoDialog title={"Unauthorized Error"}
        message={"Bạn không đủ quyên để truy cập chức năng này, vui lòng đăng nhập với quyền cao hơn"}
        closeDialogCb={() => { navigate("/") }}
    />
}