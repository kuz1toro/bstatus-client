<template>
  <v-container
    class="pa-0"
    fluid
    >
        <v-app-bar
        color="blue darken-4"
        app
        dark
        >
            <div 
              v-if="this.$store.getters.page.name != 'Beranda'"
              style="width:15%">
              <v-icon
                dark
                left
                @click.stop="goback"
              >
               mdi-arrow-left
              </v-icon>
            </div>
            <div v-else style="width:15%"></div>
            <div style="width:70%">
              <v-toolbar-title>{{this.$store.getters.page.name}}</v-toolbar-title>
            </div>
            <div align="right" style="width:15%">
              <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            </div>
        </v-app-bar>
        <v-navigation-drawer
        v-model="drawer"
        class="red darken-2 accent-4"
        left
        temporary
        app
        dark
        >
          <v-row
                class="my-3 white--text"
                style="text-align: center"
                >
                    <v-col
                    cols="12"
                    >
                        <v-avatar
                            size="120"
                        >
                            <v-img 
                            src="../assets/default.png"></v-img>
                        </v-avatar>
                    </v-col>
                    <v-col cols="12" class="py-0">
                      <span class="text-subtitle-1 font-weight-bold">{{ namaUser }}</span>
                    </v-col>
                    <v-col cols="12" class="py-0">
                      <span class="text-subtitle-2 font-weight-light">{{ namaJabatan }}</span>
                    </v-col>
            
                </v-row>

            <v-divider></v-divider>

            <v-list
            nav
            dense
            >
                <v-list-item-group
                v-model="group"
                >
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-cog</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Setting</v-list-item-title>
                    </v-list-item>
                    
                    <v-list-item @click="handleLogout">
                        <v-list-item-icon>
                            <v-icon>mdi-logout</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

          <v-dialog
            v-model="dialog"
            persistent
            max-width="290"
          >
            <v-card>
              <v-card-title class="text-h5">
                Keluar Aplikasi?
              </v-card-title>
              <v-card-text>Apabila keluar, maka untuk menggunakan aplikasi harus login kembali</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  dark
                  @click="dialog = false"
                >
                  Tidak
                </v-btn>
                <v-btn
                  color="red darken-1"
                  dark
                  @click="handleYes"
                >
                  Ya
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

    </v-container>
</template>

<script>
export default {
    name: 'app_bar',
    data: () => ({
        drawer: false,
        group: null,
        dialog: false
    }),
    watch: {
      group () {
        this.drawer = false
      },
    },
    methods: {
      handleLogout() {
        this.dialog = true
        //this.$router.push('/');
      },
      handleYes() {
        this.dialog = true
        this.$store.dispatch('updateUserData', '');
        localStorage.clear();
        this.$router.push('/');
      }, 
      goback(){
        //this.$router.go(-1)
        this.$router.back()
      }
    },
    computed: {
      namaUser: function(){
        try {
          // Note we're seeing if the returned value of our function is not
          // undefined or null
          if(this.$store.getters.userData.nama_lengkap !== null){
            return this.$store.getters.userData.nama_lengkap
          }else{
            return 'User'
          }
        } catch (e) {
          // And we're able to catch the Error it would normally throw for
          // referencing a property of undefined
          return 'User'
        }
      },
      namaJabatan: function(){
         try {
          // Note we're seeing if the returned value of our function is not
          // undefined or null
          if(this.$store.getters.userData.jabatan !== null){
            return this.$store.getters.userData.jabatan
          }else{
            return 'Damkar'
          }
        } catch (e) {
          // And we're able to catch the Error it would normally throw for
          // referencing a property of undefined
          return 'Damkar'
        }
      }
    }
}
</script>