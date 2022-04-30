const db = require('../util/database');

module.exports = class Patient {
  constructor(email, patientid, secret,nom,prenom,sexe, age, poids, taille,type,rpps, dateint, imc,classe,img,classeimg,pideal,medecin,Nutritionniste,Psychologue,Cardiologue,Soignant,autre) {
    this.email = email;
    this.patientid = patientid;
    this.secret = secret;
    this.nom=nom;
    this.prenom=prenom;
    this.sexe=sexe;
    this.age=age;
    this.poids=poids;
    this.taille=taille;
    this.type = type;
    this.rpps= rpps;
    this.dateint= dateint;
    this.imc= imc;
    this.classe=classe;
    this.img= img;
    this.classeimg=classeimg;
    this.pideal=pideal;
    this.medecin=medecin;
    this.Nutritionniste=Nutritionniste;
    this.Psychologue=Psychologue;
    this.Cardiologue=Cardiologue;
    this.Soignant=Soignant;
    this.autre=autre;
  }

  static count() {
    return db.execute('SELECT COUNT(*) AS Count   FROM patients');
  }
  static countp(email) {
    return db.execute('SELECT COUNT(*) AS Count FROM patients WHERE medecin = ? OR Nutritionniste = ? OR Cardiologue = ? OR Soignant = ? OR autre = ?',[email,email,email,email,email]);
  }
  static fetchAllpatients() {
    return db.execute('SELECT * FROM patients');
  }
  static fetchAll(email) {
    return db.execute('SELECT * FROM patients WHERE medecin = ? OR Nutritionniste = ? OR Cardiologue = ? OR Soignant = ? OR autre = ?',[email,email,email,email,email]);
  }
  static fetchmy(email) {
    return db.execute('SELECT * FROM patients WHERE email = ?',[email]);
  }
  static fetchop(email) {
    return db.execute('SELECT * FROM patients WHERE email = ? AND operable = "oui" ',[email]);
  }
  static mydata(email) {
    return db.execute('SELECT * FROM patients WHERE email = ?',[email]);
  }

  static save(patient) {
    return db.execute(
      'INSERT INTO patients (email, patientid, secret,nom, prenom, sexe, age, poids, taille,type, rpps, dateint, imc,classe  ,img, classeimg,pideal, medecin,Nutritionniste,Psychologue,Cardiologue,Soignant,autre) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?)',
      [patient.email, patient.patientid, patient.secret,patient.nom,patient.prenom,patient.sexe,patient.age,patient.poids,patient.taille, patient.type, patient.rpps, patient.dateint, patient.imc,patient.classe, patient.img,patient.classeimg,patient.pideal, patient.medecin,patient.Nutritionniste,patient.Psychologue,patient.Cardiologue,patient.Soignant,patient.autre]
    );
  }

  

  static delete(id) {
    return db.execute('DELETE FROM patients WHERE id = ?', [id]);
  }

  static postid(email) {
    return db.execute('SELECT patientid,secret FROM patients WHERE email = ?', [email]);
    
  }

  static update(email,operable) {
    return db.execute('UPDATE patients SET operable= ?  WHERE email= ?',[operable,email]);
}
};
