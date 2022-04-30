const db = require('../util/database');

module.exports = class Operation {
  constructor(patient, medecin, etablissement,date,heure,precautions,note) {
    this.patient = patient;
    this.medecin = medecin;
    this.etablissement = etablissement;
    this.date=date;
    this.heure=heure;
    this.precautions=precautions;
    this.note=note;
    
  }

 
  static fetchmy(email) {
    return db.execute('SELECT * FROM operation WHERE patient = ?',[email]);
  }
  static fetchmyoperation(medecin) {
    return db.execute('SELECT * FROM operation WHERE medecin = ?',[medecin]);
  }

  static save(operation) {
    db.execute('Update patients SET operable= "oui"  WHERE email= ?',[operation.patient]);
    return db.execute(
      'INSERT INTO operation (patient, medecin, etablissement,date, heure, precautions,note) VALUES (?, ?, ?,?, ?, ?, ?)',
      [operation.patient, operation.medecin, operation.etablissement,operation.date,operation.heure,operation.precautions,operation.note]
    );
  }

  

  static delete(id) {
    return db.execute('DELETE FROM operation WHERE id = ?', [id]);
  }
  static postid(email) {
     db.execute('Update patients SET operable = "non" WHERE email = ?', [email]);
    return db.execute('SELECT email FROM patients WHERE email = ?', [email]);
  }

  
};
