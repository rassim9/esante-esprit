const db = require('../util/database');

module.exports = class Etat {
  constructor(forme, desc, username) {
    this.forme = forme;
    this.desc = desc;
    this.username = username;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM etats');
  }

  static save(etat) {
    return db.execute(
      'INSERT INTO etats (forme, description, username) VALUES (?, ?, ?)',
      [etat.forme, etat.desc, etat.username]
    );
  }
  

  static delete(id) {
    return db.execute('DELETE FROM etats WHERE id = ?', [id]);
  }
};
