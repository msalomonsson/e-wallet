import Card from "../card/Card";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addCard } from "../card/cardSlice";
import { useHistory } from "react-router-dom";

const AddCard = () => {
  const { cardHolder } = useSelector((state) => state.card.cards[0]);
  const [invalidForm, setInvalidForm] = useState();
  let history = useHistory();
  const dispatch = useDispatch();

  const [card, setCard] = useState({
    cardNumber: "",
    cardHolder: cardHolder,
    expireMonth: "",
    expireYear: "",
    ccv: "",
    vendor: "Mastercard",
    isActive: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !(parseInt(card.expireMonth) > 12) &&
      parseInt(card.expireMonth) > 0 &&
      !(parseInt(card.expireYear) < 22) &&
      card.ccv.length === 3 &&
      card.cardNumber.length === 16
    ) {
      setInvalidForm(false);
      dispatch(addCard(card));
      history.goBack();
    } else {
      setInvalidForm(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCard((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="addCard">
      <h1>
        ADD A NEW <br /> BANK CARD
      </h1>
      <Card {...card} />
      {invalidForm && <h3 className="invalid-form">Error Invalid Form</h3>}
      <form onSubmit={handleSubmit}>
        <label>
          Card Number
          <input
            type="text"
            name="cardNumber"
            placeholder="Enter Card Number"
            value={card.cardNumber.replace(/[^0-9]/g, "")}
            required
            onChange={handleChange}
            maxLength="16"
            min="16"
          />
          {card.cardNumber && !(card.cardNumber.length === 16) && (
            <h4 style={{ color: "rgb(126, 0, 0)" }}>
              Error only accept 16 digits
            </h4>
          )}
        </label>
        <label>
          Card Holder
          <input
            type="text"
            disabled
            name="cardHolder"
            defaultValue={card.cardHolder}
          />
        </label>
        <div className="monthYear">
          <label>
            Expire Month
            <input
              type="text"
              name="expireMonth"
              placeholder="Enter Expire Month"
              value={card.expireMonth.replace(/[^0-9]/g, "")}
              onChange={handleChange}
              required
              min="1"
              maxLength="2"
            />
            {parseInt(card.expireMonth) === 0 ||
            parseInt(card.expireMonth) > 12 ? (
              <h4 style={{ color: "rgb(126, 0, 0)" }}>Error month 1-12</h4>
            ) : null}
          </label>
          <label>
            Expire Year
            <input
              type="text"
              name="expireYear"
              placeholder="Enter Expire Year"
              value={card.expireYear.replace(/[^0-9]/g, "")}
              onChange={handleChange}
              required
              maxLength="2"
            />
            {parseInt(card.expireYear) < 22 && (
              <h4 style={{ color: "rgb(126, 0, 0)" }}>Error year after 2021</h4>
            )}
          </label>
        </div>
        <label>
          CCV
          <input
            type="text"
            name="ccv"
            placeholder="Enter ccv"
            value={card.ccv.replace(/[^0-9]/g, "")}
            onChange={handleChange}
            required
            maxLength="3"
          />
          {card.ccv.length < 3 && card.ccv.length > 0 && (
            <h4 style={{ color: "rgb(126, 0, 0)" }}>Error ccv need 3digits</h4>
          )}
        </label>
        <label>
          Vendor
          <select
            value={card.vendor}
            onChange={handleChange}
            name="vendor"
            className="select"
          >
            <option value="Mastercard">Mastercard</option>
            <option value="Visa">Visa</option>
            <option value="Discover">Discover</option>
          </select>
        </label>
        <input type="submit" />
      </form>
    </div>
  );
};

export default AddCard;
