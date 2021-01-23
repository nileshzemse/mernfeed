import bcryptjs from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@test.com",
    password: bcryptjs.hashSync("admin123", 10),
    isAdmin: true,
  },
  {
    name: "Nilesh Zemse",
    email: "nilesh.zemse@gmail.com",
    password: bcryptjs.hashSync("n123456", 10),
    isAdmin: false,
  },
  {
    name: "Pranamya",
    email: "pranamya@gmail.com",
    password: bcryptjs.hashSync("p123456", 10),
    isAdmin: false,
  },
  {
    name: "Mugdha",
    email: "mugdha@gmail.com",
    password: bcryptjs.hashSync("m123456", 10),
    isAdmin: false,
  },
  {
    name: "Jovita",
    email: "jovita@gmail.com",
    password: bcryptjs.hashSync("j123456", 10),
    isAdmin: false,
  },
];

export default users;
