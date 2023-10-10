const Pirate = require("../models/pirate.model");

module.exports = {
  createPirate: (request, response) => {
    const pirate = request.body;
    console.log("PIRATE", pirate);
    Pirate.exists({ position: "Captain" })
      .then((pirateExist) => {
        if (pirateExist && request.body.position == "Captain") {
          return Promise.reject({
            errors: { position: { message: "Captain exist" } },
          });
        }
        return Pirate.create(pirate);
      })
      .then((pirate) => response.json(pirate))
      .catch((err) => {console.log(err);response.status(400).json(err)});
  },

  getAllPirates: (request, response) => {
    Pirate.find({})
      .sort( {name: 'asc'} )
      .then((pirates) => {
        console.log(pirates);
        response.json(pirates);
      })
      .catch((err) => {
        console.log(err);
        response.json(err);
      });
  },

  getOnePirate: (request, response) => {
    Pirate.findOne({ _id: request.params.id })
      .then((pirate) => {
        console.log(pirate);
        response.json(pirate);
      })
      .catch((err) => {
        console.log(err);
        response.json(err);
      });
  },

  deleteOnePirate: (request, response) => {
    Pirate.deleteOne({ _id: request.params.id })
      .then((deleteConfirmation) => response.json(deleteConfirmation))
      .catch((err) => response.json(err));
  },

  updatePirate: (request, response) => {
    Pirate.findOneAndUpdate({ _id: request.params.id }, request.body, {
      new: true,
    })
      .then((updatedPirate) => response.json(updatedPirate))
      .catch((err) => response.json(err));
  },
}