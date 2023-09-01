<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<Toast/>
				<Toolbar class="mb-4">
					<template v-slot:start>
						<div class="my-2">
							<Button label="Agregar Grado" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
							<Button label="Eliminar" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedGrades || !selectedGrades.length" />
						</div>
					</template>

					<template v-slot:end>
						<Button label="Exportar" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template>
				</Toolbar>

				<DataTable ref="dt" :value="grades" v-model:selection="selectedGrades" dataKey="id" :paginator="true" :rows="10" :filters="filters"
							paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
							currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} grados" responsiveLayout="scroll">
					<template #header>
						<div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
							<h5 class="m-0">Administrar Grados</h5>
							<span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                            </span>
						</div>
					</template>

					<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

					<Column field="id" header="ID" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">ID</span>
							{{slotProps.data.id}}
						</template>
					</Column>
					<Column field="name" header="Nombre" :sortable="true" headerStyle="width:25%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Nombre</span>
							{{slotProps.data.name}}
						</template>
					</Column>

					<Column field="division" header="División" :sortable="true" headerStyle="width:25%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Division</span>
							{{slotProps.data.division}}
						</template>
					</Column>

					<Column field="speciality" header="Modalidad" :sortable="true" headerStyle="width:25%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Speciality</span>
							{{slotProps.data.speciality}}
						</template>
					</Column>

					<Column field="level" header="Nivel" :sortable="true" headerStyle="width:25%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Level</span>
							{{slotProps.data.level}}
						</template>
					</Column>


					<Column field="state" header="Estado" :sortable="true" headerStyle="width:20%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Estado</span>
							<div v-if="slotProps.data.state === true">
								Activo
							</div>
							<div v-else>
								Inactivo
							</div>
						</template>
					</Column>

					<Column field="created_at" header="Fecha Creado" headerStyle="width:20%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Fecha Creado</span>
							{{slotProps.data.created_date}}
						</template>
					</Column>

					<Column headerStyle="min-width:10rem;">
						<template #body="slotProps">
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editGrade(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2" @click="confirmDeleteGrade(slotProps.data)" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="gradeDialog" :style="{width: '450px'}" header="Detalles del grado" :modal="true" class="p-fluid">
					<div class="field">
						<label for="name">Nombre</label>
						<InputText id="name" v-model.trim="grade.name" required="true" autofocus 
							@keydown.enter="saveGrade" />
					</div>

					<div class="field">
							<label for="level">Nivel</label>
							<Dropdown id="level" v-model="grade.level" :options="levels" optionLabel="name" optionValue="id" @change="showDivision(grade.level)" required
							placeholder="Selecciona uno"></Dropdown>
					</div>

					<div class="field" v-if="showSpecialitiesDropdown === true">
							<label for="speciality">Modalidad</label>
							<Dropdown id="speciality" v-model="grade.speciality" :options="specialities" optionLabel="name" optionValue="id"
							placeholder="Selecciona una modalidad"></Dropdown>
					</div>

					<div class="field">
							<label for="division">División</label>
							<Dropdown id="division" v-model="grade.division" :options="divisions" optionLabel="name" optionValue="id"
							placeholder="Selecciona una división"></Dropdown>
					</div>

					<div class="field">
							<label for="state">Estado</label>
							<Dropdown id="state" v-model="grade.state" :options="states_list" optionLabel="label" optionValue="value"
							placeholder="Selecciona uno"></Dropdown>
					</div>

					<template #footer>
						<Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
						<Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveGrade" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteGradeDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="grade">Está seguro de que desea eliminarlo?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteGradeDialog = false"/>
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteGrade" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteGradesDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="grade">Está seguro de que desea eliminar los grados seleccionados?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteGradesDialog = false"/>
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteSelectedGrades" />
					</template>
				</Dialog>
			</div>
		</div>
	</div>

</template>

<script>
import {FilterMatchMode} from 'primevue/api';
import AdminService from '../../service/Secretaria/AdminService';

export default {
	data() {
		return {
			grades: null,
			gradeDialog: false,
			deleteGradeDialog: false,
			deleteGradesDialog: false,
			grade: { name: '', 'state': true, speciality: null, division: null, level: null},
			selectedGrades: null,
			filters: {},
			submitted: false,
			divisions: [],
			levels: [],
			specialities: [],
			states_list: [
				{label: 'Activo', value: true},
				{label: 'Inactivo', value: false},
			],
			showSpecialitiesDropdown: false
		}
	},
	SecretaryService: null,
	created() {
		this.SecretaryService = new AdminService();
		this.initFilters();
	},
	mounted() {

		this.SecretaryService.getLevels().then(response => this.levels = response.data);
		this.SecretaryService.getDivisions().then(response => this.divisions = response.data);
		this.SecretaryService.getSpecialities().then(response => this.specialities = response.data);

		// if(!this.$store.state.isAuthenticated) {
		// 	this.$router.replace({ name: "Login" });
		// }

		this.SecretaryService.getGrades().then(response => this.grades = response.data);
	},
	methods: {
		openNew() {
			this.submitted = false;
			this.gradeDialog = true;
		},
		hideDialog() {
			this.gradeDialog = false;
			this.submitted = false;
		},
		saveGrade() {

			if (!this.grade.name) {
				this.$toast.add({severity:'error', summary: 'Error', detail: 'El nombre es obligatorio', life: 3000});
				return;
			}

			if (!this.grade.level) {
				this.$toast.add({severity:'error', summary: 'Error', detail: 'El nivel es obligatorio', life: 3000});
				return;
			}

			if ( this.grade.division === 0) {
				this.grade.division = null;
			}else if (!this.grade.division){
				this.$toast.add({severity:'error', summary: 'Error', detail: 'El campo división es obligatorio', life: 3000});
				return;
			}

			if (this.showSpecialitiesDropdown && this.grade.speciality === 0) {
				this.grade.speciality = null;
			}else if(!this.grade.speciality){
				this.$toast.add({severity:'error', summary: 'Error', detail: 'La modalidad es obligatoria', life: 3000});
				return;
			}

			this.submitted = true;
			if (this.grade.name.trim()) {
				if (this.grade.id) {
					this.grade.state = this.grade.state.value ? this.grade.state.value: this.grade.state;
					this.grades[this.findIndexById(this.grade.id)] = this.grade;

					this.SecretaryService.updateGrade(this.grade.id, this.grade).then(data => {
						if(data.status === 200){
							this.SecretaryService.getGrades().then(response => this.grades = response.data);
							this.$toast.add({severity:'success', summary: 'Exito', detail: 'Grado actualizado!', life: 3000});
						}
						if(data.status === 400){
							this.$toast.add({severity:'error', summary: 'Hubo un error', detail: 'Intente nuevamente...', life: 3000});
						}
					});

				}
				else {
					this.SecretaryService.newGrade(this.grade).then(data => {
						if(data.status === 201){
							this.SecretaryService.getGrades().then(response => {
								if(response.status === 200){
									this.grades = response.data;
									this.$toast.add({severity:'success', summary: 'Exito', detail: 'Año creado correctamente!', life: 5000});
								}
							})
						}
					});
				}
				this.gradeDialog = false;
				this.grade = {};
			}
		},
		editGrade(grade) {
			this.grade = {...grade};

			if (grade.level)
				{const level = this.levels.find(level => level.name === grade.level);
				this.grade.level = level.id

				if (grade.level === 'Secundaria'){ 
					this.showSpecialitiesDropdown = true;
				}
			}

			if(grade.division){
				const division = this.divisions.find(division => division.name === grade.division);
				this.grade.division = division.id
			}else{
				this.grade.division = 0
			}

			if (grade.speciality){
				const speciality = this.specialities.find(speciality => speciality.name === grade.speciality);
				this.grade.speciality = speciality.id
			}
			this.gradeDialog = true;
		},
		confirmDeleteGrade(grade) {
			this.grade = grade;
			this.deleteGradeDialog = true;
		},
		deleteGrade() {
			this.SecretaryService.deleteGrade(this.grade.id).then(data => {
				if(data.status === 204){
				this.SecretaryService.getGrades().then(response => this.grades = response.data);
				this.$toast.add({severity:'success', summary: 'Exito', detail: 'Grado eliminado', life: 5000});
				}
			});

			this.deleteGradeDialog = false;
			this.grade = {};
		},
		findIndexById(id) {
			let index = -1;
			for (let i = 0; i < this.grades.length; i++) {
				if (this.grades[i].id === id) {
					index = i;
					break;
				}
			}
			return index;
		},
		exportCSV() {
			//this.$refs.dt.exportCSV();
		},
		confirmDeleteSelected() {
			this.deleteGradesDialog = true;
		},
		deleteSelectedGrades() {

			const gradeList = [];
			this.selectedGrades.forEach(grade => {
				gradeList.push(grade.id)
			});

			this.SecretaryService.deleteMultipleGrades(gradeList).then(data => {
				if(data.status === 204){
					this.SecretaryService.getGrades().then(response => this.grades = response.data);
					this.$toast.add({severity:'success', summary: 'Exito', detail: 'Los grados fueron eliminados correctamente', life: 4000});
					this.deleteGradesDialog = false;
					this.selectedGrades = null;
				}
				else{
					this.$toast.add({severity:'error', summary: 'Error', detail: data, life: 4000});
				}
			});
		},
		initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }
        },
		showDivision(levelId) {
			const selectedLevel = this.levels.find(level => level.id === levelId);

			if (selectedLevel.name == 'Secundaria'){
				this.showSpecialitiesDropdown = true;
			} else {
				this.showSpecialitiesDropdown = false;
			}
		}
	}
}
</script>

<style scoped lang="scss">
@import '../../assets/demo/badges.scss';
</style>
