const uuidv4 = require("uuid/v4");
const { Client } = require("pg");
var common = require("../Common/postgresql");

exports.func = async (_, obj) => {
  var client = new Client({
    host: process.env.POSTGRESQL_HOST,
    port: process.env.POSTGRESQL_PORT,
    database: process.env.DB_NAME,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
  });
  console.log("connecting!");
  client.connect();
  console.log("connected!");
  await common.init(client);
  var userUUID = uuidv4();
  let userInserted = await client.query(
    "INSERT INTO consultants (uuid, name, phone, email, linkedInUrl) VALUES($1, $2, $3, $4, $5) RETURNING id",
    [
      userUUID,
      obj.input.Name,
      obj.input.Phone,
      obj.input.Email,
      obj.input.LinkedInUrl,
    ]
  );

  var userId = userInserted.rows[0].id;
  for (let index = 0; index < obj.input.Tags.length; index++) {
    const element = obj.input.Tags[index];
    await client.query(
      "INSERT INTO SearchTags (uuid, tag_name, consultant_id) VALUES($1, $2, $3)",
      [uuidv4(), element.TagName, userId]
    );
  }
  var resp = await common.getUser(client, userUUID);
  client.end();
  return resp;
};
