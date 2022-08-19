export default {
  local: {
    BASE_API: 'http://127.0.0.1:3000/v1',
    alioss_bucket: 'xxx-dev-env',
  },
  dev: {
    BASE_API: 'http://127.0.0.1:3000/v1',
    alioss_bucket: 'xxx-dev-env',
  },
  test: {
    BASE_API: 'http://127.0.0.1:3000/v1',
    alioss_bucket: 'xxx-test-env',
  },
  prod: {
    BASE_API: 'http://127.0.0.1:3000/v1',
    alioss_bucket: 'xxx-prod-env',
  },
}[VITE_MODE];
