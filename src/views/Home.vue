<template>
<div>
  <appBar />
  <homePage />
  <myFooter />
</div>
  
</template>

<script>
  import axios from 'axios'
  import appBar from '../components/AppBar'
  import homePage from '../components/Home_page'
  import myFooter from '../components/myFooter'

  export default {
    name: 'home',

    components: {
      appBar,
      homePage,
      myFooter,
    },
    
    async created() {
      try {
      const response = await axios.get('apiMobile/home',
          {
            headers: {
              "X-API-KEY" : localStorage.getItem('token')
            }, params: {
              'id': localStorage.getItem('id_auth')
            } 
      });
      console.log('response', response.data.result);
      //console.log('gedung rendah', this.$store.getters.gedung_rendah);
      this.$store.dispatch('updateUserData', response.data.result);
      let pageArr = {name: 'Beranda', parameter: 'Beranda'};
      this.$store.dispatch('updatePage', pageArr);
      //this.$store.dispatch('updatePage', 'Beranda');
      //console.log('store', this.$store.state.userData.result.auth_id);
      }catch (err) {
        //todo throw to 403 page
      // throw new Error('Unable to establish a login session.'); // here I'd like to send the error to the user instead
      //return {err, isAuthError: true};
      //console.log('error', err);
      }
    }
  }
  //const kus = JSON.stringify(localStorage.getItem('user_data'));
  //console.log(localStorage.getItem('token'));
</script>
