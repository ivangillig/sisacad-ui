<template>
	
	<Toast/>
	<div class="card card-w-title">
		<h5>Agregar Nuevo Alumno</h5>
		<p>Completa la información personal e institucional del alumno </p>
		<Steps :model="items" :readonly="true" />
		<router-view v-slot="{ Component }" :formData="formObject" @prevPage="prevPage($event)" @nextPage="nextPage($event)"
			@complete="complete">
			<keep-alive>
				<component :is="Component" />
			</keep-alive>
		</router-view>
	</div>
</template>

<script>
export default {
	data() {
			return {
				items: [
				{
						label: 'Información Personal',
						to: '/alumnos/nuevoalumno'
					},
					{
						label: 'Información Institucional',
						to: '/steps/informacioninstitucional'
					},
					// {
					// 	label: 'Autorizaciones',
					// 	to: '/steps/payment'
					// },
					{
						label: 'Registrar',
						to: '/steps/confirmacion'
					}
				],
				formObject: {}
			}
		},
		methods: {
        nextPage(event) {
            for (let field in event.formData) {
                this.formObject[field] = event.formData[field];
            }

            this.$router.push(this.items[event.pageIndex + 1].to);
        },
        prevPage(event) {
            this.$router.push(this.items[event.pageIndex - 1].to);
        },
        complete() {

			
            this.$toast.add({severity:'success', summary:'Alumno ingresado', detail: 'El alumno ' + this.formObject.first_name + ' ' + this.formObject.first_lastname + ' fue agregado correctamente.'});
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