const db = require('../util/database');

module.exports = class Patient {
  constructor(email, patientid, secret,nom,prenom,sexe, age, poids, taille,periode, etat, dateint, imc,classe,img,classeimg,pideal,medecin) {
    this.email = email;
    this.patientid = patientid;
    this.secret = secret;
    this.nom=nom;
    this.prenom=prenom;
    this.sexe=sexe;
    this.age=age;
    this.poids=poids;
    this.taille=taille;
    this.periode = periode;
    this.etat= etat;
    this.dateint= dateint;
    this.imc= imc;
    this.classe=classe;
    this.img= img;
    this.classeimg=classeimg;
    this.pideal=pideal;
    this.medecin=medecin;
  }

  static count() {
    return db.execute('SELECT COUNT(*) AS Count   FROM patients');
  }
  static countp(id) {
    return db.execute('SELECT COUNT(*) AS Count FROM patients WHERE medecin = ?',[id]);
  }

  static fetchAll(id) {
    return db.execute('SELECT * FROM patients WHERE medecin = ?',[id]);
  }
  static fetchmy(id) {
    return db.execute('SELECT * FROM patients WHERE id = ?',[id]);
  }
  static mydata(email) {
    return db.execute('SELECT * FROM patients WHERE email = ?',[email]);
  }

  static save(patient) {
    return db.execute(
      'INSERT INTO patients (email, patientid, secret,nom, prenom, sexe, age, poids, taille,periode, etat, dateint, imc,classe  ,img, classeimg,pideal, medecin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [patient.email, patient.patientid, patient.secret,patient.nom,patient.prenom,patient.sexe,patient.age,patient.poids,patient.taille, patient.periode, patient.etat, patient.dateint, patient.imc,patient.classe, patient.img,patient.classeimg,patient.pideal, patient.medecin]
    );
  }

  

  static delete(id) {
    return db.execute('DELETE FROM patients WHERE id = ?', [id]);
  }

  static postid(id) {
    return db.execute('SELECT patientid,secret FROM patients WHERE id = ?', [id]);
    
  }
};
