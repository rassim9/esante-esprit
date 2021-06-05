const db = require('../util/database');

module.exports = class User {
  constructor(name, email, password,taille, poids, date, role) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.taille = taille;
    this.poids = poids;
    this.date = date;
    this.role = role;

  }

  static find(email) {
    return db.execute('SELECT * FROM users WHERE email = ?', [email]);
  }
  static fetchAll(id) {
    return db.execute('SELECT * FROM users WHERE id = ?', [id]);
  }
  static findid(id) {
    return db.execute('SELECT * FROM users WHERE id = ?', [id]);
  }


  static save(user) {
    return db.execute(
      'INSERT INTO users (name, email, password,taille, poids, date, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [user.name, user.email, user.password, user.taille, user.poids, user.date, user.role]
    );
  }

  static savem(user) {
    return db.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [user.name, user.email, user.password, user.role]
    );
  }
};
