const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Restoran = sequelize.define("restorans", {
        title: {
            type: Sequelize.STRING
        },
        restoranType: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        }
    });

    return Restoran;
}