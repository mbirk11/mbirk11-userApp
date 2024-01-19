/** @format */

export const initialValue = {
  limit: 5,
  users: [
    {
      id: 0,
      name: "Mariam",
      lastName: "Birkadze",
      idNumber: "01017056233",
      dateOfBirth: "Jan 11,1990",
      cars: [
        { carNumber: "MR-011-BR", carBrand: "Subaru", carModel: "Forester" },
      ],
      edit: false,
    },
    {
      id: 1,
      name: "Nino",
      lastName: "Barbakadze",
      idNumber: "01918765623",
      dateOfBirth: "Mar 15,1985",
      cars: [{ carNumber: "NR-301-KR", carBrand: "Toyota", carModel: "Prius" }],
      edit: false,
    },
    {
      id: 2,
      name: "Lela",
      lastName: "Badrishvili",
      idNumber: "01017056233",
      dateOfBirth: "Jan 11,1977",
      cars: [
        { carNumber: "MR-701-BP", carBrand: "Subaru", carModel: "Crostak" },
      ],
      edit: false,
    },
    {
      id: 3,
      name: "Giorgi",
      lastName: "Barbakadze",
      idNumber: "01917056233",
      dateOfBirth: "Jan 19,1988",
      cars: [
        { carNumber: "ND-401-KR", carBrand: "Toyota", carModel: "Foraner" },
      ],
      edit: false,
    },
    {
      id: 4,
      name: "Davit",
      lastName: "Nikuradze",
      idNumber: "01917059033",
      dateOfBirth: "Jun 16,1972",
      cars: [{ carNumber: "NR-391-KU", carBrand: "Nissan", carModel: "Juke" }],
      edit: false,
    },
    {
      id: 5,
      name: "Vladimer",
      lastName: "Leladze",
      idNumber: "01099956233",
      dateOfBirth: "Jul 11,1977",
      cars: [{ carNumber: "MR-011-KK", carBrand: "Lexus", carModel: "Rx-450" }],
      edit: false,
    },
    {
      id: 6,
      name: "Nini",
      lastName: "BaKradze",
      idNumber: "01917333233",
      dateOfBirth: "Jan 30,1984",
      cars: [{ carNumber: "NR-311-DD", carBrand: "Toyota", carModel: "Prado" }],
      edit: false,
    },
  ],
};
export const initialEmptyValue = {
  users: [
    {
      name: "",
      lastName: "",
      idNumber: "",
      dateOfBirth: "",
      cars: [{ carNumber: "", carBrand: "", carModel: "" }],
      edit: false,
    },
  ],
};
