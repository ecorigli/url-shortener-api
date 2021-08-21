const service = require("../services");

const findByDomain = async (req, res) => {
  const data = await service.getDomain();

  res.status(200).json({ data });
};

const findById = async (req, res) => {
  const id = req.params && req.params ? req.params.id : "empty data";

  const data = await service.findUrlById(id);
  if (!data) {
    res.status(404).json({ message: "Url not found" });

    return;
  }

  res.status(200).json({ data });
};

const saveUrl = async (req, res) => {
  const url = req.body && req.body.url ? req.body.url : "empty data";

  const data = await service.findByUrl(url);
  if (data) {
    res.status(208).json({ message: "Url already exists", data });

    return;
  }

  const id = await service.saveUrl(url);

  res.status(201).json({ id, message: "Url stored correctly" });
};

module.exports = {
  saveUrl,
  findByDomain,
  findById,
};
