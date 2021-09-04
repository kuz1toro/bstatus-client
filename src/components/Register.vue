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
              <p>Register</p>
              <v-form @submit.prevent="handleSubmit">
                <v-text-field
                              outline
                              label="Username"
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
                    <v-icon left>mdi-login</v-icon>
                    Register
                </v-btn>
                </v-card-actions>
                </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex sm12 md6 offset-md3>
          <v-layout align-center justify-space-between>
            <p class="caption my-3">
              <a href="#">Privacy Policy</a>
              |
              <a href="#">Terms of Service</a>
            </p>
            <p class="caption my-3">Powered by <a href="#">StaffCircle</a></p>
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
    name: 'Register',
    data(){
        return{
            username: '',
            password: ''
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
            const response = await axios.post('authMobile/register',
                querystring.stringify(data), {
                headers: { 
                    "Content-Type": "application/x-www-form-urlencoded"
                }
                });
            console.log(response);
        }
    }
}
</script>