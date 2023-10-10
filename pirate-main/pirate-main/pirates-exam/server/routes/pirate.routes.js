const PirateController = require("../controllers/pirate.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.post("/api/pirates", authenticate, PirateController.createPirate);
  app.get("/api/pirates", authenticate, PirateController.getAllPirates);
  app.get("/api/pirates/:id", authenticate, PirateController.getOnePirate);
  app.patch("/api/pirates/:id", authenticate, PirateController.updatePirate);
  app.delete(
    "/api/pirates/:id",
    authenticate,
    PirateController.deleteOnePirate
  );
};
