<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<Toast/>
				<Toolbar class="mb-4">
					<template v-slot:start>
						<div class="my-2">
							<Button label="Agregar Alumno" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
							<Button label="Eliminar" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedStudents || !selectedStudents.length" />
						</div>
					</template>

					<template v-slot:end>
						<Button label="Exportar" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template>
				</Toolbar>

				<DataTable ref="dt" :value="students" v-model:selection="selectedStudents" dataKey="id" :paginator="true" :rows="10" :filters="filters"
							paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
							currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} estudiantes" responsiveLayout="scroll">
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
							<span class="p-column-title">doc_number</span>
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
							{{ getGenderLabel(slotProps.data.gender) }}
						</template>
					</Column>

					<Column field="birthday" header="Fecha de nacimiento" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">birthday</span>
							{{slotProps.data.birthday}}
						</template>
					</Column>

					<Column headerStyle="min-width:10rem;">
						<template #body="slotProps">
							<Button icon="pi pi-pencil" v-tooltip.top="'Editar alumno'" class="p-button-rounded p-button-success mr-2" @click="editStudent(slotProps.data)" />
							<Button icon="pi pi-trash" v-tooltip.top="'Eliminar alumno'" class="p-button-rounded p-button-warning mt-2 mr-2" @click="confirmDeleteStudent(slotProps.data)" />
							<Button icon="pi pi-file-pdf" v-tooltip.top="'Certicado de alumno regular'" class="p-button-rounded p-button-info mt-2" @click="newRegularStudentCertificate(slotProps.data)" />
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
				</Dialog>

				<Dialog v-model:visible="regularStudentDialog" :style="{width: '450px'}" header="Certificado de alumno regular" :modal="true" class="p-fluid">
					<div class="field">
						<label for="name">Nombre completo</label>
						<InputText class="w-full" :value="fullName" disabled />
					</div>

					<div class="field">
						<label for="doc_number">Nro de documento</label>
						<InputText class="w-full" v-model="student.doc_number" disabled />
					</div>

					<div class="field">
						<label for="name">Curso actual</label>
						<InputText class="w-full" :value="currentCourseDescription" disabled />
					</div>

					<template #footer>
						<Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
						<Button label="Generar" icon="pi pi-check" class="p-button-text" @click="newCertificate(student.id)" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteStudentDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="student">Está seguro de que desea eliminarlo?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteStudentDialog = false"/>
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteStudent" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteStudentsDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="student">Está seguro de que desea eliminar los alumnos seleccionados?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteStudentsDialog = false"/>
						<Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteSelectedStudents" />
					</template>
				</Dialog>
			</div>
		</div>
	</div>

</template>

<script>
import {FilterMatchMode} from 'primevue/api';
import studentsApi from '../../service/Secretaria/AdminService';
import { GENDER_OPTIONS } from '../../service/Constants/Utils';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
	data() {
		return {
			students: null,
			studentDialog: false,
			regularStudentDialog: false,
			deleteStudentDialog: false,
			deleteStudentsDialog: false,
			selectedStudents: null,
			filters: {},
			submitted: false,
			statuses: [
				{label: 'Activo', value: 'Activo'},
				{label: 'Inactivo', value: 'Inactivo'},
			],
			genderOptions: GENDER_OPTIONS,
		}
	},
	studentsApi: null,
	created() {
		this.studentsApi = new studentsApi();
		this.initFilters();
	},
	mounted() {
		this.$store.commit('student/clearStudent')
		if(!this.$store.state.auth.isAuthenticated) {
			this.$router.replace({ name: "Login" });
		}

		this.studentsApi.getStudents().then(data => this.students = data);
	},
    computed: {
        ...mapState('student', ['student', 'currentCourse']),
		...mapGetters('student', ['fullName', 'currentCourseDescription'])
    },
	methods: {
        ...mapActions({
			setStudentData: 'student/setStudentData',
			getCurrentCourseByStudent: 'student/getCurrentCourseByStudent'
		}),
		getGenderLabel(genderValue) {
			let gender = this.genderOptions.find(g => g.value === genderValue.toString());
			return gender ? gender.label : 'Desconocido';
		},
		openNew() {
			this.$router.replace({ path: "/alumnos/formulario" });
		},
		newRegularStudentCertificate(student) {
			this.setStudentData(student);

			if(student && student.id){
				this.getCurrentCourseByStudent(student.id);
			}
			this.regularStudentDialog = true;
		},
		newCertificate() {
			if (this.student && this.currentCourse){
				console.log('creando certificado')
			}
		},
		hideDialog() {
			this.studentDialog = false;
			this.submitted = false;
		},
		editStudent(student) {
			this.setStudentData(student);
			this.$router.replace({ path: '/alumnos/formulario'});
		},
		confirmDeleteStudent(student) {
			this.student = student;
			this.deleteStudentDialog = true;
		},
		deleteStudent() {
			this.studentsApi.deleteStudent(this.student.id).then(data => {
				if(data.status === 204){
					this.studentsApi.getStudents().then(data => this.students = data);
					this.$toast.add({severity:'success', summary: 'Exito', detail: 'Alumno eliminado', life: 5000});
				}
			});

			this.deleteStudentDialog = false;
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
		exportCSV() {
			this.$refs.dt.exportCSV();
		},
		confirmDeleteSelected() {
			this.deleteStudentsDialog = true;
		},
		deleteSelectedStudents() {
			const studentsList = [];
			this.selectedStudents.forEach(student => {
				studentsList.push(student.id)
			});

			this.studentsApi.deleteMultipleStudents(studentsList).then(data => {
				if(data.status === 204){
					this.studentsApi.getStudents().then(response => this.students = response.data);
					this.$toast.add({severity:'success', summary: 'Exito', detail: 'Los alumnos fueron eliminadas correctamente', life: 4000});
					this.deleteStudentsDialog = false;
					this.selectedStudents = null;
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
