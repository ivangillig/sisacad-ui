<!-- eslint-disable no-mixed-spaces-and-tabs -->
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
							currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} cursos" responsiveLayout="scroll">
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
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2" @click="confirmDeleteLevel(slotProps.data)" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="levelDialog" :style="{width: '450px'}" header="Nuevo curso lectivo" :modal="true" class="p-fluid">
					<!-- <img :src="'images/course/' + course.image" :alt="course.image" v-if="course.image" width="150" class="mt-0 mx-auto mb-5 block shadow-2" /> -->
					<div class="field">
						<label for="name">Grado</label>
						<Dropdown class="w-full" v-model="selectedGrade" :options="grades" optionLabel="largeName" :class="{'p-invalid': submitted && !selectedGrade}"
							placeholder="Seleccione un grado" />
							<small class="p-invalid" v-if="submitted && !selectedGrade">El grado es obligatorio.</small>
					</div>

					<div class="field">
                        <label for="year">Año</label>
						<Calendar v-model="courseYear" view="year" :minDate="minDate" :maxDate="maxDate" dateFormat="yy" required="true" autofocus
							:class="{'p-invalid': submitted && !courseYear}"
							@keydown.enter="saveGrade" />
							<small class="p-invalid" v-if="submitted && !courseYear">El año es obligatorio.</small>
                    </div>

					<div class="field">
							<label for="shift">Turno</label>
							<Dropdown id="shift" v-model="courseShift" :options="shift_list" optionLabel="label" optionValue="value"
							placeholder="Selecciona una" :class="{'p-invalid': submitted && !courseShift}" />
							<small class="p-invalid" v-if="submitted && !courseShift">El turno es obligatorio.</small>
					</div>

					<template #footer>
						<Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
						<Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveGrade" />
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
import { mapState, mapActions } from 'vuex';
import dayjs from 'dayjs';

export default {
	data() {
		return {
			levelDialog: false,
			deleteLevelDialog: false,
			courseYear: null,
			selectedGrade: null,
			courseShift: null,
			filters: {},
			submitted: false,
			shift_list: [
				{label: 'Mañana', value: 'Mañana'},
				{label: 'Tarde', value: 'Tarde'},
				{label: 'Noche', value: 'Noche'},
			]
		}
	},
	AdminService: null,
	created() {
		this.AdminService = new AdminService();
		this.initFilters();

        this.minDate = dayjs('2022-01-01').toDate();
        this.maxDate = dayjs('2024-01-01').toDate();
	},
	mounted() {
		this.getCourses();
		this.getGrades();
	},
    computed: {
        ...mapState('grade', ['grades']),
        ...mapState('course', ['courses']),
    },
	methods: {
        ...mapActions({
			getCourses: 'course/getCourses',
			getGrades: 'grade/getGrades'
		}),
		openNew() {
			this.submitted = false;
			this.levelDialog = true;
		},
		hideDialog() {
			this.levelDialog = false;
			this.submitted = false;
		},
		async saveGrade() {
			this.submitted = true;

			if (this.selectedGrade && this.courseYear && this.courseShift) {
					const courseData = {
						grade: this.selectedGrade.id,
						academic_year: this.courseYear.getFullYear(),
						shift: this.courseShift
				};

            try {
                const response = await this.AdminService.newCourse(courseData);
                if(response.status === 201){
                    this.$toast.add({severity:'success', summary: 'Exito', detail: response.data.message, life: 5000});
                    this.getCourses();
					this.levelDialog = false;
				}
                this.selectedStudent = null;
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.response.data.error, life: 5000});
            }
			this.course = {};
			}
		},
		confirmDeleteLevel(course) {
			this.course = course;
			this.deleteLevelDialog = true;
		},
		deleteLevel() {

			this.AdminService.deleteCourse(this.course.id).then(data => {
				if(data.status === 204){
				this.AdminService.getLevels().then(response => this.courses = response.data);
				this.$toast.add({severity:'info', summary: 'Exito', detail: 'Curso Eliminado', life: 5000});
				this.getCourses();
				this.deleteLevelDialog = false;
				}
			});

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
		initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }
        }
    },
		watch: {
        selectedGrade(newGrade) {
            if(newGrade) {
                this.selectedGrade = newGrade;
            } else {
                this.selectedGrade = null;
            }
        },
    },
}
</script>

<style scoped lang="scss">
@import '../../assets/demo/badges.scss';
</style>
