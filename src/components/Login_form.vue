<template>
    
  <v-container>
      <v-layout wrap >
        <v-flex sm12 md6 offset-md3>
          <v-card elevation="4" light tag="section">
            <v-img
              width="100%"
              src="../assets/bstatus.com1.jpg">
            </v-img>
            <v-card-text class="mb-5">
              <p v-if ="message1">anda telah 5 kali gagal login, tunggu  {{ this.menit }} : {{ this.detik }} menit</p>
              <p v-else-if="message2">{{message2}}</p>
              <p v-else>Silahkan masuk dengan kode panggil atau username dan password:</p>
              <v-form @submit.prevent="handleSubmit">
                <v-text-field 
                              outline
                              label="Kode Panggil/ Username"
                              type="text"
                              v-model="username"
                              :rules="[() => !!username || 'Harus Diisi']"
                              required
                              :disabled="message1"
                              ></v-text-field>
                <v-text-field 
                              outline
                              label="Password"
                              type="password"
                              v-model="password"
                              :rules="[() => !!password || 'Harus Diisi']"
                              required
                              :disabled="message1"
                              ></v-text-field>
                </v-form>
                </v-card-text>
              
                <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
                
                <v-spacer></v-spacer>
                <v-btn
                @click="handleSubmit"
                color="info" 
                :large="$vuetify.breakpoint.smAndUp"
                :disabled="isDisable || message1">
                    <v-icon left>mdi-lock</v-icon>
                    Login
                </v-btn>
                </v-card-actions>
                
            
          </v-card>
        </v-flex>
        <v-flex sm12 md6 offset-md3>
          <v-layout align-center justify-space-between>
            <p class="caption my-3">
              <a href="#">Lupa Password</a>
            </p>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  
</template>

<style>
    .v-btn,
    .v-card {
        border-radius: 4px
    }
    .v-card__title {
        text-transform: uppercase
    }
</style>

<script>
import axios from 'axios'
export default {
    name: 'Login_form',
    data(){
        return{
            username: '',
            password: '',
            message1: false,
            message2: '',
            errorMessages: '',
            attemp: 0,
            menit: 0,
            detik: 0,
            delay: 300,
            tinggi : window.innerHeight
        }
    },
    methods: {
        async handleSubmit(){
          try {
            const data = {
                username: this.username,
                password: this.password
            };
            const querystring = require('querystring');

            //console.log(data);     
            const response = await axios.post('authMobile/login',
                querystring.stringify(data), {
                headers: { 
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            });
            this.cekAttemp()
            if (response.data.status === 200 && response.data.token !== '') {
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('id_auth', response.data.id_auth);
              this.attemp = 0
              localStorage.setItem('attemp', this.attemp);
              this.$router.push('/home');
            } else {
              this.attemp = this.attemp + 1
              localStorage.setItem('attemp', this.attemp);
              //console.log('fail attemp', localStorage.getItem('attemp'))
              this.message2 = response.data.message;
            }
          } catch (error) {
            console.log('error', error);
          }
        },
        timeDifferent(unixTime){
          var today = new Date();
          var ts = Math.round(today.getTime() / 1000);
          var diff = (ts - unixTime); 
          if(diff>=this.delay){
            return true
          }else{
            return false
          }
        },
        startTimer(duration) {
          var timer = duration, minutes, seconds;
          var self = this
          var interval = setInterval(function () {
              minutes = parseInt(timer / 60, 10);
              seconds = parseInt(timer % 60, 10);

              minutes = minutes < 10 ? "0" + minutes : minutes;
              seconds = seconds < 10 ? "0" + seconds : seconds;
              //console.log('menit: ', minutes)
              self.menit = minutes;
              self.detik = seconds;
              //display.textContent = minutes + ":" + seconds;
              //console.log('interval', timer)
              --timer
              if (timer <= 0) {
                self.attemp = 0
                localStorage.setItem('attemp', 0);
                this.message1 = false
                clearInterval(interval)
              }
          }, 1000);
        },
        cekAttemp(){
          //console.log('localstr', localStorage.getItem('attemp'))
            if (localStorage.getItem('attemp') === null) {
              //console.log('kus')
              localStorage.setItem('attemp', this.attemp);
            } else {
              this.attemp = parseInt(localStorage.getItem('attemp'), 10)
              //console.log('attemp', this.attemp)
              if (this.attemp >= 4) {
                let timeNow = new Date();
                let ts1 = Math.round(timeNow.getTime() / 1000);
                localStorage.setItem('tanggal', ts1);
                this.message1 = true
                //let duration = 5*60
                let duration = this.delay
                this.startTimer(duration)
              } 
            }
        },
    },
    computed: {
      isDisable(){
        if (this.username.length && this.password.length > 0) {
          return false
        } else {
          return true
        }
      },
    },
    watch: {
      name () {
        this.errorMessages = ''
      },
    },

    created(){
      if (localStorage.getItem('tanggal') !== null ) {
        let tglAwal = parseInt(localStorage.getItem('tanggal'))
        //console.log('tglAwal', tglAwal)
        if (this.timeDifferent(tglAwal)) {
          //console.log('wohooo')
          self.attemp = 0
          localStorage.setItem('attemp', 0);
        }else{
          if (localStorage.getItem('attemp') !== null && localStorage.getItem('attemp') != 0) {
              //console.log('created')
              this.cekAttemp()
            }
        }
      }
      /*var kus1 = new Date('2012-12-25 18:20:15');
      var ts1 = Math.round(kus1.getTime() / 1000);
      var kus2 = new Date('2012-12-25 19:20:15');
      var ts2 = Math.round(kus2.getTime() / 1000);
      console.log(ts2-ts1)*/
    }
      
}
</script>