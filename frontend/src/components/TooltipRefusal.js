import InfoTooltip from "./InfoTooltip";
import refusal from "../images/info-tooltip-refusal.jpg";

function TooltipRefusal({ isOpen, onClose }) {
  return (
    <InfoTooltip
      title={"Что-то пошло не так! Попробуйте еще раз."}
      img={refusal}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
}

export default TooltipRefusal;
