const info = (...params) => {
  console.log(...params);
};

const error = (...params) => {
  console.error(...params);
};

module.exports = {
  info,
  error,
};

// if the console.logs disturbs tests:
// const info = (...params) => {
//   if (process.env.NODE_ENV !== 'test') {
//     console.log(...params)
//   }
// }

// const error = (...params) => {
//   if (process.env.NODE_ENV !== 'test') {
//     console.error(...params)
//   }
// }
