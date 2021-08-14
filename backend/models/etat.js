const db = require('../util/database');

module.exports = class Etat {
  constructor(forme, description,temp,pansement,saignment,medicament,douleur,niveau, username) {
    this.forme = forme;
    this.description = description;
    this.temp = temp;
    this.pansement = pansement;
    this.saignment = saignment;
    this.medicament = medicament;
    this.douleur = douleur;
    this.niveau = niveau;
    this.username = username;
  }

  static 
  fetchAll(id) {
    return db.execute('SELECT * FROM etats WHERE username = ?',[id]);
  }

  static save(etat) {
    return db.execute(
      'INSERT INTO etats (forme, description, temp,pansement,saignment,medicament,douleur,niveau,username) VALUES (?, ?, ?, ?, ?, ?, ?,?, ?)',
      [etat.forme, etat.description,etat.temp,etat.pansement,etat.saignment,etat.medicament,etat.douleur,etat.niveau,etat.username] 
    );
  }
  

  static delete(id) {
    return db.execute('DELETE FROM etats WHERE id = ?', [id]);
  }
};
