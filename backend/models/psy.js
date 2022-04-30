const db = require('../util/database');

module.exports = class Psy {
  constructor(patient, medecin,trouble,addictions,difficultes,note) {
    this.patient = patient;
    this.medecin = medecin;
    this.trouble = trouble;
    this.addictions = addictions;
    this.difficultes = difficultes;
   
    this.note = note;
  }

  static fetchAll(email) {
    return db.execute('SELECT * FROM psy WHERE patient = ? ',[email]);
  }
  static fetchlast(id) {
    return db.execute('SELECT * FROM psy WHERE Hydratation = ? ORDER BY id DESC LIMIT 3',[id]);
  }


  static save(Psy) {
    return db.execute(
      'INSERT INTO psy (patient, medecin, trouble,addictions,difficultes,note) VALUES ( ?,?,? , ?,?, ?)',
      [Psy.patient, Psy.medecin,Psy.trouble,Psy.addictions,Psy.difficultes,Psy.note] 
    );
  }
  

  static delete(id) {
    return db.execute('DELETE FROM Psy WHERE id = ?', [id]);
  }
};
