export const doFetch = async url => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    return response;
  } catch (error) {
    throw new Error(`Network request failed. (error: ${error.message})`);
  }
};

export const cleanContributors = contributors => {
  return contributors.reduce((contributersObj, contributor) => {
    contributersObj[contributor.id] = contributor;
    return contributersObj;
  }, {});
};

export const parseLinkHeader = header => {
  if (header.length === 0) {
    throw new Error('input must not be of zero length');
  }
  const parts = header.split(',');
  const links = {};
  for (let i = 0; i < parts.length; i++) {
    const section = parts[i].split(';');
    if (section.length !== 2) {
      throw new Error("section could not be split on ';'");
    }
    const url = section[0].replace(/<(.*)>/, '$1').trim();
    const name = section[1].replace(/rel="(.*)"/, '$1').trim();
    links[name] = url;
  }
  return links;
};
