<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<Toast/>
				<Toolbar class="mb-4">
					<template v-slot:start>
						<div class="my-2">
							<Button label="Agregar Modalidad" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
							<Button label="Eliminar" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedSpecialities || !selectedSpecialities.length" />
						</div>
					</template>

					<template v-slot:end>
						<Button label="Exportar" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template>
				</Toolbar>

				<DataTable ref="dt" :value="specialities" v-model:selection="selectedSpecialities" dataKey="id" :paginator="true" :rows="10" :filters="filters"
							paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
							currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} modalidades" responsiveLayout="scroll">
					<template #header>
						<div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
							<h5 class="m-0">Administrar Modalidades</h5>
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
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editSpeciality(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2" @click="confirmDeleteSpeciality(slotProps.data)" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="specialityDialog" :style="{width: '450px'}" header="Detalles de la modalidad" :modal="true" class="p-fluid">
					<!-- <img :src="'images/speciality/' + speciality.image" :alt="speciality.image" v-if="speciality.image" width="150" class="mt-0 mx-auto mb-5 block shadow-2" /> -->
					<div class="field">
						<label for="name">Nombre</label>
						<InputText id="name" v-model.trim="speciality.name" required="true" autofocus 
							:class="{'p-invalid': submitted && !speciality.name}" 
							@keydown.enter="saveSpeciality" />
						<small class="p-invalid" v-if="submitted && !speciality.name">El nombre es obligatorio.</small>
					</div>

					<div class="field">
							<label for="state">Estado</label>
							<Dropdown id="state" v-model="speciality.state" :options="states_list" optionLabel="label" optionValue="value"
							placeholder="Selecciona uno"></Dropdown>
					</div>

					<template #footer>
						<Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
						<Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveSpeciality" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteSpecialityDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="speciality">Está seguro de que desea eliminarlo?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteSpecialityDialog = false"/>
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteSpeciality" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteSpecialitiesDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="speciality">Está seguro de que desea eliminar las modalidades seleccionadas?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteSpecialitiesDialog = false"/>
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteSelectedSpecialities" />
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
			specialities: null,
			specialityDialog: false,
			deleteSpecialityDialog: false,
			deleteSpecialitiesDialog: false,
			speciality: { 'name': '', 'state': true},
			selectedSpecialities: null,
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

		// if(!this.$store.state.isAuthenticated) {
		// 	this.$router.replace({ name: "Login" });
		// }

		this.AdminService.getSpecialities().then(response => this.specialities = response.data);

	},
	methods: {
		openNew() {
			this.submitted = false;
			this.specialityDialog = true;
		},
		hideDialog() {
			this.specialityDialog = false;
			this.submitted = false;
		},
		saveSpeciality() {
			this.submitted = true;
			if (this.speciality.name.trim()) {
				if (this.speciality.id) {
					this.speciality.state = this.speciality.state.value ? this.speciality.state.value: this.speciality.state;
					this.specialities[this.findIndexById(this.speciality.id)] = this.speciality;

					this.AdminService.updateSpeciality(this.speciality.id, this.speciality).then(data => {
						if(data.status === 200){
							this.AdminService.getSpecialities().then(response => this.specialities = response.data);
							this.$toast.add({severity:'success', summary: 'Exitoso', detail: 'Modalidad actualizada correctamente', life: 3000});
						}
						if(data.status === 400){
							this.$toast.add({severity:'error', summary: 'Hubo un error', detail: 'Intente nuevamente...', life: 3000});
						}
					});
				}
				else {
					//this.speciality.state = this.speciality.state ? this.speciality.state.value : 'Activo';
					this.specialities.push(this.speciality);

					this.AdminService.newSpeciality(this.speciality).then(data => {
						if(data.status === 201){
							this.AdminService.getSpecialities().then(response => {
								if(response.status === 200){
									this.specialities = response.data;
									this.$toast.add({severity:'success', summary: 'Exito', detail: 'Modalidad creada correctamente!', life: 5000});
								}
							})
						}
					});
				}
				this.specialityDialog = false;
				this.speciality = {};
			}
		},
		editSpeciality(speciality) {
			this.speciality = {...speciality};
			this.specialityDialog = true;
		},
		confirmDeleteSpeciality(speciality) {
			this.speciality = speciality;
			this.deleteSpecialityDialog = true;
		},
		deleteSpeciality() {

			this.AdminService.deleteSpeciality(this.speciality.id).then(data => {
				if(data.status === 204){
				this.AdminService.getSpecialities().then(response => this.specialities = response.data);
				this.$toast.add({severity:'success', summary: 'Exito', detail: 'Modalidad eliminada con exito', life: 5000});
				}
			});

			this.deleteSpecialityDialog = false;
			this.speciality = {};

		},
		findIndexById(id) {
			let index = -1;
			for (let i = 0; i < this.specialities.length; i++) {
				if (this.specialities[i].id === id) {
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
			this.deleteSpecialitiesDialog = true;
		},
		deleteSelectedSpecialities() {

			const specialityList = [];
			this.selectedSpecialities.forEach(speciality => {
				specialityList.push(speciality.id)
			});

			this.AdminService.deleteMultipleSpecialities(specialityList).then(data => {
				if(data.status === 204){
					this.AdminService.getSpecialities().then(response => this.specialities = response.data);
					this.$toast.add({severity:'success', summary: 'Exito', detail: 'Las modalidades fueron eliminadas correctamente', life: 4000});
					this.deleteSpecialitiesDialog = false;
					this.selectedSpecialities = null;
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
        }
	}
}
</script>

<style scoped lang="scss">
@import '../../assets/demo/badges.scss';
</style>
