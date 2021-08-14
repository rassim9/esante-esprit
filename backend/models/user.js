const db = require('../util/database');

module.exports = class User {
  constructor(name, email, password, taille, poids, age, role, tel, sexe, adresse) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.taille = taille;
    this.poids = poids;
    this.age = age;
    this.role = role;
    this.tel = tel;
    this.sexe = sexe;
    this.adresse=adresse;

  }

  static find(email) {
    return db.execute('SELECT * FROM users WHERE email = ?', [email]);
  }
  static fetchAll(id) {
    return db.execute('SELECT * FROM users WHERE id = ?', [id]);
  }
  static fetchAllemail() {
    return db.execute('SELECT * FROM users');
  }
  static findid(id) {
    return db.execute('SELECT * FROM users WHERE id = ?', [id]);
  }


  static save(user) {
    return db.execute(
      'INSERT INTO users (name, email, password, taille, poids, age, role, tel, sexe, adresse) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [user.name, user.email, user.password, user.taille, user.poids, user.age, user.role, user.tel, user.sexe, user.adresse]
    );
  }

  static savem(user) {
    return db.execute(
      'INSERT INTO users (name, email, password, role, tel, sexe) VALUES (?, ?, ?, ?, ?, ?)',
      [user.name, user.email, user.password, user.role, user.tel, user.sexe]
    );
  }
};
