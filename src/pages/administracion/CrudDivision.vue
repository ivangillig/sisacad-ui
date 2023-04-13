<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<Toast/>
				<Toolbar class="mb-4">
					<template v-slot:start>
						<div class="my-2">
							<Button label="Agregar División" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
							<Button label="Eliminar" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedDivisions || !selectedDivisions.length" />
						</div>
					</template>

					<template v-slot:end>
						<Button label="Exportar" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template>
				</Toolbar>

				<DataTable ref="dt" :value="divisions" v-model:selection="selectedDivisions" dataKey="id" :paginator="true" :rows="10" :filters="filters"
							paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
							currentPageReportTemplate="Showing {first} to {last} of {totalRecords} divisions" responsiveLayout="scroll">
					<template #header>
						<div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
							<h5 class="m-0">Administrar Divisiónes</h5>
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
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editDivision(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2" @click="confirmDeleteDivision(slotProps.data)" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="divisionDialog" :style="{width: '450px'}" header="Detalles del division" :modal="true" class="p-fluid">
					<!-- <img :src="'images/division/' + division.image" :alt="division.image" v-if="division.image" width="150" class="mt-0 mx-auto mb-5 block shadow-2" /> -->
					<div class="field">
						<label for="name">Nombre</label>
						<InputText id="name" v-model.trim="division.name" required="true" autofocus 
							:class="{'p-invalid': submitted && !division.name}" 
							@keydown.enter="saveDivision" />
						<small class="p-invalid" v-if="submitted && !division.name">El nombre es obligatorio.</small>
					</div>

					<div class="field">
							<label for="state">Estado</label>
							<Dropdown id="state" v-model="division.state" :options="states_list" optionLabel="label" optionValue="value"
							placeholder="Selecciona una"></Dropdown>
					</div>
					
					<template #footer>
						<Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
						<Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveDivision" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteDivisionDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="division">Está seguro de que desea eliminarlo?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteDivisionDialog = false"/>
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteDivision" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteDivisionsDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="division">Está seguro de que desea eliminar los divisiones seleccionados?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteDivisionsDialog = false"/>
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteSelectedDivisions" />
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
			divisions: null,
			divisionDialog: false,
			deleteDivisionDialog: false,
			deleteDivisionsDialog: false,
			division: { 'name': '', 'state': true},
			selectedDivisions: null,
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

		this.AdminService.getDivisions().then(response => this.divisions = response.data);

	},
	methods: {
		openNew() {
			//this.division = {};
			this.submitted = false;
			this.divisionDialog = true;
		},
		hideDialog() {
			this.divisionDialog = false;
			this.submitted = false;
		},
		saveDivision() {
			this.submitted = true;
			if (this.division.name.trim()) {
				if (this.division.id) {
					this.division.state = this.division.state.value ? this.division.state.value: this.division.state;
					this.divisions[this.findIndexById(this.division.id)] = this.division;

					this.AdminService.updateDivision(this.division.id, this.division).then(data => {
						if(data.status === 200){
							this.AdminService.getDivisions().then(response => this.divisions = response.data);
							this.$toast.add({severity:'success', summary: 'Exitoso', detail: 'Division actualizada!', life: 3000});
						}
						if(data.status === 400){
							this.$toast.add({severity:'error', summary: 'Hubo un error', detail: 'Intente nuevamente...', life: 3000});
						}
					});
			
				}
				else {
					//this.division.state = this.division.state ? this.division.state.value : 'Activo';
					this.divisions.push(this.division);

					this.AdminService.newDivision(this.division).then(data => {
					if(data.status === 201){
						this.AdminService.getDivisions().then(response => this.divisions = response.data);
						this.$toast.add({severity:'success', summary: 'Exito', detail: 'Division creada correctamente!', life: 5000});
					}});
				
				
				//this.administracionApi.getDivisiones().then(data => this.divisions = data);
				}
				this.divisionDialog = false;
				this.division = {};
			}
		},
		editDivision(division) {
			this.division = {...division};
			this.divisionDialog = true;
		},
		confirmDeleteDivision(division) {
			this.division = division;
			this.deleteDivisionDialog = true;
		},
		deleteDivision() {

			this.AdminService.deleteDivision(this.division.id).then(data => {
				if(data.status === 204){

				this.AdminService.getDivisions().then(response => this.divisions = response.data);
				this.$toast.add({severity:'success', summary: 'Exito', detail: 'Division Eliminado', life: 5000});
				}
			});
			
			this.deleteDivisionDialog = false;
			this.division = {};

		},
		findIndexById(id) {
			let index = -1;
			for (let i = 0; i < this.divisions.length; i++) {
				if (this.divisions[i].id === id) {
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
			this.deleteDivisionsDialog = true;
		},
		deleteSelectedDivisions() {

			const divisionList = [];
			this.selectedDivisions.forEach(division => {
				divisionList.push(division.id)
			});

			this.AdminService.deleteMultipleDivisions(divisionList).then(data => {
				if(data.status === 204){
					this.AdminService.getDivisions().then(response => this.divisions = response.data);
					this.$toast.add({severity:'success', summary: 'Exito', detail: 'Las divisiones fueron eliminadas correctamente', life: 4000});
					this.deleteDivisionsDialog = false;
					this.selectedDivisions = null;
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
