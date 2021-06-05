const db = require('../util/database');

module.exports = class poids {
    constructor(id,valeur,date){
        this.id=id
        this.valeur=valeur
        this.date=date
    }

static fetchAll() {
    return db.execute('SELECT * FROM poids WHERE date=(SELECT MAX(date) FROM poids)');
}
}
