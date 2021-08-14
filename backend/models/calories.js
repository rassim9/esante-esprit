const db = require('../util/database');

module.exports = class calories {
    constructor(id,valeur,date){
        this.id=id
        this.valeur=valeur
        this.date=date
    }

static fetchAll() {
    return db.execute('SELECT * FROM calories WHERE date=(SELECT MAX(date) FROM calories)');
}
}
