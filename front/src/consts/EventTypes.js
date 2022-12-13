/**
 * {className} : {
 *   {eventName}: ''
 * }
 */
const types = {
  App: {
    Login: '',
    Logout: '',
  },
  Dialog: {
    Push: '',
    Pop: '',
  },
  Native: {
    Back: '',
    Close: '',
    Loading: '',
  }
};

(() => {
  for (let c in types) {
    for (let e in types[c]) {
      types[c][e] = `${c}.${e}`;
    }
  }
})();

export default types;
