<template>
	
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
						label: 'Información Institucional',
						to: '/'
					},
					{
						label: 'Información Personal',
						to: '/steps/seat'
					},
					{
						label: 'Información Medica',
						to: '/steps/payment'
					},
					{
						label: 'Autorizaciones',
						to: '/steps/confirmation'
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
            this.$toast.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + this.formObject.firstname + ' ' + this.formObject.lastname + ' your order completed.'});
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