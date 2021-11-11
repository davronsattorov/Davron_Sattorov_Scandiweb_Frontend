export const changeLocationQuery = (input) => {
  let newurl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    `?type=${input}`;
  window.history.pushState({ path: newurl }, "", newurl);
};
