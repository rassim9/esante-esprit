const db = require('../util/database');

module.exports = class poids {
    constructor(id,valeur,date,email){
        this.id=id
        this.valeur=valeur
        this.date=date
        this.email=email
    }

static fetchAll() {
    return db.execute('SELECT * FROM poids WHERE date=(SELECT MAX(date) FROM poids)');
}
static fetchmy(email) {
    return db.execute('SELECT * FROM poids WHERE date=(SELECT MAX(date) FROM poids) AND email= ?', [email]);
}
}
