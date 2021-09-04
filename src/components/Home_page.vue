<template>
  <v-container fluid>
    <v-card
      class="mx-auto"
      color="#952175"
      dark
    >
    <v-img
              src="../assets/logo_damkar.jpg"
              class="white--text"
              gradient="to bottom, rgba(0,0,0,.8), rgba(0,0,0,.9)"
              :height="img_height"
            >
      <v-card-title >
        <span class="text-h7 font-weight-bold">Rekap Data Gedung</span>
      </v-card-title>

      <v-card-text class="text-h7 font-weight-bold white--text" >
        <div v-if="this.$store.getters.userData.level == 4">
          <span>Wilayah : {{ this.$store.getters.userData.wilayah }}</span>
        </div>
        <div v-else-if="this.$store.getters.userData.level == 3">
          <span>Kotamadya : {{ this.$store.getters.userData.wilayah }}</span>
        </div>
        <div v-else-if="this.$store.getters.userData.level < 3">
          <span>Kecamatan : {{ this.$store.getters.userData.wilayah }}</span>
        </div>
        <div>
          <span>Total : {{ this.$store.getters.total_gedung }} Gedung</span>
        </div>
      </v-card-text>

      <v-card-text class="pt-0 text-h7 font-weight-light white--text" >
        <div>
          <span class="font-weight-bold">Gedung Tinggi</span>
        </div>
        <div>
          <span>- Memenuhi persyaratan : {{ memenuhi }}</span>
        </div>
        <div>
          <span>- Tidak memenuhi persyaratan : {{ jmlTdkMemenuhi }}</span>
        </div>
        <div>
          <span>- SubTotal : {{ subTotal }}</span>
        </div>
      </v-card-text>

        <v-card-text 
          class="pt-0 text-h7 font-weight-light white--text"
          >
          <div>
            <span class="font-weight-bold">Gedung Menengah & Rendah</span>
          </div>
          <div
            v-for="gedung in this.$store.getters.gedung_rendah"
            :key="gedung.wilayah"
            >
            <div>
              <span class="font-weight-bold">{{ gedung.wilayah }}</span>
            </div>
            <div>
              <span>- Memenuhi persyaratan : {{ gedung.memenuhi_g }}</span>
            </div>
            <div>
              <span>- Tidak memenuhi persyaratan : {{ gedung.tdk_memenuhi_g }}</span>
            </div>
            <div>
              <span>- SubTotal : {{ gedung.total_g }}</span>
            </div>
          </div>
        </v-card-text>
    </v-img>
    </v-card>

    <v-row class="mt-2" dense>
        <v-col 
          cols="12"
          v-for="card in cards"
          :key="card.title"
          >
          <v-card
            color="#385F73"
            dark
          >
            <v-img
              :src="card.src"
              class="white--text"
              gradient="to bottom, rgba(0,0,0,.5), rgba(0,0,0,.5)"
              height="190px"
            >
              <v-card-title class="text-h7" v-text="card.title">
              </v-card-title>

              <v-card-text v-text="card.isi"></v-card-text>
            
              <v-card-actions>
                <v-btn
                outlined
                rounded
                class="mr-2 mx-auto text-capitalize"
                @click.stop="link(card.link)"
                 >
                  Lihat
                </v-btn>
              </v-card-actions>
            </v-img>
          </v-card>
        </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
    name: 'HomePage',
    data: () => ({
      jmlMemenuhi: '',
      jmlTdkMemenuhi: '',
      subTotal: '',
      cards: [
        { title: 'Data Gedung Tinggi', isi: 'Data Keselamatan Kebakaran Bangunan Gedung Tinggi', src: require('../assets/high-rise2.jpg'), link: 1 },
        { title: 'Data Gedung M&R', isi: 'Data Keselamatan Kebakaran Bangunan Gedung Menengah dan Rendah', src: require('../assets/mid-rise-building.jpg'), link: 2 },
        { title: 'Renops', isi: 'Rencana Operasi Penanggulangan Kebakaran Bangunan Gedung', src: require('../assets/kebakaran.jpg'), link: 3 },
      ],
    }),
    methods: {
      link(num) {
        if (num == 1) {
          let pageArr = {name: 'Daftar Gedung Tinggi', parameter: 'GedungTinggi'};
          this.$store.dispatch('updatePage', pageArr);
          this.$router.push('/listGdg');
        } else if (num == 2){
          let pageArr = {name: 'Daftar Gedung M&R', parameter: 'GedungMR'};
          this.$store.dispatch('updatePage', pageArr);
          this.$router.push('/listGdg');
        } else {
          let pageArr = {name: 'Daftar Renops Gedung', parameter: 'RenopsGedung'};
          this.$store.dispatch('updatePage', pageArr);
          this.$router.push('/listGdg');
        }
        
      },
      checkArray(){
        if (Array.isArray(this.$store.getters.userData.gedung)) {
          this.jmlMemenuhi = this.$store.getters.userData.gedung[0].memenuhi_g
          this.jmlTdkMemenuhi = this.$store.getters.userData.gedung[0].tdk_memenuhi_g
          this.subTotal = this.$store.getters.userData.gedung[0].total_g
        } 
      },
    },
    computed: {
      img_height: function(){
        if (this.$store.getters.userData.level == 4) {
          return "720px"
        } else {
          return "350px"
        }
      },
      memenuhi(){
        this.checkArray()
        return this.jmlMemenuhi
      }
    },
    created() {
      this.checkArray()
    }
}
</script>

<style>
.block {
    width:100%; 
    height:20px;
  }
.metro {
    height:100px;
    background-color: #9ca1e8;
  }
</style>