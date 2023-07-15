<template>
    <div class="grid">
        <div class="card col-12 md:col-8 flex flex-col md:flex-row md:items-center">
            <div class="mr-4">
                <h5>Curso lectivo</h5>
                <Dropdown class="w-full" v-model="selectedCourse" :options="courses" optionLabel="name"
                    placeholder="Select a course" />
            </div>
            <div class="mr-4 mt-4 md:mt-0">
                <h5>Alumno</h5>
                <div class="filter-container">
                    <AutoComplete class="mr-4" placeholder="Search" id="dd" :dropdown="true" :multiple="false"
                        v-model="selectedStudent" :suggestions="autoFilteredValue" @complete="searchStudent($event)"
                        @select="onSelectStudent($event)" field="name" />
                    <Button label="Agregar alumno al curso" @click="nextPage()" icon="pi pi-angle-right" icon-pos="right" />
                </div>
            </div>
        </div>
    </div>

    <div class="col-12">
        <div class="card">
            <h5>Alumnos en el curso</h5>
            <DataTable :value="studentsByGrade" :rows="5" :paginator="true" responsiveLayout="scroll">
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

import adminService from './../../service/Secretaria/AdminService';
import CourseStudentService from '../../service/Secretaria/CurseByYear';
import { mapState } from 'vuex';

export default {
    created(){
        this.adminService = new adminService();
        this.courseStudentService = new CourseStudentService();
    },
    data() {
        return {
            selectedCourse: null,
            selectedStudent: null,
            courses: [],
            students: [],
            autoFilteredValue: [],
        };
    },
    mounted() {
        this.adminService.getStudents()
        .then(response => {
            this.students = response.map(student => ({
                id: student.id,
                name: `${student.first_name} ${student.first_lastname}`,
            }
            ));
        })
        .catch(error => {
            console.error('Error al obtener los estudiantes:', error);
        });

        this.adminService.getCourses()
            .then(response => {
                this.courses = response.data.map(course => ({
                    id: course.id,
                    name: `${course.grade.name} ${course.grade.division} ${course.grade.speciality}`,
                }));
            })
            .catch(error => {
                console.error('Error al obtener los cursos:', error);
            });

    },
    methods: {
        searchCourse(event) {
            console.log(event)
        },
        searchStudent(event) {
            let query = event.query; // get the text that users input in AutoComplete

            // filter students by entered text
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
                    student: this.selectedStudent,
                    add_date: new Date().toISOString().slice(0, 10),
            };

            try {
               
                const response = await this.courseStudentService.createCourseStudent(courseStudentData);
                console.log('ID del course_students creado:', response.data.id);

                // Aquí puedes realizar acciones adicionales después de crear el course_student

                // Limpiar los campos seleccionados
                this.selectedCourse = null;
                this.selectedStudent = null;
                this.autoFilteredValue = [];
            } catch (error) {
                console.error('Error al crear el course_students:', error);
            }
            }
        },
    },
    watch: {
        selectedCourse(newCourse) {
            if(newCourse) {
                this.$store.dispatch('loadStudentsForCourse', newCourse.id);
            } else {
                this.$store.commit('setStudentsByGrade', []);
            }
        },
        state(newStudents) {
            console.log('Nuevo estado de studentsByGrade:', newStudents);
        },
    },
    computed: {
        ...mapState({
            studentsByGrade: state => state.student.studentsByGrade
        }),
    },
};
</script>