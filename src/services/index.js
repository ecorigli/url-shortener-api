const shortid = require("shortid");
const config = require("../config");
const { db, urlBase } = config;

const store = require("data-store")({
  path: "shortener.json",
});

const saveUrl = async (url) => {
  const domain = new URL(url).hostname.replace("www.", "");

  const { data = [] } = await store.get();

  const id = shortid.generate();

  data.push({ id: urlBase + id, url, domain });

  await store.set("data", data);

  return id;
};

const findUrlById = async (id) => {
  const data = await store.get("data");

  const url = data.filter((d) => d.id === urlBase + id);

  return url.length > 0 ? url[0] : null;
};

const findByUrl = async (fullUrl) => {
  let data = await store.get("data");
  data = data ? data : [];

  const url = data.filter((d) => d.url === fullUrl);

  return url.length > 0 ? url[0] : null;
};

const getDomain = async () => {
  const { data } = await store.get();

  return [...new Set(data.map((d) => d.domain))];
};

module.exports = {
  saveUrl,
  findUrlById,
  findByUrl,
  getDomain,
};
