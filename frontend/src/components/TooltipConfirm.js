import InfoTooltip from "./InfoTooltip";
import confirm from "../images/info-tooltip-confirmation.jpg";

function TooltipConfirm({ isOpen, onClose }) {
  return (
    <InfoTooltip
      title={"Вы успешно зарегистрировались!"}
      img={confirm}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}

export default TooltipConfirm;
