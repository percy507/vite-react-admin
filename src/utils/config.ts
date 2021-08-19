export default {
  dev: {
    BASE_API: 'https://xxx.dev.com/api',
  },
  test: {
    BASE_API: 'https://xxx.test.com/api',
  },
  prod: {
    BASE_API: 'https://xxx.prod.com/api',
  },
}[VITE_BUILD_MODE];
