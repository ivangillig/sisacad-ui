<template>
	<Toast />
	<div class="card card-w-title">
		<h5>{{ this.$store.state.student.id ? 'Editar' : 'Agregar Nuevo' }} Alumno</h5>
		<p>Completa la información personal e institucional del alumno </p>
		<Steps :model="items" :readonly="true" />
		<router-view v-slot="{ Component }" @prevPage="prevPage($event)" @nextPage="nextPage($event)" @complete="complete">
			<keep-alive>
				<component :is="Component" />
			</keep-alive>
		</router-view>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	data() {
		return {
			items: [
				{
					label: 'Información Personal',
					to: '/alumnos/nuevoalumno',
				},
				{
					label: 'Información Institucional',
					to: '/steps/informacioninstitucional'
				},
				{
					label: 'Información Médica y Autorizaciones',
					to: '/steps/informacionextra'
				},
				{
					label: 'Verificar y Registrar',
					to: '/steps/confirmacion'
				}
			]
		};
	},
	methods: {
		...mapActions('student', ['updatePersonalInfo', 'updateInstitutionalInfo', 'updateMedAuthInfo', 'submitStudentInfo']),
		nextPage(event) {
			switch (this.$route.path) {
				case '/alumnos/nuevoalumno':
					this.updatePersonalInfo(event.formData);
					break;
				case '/steps/informacioninstitucional':
					this.updateInstitutionalInfo(event.formData);
					break;
				case '/steps/informacionextra':
					this.updateMedAuthInfo(event.formData);
					break;
			}
			this.$router.push(this.items[event.pageIndex + 1].to);
		},
		prevPage(event) {
			this.$router.push(this.items[event.pageIndex - 1].to);
		},
		complete() {
			this.submitStudentInfo();
			//this.$toast.add({severity:'success', summary:'Alumno ingresado', life: 3000, detail: 'El alumno ' + this.formObject.first_name + ' ' + this.formObject.first_lastname + ' fue agregado correctamente.'});
			//this.$router.replace({ name: "crudalumnos" });
		}
	}
}
</script>

<style scoped lang="scss">
::v-deep(b) {
	display: block;
}

::v-deep(.p-card-body) {
	padding: 2rem;
}
</style>