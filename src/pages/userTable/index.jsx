/** @format */

import React, { useContext } from "react";
import Pagination from "../../components/customComponents/pagination";
import Navigation from "../../components/navBar";
import { UserDataContext } from "../../userDataProvider";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, TextInput } from "flowbite-react";
import Search from "../../components/search";

//table fileds
const fieldNames = [
  "id",
  "name",
  "lastName",
  "idNumber",
  "dateOfBirth",
  "carNumber",
  "carBrand",
  "carModel",
];
const userTable = () => {
  const navigate = useNavigate();
  const { setUserList, handleEdit, displayedUsers, startIdx } =
    useContext(UserDataContext);

  const handleCarInputChange = (e, userIndex, carIndex, fieldName) => {
    const { value } = e.target;

    setUserList((prevData) => {
      const updatedUsers = [...prevData.users];
      const absoluteUserIndex = startIdx + userIndex;
      updatedUsers[absoluteUserIndex] = {
        ...updatedUsers[absoluteUserIndex],
        cars: updatedUsers[absoluteUserIndex].cars.map((car, index) =>
          index === carIndex ? { ...car, [fieldName]: value } : car
        ),
      };
      return {
        ...prevData,
        users: updatedUsers,
      };
    });
  };

  const handleUserInputChange = (e, userIndex, fieldName) => {
    const { value } = e.target;

    setUserList((prevData) => {
      const updatedUsers = [...prevData.users];
      const absoluteUserIndex = startIdx + userIndex;
      updatedUsers[absoluteUserIndex] = {
        ...updatedUsers[absoluteUserIndex],
        [fieldName]: value,
      };
      return {
        ...prevData,
        users: updatedUsers,
      };
    });
  };

  const handleDelete = (userIndex) => {
    setUserList((prevData) => {
      const updatedUsers = [...prevData.users];
      const absoluteUserIndex = startIdx + userIndex;
      updatedUsers.splice(absoluteUserIndex, 1);
      return {
        ...prevData,
        users: updatedUsers,
      };
    });
  };

  return (
    <>
      <Navigation />
      <section className=" mx-auto max-w-screen-xl px-4 lg:px-12 ">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className=" h-50  flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <Search />
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <Button onClick={() => navigate("/userRegistration")}>
                <svg
                  className="h-3.5 w-3.5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  />
                </svg>
                Add New User
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {fieldNames.slice(0, 5).map((field, index) => (
                    <th key={index} scope="col" className="px-4 py-3">
                      {field}
                    </th>
                  ))}
                  <td className="flex justify-between  ">
                    {fieldNames.slice(5, 8).map((carField, i) => (
                      <div
                        key={i}
                        className="px-4 py-3 border-b dark:border-gray-700 text-xs font-bold text-gray-900 dark:text-gray-300"
                      >
                        {carField}
                      </div>
                    ))}
                  </td>
                </tr>
              </thead>
              <tbody>
                {displayedUsers.map((user, userIndex) => (
                  <React.Fragment key={userIndex}>
                    <tr className="border-b dark:border-gray-700">
                      {user.edit ? (
                        <td className="px-4 py-3">
                          <TextInput
                            value={user.id}
                            onChange={(e) =>
                              handleUserInputChange(e, userIndex, "id")
                            }
                          />
                        </td>
                      ) : (
                        <td className="px-4 py-3">{user.id}</td>
                      )}
                      {user.edit ? (
                        <td className="px-4 py-3">
                          <TextInput
                            value={user.name}
                            onChange={(e) =>
                              handleUserInputChange(e, userIndex, "name")
                            }
                          />
                        </td>
                      ) : (
                        <td className="px-4 py-3">{user.name}</td>
                      )}
                      {user.edit ? (
                        <td className="px-4 py-3">
                          <TextInput
                            value={user.lastName}
                            onChange={(e) =>
                              handleUserInputChange(e, userIndex, "lastName")
                            }
                          />
                        </td>
                      ) : (
                        <td className="px-4 py-3">{user.lastName}</td>
                      )}
                      {user.edit ? (
                        <td className="px-4 py-3">
                          <TextInput
                            value={user.idNumber}
                            onChange={(e) =>
                              handleUserInputChange(e, userIndex, "idNumber")
                            }
                          />
                        </td>
                      ) : (
                        <td className="px-4 py-3">{user.idNumber}</td>
                      )}
                      {user.edit ? (
                        <td className="px-4 py-3">
                          <TextInput
                            value={user.dateOfBirth}
                            onChange={(e) =>
                              handleUserInputChange(e, userIndex, "dateOfBirth")
                            }
                          />
                        </td>
                      ) : (
                        <td className="px-4 py-3">{user.dateOfBirth}</td>
                      )}

                      <td colSpan="4">
                        {user.cars.map((car, carIndex) => (
                          <div
                            key={carIndex}
                            className="flex mb-2 justify-around border-b dark:border-gray-700"
                          >
                            {user.edit ? (
                              <div className="px-4 py-3 ">
                                <TextInput
                                  value={car.carNumber}
                                  onChange={(e) =>
                                    handleCarInputChange(
                                      e,
                                      userIndex,
                                      carIndex,
                                      "carNumber"
                                    )
                                  }
                                />
                              </div>
                            ) : (
                              <div className="px-4 py-3 ">{car.carNumber}</div>
                            )}
                            {user.edit ? (
                              <div className="px-4 py-3 ">
                                <TextInput
                                  value={car.carBrand}
                                  onChange={(e) =>
                                    handleCarInputChange(
                                      e,
                                      userIndex,
                                      carIndex,
                                      "carBrand"
                                    )
                                  }
                                />
                              </div>
                            ) : (
                              <div className="px-4 py-3 ">{car.carBrand}</div>
                            )}
                            {user.edit ? (
                              <div className="px-4 py-3 ">
                                <TextInput
                                  value={car.carModel}
                                  onChange={(e) =>
                                    handleCarInputChange(
                                      e,
                                      userIndex,
                                      carIndex,
                                      "carModel"
                                    )
                                  }
                                />
                              </div>
                            ) : (
                              <div className="px-4 py-3 ">{car.carModel}</div>
                            )}
                          </div>
                        ))}
                      </td>
                      <td className="px-4 py-3 flex gap-2 items-center justify-end ">
                        <Dropdown label="Change">
                          <Dropdown.Item
                            color="dark"
                            onClick={() => handleEdit(userIndex)}
                          >
                            {user.edit ? "Save" : "Edit"}
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleDelete(userIndex)}
                            color="failure"
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination />
        </div>
      </section>
    </>
  );
};

export default userTable;
