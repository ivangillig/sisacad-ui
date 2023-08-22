<template>
    <Toast />
    <div class="sm:col-8">
        <div class="card col-12 md:col-8 flex flex-col md:flex-row md:items-center">
            <div class="mr-4 mt-4 md:mt-0">
                <h5>Alumno</h5>
                <div class="filter-container flex flex-col md:flex-row">
                    <AutoComplete class="flex-grow" placeholder="Buscar" id="dd" :dropdown="true" :multiple="false"
                        v-model="selectedStudent" :suggestions="autoFilteredValue" @complete="searchStudent($event)"
                        @select="onSelectStudent($event)" field="name" />
                    <Button label="Cargar comprobante" icon="pi pi-plus" class="mt-4 md:mt-0 md:ml-4" @click="openNewPayment()" />
                </div>
            </div>
        </div>
    </div>

    <Dialog v-model:visible="newPaymentDialog" :style="{ width: '450px' }" header="Nuevo pago" :modal="true" class="p-fluid">
        <div class="field">
            <label for="paymentType">Tipo de pago</label>
            <Dropdown id="paymentType" v-model="paymentType" :options="paymentTypeList" optionLabel="label"
                optionValue="value" placeholder="Selecciona uno" :class="{ 'p-invalid': submitted && !paymentType }" />
            <small class="p-invalid" v-if="submitted && !paymentType">El turno es obligatorio.</small>
        </div>

        <div class="field">
            <label for="year">Fecha de pago</label>
            <Calendar v-model="paymentDate" view="date" dateFormat="yy-mm-dd" required="true" autofocus
                :class="{ 'p-invalid': submitted && !paymentDate }" />
            <small class="p-invalid" v-if="submitted && !paymentDate">La fecha de pago es obligatoria.</small>
        </div>

        <div class="field">
            <label for="paymentAmount">Importe</label>

            <InputNumber id="paymentAmount" v-model="paymentAmount" inputId="currency-germany" mode="currency"
                currency="USD" locale="de-DE" required="true" autofocus
                :class="{ 'p-invalid': submitted && !paymentAmount }" />
            <small class="p-invalid" v-if="submitted && !paymentAmount">El importe es obligatorio.</small>
        </div>

        <template #footer>
            <!-- <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog"/> -->
            <!-- <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="saveGrade" /> -->
            <FileUpload mode="basic" name="paymentReceipt" accept="image/*" :maxFileSize="1000000" @uploader="onUpload"
                chooseLabel="Seleccionar archivo" customUpload />
        </template>
    </Dialog>

    <div class="sm:col-12">
        <div class="card">
            <!-- <h5>Alumnos en el curso{{ selectedCourse ? ': ' + selectedCourse.name : '' }}</h5> -->
            <DataTable :value="paymentsByStudent" :rows="5" :paginator="true" responsiveLayout="scroll">
                <Column field="created_at" header="Fecha de pago" :sortable="true" style="width: 20%"></Column>
                <Column field="payment.payment_type" header="Tipo de pago" :sortable="true" style="width: 20%">
                    <template #body="slotProps">
                        {{ slotProps.data.payment.payment_type === "1" ? 'Pago de cuota' : 'Pago de matrícula' }}
                    </template>
                </Column>
                <Column field="payment.amount" header="Importe" :sortable="true" style="width: 20%">
                    <template #body="slotProps">
                        ${{ slotProps.data.payment.amount }}
                    </template>
                </Column>
                <Column field="payment.file" header="Comprobante" :sortable="true" style="width: 25%">
                    <template #body="slotProps">
                        <a :href="slotProps.data.payment.file" target="_blank">
                            {{ getFileNameFromUrl(slotProps.data.payment.file) }}
                        </a>
                    </template>
                </Column>
                <Column header="Ver detalle" style="width: 15%">
                    <template #body="slotProps">
                        <Button icon="pi pi-search" type="button" class="p-button-text"
                            @click="openFileInNewTab(slotProps.data.payment.file)">
                        </Button>
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
import dayjs from 'dayjs';

export default {
    beforeUnmount() {
        this.$store.commit('clearPayments');
    },
    created() {
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
                { label: 'Pago de cuota', value: '1' },
                { label: 'Pago de matrícula', value: '2' },
            ],
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
        openFileInNewTab(url) {
            window.open(url, '_blank');
        },
        getFileNameFromUrl(url) {
            return url.split('/').pop();
        },
        logValue(value) {
            console.log(value);
            return value;
        },
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
            let formData = new FormData();

            if (this.paymentDate && this.paymentAmount && this.paymentType && paymentReceipt.files) {
                const formattedDate = dayjs(this.payment_date).format('YYYY-MM-DD');

                formData.append('payment_date', formattedDate);
                formData.append('amount', this.paymentAmount);
                formData.append('payment_type', this.paymentType);
                formData.append('file', paymentReceipt.files[0]);
                formData.append('student_id', this.selectedStudent.id);
                try {
                    const response = await this.adminService.createNewPaymentAndPaymentStudent(formData);
                    if (response.status === 201) {
                        this.$toast.add({ severity: 'success', summary: 'Exito', detail: response.data.message, life: 5000 });
                        this.newPaymentDialog = false;
                        this.$store.dispatch('loadPaymentsByStudent');
                    }
                    this.selectedStudent = null;
                } catch (error) {
                    if (error && error.response && error.response.data && error.response.data.error) {
                        this.$toast.add({ severity: 'error', summary: 'Error', detail: error.response.data.error, life: 5000 });
                    }
                }
                this.$store.commit('clearPayments');
            }
        },
    },
    watch: {
            selectedStudent(student) {
            if(student && typeof student === 'object' && student.id) {
                this.$store.dispatch('loadPaymentsByStudent', student.id);
            } else {
                this.$store.commit('setPaymentsByStudent', []);
            }
        },
        state(newStudents) {
            console.log('Nuevo estado de students:', newStudents);
        },
    },
    computed: {
        ...mapState({
            paymentsByStudent: state => state.student.paymentsByStudent
        }),
    },
};
</script>

<style lang="scss" scoped>
@mixin medium-screen {
    @media (min-width: 768px) {
        @content;
    }
}

.filter-container {
    display: flex;
    flex-direction: column;

    @include medium-screen {
        flex-direction: row;
    }
}
</style>