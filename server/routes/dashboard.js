const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");
const nodemailer = require("nodemailer");
const upload = require('../middleware/multer');
const validation = require('../middleware/multerValidation');
const updateValidation = require('../middleware/updateMulterValidation');

require("dotenv").config();

// NODEMAILER
let transporter = nodemailer.createTransport({
 service: "gmail",
 auth: {
   type: "OAuth2",
   user: process.env.EMAIL,
   pass: process.env.WORD,
   clientId: process.env.OAUTH_CLIENTID,
   clientSecret: process.env.OAUTH_CLIENT_SECRET,
   refreshToken: process.env.OAUTH_REFRESH_TOKEN,
 },
});

transporter.verify((err, success) => {
 err
   ? console.log(err)
   : console.log(`=== Server is ready to take messages: ${success} ===`);
});

//USER
//GET ALL THE USERS
router.get("/users", async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_id, fname, lname, user_email, username FROM users"
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// DELETE USER
router.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query(
      "DELETE FROM users WHERE user_id = $1 RETURNING *",
      [id]
    );

    res.json("User was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

// FORM
//CREATE FORM
  router.post("/form", upload, validation, async(req, res) => {
    try {

      const {fname, lname, address, phone_num, dob, gender, status, nationality, sponsor, sponsor_address, sponsor_phone, duration, date_comm, fee, ini_depo, reg_num, email } = req.body;

      // const image = req.file ? req.file.filename : ''
      const image = req.file.path
      const newForm = await pool.query( "INSERT INTO form (fname, lname, address, phone_num, dob, gender, status, nationality, sponsor, sponsor_address, sponsor_phone, duration, date_comm, fee, ini_depo, passport, reg_num, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING *",
      [fname, lname, address, phone_num, dob, gender, status, nationality, sponsor, sponsor_address, sponsor_phone, duration, date_comm, fee, ini_depo, image, reg_num, email])

      res.json(newForm.rows[0]);

      let mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "Nodemailer API",
        text: "Hi from your nodemailer API",
       };

       transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully");
          res.json({ status: "Email sent" });
        }
       });

    } catch (err) {
      console.error(err.message);
    }
  })

//GET ALL FORMS
router.get("/form", async(req, res) => {
  try {

    const getForm = await pool.query("SELECT form_id, fname, lname, address, phone_num, dob, gender, status, nationality, sponsor, sponsor_address, sponsor_phone, duration, date_comm, fee, ini_depo, passport, passport, reg_num, email, date_created FROM form")

    const { q } = req.query;

    const keys = ["fname", "lname"];

    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q))
      );
    };

    res.json(search(getForm.rows));

  } catch (err) {
    console.error(err.message)
  }
})

//UPDATE FORM
router.put("/form/:id", upload, updateValidation, async(req, res) => {
  try {

    // fields. same as in req.body
    const fields = ['fname', 'lname', 'address', 'phone_num', 'dob', 'gender', 'status', 'nationality', 'sponsor', 'sponsor_address', 'sponsor_phone', 'duration', 'fee', 'ini_depo', 'reg_num', 'email'];

    // store values
    const values = [];

    // dynamic query string
    let stmt = [];

    const {id} = req.params;

    // add some validation
    if(!id) {
      console.error('no id..');
      return res.json({msg:"err: no id"});
    }

    const image = req.file ? req.file.path : '';

    // build query
    fields.map((field)=>{
      if(req.body[field]) {
        values.push(req.body[field]);
        stmt.push(`${field} = $${values.length}`);
      }
    });

    // check image, as it's not in req.body
    if(image) {
      values.push(image);
      stmt.push(`passport = $${values.length}`);
    }


    // no data..end
    if(!values.length) {
      console.log('no data..');
      return res.json({msg:'no data..'});
    }


    // finish
    stmt = "UPDATE form SET " + stmt.join(', ');

    values.push(id);
    stmt += ` WHERE form_id = $${values.length}`;

    stmt += ' RETURNING *';

    const updateForm = await pool.query(stmt, values);

    res.json({msg:"Form was updated"});

  } catch (err) {
    console.error(err.message);
  }
});

//DELETE FORM
router.delete("/form/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteForm = await pool.query(
      "DELETE FROM form WHERE form_id = $1 RETURNING *",
      [id]
    );

    res.json("Form was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

//GET FORM BY ID
router.get("/form/:id", async(req, res) => {
  try {
    const { id } = req.params;
    const getForm = await pool.query("SELECT form_id, fname, lname, address, phone_num, dob, gender, status, nationality, sponsor, sponsor_address, sponsor_phone, duration, date_comm, fee, ini_depo, passport, passport, reg_num, email FROM form WHERE form_id = $1", [id])

    res.json(getForm.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

//NUM OF STUDENT ON 3 MONTHS PLAN
router.get("/total/four", async (req, res) => {
  try {
    const numForm = await pool.query(
      "SELECT COUNT (*) AS total FROM form WHERE duration LIKE '4 Months'",
    );

    res.json(numForm.rows[0].total);
  } catch (err) {
    console.error(err.message);
  }
});

//NUM OF STUDENT ON 6 MONTHS PLAN
router.get("/total/six", async (req, res) => {
  try {
    const numForm = await pool.query(
      "SELECT COUNT (*) AS total FROM form WHERE duration LIKE '6 Months'",
    );

    res.json(numForm.rows[0].total);
  } catch (err) {
    console.error(err.message);
  }
});

//NUN OF STUDENTS
router.get("/total", async (req, res) => {
  try {
    const numForm = await pool.query(
      "SELECT COUNT (*) AS total FROM form",
    );

    res.json(numForm.rows[0].total);
  } catch (err) {
    console.error(err.message);
  }
});

//MAIL: NODEMAILER TEST
router.post("/send", function (req, res) {
  let mailOptions = {
    from: process.env.EMAIL,
    to: 'ayurbarmi5@gmail.com',
    subject: "Nodemailer API",
    text: "Hi from your nodemailer API",
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
      res.json({ status: "Email sent" });
    }
  });
 });

  module.exports = router;