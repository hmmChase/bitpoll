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

export const parseLinkHeader = header => {
  if (header.length === 0) {
    throw new Error('input must not be of zero length');
  }
  // Split parts by comma
  const parts = header.split(',');
  const links = {};
  // Parse each part into a named link
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

// export const allContributors = [];

// export const fetchContributors = async url => {
//   const response = await doFetch(url);
//   const data = await response.json();
//   const cleanContributors = data.map(contributor => {
//     return { [contributor.id]: { ...contributor } };
//   });

//   allContributors.push(cleanContributors);
//   console.log(allContributors);

//   // this.props.storeContributors(cleanContributors);

//   const links = await response.headers.get('Link');
//   const parsedLinks = parseLinkHeader(links);
//   let next = parsedLinks.next;

//   if (next) {
//     await fetchContributors(next);
//   }
// };
