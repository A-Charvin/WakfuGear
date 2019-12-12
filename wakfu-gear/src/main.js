import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import { i18n } from './language/lang'
import moment from 'moment'
import VueResource from 'vue-resource'

import Donut from 'vue-css-donut-chart'
import 'vue-css-donut-chart/dist/vcdonut.css'

import router from './router'
import store from './store'

import App from './App'

import FunctionsMixin from './mixins/functions'

Vue.use(Vuetify, { theme: { primary: '#01A7A5' } })
Vue.use(VueResource)
Vue.use(Donut)

Vue.mixin(FunctionsMixin)

Vue.config.productionTip = false

Vue.prototype.moment = moment

const lsFiltros = localStorage.getItem('filtros')
const lang = lsFiltros ? JSON.parse(lsFiltros).lang : 'pt'
Vue.prototype.$lang = lang
i18n.locale = lang

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store,
  router,
  i18n
})
