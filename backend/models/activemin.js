const db = require('../util/database');

module.exports = class activemin {
    constructor(id,valeur,date){
        this.id=id
        this.valeur=valeur
        this.date=date
    }

static fetchAll() {
    return db.execute('SELECT * FROM activemin WHERE date=(SELECT MAX(date) FROM activemin)');
}
}
