<template>
	<div class="layout-footer">
		<!-- <img alt="Logo" :src="footerImage()" height="20" class="mr-2" />
		by -->
		<span class="font-medium ml-2">© Copyright Juvenil Instituto Fueguino 1991-{{ actualYear }}</span>
	</div>
</template>

<script>
	export default {
		name: "AppFooter",
		created(){
			this.actualYear = new Date().getFullYear();
		},
		methods: {
			footerImage() {
				return this.$appState.darkTheme ? 'images/logo-white.svg' : 'images/logo-dark.svg';
			}
		},
		computed: {
			darkTheme() {
				return this.$appState.darkTheme;
			}
		}
	}
</script>