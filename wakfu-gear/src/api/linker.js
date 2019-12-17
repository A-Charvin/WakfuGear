import Vue from 'vue'

const endpoint = 'https://wakfu-api.netlify.com/.netlify/functions'

export default {
  get: async (resource, params) => (await Vue.http.post(`${endpoint}/linker`, { resource, params })).body
}
