const db = require('../util/database');

module.exports = class User {
  constructor(name, email, password, taille, poids, age, role, tel, sexe, adresse, profession) {
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
    this.profession=profession;

  }

  static find(email) {
    return db.execute('SELECT * FROM users WHERE email = ?', [email]);
  }
  static fetchAll(id) {
    return db.execute('SELECT * FROM users WHERE id = ?', [id]);
  }
  static fetchNut() {
    return db.execute('SELECT * FROM users WHERE profession = "nutritionniste"');
  }
  static fetchpsy() {
    return db.execute('SELECT * FROM users WHERE profession = "psychologue"');
  }
  static fetchcard() {
    return db.execute('SELECT * FROM users WHERE profession = "cardiologue"');
  }
  static fetchautrem() {
    return db.execute('SELECT * FROM users WHERE profession = "autre"');
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
      'INSERT INTO users (name, email, password, role, tel, sexe,profession) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [user.name, user.email, user.password, user.role, user.tel, user.sexe, user.profession]
    );
  }
};
