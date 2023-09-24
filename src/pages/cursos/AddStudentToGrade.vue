<template>
    <Toast/>
    <div class="col-12">
        <div class="card col-12 md:col-8 flex flex-col md:flex-row md:items-center">
            <div class="mr-4">
                <h5>Año lectivo</h5>
                <Calendar v-model="courseYear" view="year" placeholder="Seleccione un año" :minDate="minDate" :maxDate="maxDate" dateFormat="yy" required="true" autofocus />
            </div>
            <div class="mr-4">
                <h5>Cursos </h5>
                <Dropdown class="w-full" v-model="selectedCourse" :disabled="!courseYear" :options="courses" optionLabel="name"
                    placeholder="Seleccione un curso" emptyMessage="No hay cursos para este año"/>
            </div>
            <div class="mr-4 mt-4 md:mt-0">
                <h5>Alumno</h5>
                <div class="filter-container">
                    <AutoComplete class="mr-4" placeholder="Buscar" id="dd" :disabled="!selectedCourse" :dropdown="true" :multiple="false"
                        v-model="selectedStudent" :suggestions="autoFilteredValue" @complete="searchStudent($event)"
                        @select="onSelectStudent($event)" field="name" />
                    <Button label="Agregar alumno al curso" @click="nextPage()" icon="pi pi-angle-right" icon-pos="right" />
                </div>
            </div>
        </div>
    </div>

    <div class="col-12">
        <div class="card">
            <h5>Alumnos en el curso{{ selectedCourse ? ': ' + selectedCourse.name : '' }}</h5>
            <DataTable :value="studentsByCourse" :rows="5" :paginator="true" responsiveLayout="scroll">
                <Column field="document" header="Documento" :sortable="true" style="width: 35%"></Column>
                <Column field="name" header="Nombre" :sortable="true" style="width: 35%"></Column>
                <Column field="created_at" header="Fecha de alta" :sortable="true" style="width: 35%"></Column>
                <Column style="width: 15%">
                    <template #header>View</template>
                    <template #body>
                        <Button icon="pi pi-search" type="button" class="p-button-text"></Button>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>


<script>

import CourseStudentService from '../../service/Secretaria/CurseByYear';
import { mapState, mapActions } from 'vuex';
import dayjs from 'dayjs';

export default {
    created(){
        this.courseStudentService = new CourseStudentService();
        this.actualYear = new Date().getFullYear();
        //this.courseYear = new Date();
        //this.$store.dispatch('course/getCourses', dayjs(this.courseYear).format('YYYY-01-01'));
    },
    data() {
        return {
			courseYear: null,
            actualYear: null,
            selectedCourse: null,
            selectedStudent: null,
            autoFilteredValue: [],
        };
    },
    mounted() {
        this.getStudents();
        this.getCourses();
    },
    methods: {
        ...mapActions('student', ['getStudents']),
        ...mapActions('course', ['getCourses', 'loadStudentsForCourse']),
        searchStudent(event) {
            let query = event.query;

            this.autoFilteredValue = this.students.filter(student =>
                student.name.toLowerCase().includes(query.toLowerCase())
            );
        },
        onSelectStudent(student) {
            this.selectedStudent = student.id;
        },
        async nextPage() {
            if (this.selectedCourse && this.selectedStudent) {
                const courseStudentData = {
                    course: this.selectedCourse.id,
                    student: this.selectedStudent.id,
                    add_date: new Date().toISOString().slice(0, 10),
            };

            try {
                const response = await this.courseStudentService.createCourseStudent(courseStudentData);
                if(response.status === 201){
                    this.$toast.add({severity:'success', summary: 'Exito', detail: response.data.message, life: 5000});
                    this.loadStudentsForCourse(this.selectedCourse.id);
				}
                this.selectedStudent = null;
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.response.data.message, life: 5000});
            }
            }
        },
    },
    watch: {
        courseYear(newYear) {
            if (newYear) {
                const formattedYear = dayjs(newYear).format('YYYY-01-01');
                this.$store.dispatch('course/getCourses', formattedYear);
            }
        },
        selectedCourse(course) {
            if(course) {
                this.loadStudentsForCourse(course.id);
            } else {
                this.$store.commit('setStudentsByCourse', []);
            }
        },
    },
    computed: {
        ...mapState('student', ['students']),
        ...mapState('course', ['courses', 'studentsByCourse']),
    },
};
</script>