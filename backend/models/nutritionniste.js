const db = require('../util/database');

module.exports = class Nutritionniste {
  constructor(patient, medecin,Activite,Tabac,diabete,Consultation,Regime,Reguliere,Alimentation, Hydratation,Obesite,Pds,note) {
    this.patient = patient;
    this.medecin = medecin;
    this.Activite = Activite;
    this.Tabac = Tabac;
    this.diabete = diabete;
    this.Consultation = Consultation;
    this.Regime = Regime;
    this.Reguliere = Reguliere;
    this.Alimentation = Alimentation;
    this.Hydratation = Hydratation;
    this.Obesite = Obesite;
    this.Pds = Pds;
    this.note = note;
  }

  static fetchAll(email) {
    return db.execute('SELECT * FROM nutritionniste WHERE patient = ? ',[email]);
  }
  static fetchlast(id) {
    return db.execute('SELECT * FROM nutritionniste WHERE Hydratation = ? ORDER BY id DESC LIMIT 3',[id]);
  }


  static save(nutritionniste) {
    return db.execute(
      'INSERT INTO nutritionniste (patient, medecin, Activite,Tabac,diabete,Consultation,Regime,Reguliere,Alimentation,Hydratation,Obesite,Pds,note) VALUES ( ?,?,? , ?, ?, ?, ?, ?, ?, ?, ?,?, ?)',
      [nutritionniste.patient, nutritionniste.medecin,nutritionniste.Activite,nutritionniste.Tabac,nutritionniste.diabete,nutritionniste.Consultation,nutritionniste.Regime,nutritionniste.Reguliere,nutritionniste.Alimentation,nutritionniste.Hydratation,nutritionniste.Obesite,nutritionniste.Pds,nutritionniste.note] 
    );
  }
  

  static delete(id) {
    return db.execute('DELETE FROM nutritionniste WHERE id = ?', [id]);
  }
};
