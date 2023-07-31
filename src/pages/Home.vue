<template>
	<div class="grid">
		<div class="col-12">
			<div class="card text-center">
				<img alt="Logo" :src="topbarImage()" />
				<hr class="styled-separator">

                <p class="styled-text">"Más de 30 años trabajando para que la inclusión se concrete en un estilo de vida"</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    methods: {
		topbarImage() {
			return this.$appState.darkTheme ? 'images/logo-jif.png' : 'images/logo-jif.png'; //cambiar un icono a contraste
		}
    },
	computed: {
		darkTheme() {
			return this.$appState.darkTheme;
		}
	}
}
</script>

<style scoped>
.styled-text {
    text-align: center;
    color: #cc0000;
    font-size: 1.2em;
    font-weight: bold;
}

.styled-separator {
    border: none;
    height: 3px;
	width: 50%;
	margin-left: 25%;
	text-align: center;
    background-color: #cc0000;
    margin: 0px 30;
}
</style>