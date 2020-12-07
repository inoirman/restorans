const db = require('../models');
const Restoran = db.restorans;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
// Validate request
if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const restoran = {
    title: req.body.title,
    restoranType: req.body.restoranType,
    phone: req.body.phone,
    location: req.body.location
  };

  Restoran.create(restoran)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Restoran."
      });
    });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Restoran.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving restoran."
        });
      });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Restoran.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Restoran with id=" + id
        });
      });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Restoran.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Restoran was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Restoran with id=${id}. Maybe Restoran was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Restoran with id=" + id
        });
      });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Restoran.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Restoran was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Restoran with id=${id}. Maybe Restoran was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Restoran with id=" + id
        });
      });
};

exports.deleteAll = (req, res) => {
    Restoran.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Restoran were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all restorans."
          });
        });
};

exports.findAllPublished = (req, res) => {
    Restoran.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving restorans."
      });
    });
};