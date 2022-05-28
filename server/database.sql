CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),
  fname VARCHAR(255) NOT NULL,
  lname VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE form(
  form_id uuid DEFAULT uuid_generate_v4(),
  fname VARCHAR(20),
  lname  VARCHAR(20),
  address VARCHAR(255),
  phone_num VARCHAR(11),
  dob DATE,
  gender VARCHAR(10),
  status VARCHAR(10),
  nationality VARCHAR(50),
  sponsor VARCHAR(20),
  sponsor_address VARCHAR(255),
  sponsor_phone VARCHAR(11),
  duration VARCHAR(20),
  date_comm DATE,
  fee VARCHAR(10),
  ini_depo VARCHAR(10),
  reg_num VARCHAR(10),
  passport VARCHAR(255),
  email VARCHAR (255),
  date_created DATE DEFAULT CURRENT_DATE
);