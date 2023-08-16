<template>
    <Toast/>
    <div class="grid">
        <div class="card col-12 md:col-8 flex flex-col md:flex-row md:items-center">
            <div class="mr-4 mt-4 md:mt-0">
                <h5>Alumno</h5>
                <div class="filter-container flex">
                    <AutoComplete class="mr-4 flex-grow" placeholder="Buscar" id="dd" :dropdown="true" :multiple="false"
                        v-model="selectedStudent" :suggestions="autoFilteredValue" @complete="searchStudent($event)"
                        @select="onSelectStudent($event)" field="name" />

                    <Button label="Agregar Curso" icon="pi pi-plus" class="p-button-success mr-2" @click="openNewPayment" />
                </div>
            </div>
        </div>
    </div>

    <Dialog v-model:visible="newPaymentDialog" :style="{width: '450px'}" header="Nuevo pago" :modal="true" class="p-fluid">

                    <div class="field">
                            <label for="paymentType">Tipo de pago</label>
                            <Dropdown id="paymentType" v-model="paymentType" :options="paymentTypeList" optionLabel="label" optionValue="value"
                            placeholder="Selecciona uno" :class="{'p-invalid': submitted && !paymentType}" />
                            <small class="p-invalid" v-if="submitted && !paymentType">El turno es obligatorio.</small>
                    </div>

					<div class="field">
                        <label for="year">Fecha de pago</label>
						<Calendar v-model="paymentDate" view="date" dateFormat="yy-mm-dd" required="true" autofocus
                        :class="{'p-invalid': submitted && !paymentDate}"
                        @keydown.enter="saveGrade" />
                        <small class="p-invalid" v-if="submitted && !paymentDate">La fecha de pago es obligatoria.</small>
                    </div>

                    <div class="field">
						<label for="paymentAmount">Importe</label>

                        <InputNumber id="paymentAmount" v-model="paymentAmount" inputId="currency-germany" mode="currency" currency="USD" locale="de-DE" required="true" autofocus
							:class="{'p-invalid': submitted && !paymentAmount}"
							@keydown.enter="saveLevel" />
						<small class="p-invalid" v-if="submitted && !paymentAmount">El importe es obligatorio.</small>
					</div>

					<template #footer>
						<!-- <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog"/> -->
						<!-- <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveGrade" /> -->
                        <FileUpload mode="basic" name="paymentReceipt" accept="image/*" :maxFileSize="1000000" @uploader="onUpload" chooseLabel="Seleccionar archivo" customUpload />
					</template>
				</Dialog>


    <div class="col-12">
        <div class="card">
            <!-- <h5>Alumnos en el curso{{ selectedCourse ? ': ' + selectedCourse.name : '' }}</h5> -->
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

import adminService from './../../../service/Secretaria/AdminService';
import CourseStudentService from '../../../service/Secretaria/CurseByYear';
import { mapState } from 'vuex';

export default {
    created(){
        this.adminService = new adminService();
        this.courseStudentService = new CourseStudentService();
        this.actualYear = new Date().getFullYear();

    },
    data() {
        return {
			submitted: false,
            newPaymentDialog: false,
			paymentDate: null,
            paymentAmount: null,
            paymentType: null,
            actualYear: null,
            selectedStudent: null,
            students: [],
            autoFilteredValue: [],
            paymentTypeList: [
				{label: 'Pago de cuota', value: '1'},
				{label: 'Pago de matrícula', value: '2'},
			]
        };
    },
    mounted() {
        this.adminService.getStudents()
        .then(response => {
            this.students = response.map(student => ({
                id: student.id,
                name: `${student.first_name} ${student.first_lastname} - ${student.doc_number}`,
            }
            ));
        })
        .catch(error => {
            console.error('Error al obtener los estudiantes:', error);
        });
    },
    methods: {
        openNewPayment() {
			this.submitted = false;
			this.newPaymentDialog = true;
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
        async onUpload(paymentReceipt) {

			this.submitted = true;

            if (this.paymentDate && this.paymentAmount && this.paymentType && paymentReceipt.files) {
                const formData = new FormData();
                formData.append('payment_date', this.paymentDate);
                formData.append('amount', this.paymentAmount);
                formData.append('payment_type', this.paymentType);
                formData.append('file', paymentReceipt.files[0]);
                formData.append('student_id', this.selectedStudentId);

            try {
                console.log(formData)
                const response = await this.AdminService.createNewPaymentAndPaymentStudent(formData);
                if(response.status === 201){
                    this.$toast.add({severity:'success', summary: 'Exito', detail: response.data.message, life: 5000});
					this.newPaymentDialog = false;
                    //this.$store.dispatch('getPayments');
				}
                this.selectedStudent = null;
            } catch (error) {
                this.$toast.add({severity:'error', summary: 'Error', detail: error.response.data.error, life: 5000});
            }
			this.course = {};
			}
        },
    },
    watch: {
        // selectedCourse(newCourse) {
        //     if(newCourse) {
        //         this.$store.dispatch('loadStudentsForCourse', newCourse.id);
        //     } else {
        //         this.$store.commit('setStudentsByGrade', []);
        //     }
        // },
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