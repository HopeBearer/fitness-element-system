import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
  Button,
  Form,
  FormItem,
  Input,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  MenuItem,
  Statistic,
  Col,
  Row,
  Card,
  Table,
  TableColumn,
  Tag,
  Pagination,
  Dialog,
  Descriptions,
  Select,
  DatePicker,
  Option,
  Switch,
  Upload,
  Checkbox,
  CheckboxGroup
} from 'element-ui'
import 'animate.css'
// import '@/assets/styles/element-variables.scss'
// import '@/assets/styles/global.scss'
Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Statistic)
Vue.use(Col)
Vue.use(Row)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Descriptions)
Vue.use(Option)
Vue.use(Select)
Vue.use(DatePicker)
Vue.use(Switch)
Vue.use(Upload)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
