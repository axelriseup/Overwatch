<template>
  <div class="main_bg">
    <div class="flex flex-center" style="height: 100vh">
      <q-card
        flat
        class="bg-white shadow_custom authentication-inner"
        :style="$q.screen.lt.sm ? 'width:80%;' : 'width:28%;'"
        :class="{ shake: loginFailed }"
        @animationend="resetAnimation"
      >
        <div>
          <q-card-section class="q-px-lg">
            <div class="row q-mt-md text-center">
              <q-toolbar-title style="color: #566a7f;font-size: 1.60rem;letter-spacing: -.5px;"
                               class="text-weight-medium cursor-pointer">
              <span class="text-primary">
                <q-avatar size="62px">
                <img alt="" src="/overwatch.png"/>
              </q-avatar>
              </span>
              </q-toolbar-title>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-px-sm">
              <q-item-label :class="$q.dark.isActive ? 'dark_text' : 'text-grey-8'">Username</q-item-label>
              <q-input dense class="q-py-sm" v-model="username" outlined label="Enter username" @keyup.enter="login"/>
              <q-item-label class="q-mt-md text-grey-8">Password</q-item-label>
              <q-input dense class="q-py-sm" type="password" v-model="password" outlined label="Enter password" @keyup.enter="login"/>
            </div>
            <div class="row q-px-sm">
              <q-btn
                class="full-width q-mt-md card_style"
                label="Sign In"
                @click="login"
                type="button" no-caps
                color="primary"
              />
            </div>
            <div class="q-mt-md text-center">
              <p class="text-grey-6">
                Not registered? 
                <a href="https://timecatcher.lnbits.de/events/WJLvGZ2UWeGx4SdvGKUZHg" class="custom-link">Create an Account</a>
              </p>
            </div>
          </q-card-section>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {ref} from 'vue';
import axios from "axios";

export default defineComponent({
  setup() {
    return {
      username: ref(''),
      password: ref(''),
      loginFailed: ref(false),
    }
  },
  methods: {
    resetAnimation() {
      this.loginFailed = false;
    },
    login() {
      let data = {
        'username': this.username,
        'password': this.password
      }

      axios.post('https://timecatcher.lnbits.de/api/v1/auth', data)
        .then(response => {
          this.$store.setLoginSession(response.data);
          this.$router.push('/')
          console.log(response)
        })
        .catch(error => {
          console.error("There was an error fetching the transactions!", error);
          this.loginFailed = true;
        });
    },
  },
})
</script>

<style scoped>
body {
  background: #f8f7fa !important;
}

.shadow_custom {
  box-shadow: 0 0.25rem 1.125rem rgba(75, 70, 92, .1) !important;
}

.divider {
  display: block;
  text-align: center;
  margin: 1rem 0;
  overflow: hidden;
  white-space: nowrap
}

.card_style {
  border-radius: 12px;
}

.divider .divider-text {
  position: relative;
  display: inline-block;
  font-size: .8rem;
  padding: 0rem 1rem
}

.divider .divider-text i {
  font-size: 1.25rem
}

.divider .divider-text:before, .divider .divider-text:after {
  content: "";
  position: absolute;
  top: 50%;
  width: 100vw;
  border-top: 1px solid rgba(75, 70, 92, .2)
}

.divider .divider-text:before {
  right: 100%
}

.divider .divider-text:after {
  left: 100%
}

.authentication-inner:before {
  width: 238px;
  height: 233px;
  content: " ";
  z-index: -1;
  position: absolute;
  top: -55px;
  left: -40px;
  background-image: url("data:image/svg+xml,%3Csvg width='239' height='234' viewBox='0 0 239 234' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='88.5605' y='0.700195' width='149' height='149' rx='19.5' stroke='%237367F0' stroke-opacity='0.16'/%3E%3Crect x='0.621094' y='33.761' width='200' height='200' rx='10' fill='%237367F0' fill-opacity='0.08'/%3E%3C/svg%3E%0A")
}

.authentication-inner:after {
  width: 180px;
  height: 180px;
  content: " ";
  position: absolute;
  z-index: -1;
  bottom: -30px;
  right: -56px;
  background-image: url("data:image/svg+xml,%3Csvg width='181' height='181' viewBox='0 0 181 181' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='1.30469' y='1.44312' width='178' height='178' rx='19' stroke='%237367F0' stroke-opacity='0.16' stroke-width='2' stroke-dasharray='8 8'/%3E%3Crect x='22.8047' y='22.9431' width='135' height='135' rx='10' fill='%237367F0' fill-opacity='0.08'/%3E%3C/svg%3E")
}

.shake {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}

.custom-link {
  color: inherit;
  text-decoration: none;
}
</style>

