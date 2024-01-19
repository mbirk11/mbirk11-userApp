/** @format */

import { Button, Datepicker } from "flowbite-react";

import React, { useContext } from "react";
import Navigation from "../../components/navBar";
import { UserDataContext } from "../../userDataProvider";
import { useNavigate } from "react-router-dom";

const UserRegistrationForm = () => {
  const {
    inputValue,
    handleSubmit,
    handleCarInputChange,
    handleInputChange,
    addCar,
    handleDateChange,
    handleDeleteCar,
  } = useContext(UserDataContext);

  const navigate = useNavigate();

  return (
    <>
      <Navigation />
      <section className="bg-white dark:bg-gray-900  ">
        <div
          className="py-8 px-4 mx-auto max-w-2xl lg:py-16 "
          onClick={() => {
            navigate("/");
          }}
        >
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Add a new user
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden p-4"
          >
            <div className="grid gap-6 mb-6 md:grid-cols-2 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First name
                </label>
                <input
                  onChange={handleInputChange}
                  value={inputValue.users[0].name}
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last name
                </label>
                <input
                  onChange={handleInputChange}
                  value={inputValue.users[0].lastName}
                  type="text"
                  id="lastName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="dateOfBirthd"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date of Birthd
              </label>
              <Datepicker
                value={inputValue.users[0].dateOfBirthd}
                onSelectedDateChanged={(date) => handleDateChange(date)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="idNumber"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ID number
              </label>
              <input
                onChange={handleInputChange}
                value={inputValue.users[0].idNumber}
                type="idNumber"
                id="idNumber"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="01010101011"
                pattern="[0-9]{11}"
                required
              />
            </div>
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Cars:
            </h2>
            <div className="grid gap-6 mb-6 md:grid-cols-5 sm:grid-cols-5">
              {inputValue.users[0].cars.map((car, carIndex) => (
                <React.Fragment key={carIndex}>
                  <div>
                    <label
                      htmlFor="carNumber"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Car number
                    </label>
                    <input
                      onChange={(event) =>
                        handleCarInputChange(event, carIndex)
                      }
                      value={car.carNumber}
                      type="text"
                      id="carNumber"
                      name="carNumber"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="MR-011-BR"
                      pattern="^[A-Z]{2}-\d{3}-[A-Z]{2}$"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="carBrand"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Car Brand
                    </label>
                    <input
                      onChange={(event) =>
                        handleCarInputChange(event, carIndex)
                      }
                      value={car.carBrand}
                      type="text"
                      id="carBrand"
                      name="carBrand"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Brand"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="carModel"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Car Model
                    </label>
                    <input
                      onChange={(event) =>
                        handleCarInputChange(event, carIndex)
                      }
                      value={car.carModel}
                      type="text"
                      id="carModel"
                      name="carModel"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Model"
                    />
                  </div>
                  <div className="w-32 flex items-end justify-center">
                    <Button color="success" onClick={addCar}>
                      Add Car
                    </Button>
                  </div>
                  <div className="w-32 flex items-end justify-center">
                    <Button
                      color="failure"
                      onClick={() => handleDeleteCar(carIndex)}
                    >
                      Delete
                    </Button>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <Button type="submit"> Add user</Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default UserRegistrationForm;
