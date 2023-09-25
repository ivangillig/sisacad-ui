<template>

<Dialog v-model:visible="showMessage" :breakpoints="{ '960px': '80vw' }" :style="{ width: '30vw' }" position="top">
    <div class="flex align-items-center flex-column pt-6 px-3">
        <i class="pi pi-check-circle" :style="{fontSize: '5rem', color: 'var(--green-500)' }" @click="toggleDialog" ></i>
        <h5 v-if="this.action === 'editStudent'">
            Se guardaron los cambios correctamente
        </h5>
        <h5 v-else>
			Alumn{{ student.gender === '4' ? 'a' : 'o' }}
			cread{{ student.gender === '4' ? 'a' : 'o' }}
			correctamente!
		</h5>
		<p v-if="this.action !== 'editStudent'" :style="{ lineHeight: 1.5 }">
			{{ student.gender === '4' ? 'La' : 'El' }} alumn{{ student.gender === '4' ? 'a' : 'o' }}
			{{ student.first_name }} {{ student.first_lastname }} fue
			cread{{ student.gender === '4' ? 'a' : 'o' }} correctamente.
			Se envió un correo a <b>{{ student.email }}</b> para activar su cuenta.
		</p>
    </div>
    <template #footer>
        <div class="flex justify-content-center">
            <Button label="OK" @click="toggleDialog" class="p-button-text" />
        </div>
    </template>
</Dialog>

	<Toast />

	<div class="card card-w-title">
		<h5>{{ student.id ? 'Editar' : 'Agregar Nuevo' }} Alumno</h5>
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
import { mapState, mapActions } from 'vuex';

export default {
	beforeRouteLeave(to, from, next) {
		if (!to.path.startsWith('/alumnos/formulario')) {
			//this.$store.commit('student/clearStudent');
		}
		next();
	},
	data() {
		return {
			action: '',
            showMessage: false,
			items: [
				{
					label: 'Información Personal',
					to: '/alumnos/formulario/informacionpersonal',
				},
				{
					label: 'Información Institucional',
					to: '/alumnos/formulario/informacioninstitucional'
				},
				{
					label: 'Información Médica y Autorizaciones',
					to: '/alumnos/formulario/informacionextra'
				}
			]
		};
	},
    mounted() {
		this.items.push({
			label: this.confirmationLabel,
			to: '/alumnos/formulario/confirmacion'
		});
	},
    computed: {
        ...mapState('student', ['student', 'countries']),
        confirmationLabel() {
            return !this.student.id ? 'Verificar y registrar' : 'Verificar y guardar';
        }
    },
	methods: {
		...mapActions('student', ['clearStudent']),
		nextPage(event) {
			this.$router.push(this.items[event.pageIndex + 1].to);
		},
		prevPage(event) {
			this.$router.push(this.items[event.pageIndex - 1].to);
		},
		complete(actionType) {
			this.action = actionType;
			this.showMessage = true;
		},
		toggleDialog() {
            this.showMessage = !this.showMessage;

            if(!this.showMessage) {
				this.$router.push({ name: "crudalumnos" });
            }
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