const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (err, result) => {
    if (err) throw err;
    res.status(200).json(result.rows);
  });
};

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;
  pool.query(queries.checkEmailExist, [email], (err, result) => {
    if (err) throw err;
    if (result.rows.length) {
      res.send("could not add student, Email already exist");
    } else {
      pool.query(queries.addStudent, [name, email, age, dob], (err, result) => {
        if (err) throw err;
        res.status(200).send("student added Successfully");
      });
    }
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (err, result) => {
    if (err) throw err;
    const noStudentFound = !result.rows.length;
    if (noStudentFound) {
      res.send("student does not exist");
    } else {
      res.status(200).json(result.rows);
    }
  });
};

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, age, dob } = req.body;
  pool.query(queries.getStudentById, [id], (err, result) => {
    const noStudentFound = !result.rows.length;
    if (noStudentFound) {
      res.send("couldn't update, no student found");
    } else {
      pool.query(
        queries.updateStudent,
        [name, email, age, dob, id],
        (err, result) => {
          if (err) throw err;
          res.status(200).send("student updated successfully");
        }
      );
    }
  });
};

const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (err, result) => {
    if (err) throw err;
    const noStudentFound = !result.rows.length;
    if (noStudentFound) {
      res.send("could not delete, no student found");
    } else {
      pool.query(queries.deleteStudent, [id], (err, result) => {
        res.status(200).send("student deleted Successfully");
      });
    }
  });
};

module.exports = {
  getStudents,
  addStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
};
