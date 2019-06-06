
exports.up = function(knex, Promise) {
  return knex.schema.createTable('information_and_images', (table) => { 
      table.increments(`product_id`).primary(); 
      table.string(`name`).notNullable(); 
      table.string('description').notNullable(); 
      table.float('cost').notNullable(); 
      table.integer('reviews'); 
      table.integer('average_review'); 
      table.integer('UUID').notNullable();  
      table.string(`img_1`);
      table.string(`img_2`);
      table.string(`img_3`);
      table.string(`img_4`);
      table.string(`img_5`);
      table.string(`img_6`);
      table.string(`img_7`);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(`information_and_images`); 
};
