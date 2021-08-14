const db = require('../util/database');

module.exports = class heartbpm {
    constructor(id,valeur,date){
        this.id=id
        this.valeur=valeur
        this.date=date
    }

static fetchAll() {
    return db.execute('SELECT * FROM heartbpm WHERE date=(SELECT MAX(date) FROM heartbpm)');
}
}
