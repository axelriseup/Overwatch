import {defineStore} from 'pinia';
// local storage
import { LocalStorage, SessionStorage } from 'quasar'

export const authStore = defineStore('counter', {
  state: () => ({
    session: {
      is_logged_in: false,
      user_id: "",
      access_token: "",
    }
  }),
  actions: {
    setLoginSession(data) {
      this.session.is_logged_in = true;
      this.session.access_token = data.access_token;
      console.log(data.access_token);
      LocalStorage.set('access_token', JSON.stringify(data.access_token));
    },
    destroyLoginSession() {
      this.session.is_logged_in = false;
      this.session.user_id = "";
      this.session.access_token = "";
    },
  },
});
