import { RiWifiLine } from "react-icons/ri";
import { FcSimCardChip } from "react-icons/fc";
import { FaCcMastercard, FaCcVisa, FaCcDiscover } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { changeActive, removeCard } from "../card/cardSlice";
import { IoRemoveCircleOutline } from "react-icons/io5";

const Card = (props) => {
  const {
    cardNumber,
    cardHolder,
    expireMonth,
    expireYear,
    vendor,
    isActive,
  } = props;

  const dispatch = useDispatch();

  const handleActiveCard = () => {
    dispatch(changeActive(cardNumber));
  };

  let formatNumber = cardNumber.match(/.{1,4}/g);

  return (
    <>
      {!isActive && (
        <IoRemoveCircleOutline
          size={30}
          style={{ color: "rgb(126, 0, 0)", cursor: "pointer" }}
          onClick={() => {
            dispatch(removeCard(cardNumber));
          }}
        />
      )}
      <div
        className={`card`}
        onDoubleClick={handleActiveCard}
        style={
          vendor === "Mastercard"
            ? { background: "#e53170" }
            : vendor === "Visa"
            ? { background: "#ff8906" }
            : vendor === "Discover"
            ? { background: "#f25f4c" }
            : null
        }
      >
        <div className="icons">
          <div className="left-icons">
            <RiWifiLine size={35} />
            <FcSimCardChip size={35} />
          </div>
          <div className="right-icon">
            {vendor === "Mastercard" ? (
              <FaCcMastercard size={35} />
            ) : vendor === "Visa" ? (
              <FaCcVisa size={35} />
            ) : vendor === "Discover" ? (
              <FaCcDiscover size={35} />
            ) : null}
          </div>
        </div>
        <h2>{formatNumber && formatNumber.join(" ")}</h2>
        <div className="down">
          <div className="top">
            <h6>CARDHOLDER NAME</h6>
            <h6>VALID THRU</h6>
          </div>
          <div className="bottom">
            <h5>{cardHolder}</h5>
            <h5>
              {expireMonth}/{expireYear}
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
