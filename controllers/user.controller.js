const pool = require("../config/db");

const addUser = async (ctx) => {
  try {
    const userAgent = ctx.request.headers["user-agent"];

    if (userAgent.indexOf("Postman") > -1 == false) {
      return (ctx.body = "You cannot add users from Chrome");
    }

    const { name, age } = ctx.request.body;

    const newUser = await pool.query(
      `
        INSERT INTO "user" (name, age)
        VALUES ($1, $2)
        RETURNING *
      `,
      [name, age]
    );
    console.log(newUser);
    ctx.status = 200;
    ctx.body = newUser.rows;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = "Server error";
  }
};


const getUser = async (ctx) => {
  try {
    const userAgent = ctx.request.headers["user-agent"];
    if (userAgent.includes("Postman")) {
      ctx.status = 403;
      ctx.body = "YOU CAN'T TAKE USERS FROM POSTMAN";
    } else {
      const users = await pool.query(`SELECT * FROM "user"`);
      console.log(users)
      ctx.status = 200;
      ctx.body = users.rows;
    }
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    ctx.body = "Server error";
  }
};


const deleteUser = async (ctx) => {
  try {
    const userAgent = ctx.request.headers["user-agent"];

    if (userAgent.indexOf("Postman") > -1 == false) {
      return (ctx.body = "You cannot delete users from Chrome");
    }

    const id = ctx.params.id;
    await pool.query(`DELETE FROM "user" WHERE id = $1`, [id]);
    ctx.status = 200;
    ctx.body = "Successfully deleted";
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Server error";
  }
};

const updateUser = async (ctx) => {
  try {
    const userAgent = ctx.request.headers["user-agent"];

    if (userAgent.indexOf("Postman") > -1 == false) {
      return (ctx.body = "You cannot update users from Chrome");
    }

    const id = ctx.params.id;
    const { name, age } = ctx.request.body;

    const newUser = await pool.query(
      `
        UPDATE "user" name = $1, age = $2 WHERE id = $3 RETURNING *
        `,
      [name, age, id]
    );
    ctx.status = 200;
    ctx.body = newUser.rows;
  } catch (error) {
    ctx.status = 500;
    ctx.body = "Server error";
    console.log(error);
  }
};

module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser,
};
