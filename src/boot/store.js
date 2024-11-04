import {boot} from 'quasar/wrappers'
import {authStore} from 'src/stores/auth'

export default boot(({app}) => {
    app.config.globalProperties.$store = authStore()
})
