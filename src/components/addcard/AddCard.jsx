import Card from "../card/Card";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addCard } from "../card/cardSlice";
import { useHistory } from "react-router-dom";

const AddCard = () => {
  const { cardHolder } = useSelector((state) => state.card.cards[0]);
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

    console.log(card);
    dispatch(addCard(card));
    history.goBack();
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

      <form onSubmit={handleSubmit}>
        <label>
          Card Number
          <input
            type="text"
            name="cardNumber"
            placeholder="Enter Card Number"
            value={card.cardNumber}
            required
            onChange={handleChange}
            maxLength="16"
            min="16"
          />
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
              type="number"
              name="expireMonth"
              placeholder="Enter Expire Month"
              value={card.expireMonth}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Expire Year
            <input
              type="number"
              name="expireYear"
              placeholder="Enter Expire Year"
              value={card.expireYear}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <label>
          CCV
          <input
            type="number"
            name="ccv"
            placeholder="Enter ccv"
            value={card.ccv}
            onChange={handleChange}
            required
          />
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
