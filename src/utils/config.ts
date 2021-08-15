export default {
  dev: {
    BASE_API: 'http://xxx.dev.com/api',
  },
  test: {
    BASE_API: 'http://xxx.test.com/api',
  },
  prod: {
    BASE_API: 'http://xxx.prod.com/api',
  },
}[VITE_BUILD_MODE];
