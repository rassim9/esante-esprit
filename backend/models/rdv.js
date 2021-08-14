const db = require('../util/database');

module.exports = class Rdv {
  constructor(titre, date, p1, p2) {
    this.title = title;
    this.date = date;
    this.p1 = p1;
    this.p2 = p2;

  }

  static fetchAll(id) {
    return db.execute('SELECT title,date FROM rdv WHERE p1 = ?', [id]);
  }

  static fetchAllpatient(id) {
    return db.execute('SELECT title,date FROM rdv WHERE p2 = ?', [id]);
  }

  static save(rdv) {
    return db.execute(
      'INSERT INTO rdv (title, date, p1, p2) VALUES (?, ?, ?, ?)',
      [rdv.title, rdv.date, rdv.p1, rdv.p2]
    );
  }
  

  static delete(id) {
    return db.execute('DELETE FROM rdv WHERE id = ?', [id]);
  }
};
