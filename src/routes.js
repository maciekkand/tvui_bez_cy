import Base from './views/Base/Base.vue'
import About from './components/About/About.vue'
import Stations from './components/Stations/Stations.vue'

export default [
  { path: '', component: Base },
  { path: '/about', component: About },
  { path: '/stations', component: Stations },
  { path: '*', component: Base }
]
