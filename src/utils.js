export const sanitize = (text) => {
  let div = document.createElement('div');
  div.innerHTML = text;
  return div.textContent;
};

