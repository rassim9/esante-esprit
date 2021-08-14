const db = require('../util/database');

module.exports = class Alimentation {
  constructor(deb, fin, heure,aliment,qte,email) {
    this.deb = deb;
    this.fin = fin;
    this.heure = heure;
    this.aliment=aliment;
    this.qte=qte;
    this.email=email;
    
  }

 
  static fetchmy(id) {
    return db.execute('SELECT * FROM alimentation WHERE qte = ?',[id]);
  }
  static fetchmyalimentation(email) {
    return db.execute('SELECT * FROM alimentation WHERE patient = ?',[email]);
  }

  static save(alimentation) {
    return db.execute(
      'INSERT INTO alimentation (deb, fin, heure,aliment, qte, email) VALUES (?, ?, ?, ?, ?, ?)',
      [alimentation.deb, alimentation.fin, alimentation.heure,alimentation.aliment,alimentation.qte,alimentation.email]
    );
  }

  

  static delete(id) {
    return db.execute('DELETE FROM alimentation WHERE id = ?', [id]);
  }

  
};
