
exports.up = function(knex, Promise) {
  return Promise.all([ 
    knex.schema.createTable('information', (table) => { 
      table.increments(`product_id`).primary(); 
      table.string(`name`).notNullable(); 
      table.text('description').notNullable(); 
      table.float('cost').notNullable(); 
      table.integer('reviews'); 
      table.integer('average_review'); 
    }),

    knex.schema.createTable('images', (table) => { 
      table.increments(`product_id`)
        .primary()
        .notNullable() 
        .references(`information.product_id`); 
      table.string(`img_1`);
      table.string(`img_2`);
      table.string(`img_3`);
      table.string(`img_4`);
      table.string(`img_5`);
      table.string(`img_6`);
      table.string(`img_7`);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([ 
    knex.schema.dropTable(`images`),
    knex.schema.dropTable(`information`) 
  ]);
};
