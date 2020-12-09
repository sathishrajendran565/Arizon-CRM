exports.init = async (client) => {
  var res = await client.query(`
    CREATE TABLE IF NOT EXISTS consultants
    (
        id serial not null PRIMARY KEY, 
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        uuid char(36) not null, 
        name varchar(100) not null,
        phone varchar(100) not null,
        email varchar(100) not null,
        linkedInUrl varchar(100) not null
    );  
    `);
  await client.query(`
    CREATE TABLE IF NOT EXISTS SearchTags
    (
        id serial not null PRIMARY KEY, 
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        uuid char(36) not null, 
        tag_name varchar(100) not null, 
        consultant_id INT not null
    );  
    `);
};

exports.getUser = async (client, uuid) => {
  var user = {};
  var consultantFromDb = await client.query(
    `
    select id, uuid, name, phone, email, linkedInUrl from consultants where uuid = $1 
    `,
    [uuid]
  );
  if (consultantFromDb.rows.length == 0) {
    return null;
  }
  var searchTagsFromDb = await client.query(
    `
    select uuid, tag_name from searchtags where consultant_id = $1
    `,
    [consultantFromDb.rows[0].id]
  );
  console.log(consultantFromDb);
  user.UUID = consultantFromDb.rows[0].uuid;
  user.Name = consultantFromDb.rows[0].name;
  user.Phone = consultantFromDb.rows[0].phone;
  user.Email = consultantFromDb.rows[0].email;
  user.LinkedInUrl = consultantFromDb.rows[0].linkedinurl;

  if (searchTagsFromDb.rows.length > 0) {
    user.Tags = searchTagsFromDb.rows.map(function (x) {
      return { UUID: x.uuid, TagName: x.tag_name };
    });
  }

  return user;
};

exports.getUserByTags = async (client, tags) => {
  console.log("tags input!");
  console.log(tags);
  var user;
  var consultantIds = [];
  var tagsArray = [];
  var consultantsFromDb = await client.query(
    `
    select distinct consultant_id  from searchtags where tag_name = ANY ($1::text[])
    `,
    [tags]
  );

  consultantIds = consultantsFromDb.rows.map(function (x) {
    return x.consultant_id;
  });

  var searchResult = await client.query(
    `
    select name, phone, email, linkedinurl from consultants where id = ANY ($1::int[])
    `,
    [consultantIds]
  );

  user = searchResult.rows.map(function (x) {
    var userObject = {
      Name: x.name,
      Phone: x.phone,
      Email: x.email,
      LinkedInUrl: x.linkedinurl,
    };
    return userObject;
  });

  return user;
};
