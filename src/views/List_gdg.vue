<template>
<div>
  <appBar />
  <dataGedung />
</div>
  
</template>

<script>
  import appBar from '../components/AppBar'
  import dataGedung from '../components/data_gedung'

  export default {
    name: 'listGedung',

    components: {
      appBar,
      dataGedung,
    },
  }
  //const kus = JSON.stringify(localStorage.getItem('user_data'));
  //console.log(localStorage.getItem('token'));
</script>
