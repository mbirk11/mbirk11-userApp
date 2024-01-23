/** @format */

import React, { useContext } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserDataContext } from "../../userDataProvider";

const DatePicker = () => {
  const { setInputValue, inputValue } = useContext(UserDataContext);

  const handleDateChange = (date) => {
    if (date instanceof Date) {
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      setInputValue((prevData) => ({
        ...prevData,
        users: prevData.users.map((user, index) =>
          index === 0 ? { ...user, dateOfBirth: formattedDate } : user
        ),
      }));
    }
  };

  const initialDate = inputValue.users[0].dateOfBirth
    ? new Date(inputValue.users[0].dateOfBirth)
    : null;

  return (
    <ReactDatePicker
      onChange={handleDateChange}
      selected={initialDate}
      dateFormat="dd/MM/yyyy"
      placeholderText="Select date"
      showYearDropdown
      useShortMonthInDropdown
      dropdownMode="select"
      showMonthDropdown
    />
  );
};

export default DatePicker;
