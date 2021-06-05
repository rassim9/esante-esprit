const db = require('../util/database');

module.exports = class Patient {
  constructor(email, patientid, secret) {
    this.email = email;
    this.patientid = patientid;
    this.secret = secret;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM patients');
  }

  static save(patient) {
    return db.execute(
      'INSERT INTO patients (email, patientid, secret) VALUES (?, ?, ?)',
      [patient.email, patient.patientid, patient.secret]
    );
  }

  

  static delete(id) {
    return db.execute('DELETE FROM patients WHERE id = ?', [id]);
  }

  static postid(id) {
    return db.execute('SELECT patientid,secret FROM patients WHERE id = ?', [id]);
    
  }
};
