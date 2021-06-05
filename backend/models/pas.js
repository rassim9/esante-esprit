const db = require('../util/database');

module.exports = class pas {
    constructor(id,valeur,date){
        this.id=id
        this.valeur=valeur
        this.date=date
    }

static fetchAll() {
    return db.execute('SELECT * FROM pas WHERE date=(SELECT MAX(date) FROM pas)');
}
}
