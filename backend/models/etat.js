const db = require('../util/database');

module.exports = class Etat {
  constructor(forme, description,temp,pansement,saignment,medicament,douleur,niveau,note, username) {
    this.forme = forme;
    this.description = description;
    this.temp = temp;
    this.pansement = pansement;
    this.saignment = saignment;
    this.medicament = medicament;
    this.douleur = douleur;
    this.niveau = niveau;
    this.note = note;
    this.username = username;
  }

  static fetchAll(email) {
    return db.execute('SELECT * FROM etats WHERE username = ? ORDER BY id DESC LIMIT 3',[email]);
  }
  static fetchlast(id) {
    return db.execute('SELECT * FROM etats WHERE username = ? ORDER BY id DESC LIMIT 3',[id]);
  }


  static save(etat) {
    return db.execute(
      'INSERT INTO etats (forme, description, temp,pansement,saignment,medicament,douleur,niveau,note,username) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, ?)',
      [etat.forme, etat.description,etat.temp,etat.pansement,etat.saignment,etat.medicament,etat.douleur,etat.niveau,etat.note,etat.username] 
    );
  }
  

  static delete(id) {
    return db.execute('DELETE FROM etats WHERE id = ?', [id]);
  }
};
