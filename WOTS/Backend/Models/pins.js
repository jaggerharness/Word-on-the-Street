// Models/pins
class PinsModel {
    constructor (DAO) {
        this.DAO = DAO
    }
  
    createTable () {
        const sql = `
            CREATE TABLE IF NOT EXISTS pins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            x_coor REAL,
            y_coor REAL,
            title TEXT,
            message TEXT
        )`
        return this.DAO.run(sql)
    }

    add (pins) {
        return this.DAO.run(
            'INSERT INTO pins (x_coor, y_coor, title, message) VALUES (?, ?, ?, ?)',
            [pins]
        );
    }
    
    getAll () {
        return this.DAO.all(
            'SELECT x_coor, y_coor, title, message FROM pins'
        );
    }
}
  
module.exports = PinsModel;