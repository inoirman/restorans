module.exports = app => {
    const restorans = require("../controllers/restoran.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", restorans.create);
  
    router.get("/", restorans.findAll);
  
    router.get("/published", restorans.findAllPublished);
  
    router.get("/:id", restorans.findOne);
  
    router.put("/:id", restorans.update);
  
    router.delete("/:id", restorans.delete);
  
    router.delete("/", restorans.deleteAll);
  
    app.use('/api/restorans', router);
  };