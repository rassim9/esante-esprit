const db = require('../util/database');

module.exports = class Message {
  constructor(email, dest, object, message) {
    this.email = email;
    this.dest = dest;
    this.object = object;
    this.message = message;

  }

  static fetchAll(email) {
    return db.execute('SELECT email,dest,object,message FROM message WHERE email = ?', [email]);
  }
  static myAll(email) {
    return db.execute('SELECT email,dest,object,message FROM message WHERE dest = ?', [email]);
  }

  static save(Message) {
    return db.execute(
      'INSERT INTO message (email, dest, object, message) VALUES (?, ?, ?, ?)',
      [Message.email, Message.dest, Message.object, Message.message]
    );
  }
  

  static delete(id) {
    return db.execute('DELETE FROM message WHERE id = ?', [id]);
  }
};
