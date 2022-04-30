const db = require('../util/database');

module.exports = class Cardiologue {
  constructor(patient, medecin,hospitalise,accident,prob,anomalie,traitement,symptome,note) {
    this.patient = patient;
    this.medecin = medecin;
    this.hospitalise = hospitalise;
    this.accident = accident;
    this.prob = prob;
    this.anomalie = anomalie;
    this.traitement = traitement;
    this.symptome = symptome;
    
    this.note = note;
  }

  static fetchAll(email) {
    return db.execute('SELECT * FROM cardiologue WHERE patient = ? ',[email]);
  }
  static fetchlast(id) {
    return db.execute('SELECT * FROM cardiologue WHERE Hydratation = ? ORDER BY id DESC LIMIT 3',[id]);
  }


  static save(cardiologue) {
    return db.execute(
      'INSERT INTO cardiologue (patient, medecin, hospitalise,accident,prob,anomalie,traitement,symptome,note) VALUES ( ?,?,? , ?,?, ?, ?, ?, ?)',
      [cardiologue.patient, cardiologue.medecin,cardiologue.hospitalise,cardiologue.accident,cardiologue.prob,cardiologue.anomalie,cardiologue.traitement,cardiologue.symptome,cardiologue.note] 
    );
  }
  

  static delete(id) {
    return db.execute('DELETE FROM cardiologue WHERE id = ?', [id]);
  }
};
