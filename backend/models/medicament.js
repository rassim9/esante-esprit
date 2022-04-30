const db = require('../util/database');

module.exports = class Medicament {
  constructor(nom, dosage, duree,autre,patient,email) {
    this.nom = nom;
    this.dosage = dosage;
    this.duree = duree;
    this.autre=autre;
    this.patient=patient;
    this.email=email;
    
  }

 
  static fetchmy(email) {
    return db.execute('SELECT * FROM medicament WHERE email = ?',[email]);
  }
  static fetchmymedicament(email) {
    return db.execute('SELECT * FROM medicament WHERE email = ?',[email]);
  }

  static save(medicament) {
    return db.execute(
      'INSERT INTO medicament (nom, dosage, duree,autre, patient, email) VALUES (?, ?, ?, ?, ?, ?)',
      [medicament.nom, medicament.dosage, medicament.duree,medicament.autre,medicament.patient,medicament.email]
    );
  }

  

  static delete(id) {
    return db.execute('DELETE FROM medicament WHERE id = ?', [id]);
  }

  static postid(id) {
    return db.execute('SELECT dosage,duree FROM patients WHERE id = ?', [id]);
    
  }
};
