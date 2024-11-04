<template>
  <q-page class="q-pa-lg">
    <!-- Overview Section -->
    <div class="text-h6 q-my-md text-weight-bold" :class="$q.dark.isActive ? 'dark_text' : 'text-grey-8'">
      <q-icon name="dashboard" color="primary" size="20px" class="q-mb-xs"/>
      Overview

      <q-btn icon="star" color="primary" class="" @click="showRevenue" flat/>

      <q-btn-toggle v-if="!$q.screen.lt.md"
                    v-model="toggle"
                    class="my-custom-toggle float-right"
                    :class="$q.screen.lt.md?'q-mb-md':'float-right'"
                    no-caps
                    rounded
                    unelevated
                    toggle-color="primary"
                    :color="$q.dark.isActive ? 'dark' : 'white'"
                    text-color="primary"
                    :options="[
          {label: 'All', value: 'all'},
          {label: 'Day', value: 'day'},
          {label: 'Week', value: 'week'},
          {label: 'Month', value: 'month'},
        ]"
      />

      <q-select v-if="!$q.screen.lt.md" v-model="selectedWallet" :options="getWalletOptions" map-options
                label="Select Wallet"
                class="text-white q-mr-md float-right" outlined
                :bg-color="$q.dark.isActive ? 'info' : 'white'"
                option-label="name"
                :class="$q.dark.isActive ? 'dark_text' : 'text-grey-8' + ($q.screen.lt.md?' ':' float-right')"
                :popup-content-class="$q.dark.isActive ?'background-color no-shadow':'no-shadow card_style'"
                :color="$q.dark.isActive ?'primary':'primary'" dense style="width: 200px;"
                @update:model-value="getUpdatedDetails">
      </q-select>

      <q-select v-if="!$q.screen.lt.md"  v-model="selected_tpo" :options="tops" map-options
                label="Select TPos"
                class="text-white q-mr-md float-right" outlined
                :bg-color="$q.dark.isActive ? 'info' : 'white'"
                option-label="name"
                :class="$q.dark.isActive ? 'dark_text' : 'text-grey-8' + ($q.screen.lt.md?' ':' float-right')"
                :popup-content-class="$q.dark.isActive ?'background-color no-shadow':'no-shadow card_style'"
                :color="$q.dark.isActive ?'primary':'primary'" dense style="width: 200px;" @update:model-value="openTPos"></q-select>
    </div>
    <div class="row" v-if="$q.screen.lt.md">
      <div class="col-12">
        <q-btn-toggle
          v-model="toggle"
          class="my-custom-toggle float-right"
          :class="$q.screen.lt.md?'q-mb-md':'float-right'"
          no-caps
          rounded
          unelevated
          toggle-color="primary"
          :color="$q.dark.isActive ? 'dark' : 'white'"
          text-color="primary"
          :options="[
          {label: 'All', value: 'all'},
          {label: 'Day', value: 'day'},
          {label: 'Week', value: 'week'},
          {label: 'Month', value: 'month'},
        ]"
        />
      </div>
      <div class="col-12">
        <q-select v-model="selected_tpo" :options="tops" map-options
                label="Select TPos"
                class="text-white q-mb-md float-right" outlined
                :bg-color="$q.dark.isActive ? 'info' : 'white'"
                option-label="name"
                :class="$q.dark.isActive ? 'dark_text' : 'text-grey-8' + ($q.screen.lt.md?' ':' float-right')"
                :popup-content-class="$q.dark.isActive ?'background-color no-shadow':'no-shadow card_style'"
                :color="$q.dark.isActive ?'primary':'primary'" dense style="width: 200px;" @update:model-value="openTPos"></q-select>
      </div>
      <div class="col-12">
        <q-select v-model="selectedWallet" :options="getWalletOptions" map-options label="Select Wallet"
                  class="text-white q-mb-sm float-right" outlined
                  :bg-color="$q.dark.isActive ? 'info' : 'white'"
                  option-label="name"
                  :class="$q.dark.isActive ? 'dark_text' : 'text-grey-8'"
                  :popup-content-class="$q.dark.isActive ?'background-color no-shadow':'no-shadow card_style'"
                  :color="$q.dark.isActive ?'primary':'primary'" dense style="width: 200px;"
                  @update:model-value="getUpdatedDetails">
        </q-select>
      </div>
    </div>

    <!-- Cards Section -->
    <q-card class="no-shadow row bg-transparent">
      <q-card-section class="col-12 q-pa-none q-pt-sm">
        <div class="row q-col-gutter-lg">
          <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
            <q-card class="no-shadow" bordered :class="$q.dark.isActive ? 'card_style_dark' : 'card_style'">
              <q-card-section class="text-h6 q-py-sm" :class="$q.dark.isActive ? 'dark_text' : 'text-grey-8'">
                <span v-if="show_own_details">Revenue</span>
                <span v-else>Incoming</span>
              </q-card-section>
              <q-card-section class="text-h4 text-weight-bolder q-pt-none"
                              :class="$q.dark.isActive ? 'dark_text' : 'text-grey-8'">
                <!--                &#163; -->
                <span v-if="in_toggle">{{ formatSatoshis(total[toggle].incoming) }} sats <i
                  class="fak fa-satoshisymbol-solidcirtilt" @click="in_toggle=!in_toggle"/> </span>
                <span v-if="!in_toggle">
                  {{ formatEuros(euroTotals[toggle].incomingEUR) }}
                  <!--                  {{ incomingtotalamount_final_eur.toFixed(2) }}-->
                  <span class="cursor-pointer" @click="in_toggle=!in_toggle">€</span>
                </span>
                <br/>
                <span class="text-caption" :class="$q.dark.isActive ? 'dark_text' : 'text-grey-8'">
                  <q-icon name="arrow_drop_up" size="20px" color="positive"></q-icon>
                  {{ income_data[toggle]['period_change'] }}</span>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
            <q-card class="no-shadow" bordered :class="$q.dark.isActive ? 'card_style_dark' : 'card_style'">
              <q-card-section class="text-h6 q-py-sm" :class="$q.dark.isActive ? 'dark_text' : 'text-grey-8'">
                <span v-if="show_own_details">Expenses</span>
                <span v-else>Outgoing</span>
              </q-card-section>
              <q-card-section class="text-h4 text-weight-bolder q-pt-none"
                              :class="$q.dark.isActive ? 'dark_text' : 'text-grey-8'">
                <!--                &#163;-->
                <span v-if="out_toggle">{{ formatSatoshis(total[toggle].outgoing) }} sats <i
                  class="fak fa-satoshisymbol-solidcirtilt" @click="out_toggle=!out_toggle"/> </span>
                <span v-if="!out_toggle">
                  {{ formatEuros(euroTotals[toggle].outgoingEUR == 0 ? 0.0 : euroTotals[toggle].outgoingEUR) }}
                  <!--                  {{ outgoingtotal_final_eur.toFixed(2) }}-->
                  <span class="cursor-pointer" @click="out_toggle=!out_toggle">€</span>
                </span>
                <br/>
                <span class="text-caption">
                  <q-icon name="arrow_drop_up" size="20px" color="positive"></q-icon>
                  {{ outgoing_data[toggle]['period_change'] }}</span>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
            <q-card class="no-shadow" bordered :class="$q.dark.isActive ? 'card_style_dark' : 'card_style'"
                    v-if="!show_own_details">
              <q-card-section class="text-h6 q-py-sm" :class="$q.dark.isActive ? 'dark_text' : 'text-grey-8'">
                Balance
              </q-card-section>
              <q-card-section class="text-h4 text-weight-bolder q-pt-none"
                              :class="$q.dark.isActive ? 'dark_text' : 'text-grey-8'">
                <!--                &#163; -->

                <span v-if="balance_toggle">{{ formatSatoshis(balance) }} sats <i
                  class="fak fa-satoshisymbol-solidcirtilt"
                  @click="balance_toggle=!balance_toggle"/> </span>
                <span v-if="!balance_toggle">{{ formatEuros(balancetotaleuroamount.toFixed(2)) }}
                  <span class="cursor-pointer" @click="balance_toggle=!balance_toggle">€</span>
                </span>

                <br/>
                <span class="text-caption">
                  <q-icon name="arrow_drop_up" size="20px" color="positive"></q-icon>
                  6.39% period of change</span>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Detailed Report Section -->
    <div class="text-h6 q-my-md text-weight-bold col-12">
      <q-icon name="description" color="primary" size="20px" class="q-mb-xs"/>
      Detailed report
      <q-btn-toggle v-if="!$q.screen.lt.md"
                    v-model="transaction_type"
                    class="my-custom-toggle q-ml-sm"
                    no-caps
                    rounded
                    unelevated
                    toggle-color="primary"
                    :color="$q.dark.isActive ? 'dark' : 'white'"
                    text-color="primary"
                    :options="[
          {label: 'All tx', value: 'all_tx'},
          {label: 'Incoming', value: 'incoming'},
          {label: 'Outgoing', value: 'outgoing'},
        ]"
      />
      <JsonExcel v-if="!$q.screen.lt.md"
        :data="transactions"
        :fields="json_fields" class="float-right"
        name="transactions.xlsx"
        type="xlsx"
      >
        <q-btn v-if="!$q.screen.lt.md" label="Export" rounded color="primary"
               :class="$q.screen.lt.md?'q-mb-md q-mt-sm':'float-right'" no-caps outline
               icon="download"/>
      </JsonExcel>


      <q-btn v-if="!$q.screen.lt.md" round @click="dailog_model=true" color="primary"
             :class="$q.screen.lt.md?'q-mb-md q-ml-sm q-mt-sm':'float-right'" class="q-mr-sm" no-caps outline
             icon="analytics"/>

      <q-input v-if="!$q.screen.lt.md" v-model="filter" outlined label="Search" class="q-mr-md float-right" dense
               :bg-color="$q.dark.isActive ? 'dark' : 'white'"
               :class="$q.dark.isActive ? 'dark_text' : 'text-grey-8'"
               style="width: 200px;"/>
    </div>
    <div class="row" v-if="$q.screen.lt.md">
      <div class="col-12">
        <q-btn-toggle
          v-model="transaction_type"
          class="my-custom-toggle float-right q-ml-sm"
          no-caps
          rounded
          unelevated
          toggle-color="primary"
          :color="$q.dark.isActive ? 'dark' : 'white'"
          text-color="primary"
          :options="[
          {label: 'All tx', value: 'all_tx'},
          {label: 'Incoming', value: 'incoming'},
          {label: 'Outgoing', value: 'outgoing'},
        ]"
        />
      </div>
      <div class="col-12 q-mt-sm">


        <JsonExcel
          :data="transactions"
          :fields="json_fields" class="float-right"
          :class="$q.screen.lt.md?'q-mb-md q-mt-sm':'float-left'"
          name="transactions.xlsx"
          type="xlsx"
        >
          <q-btn label="Export" rounded color="primary" class="float-right"
                 :class="$q.screen.lt.md?'q-mb-md q-mt-xs':'float-left'" no-caps outline
                 icon="download"/>

        </JsonExcel>
        <q-btn round @click="dailog_model=true" color="primary"
               :class="$q.screen.lt.md?'q-mb-md q-ml-sm q-mt-sm':'float-left'" class="q-mr-sm float-right" no-caps
               outline
               icon="analytics"/>
      </div>
      <div class="col-12">
        <q-input v-model="filter" outlined label="Search" class="q-mb-sm float-right" dense
                 :bg-color="$q.dark.isActive ? 'dark' : 'white'"
                 :class="$q.dark.isActive ? 'dark_text' : 'text-grey-8'"
                 style="width: 200px;"/>
      </div>
    </div>

    <q-card class="no-shadow row bg-transparent">
      <q-card-section class="col-12 q-pa-none">
        <q-table class="no-shadow" style="border-radius: 12px" bordered
                 :rows="getFilertedTransactions" selection="multiple"
                 v-model:selected="selected"
                 :columns="columns" :class="$q.dark.isActive ? 'dark_text' : 'text-grey-8'"
                 row-key="id"
                 :filter="filter"
        >
          <template v-slot:body-cell-memo="props">
            <q-td :props="props" class="truncate-chip-labels">
              <q-chip dense :dark="false" class="q-px-sm" color="primary" text-color="white" :label="props.value">
                <q-tooltip>
                  {{ props.value }}
                </q-tooltip>
              </q-chip>

              <q-btn icon="chat" size="sm" round dense class="q-ml-sm" flat :color="$q.dark.isActive ? 'white' : 'primary'"
                      v-if="props.row.hasOwnProperty('extra') &&  props.row['extra'].hasOwnProperty('comment') && props.row['extra']['comment'].length > 0">
                <q-menu class="q-pa-none bg-red" :offset="[10, 10]">
                  <q-list dense>
                    <div class="text-body1 text-white q-pa-sm">Comments</div>
                    <q-separator color="white"/>
                    <q-item clickable v-for="comment in props.row['extra']['comment']" :key="comment.id">
                      <q-item-section class="text-left text-body2 text-white ellipsis-3-lines">
                        <div>
                          <q-avatar size="15px">
                            <q-icon name="circle"/>
                          </q-avatar>
                          {{ comment }}
                        </div>
                      </q-item-section>
                      <q-item-section side>
                        <q-icon color="white" size="20px" name="content_copy" @click="copyToClipboard(comment)" class="cursor-pointer"/>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-td>
          </template>
          <template v-slot:body-cell-amount_sats="props">
            <q-td :props="props">
              <q-icon v-if="props.row['amount'] > 0" name="call_received" color="positive"/>
              <q-icon v-else name="call_made" color="negative"/>
              {{ formatSatoshis(props.row['amount'] / 1000) }} sats
            </q-td>
          </template>
          <template v-slot:body-cell-fiat_amount="props">
            <q-td :props="props">
              {{
                formatEuros(props.row['extra']['wallet_fiat_amount'] ? props.row['extra']['wallet_fiat_amount'].toFixed(2) : '0')
              }}
              €
            </q-td>
          </template>
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-chip v-if="props.row['pending']" dense :dark="false" class="q-px-sm" color="warning"
                      text-color="white" label="Pending"/>
              <q-chip v-else dense :dark="false" class="q-px-sm" color="positive" text-color="white" label="Completed"/>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <q-dialog v-model="dailog_model" persistent>
      <q-card :dark="false" :class="$q.dark.isActive ?'bg-info':''"
              style="width: 700px;height: 500px;border-radius: 12px">
        <q-card-section class="text-h6 q-py-sm" :class="$q.dark.isActive ? 'dark_text' : 'text-grey-8'">
          Transaction

          <q-btn icon="close" class="float-right" rounded dense flat @click="dailog_model=false"/>
        </q-card-section>
        <q-separator/>
        <q-card-section class="text-h4 text-weight-bolder q-pt-none"
                        :class="$q.dark.isActive ? 'dark_text' : 'text-grey-8'">

        </q-card-section>
        <IEcharts :key="$q.dark.isActive?'dark':'lite'" :theme="$q.dark.isActive?'dark':'lite'"
                  style="height: 400px;"
                  :option="options" :autoresize="true"></IEcharts>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import {defineComponent} from 'vue';
import axios from 'axios';
import {exportFile, useQuasar} from 'quasar';
import moment from 'moment';
import {QSpinnerGears} from 'quasar';
import numeral from 'numeral';
import JsonExcel from "vue-json-excel3";

import IEcharts from "vue-echarts";

import * as echarts from 'echarts';

function wrapCsvValue(val, formatFn, row) {
  let formatted = formatFn !== void 0
    ? formatFn(val, row)
    : val;

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted);

  formatted = formatted.split('"').join('""');
  // Uncomment the next two lines to escape new lines
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}

numeral.locale('en');

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      toggle: 'day',
      selectedWallet: '',
      transaction_type: 'all_tx',
      show_own_details: false,
      dailog_model: false,
      income_data: {
        'day': {
          value: '92.12',
          period_change: '5.39% period of change'
        },
        'week': {
          value: '192.12',
          period_change: '5.39% period of change'
        },
        'month': {
          value: '1192.12',
          period_change: '5.39% period of change'
        },
        'all': {
          value: '1192.12',
          period_change: '5.39% period of change'
        }
      },
      outgoing_data: {
        'day': {
          value: '32.12',
          period_change: '5.39% period of change'
        },
        'week': {
          value: '132.12',
          period_change: '5.39% period of change'
        },
        'month': {
          value: '1122.12',
          period_change: '5.39% period of change'
        },
        'all': {
          value: '1122.12',
          period_change: '5.39% period of change'
        }
      },
      columns: [
        {
          "label": "DATE",
          "field": (row) => moment.unix(row['time']).format("DD-MM-YYYY h:mm"), // format the date
          "name": "date",
          "align": "left",
          style: 'width: 15%',
        },
        // it's for wallet name but commnted for now
        // {
        //   "label": "KONTO",
        //   "field": "memo",
        //   "name": "konto",
        //   "align": "left"
        // },
        {
          "label": "FIAT AMOUNT",
          "field": function (row) {
            let amount = row['extra']['wallet_fiat_amount'] ? row['extra']['wallet_fiat_amount'].toFixed(2) : 0
            let formattedAmount = numeral(amount).format('0,0.00');
            if (amount > 0 && amount < 1) {
              formattedAmount = numeral(amount).format('0.000');
            }
            return `€${formattedAmount}`;
          },
          "name": "fiat_amount",
          "align": "left",
          style: 'width: 15%',
        },
        {
          "label": "FIAT CURRENCY",
          "field": (row) => row['extra']['wallet_fiat_currency'],
          "name": "fiat_currency",
          "align": "left",
          style: 'width: 10%',
        },
        {
          "label": "MEMO",
          "field": "memo",
          "name": "memo",
          "align": "left",
          style: 'width: 20%',
        },
        {
          "label": "Status",
          "name": "status",
          "field": (row) => row['pending'] ? 'Pending' : 'Completed',
          "align": "center",
          style: 'width: 20%',
        },
        {
          "label": "AMOUNT",
          "field": (row) => numeral(row['amount'] / 1000).format('0,0').replace(/,/g, '.') + ' sats',
          "name": "amount_sats",
          "align": "left"
        }
      ],
      json_fields: {
        Date: {
          field: 'time',
          callback: (value) => moment.unix(value).format('DD-MM-YYYY h:mm')
        },
        'FIAT AMOUNT': {
          field: 'extra.wallet_fiat_amount',
          callback: (value) => {
            let amount = value ? value.toFixed(2) : 0;
            let formattedAmount = numeral(amount).format('0,0.00');
            if (amount > 0 && amount < 1) {
              formattedAmount = numeral(amount).format('0.000');
            }
            return `€${formattedAmount}`;
          }
        },
        'FIAT CURRENCY': 'extra.wallet_fiat_currency',
        MEMO: 'memo',
        'STATUS': {
          field: 'pending',
          callback: (value) => (value ? 'Pending' : 'Completed')
        },
        AMOUNT: {
          field: 'amount',
          callback: (value) => numeral(value / 1000).format('0,0').replace(/,/g, '.') + ' sats'
        }
      },
      transactions: [],
      wallets: [],
      selected: [],
      user_id: '',
      balance: '',
      out_toggle: false,
      balance_toggle: false,
      in_toggle: false,
      filter: '',
      balancetotaleuroamount: 0,
      incomingtotalamount_final: 0,
      outgoingtotal_final: 0,
      fil_trans: [],
      incomingtotalamount_final_eur: 0,
      outgoingtotal_final_eur: 0,
      euroTotals: {
        all: {incoming: 0, outgoing: 0},
        week: {incoming: 0, outgoing: 0},
        month: {incoming: 0, outgoing: 0},
        day: {incoming: 0, outgoing: 0},
      },
      total: {
        all: {incoming: 0, outgoing: 0},
        week: {incoming: 0, outgoing: 0},
        month: {incoming: 0, outgoing: 0},
        day: {incoming: 0, outgoing: 0},
      },
      tops:[],
      selected_tpo:'',
      currencies:[]
    };
  },
  components: {
    IEcharts,
    JsonExcel
  },
  methods: {
    copyToClipboard(text) {
      navigator.clipboard.writeText(text)
        .then(() => {
          this.$q.notify({
            message: 'Copied to clipboard',
            color: 'positive',
            position: 'top-right',
            icon: 'done'
          });
        })
        .catch(() => {
          this.$q.notify({
            message: 'Failed to copy to clipboard',
            color: 'negative',
            position: 'top-right',
            icon: 'error'
          });
        });
    },
    getCurrencies(){
      // /api/v1/currencies
      let headers = {
        'Authorization': `Bearer ${this.$store.session.access_token}`,
      }
      axios.get('https://timecatcher.lnbits.de/api/v1/currencies', {headers})
        .then(response => {
          this.currencies = response.data;
        })
        .catch(error => {
          console.error("There was an error fetching the transactions!", error);
        });
    },
    openTPos(){
      // https://timecatcher.lnbits.de/tpos/VJTMprkzXpXdUetZfydXyc
      window.open(`https://timecatcher.lnbits.de/tpos/${this.selected_tpo.id}`, '_blank');
      this.selected_tpo = ''
    },
    getTPOS(){
      let headers = {
        'X-Api-Key': this.selectedWallet.inkey
      }
      axios.get('https://timecatcher.lnbits.de/tpos/api/v1/tposs', {headers})
        .then(response => {
          this.tops = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the transactions!", error);
        });
    },
    formatEuros(amount) {
      let formattedAmount = numeral(amount).format('0,0.00');

      if (amount > 0 && amount < 1) {
        formattedAmount = numeral(amount).format('0.000');
      }
      return `${formattedAmount}`;
    },
    formatSatoshis(satoshis) {
      return numeral(satoshis).format('0,0').replace(/,/g, '.');
    },
    convertAmount() {
      let headers = {
        'Authorization': `Bearer ${this.$store.session.access_token}`,
      }
      let data = {
        from_: "sat",
        amount: this.balance,
        to: "eur"
      }
      axios.post('https://timecatcher.lnbits.de/api/v1/conversion', data, {headers})
        .then(response => {
          this.balancetotaleuroamount = response.data.EUR
        })
        .catch(error => {
          console.error("There was an error fetching the transactions!", error);
        });
    },
    convertIncoimgAmount() {
      let headers = {
        'Authorization': `Bearer ${this.$store.session.access_token}`,
      }
      let data = {
        from_: "sat",
        amount: this.incomingtotalamount_final,
        to: "eur"
      }
      axios.post('https://timecatcher.lnbits.de/api/v1/conversion', data, {headers})
        .then(response => {
          this.incomingtotalamount_final_eur = response.data.EUR
        })
        .catch(error => {
          console.error("There was an error fetching the transactions!", error);
        });
    },
    convertOutgoingAmount() {
      let headers = {
        'Authorization': `Bearer ${this.$store.session.access_token}`,
      }
      let data = {
        from_: "sat",
        amount: this.outgoingtotal_final,
        to: "eur"
      }
      axios.post('https://timecatcher.lnbits.de/api/v1/conversion', data, {headers})
        .then(response => {
          this.outgoingtotal_final_eur = response.data.EUR
        })
        .catch(error => {
          console.error("There was an error fetching the transactions!", error);
        });
    },
    async fetchTransactions() {
      this.$q.loading.show(
        {
          message: 'Loading Transactions...',
          spinnerSize: 100,
          spinnerColor: 'orange',
          spinner: QSpinnerGears
        }
      );
      let headers = {
        'Authorization': `Bearer ${this.access_token}`,
        "X-Api-Key": this.selectedWallet.adminkey
      }

      const params = {
        usr: this.user_id
      };

      axios.get('https://timecatcher.lnbits.de/api/v1/payments', {headers, params})
        .then(response => {
          this.transactions = response.data;
          this.incomingtotalamount_final = this.transactions.reduce((acc, transaction) => {
            if (transaction.amount > 0 && transaction.pending === false) {
              acc += transaction.amount;
            }
            return acc;
          }, 0);

          this.incomingtotalamount_final = this.incomingtotalamount_final / 1000


          this.outgoingtotal_final = this.transactions.reduce((acc, transaction) => {
            if (transaction.amount < 0) {
              acc += transaction.amount;
            }
            return acc;
          }, 0);

          this.outgoingtotal_final = this.outgoingtotal_final / 1000

          const filterTransactions = (transactions, toggle) => {
            return transactions.filter(transaction => {
              const transactionDate = moment.unix(transaction['time']);
              if (toggle === 'all') {
                return true;
              }
              if (toggle === 'week') {
                return transactionDate.isSame(new Date(), 'week');
              }
              if (toggle === 'month') {
                return transactionDate.isSame(new Date(), 'month');
              }
              if (toggle === 'day') {
                return transactionDate.isSame(new Date(), 'day');
              }
              return true;
            });
          };

          const totals = {
            all: {incoming: 0, outgoing: 0},
            week: {incoming: 0, outgoing: 0},
            month: {incoming: 0, outgoing: 0},
            day: {incoming: 0, outgoing: 0},
          };

          const calculateTotals = (transactions, period) => {
            return transactions.reduce((acc, transaction) => {
              if (transaction.amount > 0 && transaction.pending === false) {
                acc.incoming += transaction.amount;
              }
              if (transaction.amount < 0) {
                acc.outgoing += transaction.amount;
              }
              return acc;
            }, {incoming: 0, outgoing: 0});
          };

          Object.keys(totals).forEach(period => {
            const filteredTransactions = filterTransactions(this.transactions, period);
            totals[period] = calculateTotals(filteredTransactions, period);
          });

          Object.keys(totals).forEach(period => {
            totals[period].incoming = totals[period].incoming / 1000;
            totals[period].outgoing = totals[period].outgoing / 1000;
          });


          this.total = totals;

          const convertAmountToEUR = async (amount, callback) => {
            let headers = {
              'Authorization': `Bearer ${this.$store.session.access_token}`,
            };
            let data = {
              from_: "sat",
              amount: amount,
              to: "eur"
            };
            axios.post('https://timecatcher.lnbits.de/api/v1/conversion', data, {headers})
              .then(response => {
                callback(response.data.EUR);
              })
              .catch(error => {
                console.error("There was an error fetching the conversion rate!", error);
              });
          };

          Object.keys(totals).forEach(period => {
            convertAmountToEUR(totals[period].incoming, (eurAmount) => {
              this.euroTotals[period].incomingEUR = eurAmount.toFixed(2);
              console.log(`${period} - Incoming in EUR:`, this.euroTotals[period].incomingEUR);
            });

            convertAmountToEUR(totals[period].outgoing, (eurAmount) => {
              this.euroTotals[period].outgoingEUR = eurAmount.toFixed(2);
              console.log(`${period} - Outgoing in EUR:`, this.euroTotals[period].outgoingEUR);
            });
          });

          this.convertIncoimgAmount();
          this.convertOutgoingAmount();
          this.$q.loading.hide();
        })
        .catch(error => {
          console.error("There was an error fetching the transactions!", error);
        });
    },
    getWalletBalance() {
      this.$q.loading.show(
        {
          message: 'Loading Wallet Balance...',
          spinnerSize: 100,
          spinnerColor: 'orange',
          spinner: QSpinnerGears
        }
      );
      let headers = {
        'Authorization': `Bearer ${this.$store.session.access_token}`,
        "X-Api-Key": this.selectedWallet.adminkey
      }
      axios.get('https://timecatcher.lnbits.de/api/v1/wallet', {headers})
        .then(response => {
          this.balance = response.data.balance / 1000;
          this.convertAmount();
          this.user_id = response.data.id;
          // this.getUserDetails()
          this.fetchTransactions();
        })
        .catch(error => {
          console.error("There was an error fetching the transactions!", error);
        });
    },
    getAllWallets() {
      this.$q.loading.show(
        {
          message: 'Loading Wallets...',
          spinnerSize: 100,
          spinnerColor: 'orange',
          spinner: QSpinnerGears
        }
      );
      let headers = {
        'Authorization': `Bearer ${this.$store.session.access_token}`,
      }

      let params = {
        cookie_access_token: this.$store.session.access_token
      }

      axios.get('https://timecatcher.lnbits.de/api/v1/wallets', {headers, params})
        .then(response => {
          this.wallets = response.data;
          this.selectedWallet = this.wallets[0];
          this.getWalletBalance();
          this.getTPOS();
          console.log(response)
        })
        .catch(error => {
          console.error("There was an error fetching the transactions!", error);
        });


    },
    exportTable() {
      const content = [this.columns.map(col => wrapCsvValue(col.label))].concat(
        this.transactions.map(row => this.columns.map(col => wrapCsvValue(
          typeof col.field === 'function'
            ? col.field(row)
            : row[col.field === void 0 ? col.name : col.field],
          col.format,
          row
        )).join(','))
      ).join('\r\n');

      const status = exportFile(
        'transactions.csv',
        content,
        'text/csv;charset=utf-8;'
      );

      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        });
      }
    },
    getUpdatedDetails() {
      this.getTPOS();
      this.getWalletBalance();
      this.fetchTransactions();
    },
    showRevenue() {
      this.show_own_details = !this.show_own_details
    },

  },
  computed: {
    getWalletOptions() {
      return this.wallets.map(wallet => {
        return {
          name: wallet.name,
          value: wallet.id,
          adminkey: wallet.adminkey,
          inkey: wallet.inkey,
          balance_msat: wallet.balance_msat
        }
      });
    },
    getFilertedTransactions() {
      // filter transactions based on toggle like week month day based on time filed
      let transactions = this.transactions.filter(transaction => {
        const transactionDate = moment.unix(transaction['time']);

        if (this.toggle === 'all') {
          return true;
        }
        if (this.toggle === 'week') {
          return transactionDate.isSame(new Date(), 'week');
        }
        if (this.toggle === 'month') {
          return transactionDate.isSame(new Date(), 'month');
        }
        if (this.toggle === 'day') {
          return transactionDate.isSame(new Date(), 'day');
        }
        return true;
      });
      let trans_ = transactions.filter(transaction => {
        if (this.transaction_type === 'all_tx') return true;
        if (this.transaction_type === 'incoming') return transaction.amount > 0;
        if (this.transaction_type === 'outgoing') return transaction.amount < 0;
      });

      this.fil_trans = trans_
      return trans_
    },
    options() {
      let trans = this.fil_trans
      let x_axis_data = trans.map((row) => moment.unix(row['time']).format("DD-MM-YYYY"))
      let values = trans.map((row) => row['amount'] / 1000)
      return {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{b0}: {c0} sats'
        },
        grid: {
          left: '12%',
          right: '4%',
          bottom: '25%',
          top: '5%'
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {show: false},
            data: x_axis_data
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
          }
        ],
        dataZoom: [{
          type: 'slider',
          showDataShadow: false,
          fillerColor: '#7367F0',
          showDetail: false,
          height: '8px',
          handleIcon: 'M20 11C20 15.4183 16.4183 19 12 19C7.58172 19 4 15.4183 4 11C4 6.58172 7.58172 3 12 3C16.4183 3 20 6.58172 20 11Z',
          handleSize: '200%',
          handleStyle: {
            borderColor: 'transparent',
            color: '#7367F0',
            backgroundColor: '#15DE72',
            borderWidth: 0,
          },
          moveHandleStyle: {
            opacity: 0,
            color: '#15DE72',
          },
          dataBackground: {
            lineStyle: {
              type: 'dashed',
              width: '0',
              opacity: 0
            },
            areaStyle: {
              color: '#15DE72'
            }
          },
          selectedDataBackground: {
            areaStyle: {
              color: '#15DE72'
            }
          },
          bottom: 50,
          textStyle: {
            fontSize: 0
          },
        }],
        series: [
          {
            name: 'Transaction',
            type: 'bar',
            barGap: 0,
            label: {
              show: false,
              position: 'top',
              fontSize: '13.8px',
              fontWeight: 400,
            },
            itemStyle: {
              borderRadius: [8, 8, 8, 8],
              color: '#7367F0'
            },
            emphasis: {
              focus: 'series'
            },
            data: values
          },
        ]
      }
    },
    // incomingtotalamount() {
    //   return this.getFilertedTransactions().reduce((acc, transaction) => {
    //     if (transaction.amount > 0 && transaction.pending === false) {
    //       acc += transaction.amount;
    //     }
    //     return acc;
    //   }, 0);
    // },
    // incomingtotaleuroamount() {
    //   return this.getFilertedTransactions().reduce((acc, transaction) => {
    //     if (transaction.amount > 0 && transaction.pending === false) {
    //       acc += transaction.extra.wallet_fiat_amount ? transaction.extra.wallet_fiat_amount : 0;
    //     }
    //     return acc;
    //   }, 0);
    // },
    // outgoingtotalamount() {
    //   return this.getFilertedTransactions().reduce((acc, transaction) => {
    //     if (transaction.amount < 0) {
    //       acc += transaction.amount;
    //     }
    //     return acc;
    //   }, 0);
    // },
    // outgoingtotaleuroamount() {
    //   return this.getFilertedTransactions().reduce((acc, transaction) => {
    //     if (transaction.amount < 0) {
    //       acc += transaction.extra.wallet_fiat_amount ? transaction.extra.wallet_fiat_amount : 0;
    //     }
    //     return acc;
    //   }, 0);
    // },
  },
  mounted() {
    this.getCurrencies();
    this.getAllWallets();

  }
});
</script>

<style scoped>
.card_style {
  background-color: #f2f8fe;
  border-radius: 10px;
  border-color: rgba(115, 103, 240, 0.24);
}

.card_style_dark {
  background-color: #3a3c64;
  border-radius: 10px;
  border-color: rgba(115, 103, 240, 0.24);
}
</style>

<style>

.q-field__control {
  border-radius: 8px !important;
}

.truncate-chip-labels > .q-chip {
  max-width: 300px
}
</style>
