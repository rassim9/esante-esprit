const db = require('../util/database');

module.exports = class calories {
    constructor(id,valeur,date,email){
        this.id=id
        this.valeur=valeur
        this.date=date
        this.email=email
    }

static fetchAll() {
    return db.execute('SELECT * FROM calories WHERE date=(SELECT MAX(date) FROM calories)');
}
static fetchmy(email) {
    return db.execute('SELECT * FROM calories WHERE date=(SELECT MAX(date) FROM calories) AND email= ?', [email]);
}
}
