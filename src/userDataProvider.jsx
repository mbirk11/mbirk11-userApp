/** @format */

import React, { createContext, useCallback, useEffect, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { initialValue, initialEmptyValue } from "./data/initiaData";

export const UserDataContext = createContext();

const UserDataProvider = ({ children }) => {
  const [inputValue, setInputValue] = useState(initialEmptyValue);
  const [userList, setUserList] = useLocalStorage("list", initialValue);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
  };

  const filteredList = searchInput
    ? userList.users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
          user.idNumber.toLowerCase().includes(searchInput.toLowerCase()) ||
          user.dateOfBirth.toLowerCase().includes(searchInput.toLowerCase()) ||
          user.cars.some(
            (car) =>
              car.carNumber.toLowerCase().includes(searchInput.toLowerCase()) ||
              car.carBrand.toLowerCase().includes(searchInput.toLowerCase()) ||
              car.carModel.toLowerCase().includes(searchInput.toLowerCase())
          )
      )
    : userList.users;

  // Pagination
  const startIdx = (currentPage - 1) * userList.limit;
  const endIdx = startIdx + userList.limit;
  const displayedUsers = filteredList.slice(startIdx, endIdx);

  //Table inputs
  const handleEdit = (displayedUserIndex) => {
    const userIndex = startIdx + displayedUserIndex;

    setUserList((prevData) => {
      const updatedUsers = [...prevData.users];
      updatedUsers[userIndex] = {
        ...updatedUsers[userIndex],
        edit: !updatedUsers[userIndex].edit,
      };

      return {
        ...prevData,
        users: updatedUsers,
      };
    });
  };

  //User's Registration

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    setInputValue((prevData) => {
      const updatedInputValue = { ...prevData };
      updatedInputValue.users = [
        {
          ...updatedInputValue.users[0],
          [id]: value,
        },
      ];
      return updatedInputValue;
    });
  };

  const handleCarInputChange = (event, carIndex) => {
    const { id, value } = event.target;

    setInputValue((prevData) => {
      const updatedInputValue = {
        users: [
          {
            ...prevData.users[0],
            cars: prevData.users[0].cars.map((car, index) =>
              index === carIndex ? { ...car, [id]: value } : { ...car }
            ),
          },
        ],
      };
      return updatedInputValue;
    });
  };

  const handleDateChange = (date) => {
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
  };

  const addCar = () => {
    if (
      inputValue.users[0].name.trim() === "" ||
      inputValue.users[0].lastName.trim() === "" ||
      inputValue.users[0].idNumber.trim() === ""
    ) {
      alert("Please submit the form before adding a car.");
      return;
    }
    if (inputValue.users[0].cars.some((car) => car.carNumber.trim() !== "")) {
      setInputValue((prevInput) => {
        const newCar = {
          carNumber: "",
          carBrand: "",
          carModel: "",
        };
        const updatedInputValue = {
          users: [
            {
              ...prevInput.users[0],
              cars: [...prevInput.users[0].cars, newCar],
            },
          ],
        };
        return updatedInputValue;
      });
    }
  };
  const handleDeleteCar = (carIndex) => {
    setInputValue((prevInput) => {
      const updatedInputValue = {
        users: [
          {
            ...prevInput.users[0],
            cars: prevInput.users[0].cars.filter(
              (_, index) => index !== carIndex
            ),
          },
        ],
      };
      return updatedInputValue;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = inputValue.users[0];
    setUserList((prevData) => ({
      ...prevData,
      users: [...prevData.users, { ...newUser, id: userList.users.length }],
    }));
    setInputValue((prevData) => ({
      ...prevData,
      users: [
        {
          id: "",
          name: "",
          lastName: "",
          idNumber: "",
          dateOfBirth: "",
          cars: [{ carNumber: "", carBrand: "", carModel: "" }],
        },
      ],
    }));
  };

  return (
    <UserDataContext.Provider
      value={{
        inputValue,
        handleSubmit,
        addCar,
        handleCarInputChange,
        handleInputChange,
        userList,
        handleDateChange,
        handleDeleteCar,

        setUserList,
        handleSearchInput,
        filteredList,
        currentPage,
        setCurrentPage,
        handleEdit,
        displayedUsers,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
