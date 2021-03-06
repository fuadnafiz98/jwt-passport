exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments();
    table.string("name");
    table.string("password");
    table.string("role");
    table.string("refreshToken");
    table.timestamp("lastLogin").defaultTo(knex.fn.now());
    table.timestamps();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("users");
};
