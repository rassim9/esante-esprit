const db = require('../util/database');

module.exports = class heartmin {
    constructor(id,valeur,date){
        this.id=id
        this.valeur=valeur
        this.date=date
    }

static fetchAll() {
    return db.execute('SELECT * FROM heartmin WHERE date=(SELECT MAX(date) FROM heartmin)');
}
}
