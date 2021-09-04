<template>
    <v-container>
            <v-row >
                <v-col cols="12" class="px-5 pt-2 pb-0 mb-0" style="position:fixed; left:0; z-index:2; background-color: white; " >
                    <v-text-field
                    v-model="search"
                    @keyup="runSeacrh"
                    label="Cari"
                    append-icon="mdi-magnify"
                    rounded
                    dense
                    outlined
                    hint="cari berdasarkan nama gedung atau kelurahan atau kecamatan atau status"
                    ></v-text-field>
                    <v-text-field style="border: 1px solid blue" v-text="'bottom : ' + scrolledToBottom + ', nilaiPageOffset:' + nilaiPageOffset + ', nilaiInnerheight:' + nilaiInnerheight + ', nilaiOffsetHeigh:' + nilaiOffsetHeigh "></v-text-field>
                    <v-text-field
                    class="text-caption pa-0 ma-0"
                    v-text="'menampilkan ' + visibleList + ' dari ' + num_gdg"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
        <v-row>
            <v-col cols="12" style="height:55px"></v-col>
            <v-col cols="12">
                <v-list  class="mt-0">
                    <template v-for="(item, index) in list_gedung">
                            <v-list-item
                            :key="index + 'kus'"
                            class="pl-0 pr-0 mt-0"
                            @click.stop="detailGedung(item.id_gdg_dinas, checkTable(item))"
                            >
                                <v-list-item-avatar class="ml-0 mr-2">
                                    <v-img src="../assets/high-rise-building-icon.png"></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content  class="py-2 my-0">
                                    <v-list-item-title v-html="item.nama_gedung" ></v-list-item-title>
                                    <v-list-item-subtitle v-html="'Kel : ' + item.Kelurahan + ', Kec : ' + item.Kecamatan"></v-list-item-subtitle>
                                    <v-list-item-subtitle v-html="'Status : ' + item.nama_kolom_statusGedung + ', ' + item.kategori_kolomHslPemeriksaan"></v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider :key="index"></v-divider>
                    </template>
                </v-list>
            </v-col>
            <v-col>
                
            </v-col>
        </v-row>
        
        <v-dialog
        v-if="this.$store.getters.page.parameter !== 'RenopsGedung'"
        v-model="dialog"
        persistent
        fullscreen
        transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar
                dark
                color="primary"
                >
                    <v-toolbar-title>Data Keselamatan Kebakaran</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn
                            icon
                            dark
                            @click="dialog = false"
                        >
                        <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                    <template v-slot:extension>
                        <v-tabs
                            v-model="tab"
                            align-with-title
                        >
                            <v-tabs-slider color="yellow"></v-tabs-slider>

                            <v-tab
                            >
                            Data Gedung
                            </v-tab>
                            <template 
                            v-for="(item, index) in data_pemeriksaan"
                            >
                                <v-tab
                                :key="index+ 'kusw'"
                                >
                                {{ item.key }}
                                </v-tab>
                            </template>
                        </v-tabs>
                    </template>
                </v-toolbar>

                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <v-row no-gutters style="border-bottom-style: inset;" class="mx-3"
                        v-for="(item, index) in paramDataGdg"
                        :key="index + 'kuswa'">
                            <v-col cols="4" class="pt-3">
                                {{ item[Object.keys(item)] }} : 
                            </v-col>
                            <v-col cols="8" class="pt-3 pl-2">
                                {{ data_gdg[Object.keys(item)] }}
                            </v-col>
                        </v-row>
                    </v-tab-item>
                    <template
                    v-for="(item, indexP) in data_pemeriksaan"
                    >
                        <v-tab-item
                        :key="indexP">
                            <v-row no-gutters style="border-bottom-style: solid 0.2px;" class="mx-3"
                            v-for="(item, index) in paramDataPemeriksaan"
                            :key="index + 'kuswant'">
                                <v-col cols="12" class="pt-3">
                                    {{ item[Object.keys(item)] }} : 
                                </v-col>
                                <v-col cols="12" class=""
                                v-if="index + 'kuswant' !== '5kuswant'">
                                    {{ data_pemeriksaan[indexP][Object.keys(item)] }}
                                </v-col>
                                <v-col cols="12" class=""
                                v-else
                                v-html="data_pemeriksaan[indexP][Object.keys(item)]">
                                </v-col>
                            </v-row>
                        </v-tab-item>
                    </template>
                </v-tabs-items>
                
            </v-card>
        </v-dialog>


        <v-dialog
        v-else
        v-model="dialog"
        persistent
        fullscreen
        transition="dialog-bottom-transition"
        >
            <v-card>
                <v-toolbar
                dark
                color="primary"
                >
                    <v-toolbar-title>Renops Penanggulangan Kebakaran</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn
                            icon
                            dark
                            @click="dialog = false"
                        >
                        <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <div class="wrapper">
                    <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                    ></v-progress-circular>
                    <pdf v-for="i in numPages" :key="i" :page="i" :src="src" style="width: 100%; border-bottom-style: outset;"></pdf>
                </div>
                
            </v-card>
        </v-dialog>

        
    </v-container>
</template>

<script>
import axios from 'axios'
import pdf from 'vue-pdf'


export default {
    name: 'dataGedung',
    components: {
        pdf
    },
    created() {
        this.getGedungList(this.limitQuery, this.offsetQuery, this.search)
        //console.log('params', this.$store.getters.page.parameter);
    },
    computed: {
        visibleList(){
            return this.list_gedung.length
        },
    },
    data: () => ({
        index: '',
        list_gedung: [],
        responseArrLenght: 20,
        limitQuery: 20,
        offsetQuery: 0,
        search: '',
        num_gdg: 0,
        namaTableGdg: '',
        data_gdg : '',
        data_pemeriksaan : '',
        tab: null,
        dialog: false,
        paramDataGdg : [{nama_gedung: "Gedung"}, 
                        {alamat_gedung: "Alamat"},
                        {Kelurahan: "Kelurahan"},
                        {Kecamatan: "Kecamatan"},
                        {Wilayah: "Kotamadya"},
                        {fungsi_gedung: "Fungsi"},
                        {kepemilikkan_gedung: "Kepemilikan"},
                        {jml_tower: "Jml Tower"},
                        {jml_lantai: "Jml Lantai"},
                        {tinggi_gedung: "Ketinggian"},
                        {jml_basement: "Jml Basement"},
                        ],
        paramDataPemeriksaan : [{no_terbit: "No Rekomtek/ LHP"}, 
                        {tgl_berlaku: "Tgl Rekomtek/ LHP"},
                        {nama_pengelola: "Pengelola Gedung"},
                        {nama_kolom_statusGedung: "Status Keselamatan Kebakaran"},
                        {kategori_kolomHslPemeriksaan: "Kesimpulan Pemeriksaan"},
                        {catatan: "Catatan Hasil Pemeriksaan"},
                        ],
        pdfsrc: '',
        base_url : 'http://localhost/ci-rest/',
			src:'',
			loadedRatio: 0,
			page: 1,
			numPages: 0,
			rotate: 0,
        scrolledToBottom: false,
        nilaiPageOffset: '',
        nilaiInnerheight: '',
        nilaiOffsetHeigh: '',
    }),
    methods:{
        scroll () {
            window.onscroll = () => {
                let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)*1.5  >= document.documentElement.offsetHeight - window.innerHeight
                this.nilaiPageOffset = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
                this.nilaiInnerheight = window.innerHeight
                this.nilaiOffsetHeigh = document.documentElement.offsetHeight

                if (bottomOfWindow && this.responseArrLenght != 0 && this.$route.path === '/listGdg') {
                    this.scrolledToBottom = true // replace it with your code
                    this.offsetQuery += this.limitQuery
                    this.getGedungList(this.limitQuery, this.offsetQuery, this.search)
                }else{
                    this.scrolledToBottom = false
                }
            }
        },
        async getGedungList(limitQuery, offsetQuery, search) {
          try {
            const response = await axios.get('apiMobile/listGedung',
                {
                    headers: {
                        "X-API-KEY" : localStorage.getItem('token')
                    }, params: {
                        'id': localStorage.getItem('id_auth'),
                        'kode_wilayah': this.$store.getters.userData.kode_wilayah,
                        'limitQuery': limitQuery,
                        'offsetQuery': offsetQuery,
                        'search': search,
                        'tipe': this.$store.getters.page.parameter
                    } 
            });
            //console.log('response1', response.data.result[0]);
            let theResponse = response.data.result
            console.log('res_list', theResponse)
            this.responseArrLenght = theResponse.list_gdg.length
            this.list_gedung.push.apply(this.list_gedung, theResponse.list_gdg)
            this.num_gdg = theResponse.num_gdg
            if (theResponse.table !== 'undefined') {
                this.namaTableGdg = theResponse.table
                }
            //a.push.apply(a, b)
            //console.log('list_gedung', this.list_gedung)
            //this.$store.dispatch('updateListGdgTinggi', response.data.result[0]);
            }catch (err) {
                //todo throw to 403 page
            // throw new Error('Unable to establish a login session.'); // here I'd like to send the error to the user instead
            //return {err, isAuthError: true};
            console.log('error', err);
            }
        },
        runSeacrh() {  
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                this.list_gedung = []
                this.offsetQuery = 0
                this.getGedungList(this.limitQuery, this.offsetQuery, this.search) 
            }, 800);
        },
        detailGedung(id, par){
            //console.log('detailGedung', id)
            //console.log('namaTable', par)
            let namaTable = ''
            if (par === 0) {
                //arrPar = {namaTable: this.namaTableGdg, id_gdg: id, fullPath: this.$route.fullPath};
                namaTable= this.namaTableGdg
            }else{
                //arrPar = {namaTable: par, id_gdg: id, fullPath: this.$route.fullPath};
                namaTable= par
            }
            //let pageArr = {name: 'Data Keselamatan Kebakaran', parameter: arrPar};
            //this.$store.dispatch('updatePage', pageArr);
            let tipe = this.$store.getters.page.parameter
            this.dialog = true
            if (tipe === 'RenopsGedung') {
                this.getRenopsGdg(id, namaTable)
                console.log('RenopsGedung')
            } else {
                this.getDetailGdg(id, namaTable)
                console.log('GedungTinggi')
            }
        },
        checkTable(par){
            if ("table" in par) {
                return par.table
            }else{
                return 0
            }
        },
        async getDetailGdg(id_gdg, namaTable) {
            try {
                const response = await axios.get('apiMobile/detailGedung',
                    {
                        headers: {
                            "X-API-KEY" : localStorage.getItem('token')
                        }, params: {
                            'id': localStorage.getItem('id_auth'),
                            'id_gdg': id_gdg,
                            'namaTable': namaTable,
                        } 
                    });
                //console.log('response1', response.data.result[0]);
                let theResponse = response.data.result
                //console.log('res_detail', theResponse)
                this.data_gdg = theResponse.gedung
                this.data_pemeriksaan = theResponse.pemeriksaan
                //console.log('tes', this.$route.fullPath)
                //this.responseArrLenght = theResponse.list_gdg.length
                //this.list_gedung.push.apply(this.list_gedung, theResponse.list_gdg)
                //this.num_gdg = theResponse.num_gdg
                //if (theResponse.table !== 'undefined') {
                    //this.namaTableGdg = theResponse.table
                // }
                //a.push.apply(a, b)
                //console.log('list_gedung', this.list_gedung)
                //this.$store.dispatch('updateListGdgTinggi', response.data.result[0]);
            }catch (err) {
                    //todo throw to 403 page
                // throw new Error('Unable to establish a login session.'); // here I'd like to send the error to the user instead
                //return {err, isAuthError: true};
                console.log('error', err);
            }
        },
        async getRenopsGdg(id_gdg, namaTable) {
            try {
                const response = await axios.get('apiMobile/renopGedung',
                    {
                        headers: {
                            "X-API-KEY" : localStorage.getItem('token')
                        }, //responseType: "blob",
                         params: {
                            'id': localStorage.getItem('id_auth'),
                            'id_gdg': id_gdg,
                            'namaTable': namaTable,
                        }
                    });
                //console.log('response1', response.data.result[0]);
                let theResponse = response.data
                //console.log('res_detail', theResponse)
                console.log("Success", theResponse);
                //const blob = new Blob([response.data]);
                //const objectUrl = URL.createObjectURL(blob);
                //this.pdfsrc = objectUrl;
                //this.pdfsrc = 'http://localhost/ci-rest/'+theResponse.renops;
                //var decodedData = atob(theResponse.result);
                var buf = Buffer.from(theResponse.result, 'base64');
                //this.src = buf
                this.src = pdf.createLoadingTask(buf);
                console.log("this.src.promise", this.src.promise);
                this.src.promise.then(pdf => {
                    console.log("pdf in callback", pdf);
                    this.numPages = pdf.numPages;
                    console.log(
                    `this.numPages: ${this.numPages} pdf.numPages: ${pdf.numPages} `
                    );
                    console.log(this);
                });
                //this.numPages = pdf.numPages
                //console.log('pdf_url', this.pdfsrc)
                //this.responseArrLenght = theResponse.list_gdg.length
                //this.list_gedung.push.apply(this.list_gedung, theResponse.list_gdg)
                //this.num_gdg = theResponse.num_gdg
                //if (theResponse.table !== 'undefined') {
                    //this.namaTableGdg = theResponse.table
                // }
                //a.push.apply(a, b)
                //console.log('list_gedung', this.list_gedung)
                //this.$store.dispatch('updateListGdgTinggi', response.data.result[0]);
            }catch (err) {
                    //todo throw to 403 page
                // throw new Error('Unable to establish a login session.'); // here I'd like to send the error to the user instead
                //return {err, isAuthError: true};
                console.log('error', err);
            }
        },
        password: function(updatePassword, reason) {

			updatePassword(prompt('password is "test"', reason));
		},
		error: function(err) {

			console.log(err);
		}
    },
    mounted () {
        this.scroll()
    }
}
</script>

<style>
.wrapper{
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    -moz-overflow-scrolling: touch;
}
</style>