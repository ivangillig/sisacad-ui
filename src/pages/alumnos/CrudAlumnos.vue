<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<Toast/>
				<Toolbar class="mb-4">
					<template v-slot:start>
						<div class="my-2">
							<Button label="Agregar Alumno" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
							<Button label="Eliminar" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedstudents || !selectedstudents.length" />
						</div>
					</template>

					<template v-slot:end>
						<Button label="Exportar" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template>
				</Toolbar>

				<DataTable ref="dt" :value="students" v-model:selection="selectedstudents" dataKey="id" :paginator="true" :rows="10" :filters="filters"
							paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
							currentPageReportTemplate="Showing {first} to {last} of {totalRecords} students" responsiveLayout="scroll">
					<template #header>
						<div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
							<h5 class="m-0">Gestionar Alumnos</h5>
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
					<Column field="nombre" header="DNI" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Nombre</span>
							{{slotProps.data.doc_number}}
						</template>
					</Column>

					<Column field="first_name" header="Nombre" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">first_name</span>
							{{slotProps.data.first_name}}
						</template>
					</Column>

					<Column field="first_lastname" header="Apellido" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">first_lastname</span>
							{{slotProps.data.first_lastname}}
						</template>
					</Column>

					<Column field="gender" header="Género" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">gender</span>
							{{slotProps.data.gender}}
						</template>
					</Column>

					<Column field="birthday" header="Fecha de nacimiento" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">birthday</span>
							{{slotProps.data.birthday}}
						</template>
					</Column>

					<!-- <Column field="created_by" header="Creado por" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Creado por</span>
							{{slotProps.data.created_by.nombre1}} 
							{{slotProps.data.created_by.apellido1}}
						</template>
					</Column> -->

					<Column headerStyle="min-width:10rem;">
						<template #body="slotProps">
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editstudent(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2" @click="confirmDeletestudent(slotProps.data)" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="studentDialog" :style="{width: '450px'}" header="Detalles del nivel" :modal="true" class="p-fluid">
					<img :src="'images/student/' + student.image" :alt="student.image" v-if="student.image" width="150" class="mt-0 mx-auto mb-5 block shadow-2" />
					<div class="field">
						<label for="name">Nombre</label>
						<InputText id="name" v-model.trim="student.name" required="true" autofocus :class="{'p-invalid': submitted && !student.name}" />
						<small class="p-invalid" v-if="submitted && !student.name">El nombre es obligatorio.</small>
					</div>

					<div class="field">
						<label for="estado" class="mb-3">Estado</label>
						<Dropdown id="estado" v-model="student.state" :options="statuses" optionLabel="label" placeholder="Seleccione un estado">
							<template #value="slotProps">
								<div v-if="slotProps.value && slotProps.value.value">
									<span :class="'student-badge status-' +slotProps.value.value">{{slotProps.value.label}}</span>
								</div>
								<div v-else-if="slotProps.value && !slotProps.value.value">
									<span :class="'student-badge status-' +slotProps.value.toLowerCase()">{{slotProps.value}}</span>
								</div>
								<span v-else>
									{{slotProps.placeholder}}
								</span>
							</template>
						</Dropdown>
					</div>
					
					<template #footer>
						<Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
						<Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="savestudent" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deletestudentDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="student">Está seguro de que desea eliminarlo?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deletestudentDialog = false"/>
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deletestudent" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deletestudentsDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="student">Está seguro de que desea eliminar los niveles seleccionados?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deletestudentsDialog = false"/>
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteSelectedstudents" />
					</template>
				</Dialog>
			</div>
		</div>
	</div>

</template>

<script>
import {FilterMatchMode} from 'primevue/api';
import studentsApi from '../../service/StudentsApi';

export default {
	data() {
		return {
			students: null,
			studentDialog: false,
			deletestudentDialog: false,
			deletestudentsDialog: false,
			student: {},
			selectedstudents: null,
			filters: {},
			submitted: false,
			statuses: [
				{label: 'Activo', value: 'Activo'},
				{label: 'Inactivo', value: 'Inactivo'},
			]
		}
	},
	studentsApi: null,
	created() {
		this.studentsApi = new studentsApi();
		this.initFilters();
	},
	mounted() {

		if(!this.$store.state.isAuthenticated) {
			this.$router.replace({ name: "Login" });
		}//REVISAR ESTO

		this.studentsApi.getStudents().then(data => this.students = data);

	},
	methods: {
		openNew() {
			this.$router.replace({ path: "/alumnos/nuevoalumno" });
			// this.student = {};
			// this.submitted = false;
			// this.studentDialog = true;
		},
		hideDialog() {
			this.studentDialog = false;
			this.submitted = false;
		},
		savestudent() {
			this.submitted = true;
			if (this.student.name.trim()) {
				if (this.student.id) {
					this.student.state = this.student.state.value ? this.student.state.value: this.student.state;
					this.students[this.findIndexById(this.student.id)] = this.student;

					this.administracionApi.updateNivel(this.student.id, this.student).then(data => {
					console.log(data)
						if(data.status === 200){
							this.administracionApi.getNiveles().then(data => this.students = data);
							this.$toast.add({severity:'success', summary: 'Exitoso', detail: 'Nivel actualizado!', life: 3000});
						}
						if(data.status === 400){
							this.$toast.add({severity:'error', summary: 'Hubo un error', detail: 'Intente nuevamente...', life: 3000});
						}
					});
			
				}
				else {
					this.student.state = this.student.state ? this.student.state.value : 'Activo';
					this.students.push(this.student);

					this.administracionApi.newNivel(this.student).then(data => {
					if(data.status === 201){
						this.administracionApi.getNiveles().then(data => this.students = data);
						this.$toast.add({severity:'success', summary: 'Exito', detail: 'Nivel creado correctamente!', life: 5000});
					}});
				

				
				
				//this.administracionApi.getNiveles().then(data => this.students = data);
				}
				this.studentDialog = false;
				this.student = {};
			}
		},
		editstudent(student) {
			//this.student = {...student};
			//var student1 = JSON.parse(JSON.stringify({...student}))

			this.$store.commit('studentData', {...student})

			this.$router.replace({ path: '/alumnos/nuevoalumno'});

			//this.studentDialog = true;
		},
		confirmDeletestudent(student) {
			this.student = student;
			this.deletestudentDialog = true;
		},
		deletestudent() {

			this.administracionApi.deleteNivel(this.student.id).then(data => {
				if(data.status === 204){

				this.administracionApi.getNiveles().then(data => this.students = data);
				this.$toast.add({severity:'success', summary: 'Exito', detail: 'Nivel Eliminado', life: 5000});
				}
			});
			
			this.deletestudentDialog = false;
			this.student = {};



		},
		findIndexById(id) {
			let index = -1;
			for (let i = 0; i < this.students.length; i++) {
				if (this.students[i].id === id) {
					index = i;
					break;
				}
			}
			return index;
		},
		createId() {
			let id = '';
			var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			for ( var i = 0; i < 5; i++ ) {
				id += chars.charAt(Math.floor(Math.random() * chars.length));
			}
			return id;
		},
		exportCSV() {
			this.$refs.dt.exportCSV();
		},
		confirmDeleteSelected() {
			this.deletestudentsDialog = true;
		},
		deleteSelectedstudents() {
			this.students = this.students.filter(val => !this.selectedstudents.includes(val));
			this.deletestudentsDialog = false;
			this.selectedstudents = null;
			this.$toast.add({severity:'success', summary: 'Successful', detail: 'students Deleted', life: 3000});
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
