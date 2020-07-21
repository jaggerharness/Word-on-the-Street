// Models/PinsModel
class PinsModel {
    constructor (DAO) {
        this.DAO = DAO
    }
  
    createTable () {
        const sql = `
            CREATE TABLE IF NOT EXISTS pins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            x_coor FLOAT,
            y_coor FLOAT,
            title TEXT,
            message TEXT,
            name TEXT
        )`
        return this.DAO.run(sql)
    }

    add (x, y, title, message, name) {
        return this.DAO.run(
            'INSERT INTO pins (x_coor, y_coor, title, message, name) VALUES (?, ?, ?, ?, ?)',
            [x, y, title, message, name]
        );
    }
    
    getAll () {
        return this.DAO.all(
            'SELECT * FROM pins'
        );
    }

    
    getDBLocations () {
        return this.DAO.all(
            'SELECT x_coor, y_coor, title, message, name FROM pins'
        )
    }
}
  
module.exports = PinsModel;