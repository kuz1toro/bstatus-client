<template>
    
    <v-container>
      <v-layout wrap>
        <v-flex sm12 md6 offset-md3>
          <v-card elevation="4" light tag="section">
            <v-card-title>
              <v-layout align-center justify-space-between>
                <h3 class="" >
                </h3>
                <v-flex>
                    <v-img alt="logo_dki" class="ml-3" contain height="48px"  position="center right" src="../assets/logo_dki.png"></v-img>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p v-if ="message">{{message}}</p>
              <p v-else>Silahkan masuk dengan kode panggil atau username dan password:</p>
              <v-form @submit.prevent="handleSubmit">
                <v-text-field
                              outline
                              label="Username/ Kode Panggil"
                              type="text"
                              v-model="username"
                              ></v-text-field>
                <v-text-field
                              outline
                              hide-details
                              label="Password"
                              type="password"
                              v-model="password"
                              ></v-text-field>
              
                <v-divider></v-divider>
                <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
                
                <v-spacer></v-spacer>
                <v-btn type="submit" color="info" :large="$vuetify.breakpoint.smAndUp">
                    <v-icon left>mdi-lock</v-icon>
                    Login
                </v-btn>
                </v-card-actions>
                </v-form>
            </v-card-text>
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
            message: ''
        }
    },
    methods: {
        async handleSubmit(){
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
                    "X-API-KEY" : localStorage.getItem('token')
                }
            });
            //simpan token di localStorage
            //localStorage.setItem('token', response.data.token);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('id_auth', response.data.id_auth);
            //let cekToken = localStorage.getItem('token');
            //console.log(response.data);
            //console.log(cekToken);
            //console.log(response.data.user_data);
            if (response.data.status === 200 && response.data.token !== '') {
              this.$router.push('/home');
            } else {
              this.message = response.data.message;
            }
            
        }
    },
    /*created(){
        if(localStorage.getItem('token')){
          this.$router.push({name: 'Home'})
        }
      }*/
   
}
</script>