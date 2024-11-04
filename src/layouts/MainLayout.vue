<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :class="$q.dark.isActive ? 'q-dark' : 'bg-white'" class="shadow_custom q-mx-lg q-mt-md q-py-sm"
              style="right: 8px; border-radius: 4px">
      <q-toolbar class="no-shadow header">
        <div class="text-h6 text-weight-bolder" :class="$q.dark.isActive ? 'dark_text' : 'text-grey-8'">
          <q-avatar class="q-mr-sm">
            <img src="/overwatch.png" height="25px" width="30px"/>
          </q-avatar>
          Dashboard
        </div>
        <q-toolbar-title class="q-ml-sm text-center">
<!--          <div v-if="!$q.screen.lt.sm">-->
<!--            <q-input-->
<!--              placeholder="Search"-->
<!--              class="custom-border q-pl-sm"-->
<!--              borderless-->
<!--              dense-->
<!--            >-->
<!--              <template v-slot:before>-->
<!--                <q-icon class="q-pr-sm" color="grey-8" name="search"/>-->
<!--              </template>-->
<!--            </q-input>-->
<!--          </div>-->
<!--          <q-icon class="q-pr-sm" color="grey-8" v-else name="search"/>-->
        </q-toolbar-title>

        <div>
<!--          <q-btn-dropdown  dense v-if="currencies.length > 0 && !$q.screen.lt.md" class="q-mr-xs" flat :color="$q.dark.isActive ?'grey-5':'grey-8'" :label="selected_currency">-->
<!--            <q-list>-->
<!--              <q-item v-for="currency in currencies" :key="currency.id" clickable>-->
<!--                <q-item-section>{{ currency }}</q-item-section>-->
<!--              </q-item>-->
<!--            </q-list>-->
<!--          </q-btn-dropdown>-->

          <q-btn
            class="q-mr-xs" :text-color="$q.dark.isActive ?'grey-5':'grey-8'"
            flat
            round
            @click="$q.dark.toggle()"
            :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
          />
          <q-btn round flat color="white" v-if="!$q.screen.lt.md">
            <q-avatar size="45px" :text-color="$q.dark.isActive ?'grey-5':'grey-8'" flat>
              <Icon icon="tabler:category"/>
              <q-menu  class="no-shadow" style="border: 1px solid rgba(0, 0, 0, 0.12);">
                <q-card :dark="false"
                  class="no-shadow" :class="$q.dark.isActive ? 'card_style_dark' : 'card_style'"
                  style="max-width: 340px; max-height: 560px;"
                >
                  <q-card-section>
                    <div class="text-h6" :class="$q.dark.isActive ?'dark_text':'text-grey-8'">Shortcuts

                      <q-btn class="float-right" flat dense v-close-popup>
                        <q-avatar size="35px">
                          <Icon icon="tabler-category-2"/>
                        </q-avatar>
                      </q-btn>
                    </div>
                  </q-card-section>

                  <q-separator/>

                  <div class="row">
                    <div
                      v-for="(shortcut, index) in shortcuts"
                      :key="shortcut.title"
                      class="col-lg-6 col-md-6 col-xs-6 col-sm-6 q-pa-md text-center cursor-pointer shortcut-icon"
                      :class="(index + 1) % 2 ? 'border-e' : ''"
                    >
                      <q-avatar :color="$q.dark.isActive ?'grey-9':'grey-2'" size="48px">
                        <Icon :icon="shortcut.icon"/>
                      </q-avatar>

                      <div class="q-mt-md font-weight-medium" :class="$q.dark.isActive ?'dark_text':'text-grey-8'">
                        {{ shortcut.title }}
                      </div>
                      <span class="text-sm" :class="$q.dark.isActive ?'dark_text':'text-grey-8'">{{
                          shortcut.subtitle
                        }}</span>
                    </div>
                  </div>
                </q-card>
              </q-menu>
            </q-avatar>
          </q-btn>
          <!--          <q-btn round flat color="white" id="notification-btn">-->
          <!--            <q-avatar size="45px" :text-color="$q.dark.isActive ?'grey-5':'grey-8'" flat>-->
          <!--              <Icon icon="tabler:bell-filled"/>-->
          <!--              <q-badge floating color="red">2</q-badge>-->
          <!--              <q-menu class="card_style no-shadow" style="border: 1px solid rgba(0, 0, 0, 0.12);">-->
          <!--                <q-card-->
          <!--                  class="no-shadow"-->
          <!--                  style="min-width: 360px; max-height: 560px;"-->
          <!--                >-->
          <!--                  <q-card-section>-->
          <!--                    <div class="text-h6" :class="$q.dark.isActive ?'dark_text':'text-grey-8'">Notifications-->

          <!--                      <q-btn class="float-right" flat dense v-close-popup>-->
          <!--                        <q-avatar size="35px">-->
          <!--                          <Icon icon="tabler-inbox"/>-->
          <!--                        </q-avatar>-->
          <!--                        <q-tooltip>-->
          <!--                          Mark all As Read-->
          <!--                        </q-tooltip>-->
          <!--                      </q-btn>-->
          <!--                    </div>-->
          <!--                  </q-card-section>-->

          <!--                  <q-separator/>-->
          <!--                  <template v-for="(notification, notification_index) in notifications">-->
          <!--                    <q-item @mouseover="selected_item=notification_index" @mouseleave="selected_item=''">-->
          <!--                      <q-item-section avatar>-->
          <!--                        <q-avatar>-->
          <!--                          <img :src="notification.img" alt="">-->
          <!--                        </q-avatar>-->
          <!--                      </q-item-section>-->
          <!--                      <q-item-section>-->
          <!--                        <q-item-label>{{ notification.title }}</q-item-label>-->
          <!--                        <q-item-label caption>{{ notification.subtitle }}</q-item-label>-->
          <!--                        <q-item-label caption>{{ notification.time }}</q-item-label>-->

          <!--                      </q-item-section>-->
          <!--                      <q-item-section side>-->
          <!--                        <q-btn icon="close" v-if="notification_index===selected_item" class="q-mt-xs" flat dense-->
          <!--                               @click=""></q-btn>-->
          <!--                        <q-badge color="primary" class="q-mr-sm" rounded v-if="!notification.isSeen"></q-badge>-->
          <!--                      </q-item-section>-->
          <!--                    </q-item>-->
          <!--                  </template>-->
          <!--                  <q-card-section class="q-pa-xs">-->
          <!--                    <q-btn outline flat no-caps label="View Call Notifications" color="primary"-->
          <!--                           class="full-width"></q-btn>-->
          <!--                  </q-card-section>-->
          <!--                </q-card>-->
          <!--              </q-menu>-->
          <!--            </q-avatar>-->
          <!--          </q-btn>-->

        </div>

        <div class="q-mx-sm">
          <q-avatar class="cursor-pointer">
            <img src="https://cdn.quasar.dev/img/avatar3.jpg" alt="">

            <q-badge rounded color="green" class="" floating/>
            <q-menu class="no-shadow" :class="$q.dark.isActive ? 'card_style_dark' : 'card_style'" style="border: 1px solid rgba(0, 0, 0, 0.12);">
              <q-list style="min-width: 200px" class="no-shadow" :class="$q.dark.isActive ? 'card_style_dark' : 'card_style'">
                <q-item clickable v-close-popup>
                  <q-item-section avatar>
                    <q-avatar>
                      <img src="https://cdn.quasar.dev/img/avatar3.jpg" alt="">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>John Doe</q-item-label>
                    <q-item-label caption>Admin</q-item-label>

                  </q-item-section>
                </q-item>
                <!--                <q-separator/>-->
                <!--                <q-item clickable v-close-popup to="/user_view">-->
                <!--                  <q-item-section side>-->
                <!--                    <q-avatar rounded size="35px">-->
                <!--                      <Icon-->
                <!--                        icon="tabler:user"-->
                <!--                      />-->
                <!--                    </q-avatar>-->
                <!--                  </q-item-section>-->
                <!--                  <q-item-section>Profile</q-item-section>-->
                <!--                </q-item>-->
                <!--                <q-item clickable v-close-popup to="/account-settings">-->
                <!--                  <q-item-section side>-->
                <!--                    <q-avatar rounded size="35px">-->
                <!--                      <Icon-->
                <!--                        icon="tabler:credit-card"-->
                <!--                      />-->
                <!--                    </q-avatar>-->
                <!--                  </q-item-section>-->
                <!--                  <q-item-section>Billing</q-item-section>-->
                <!--                </q-item>-->
                <!--                <q-separator/>-->
                <!--                <q-item clickable v-close-popup to="/help-center">-->
                <!--                  <q-item-section side>-->
                <!--                    <q-avatar rounded size="35px">-->
                <!--                      <Icon-->
                <!--                        icon="tabler:help"-->
                <!--                      />-->
                <!--                    </q-avatar>-->
                <!--                  </q-item-section>-->
                <!--                  <q-item-section>Help</q-item-section>-->
                <!--                </q-item>-->
                <!--                <q-item clickable v-close-popup to="/pricing">-->
                <!--                  <q-item-section side>-->
                <!--                    <q-avatar rounded size="35px">-->
                <!--                      <Icon-->
                <!--                        icon="tabler:currency-dollar"-->
                <!--                      />-->
                <!--                    </q-avatar>-->
                <!--                  </q-item-section>-->
                <!--                  <q-item-section>Pricing</q-item-section>-->
                <!--                </q-item>-->
                <!--                <q-item clickable v-close-popup to="/faq">-->
                <!--                  <q-item-section side>-->
                <!--                    <q-avatar rounded size="35px">-->
                <!--                      <Icon-->
                <!--                        icon="tabler:help"-->
                <!--                      />-->
                <!--                    </q-avatar>-->
                <!--                  </q-item-section>-->
                <!--                  <q-item-section>Faq</q-item-section>-->
                <!--                </q-item>-->
                <!--                <q-item clickable v-close-popup to="/account-settings">-->
                <!--                  <q-item-section side>-->
                <!--                    <q-avatar rounded size="35px">-->
                <!--                      <Icon-->
                <!--                        icon="tabler:settings"-->
                <!--                      />-->
                <!--                    </q-avatar>-->
                <!--                  </q-item-section>-->
                <!--                  <q-item-section>Settings</q-item-section>-->
                <!--                </q-item>-->
                <q-separator/>
                <q-item @click="logout" clickable v-close-popup>
                  <q-item-section side>
                    <q-avatar rounded size="35px" icon="logout"/>
                  </q-item-section>
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-avatar>
        </div>

      </q-toolbar>
    </q-header>

    <q-page-container :class="$q.dark.isActive? 'q-dark' : 'bg-grey-2'">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import {defineComponent, ref} from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]
import { LocalStorage, SessionStorage } from 'quasar'
import axios from "axios";


export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data() {
    return {
      linksList,
      leftDrawerOpen: false,
      selected_item: '',
      notifications: [
        {
          id: 1,
          img: 'https://cdn.quasar.dev/img/avatar1.jpg',
          title: 'Congratulation Flora! 🎉',
          subtitle: 'Won the monthly best seller badge',
          time: 'Today',
          isSeen: true,
        },
        {
          id: 2,
          img: 'https://cdn.quasar.dev/img/avatar2.jpg',
          text: 'Tom Holland',
          title: 'New user registered.',
          subtitle: '5 hours ago',
          time: 'Yesterday',
          isSeen: false,
        },
        {
          id: 3,
          img: 'https://cdn.quasar.dev/img/avatar3.jpg',
          title: 'New message received 👋🏻',
          subtitle: 'You have 10 unread messages',
          time: '11 Aug',
          isSeen: true,
        },
        {
          id: 4,
          img: 'https://cdn.quasar.dev/img/avatar1.jpg',
          title: 'Paypal',
          subtitle: 'Received Payment',
          time: '25 May',
          isSeen: false,
          color: 'error',
        },
        {
          id: 5,
          img: 'https://cdn.quasar.dev/img/avatar5.jpg',
          title: 'Received Order 📦',
          subtitle: 'New order received from john',
          time: '19 Mar',
          isSeen: true,
        },
      ],
      currencies:[],
      selected_currency:''
    }
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    getCurrencies(){
      // /api/v1/currencies
      let headers = {
        'Authorization': `Bearer ${this.$store.session.access_token}`,
      }
      axios.get('https://timecatcher.lnbits.de/api/v1/currencies', {headers})
        .then(response => {
          this.currencies = response.data;
          this.selected_currency = 'USD'
        })
        .catch(error => {
          console.error("There was an error fetching the transactions!", error);
        });
    },
    logout(){
      // set dark mode false
      this.$q.dark.set(false)
      LocalStorage.remove('access_token')
      this.$router.push('/login')
    }
  },
  created() {
    this.getCurrencies()
  }
})
</script>

<style>
body {
  background-color: #f3f3f7;
}

body.body--dark {
  background: #232333
}

.q-dark {
  background: rgba(43, 44, 63, 0.53) !important;
}

.dark_active {
  background: linear-gradient(72.47deg, rgb(115, 103, 240) 22.16%, rgba(115, 103, 240, 0.7) 76.47%) !important;
  box-shadow: 0 2px 6px rgba(115, 103, 240, 0.48);
  color: #ffffff !important;
}

.tab-active {
  background: linear-gradient(72.47deg, rgb(115, 103, 240) 22.16%, rgba(115, 103, 240, 0.7) 76.47%) !important;
  box-shadow: 0 2px 6px rgba(115, 103, 240, 0.48);
  color: white !important;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .tab-active {
    background-color: transparent !important;
    color: #aeb0cc !important; /* White text color */
  }
}

.navigation-item {
  border-radius: 5px;
  min-height: 44px !important;
}

.shadow_custom {
  box-shadow: 0 2px 6px 0 rgb(67 89 113 / 12%) !important;
  border-radius: 12px !important;
}

.q-scrollarea--only-vertical .q-scrollarea__content {
  width: 100%
}

.drawer_cls {
  background-color: #fff !important;
  color: #697a8d !important;
}

.expantion_bg {
  background-color: #373b51 !important;
}

.quasar_color {
  color: #566a7f
}



.card_style_dark {
  background-color: #3a3c64;
  border-radius: 10px;
  border-color: rgba(115, 103, 240, 0.24);
}
</style>
