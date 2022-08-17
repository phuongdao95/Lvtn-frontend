import { Popup } from "../../../components/Popup/Popup";

export default function CreateNewPopup() {
  return (
    <Popup
      title={"Create new deduction"}
      primaryAction={"Submit"}
      secondaryAction={"Cancel"}
    ></Popup>
  );
}
