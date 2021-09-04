<template>
    <div class="wrapper">
		<pdf
			v-for="i in numPages"
			:key="i"
			:src="src"
			:page="i"
			style="height: 100%; border-bottom-style: inset;"
		></pdf>
	</div>
</template>

<script>
import pdf from 'vue-pdf'
var loadingTask = pdf.createLoadingTask('http://localhost/ci-rest/upload/gedung/dinas/renops/Kementerian_Kesehatan_RI.pdf');


export default {
    name: 'test',
    components: {
        pdf
    },
    data() {
		return {
			src: loadingTask,
			numPages: undefined,
		}
	},
	mounted() {

		this.src.promise.then(pdf => {

			this.numPages = pdf.numPages;
		});
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