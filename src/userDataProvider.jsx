/** @format */

import React, { createContext, useCallback, useEffect, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

export const UserDataContext = createContext();
const initialValue = {
  users: [
    {
      name: "",
      lastName: "",
      idNumber: "",
      dateOfBirthd: "",
      cars: [{ carNumber: "", carBrand: "", carModel: "" }],
      edit: false,
    },
  ],
  limit: 5,
};

const UserDataProvider = ({ children }) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [userList, setUserList] = useLocalStorage("list", initialValue);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  //User's table
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };
  const filteredList = {
    users: searchInput
      ? userList.users.filter(
          (user) =>
            user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
            user.idNumber.toLowerCase().includes(searchInput.toLowerCase()) ||
            user.dateOfBirthd
              .toLowerCase()
              .includes(searchInput.toLowerCase()) ||
            user.cars.some(
              (car) =>
                car.carNumber
                  .toLowerCase()
                  .includes(searchInput.toLowerCase()) ||
                car.carBrand
                  .toLowerCase()
                  .includes(searchInput.toLowerCase()) ||
                car.carModel.toLowerCase().includes(searchInput.toLowerCase())
            )
        )
      : userList.users,
  };

  const handleEdit = (userIndex) => {
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
        index === 0 ? { ...user, dateOfBirthd: formattedDate } : user
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
      users: [...prevData.users, newUser],
    }));
    setInputValue((prevData) => ({
      ...prevData,
      users: [
        {
          name: "",
          lastName: "",
          idNumber: "",
          dateOfBirthd: "",
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
        handleEdit,
        setUserList,
        handleSearchInput,
        filteredList,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataProvider;
