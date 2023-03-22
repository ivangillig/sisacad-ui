<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<Toast/>
				<Toolbar class="mb-4">
					<template v-slot:start>
						<div class="my-2">
							<Button label="Agregar Nivel" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
							<Button label="Eliminar" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedLevels || !selectedLevels.length" />
						</div>
					</template>

					<template v-slot:end>
						<Button label="Exportar" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template>
				</Toolbar>

				<DataTable ref="dt" :value="levels" v-model:selection="selectedLevels" dataKey="id" :paginator="true" :rows="10" :filters="filters"
							paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
							currentPageReportTemplate="Showing {first} to {last} of {totalRecords} levels" responsiveLayout="scroll">
					<template #header>
						<div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
							<h5 class="m-0">Administrar Niveles</h5>
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
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editLevel(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2" @click="confirmDeleteLevel(slotProps.data)" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="levelDialog" :style="{width: '450px'}" header="Detalles del level" :modal="true" class="p-fluid">
					<!-- <img :src="'images/level/' + level.image" :alt="level.image" v-if="level.image" width="150" class="mt-0 mx-auto mb-5 block shadow-2" /> -->
					<div class="field">
						<label for="name">Nombre</label>
						<InputText id="name" v-model.trim="level.name" required="true" autofocus 
							:class="{'p-invalid': submitted && !level.name}" 
							@keydown.enter="saveLevel" />
						<small class="p-invalid" v-if="submitted && !level.name">El nombre es obligatorio.</small>
					</div>

					<div class="field">
							<label for="state">Estado</label>
							<Dropdown id="state" v-model="level.state" :options="states_list" optionLabel="label" optionValue="value"
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
						<span v-if="level">Está seguro de que desea eliminarlo?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteLevelDialog = false"/>
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteLevel" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteLevelsDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="level">Está seguro de que desea eliminar los leveles seleccionados?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteLevelsDialog = false"/>
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteSelectedLevels" />
					</template>
				</Dialog>
			</div>
		</div>
	</div>

</template>

<script>
import {FilterMatchMode} from 'primevue/api';
import AdminService from '../../service/AdminService';

export default {
	data() {
		return {
			levels: null,
			levelDialog: false,
			deleteLevelDialog: false,
			deleteLevelsDialog: false,
			level: { 'name': '', 'state': true},
			selectedLevels: null,
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

		this.AdminService.getLevels().then(response => this.levels = response.data);

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
			if (this.level.name.trim()) {
				if (this.level.id) {
					this.level.state = this.level.state.value ? this.level.state.value: this.level.state;
					this.levels[this.findIndexById(this.level.id)] = this.level;

					this.AdminService.updateLevel(this.level.id, this.level).then(data => {
						if(data.status === 200){
							this.AdminService.getLeveles().then(data => this.levels = data);
							this.$toast.add({severity:'success', summary: 'Exitoso', detail: 'Level actualizada!', life: 3000});
						}
						if(data.status === 400){
							this.$toast.add({severity:'error', summary: 'Hubo un error', detail: 'Intente nuevamente...', life: 3000});
						}
					});
			
				}
				else {
					//this.level.state = this.level.state ? this.level.state.value : 'Activo';
					this.levels.push(this.level);

					this.AdminService.newLevel(this.level).then(data => {
						if(data.status === 201){
							this.AdminService.getLevels().then(response => {
								if(response.status === 200){
									this.levels = response.data;
									this.$toast.add({severity:'success', summary: 'Exito', detail: 'Level creada correctamente!', life: 5000});
								}
							})
						}
					});
				
				
				//this.administracionApi.getLeveles().then(data => this.levels = data);
				}
				this.levelDialog = false;
				this.level = {};
			}
		},
		editLevel(level) {
			this.level = {...level};
			this.levelDialog = true;
		},
		confirmDeleteLevel(level) {
			this.level = level;
			this.deleteLevelDialog = true;
		},
		deleteLevel() {

			this.AdminService.deleteLevel(this.level.id).then(data => {
				if(data.status === 204){
				this.AdminService.getLevels().then(response => this.levels = response.data);
				this.$toast.add({severity:'success', summary: 'Exito', detail: 'Level Eliminado', life: 5000});
				}
			});
			
			this.deleteLevelDialog = false;
			this.level = {};

		},
		findIndexById(id) {
			let index = -1;
			for (let i = 0; i < this.levels.length; i++) {
				if (this.levels[i].id === id) {
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
			this.deleteLevelsDialog = true;
		},
		deleteSelectedLevels() {

			const levelList = [];
			this.selectedLevels.forEach(level => {
				levelList.push(level.id)
			});

			this.AdminService.deleteMultipleLevels(levelList).then(data => {
				if(data.status === 204){
					this.AdminService.getLevels().then(response => this.levels = response.data);
					this.$toast.add({severity:'success', summary: 'Exito', detail: 'Los niveles fueron eliminados correctamente', life: 4000});
					this.deleteLevelsDialog = false;
					this.selectedLevels = null;
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
