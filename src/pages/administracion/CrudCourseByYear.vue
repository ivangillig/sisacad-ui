<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<Toast/>
				<Toolbar class="mb-4">
					<template v-slot:start>
						<div class="my-2">
							<Button label="Agregar Curso" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
						</div>
					</template>
				</Toolbar>

				<DataTable ref="dt" :value="courses" dataKey="id" :paginator="true" :rows="10" :filters="filters"
							paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
							currentPageReportTemplate="Showing {first} to {last} of {totalRecords} courses" responsiveLayout="scroll">
					<template #header>
						<div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
							<h5 class="m-0">Administrar Cursos por año</h5>
							<span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                            </span>
						</div>
					</template>

					<Column field="id" header="ID" :sortable="true" headerStyle="width:14%; min-width:10rem;"></Column>
					<Column field="academic_year" header="Ciclo" :sortable="true" headerStyle="width:25%; min-width:10rem;"></Column>
					<Column field="name" header="Curso" :sortable="true" headerStyle="width:20%; min-width:10rem;"></Column>
					<Column field="shift" header="Turno" :sortable="true" headerStyle="width:20%; min-width:10rem;"></Column>
					<Column field="created_at" header="Fecha de alta" headerStyle="width:20%; min-width:10rem;"></Column>

					<Column headerStyle="min-width:10rem;">
						<template #body="slotProps">
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editLevel(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2" @click="confirmDeleteLevel(slotProps.data)" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="levelDialog" :style="{width: '450px'}" header="Detalles del course" :modal="true" class="p-fluid">
					<!-- <img :src="'images/course/' + course.image" :alt="course.image" v-if="course.image" width="150" class="mt-0 mx-auto mb-5 block shadow-2" /> -->
					<div class="field">
						<label for="name">Nombre</label>
						<InputText id="name" v-model.trim="course.name" required="true" autofocus 
							:class="{'p-invalid': submitted && !course.name}" 
							@keydown.enter="saveLevel" />
						<small class="p-invalid" v-if="submitted && !course.name">El nombre es obligatorio.</small>
					</div>

					<div class="field">
							<label for="state">Estado</label>
							<Dropdown id="state" v-model="course.state" :options="states_list" optionLabel="label" optionValue="value"
							placeholder="Selecciona una"></Dropdown>
					</div>

					<template #footer>
						<Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
						<Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveLevel" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteLevelDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="course">Está seguro de que desea eliminarlo?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteLevelDialog = false"/>
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteLevel" />
					</template>
				</Dialog>
			</div>
		</div>
	</div>

</template>

<script>
import {FilterMatchMode} from 'primevue/api';
import AdminService from '../../service/Secretaria/AdminService';
import { mapState } from 'vuex';

export default {
	data() {
		return {
			levelDialog: false,
			deleteLevelDialog: false,
			course: { 'name': '', 'state': true},
			filters: {},
			submitted: false,
			states_list: [
				{label: 'Activo', value: true},
				{label: 'Inactivo', value: false},
			]
		}
	},
	AdminService: null,
	created() {
		this.AdminService = new AdminService();
		this.initFilters();
	},
	mounted() {
		this.$store.dispatch('getCourses');
	},
	watch: {
        state(courses) {
            console.log('Nuevo estado de courses:', courses);
        },
    },
	methods: {
		openNew() {
			this.submitted = false;
			this.levelDialog = true;
		},
		hideDialog() {
			this.levelDialog = false;
			this.submitted = false;
		},
		saveLevel() {
			this.submitted = true;
			if (this.course.name.trim()) {
				if (this.course.id) {
					this.course.state = this.course.state.value ? this.course.state.value: this.course.state;
					this.courses[this.findIndexById(this.course.id)] = this.course;

					this.AdminService.updateLevel(this.course.id, this.course).then(data => {
						if(data.status === 200){
							this.AdminService.getLevels().then(response => this.courses = response.data);
							this.$toast.add({severity:'success', summary: 'Exitoso', detail: 'Curso actualizado!', life: 3000});
						}
						if(data.status === 400){
							this.$toast.add({severity:'error', summary: 'Hubo un error', detail: 'Intente nuevamente...', life: 3000});
						}
					});
				}
				else {
					//this.course.state = this.course.state ? this.course.state.value : 'Activo';
					this.courses.push(this.course);

					this.AdminService.newLevel(this.course).then(data => {
						if(data.status === 201){
							this.AdminService.getLevels().then(response => {
								if(response.status === 200){
									this.courses = response.data;
									this.$toast.add({severity:'success', summary: 'Exito', detail: 'Curso creado correctamente!', life: 5000});
								}
							})
						}
					});
				}
				this.levelDialog = false;
				this.course = {};
			}
		},
		editLevel(course) {
			this.course = {...course};
			this.levelDialog = true;
		},
		confirmDeleteLevel(course) {
			this.course = course;
			this.deleteLevelDialog = true;
		},
		deleteLevel() {

			this.AdminService.deleteLevel(this.course.id).then(data => {
				if(data.status === 204){
				this.AdminService.getLevels().then(response => this.courses = response.data);
				this.$toast.add({severity:'success', summary: 'Exito', detail: 'Curso Eliminado', life: 5000});
				}
			});
			this.deleteLevelDialog = false;
			this.course = {};

		},
		findIndexById(id) {
			let index = -1;
			for (let i = 0; i < this.courses.length; i++) {
				if (this.courses[i].id === id) {
					index = i;
					break;
				}
			}
			return index;
		},
		confirmDeleteSelected() {
			this.deleteLevelsDialog = true;
		},
		initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }
        }
    },
		computed: {
        ...mapState({
            courses: state => state.course.courses
        }),
	}
}
</script>

<style scoped lang="scss">
@import '../../assets/demo/badges.scss';
</style>
