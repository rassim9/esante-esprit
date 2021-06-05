const db = require('../util/database');

module.exports = class Pesages {
    constructor(id,poids){
        this.id=id
        this.poids=poids
    }

static fetchAll() {
    return db.execute('SELECT * FROM pesages');
}
static post(poids) {
    return db.execute('INSERT INTO pesages (poids) VALUES (?)',[poids]);
}
static update(id,poids) {
    return db.execute('UPDATE pesages SET poids= ?  WHERE id= ?',[poids,id]);
}
static delete(id) {
    return db.execute('DELETE FROM pesages WHERE id=?',[id]);
}
};