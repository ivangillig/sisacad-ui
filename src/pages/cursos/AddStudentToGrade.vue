<template>
    <div class="grid">
            <div class="col-12 md:col-4 xl:col-4">
                <div class="card">
                    <h5>Curso lectivo</h5>
                    <Dropdown v-model="selectedCourse" :options="courses" optionLabel="name" placeholder="Select a course" />
                </div>
                <div class="card">
                <h5>Alumno</h5>
                <AutoComplete
                    placeholder="Search"
                    id="dd"
                    :dropdown="true"
                    :multiple="false"
                    v-model="selectedStudent"
                    :suggestions="autoFilteredValue"
                    @complete="searchStudent($event)"
                    @select="onSelectStudent($event)"
                    field="name"
                />
                </div>
                <div class="grid grid-nogutter justify-content-between">
        <i></i>
        <Button label="Siguiente" @click="nextPage()" icon="pi pi-angle-right" icon-pos="right"></Button>
    </div>
            </div>
        </div>



    <div class="col-12">
        <div class="card">
        <h5>Recent Sales</h5>
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

export default {
    created(){
        this.adminService = new adminService();
    },
    data() {
        return {
            studentsByGrade: [],
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
                    name: `${course.grade.name} ${course.grade.division} ${course.grade.speciality} ${course.academic_year}`,
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
            let query = event.query; // Obtiene el texto que el usuario ha ingresado en el AutoComplete
            // Filtra los estudiantes basado en el texto de búsqueda
            this.autoFilteredValue = this.students.filter(student =>
                student.name.toLowerCase().includes(query.toLowerCase())
            );
        },
        onSelectStudent(student) {
            this.selectedStudent = student.id;
        },
    },
};
</script>