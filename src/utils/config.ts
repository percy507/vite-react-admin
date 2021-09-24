export default {
  dev: {
    BASE_API: 'http://127.0.0.1:3000/v1',
  },
  test: {
    BASE_API: 'http://127.0.0.1:3000/v1',
  },
  prod: {
    BASE_API: 'http://127.0.0.1:3000/v1',
  },
}[VITE_BUILD_MODE];
