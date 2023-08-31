<template>

<div class="col-12 mt-4">

    <ScrollPanel style="width: 100%; height: 550px; margin-bottom: 20px;">
        <div class="card card-w-title mx-2">
            <h5>Datos Personales</h5>

            <div class="p-fluid formgrid grid mt-5">
                <div class="field col-12 md:col-3">
                    <label for="class">Nombre</label>
                    <b>{{student.first_name ? student.first_name : '-'}}</b>
                </div>
                <div class="field col-12 md:col-3">
                    <label for="middle_name">Segundo Nombre</label>
                    <b>{{student.middle_name ? student.middle_name : '-'}}</b>
                </div>
                <div class="field col-12 md:col-3">
                    <label for="first_lastname">Apellido Paterno</label>
                    <b>{{student.first_lastname ? student.first_lastname : '-'}}</b>
                </div>
                <div class="field col-12 md:col-3">
                    <label for="second_lastname">Apellido Materno</label>
                    <b>{{student.second_lastname ? student.second_lastname : '-'}}</b>
                </div>
                <div class="field col-12 md:col-3">
                    <label for="nationality">Nacionalidad</label>
                    <b>{{student.nationality ? student.nationality : '-'}}</b>
                </div>
                <div class="field col-12 md:col-3">
                    <label for="birthday">Fecha de nacimiento</label>
                    <b>{{student.birthday ? formatDate(student.birthday) : '-'}}</b>
                </div>
                <div class="field col-12 md:col-3">
                    <label for="birth_place">Lugar de nacimiento</label>
                    <b>{{student.birth_place ? student.birth_place : '-'}}</b>
                </div>
                <div class="field col-12 md:col-3">
                    <label for="doc_number">DNI</label>
                    <b>{{student.doc_number ? student.doc_number : '-'}}</b>
                </div>
                <div class="field col-12 md:col-3">
                    <label for="gender">Género</label>
                    <b>{{student.gender ? getGenderLabel(student.gender) : '-'}}</b>
                </div>
            </div>
        </div>

        <div class="card card-w-title  mx-2">
            <h5>Dirección</h5>
            <div class="p-fluid formgrid grid mt-5">
                <div class="field col-12 md:col-3">
                    <label for="street">Calle</label>
                    <b>{{student.street ? student.street : '-'}}</b>
                </div>
                <div class="field col-12 md:col-3">
                    <label for="number">Nro</label>
                    <b>{{student.number ? student.number : '-'}}</b>
                </div>
                <div class="field col-12 md:col-1">
                    <label for="floor">Piso</label>
                    <b>{{student.floor ? student.floor : '-'}}</b>
                </div>
                <div class="field col-12 md:col-1">
                    <label for="department">Depto</label>
                    <b>{{student.department ? student.department : '-'}}</b>
                </div>
                <div class="field col-12 md:col-1">
                    <label for="city">Ciudad</label>
                    <b>{{student.address_city ? student.address_city : '-'}}</b>
                </div>
                <div class="field col-12 md:col-2">
                    <label for="state">Provincia</label>
                    <b>{{student.address_state ? getStateLabel(student.address_state) : '-'}}</b>
                </div>
                <div class="field col-12 md:col-2">
                    <label for="cp">Código Postal</label>
                    <b>{{student.cp ? student.cp : '-'}}</b>
                </div>
            </div>
        </div>

        <div class="card card-w-title mx-2">
            <h5>Institucional</h5>
            <div class="p-fluid formgrid grid mt-5">
                <div class="field col-12 md:col-4">
                    <label for="email">Email Institucional</label>
                    <b>{{student.email ? student.email : '-'}}</b>
                </div>
                <div class="field col-12 md:col-4">
                    <label for="admission_date">Fecha de ingreso</label>
                    <b>{{student.admission_date ? formatDate(student.admission_date) : '-'}}</b>
                </div>
                <div class="field col-12 md:col-4">
                    <label for="school_cert_destinty">Destinatario de Cert Escolar</label>
                    <b>{{student.school_cert_destinty ? student.school_cert_destinty : '-'}}</b>
                </div>
            </div>
        </div>

        <div class="card card-w-title  mx-2">
            <h5>Información Médica y Autorizaciones</h5>
            <div class="p-fluid formgrid grid mt-5">
                <div class="field col-12 md:col-3">
                    <label for="trips_auth">Autorizado a paseos</label>
                    <b>{{student.trips_auth ? 'Si' : 'No'}}</b>
                </div>
                <div class="field col-12 md:col-3">
                    <label for="medical_auth">Autorizado a recibir tratamiento médico</label>
                    <b>{{student.medical_auth ? 'Si' : 'No'}}</b>
                </div>
                <div class="field col-12 md:col-3">
                    <label for="leave_auth">Autorizado a retirarse solo</label>
                    <b>{{student.leave_auth ? 'Si' : 'No'}}</b>
                </div>
                <div class="field col-12 md:col-3">
                    <label for="public_auth">Autorizado a exposición pública</label>
                    <b>{{student.public_auth ? 'Si' : 'No'}}</b>
                </div>
                <div class="field col-12 md:col-3">
                    <label for="medications">Medicaciones</label>
                    <b>{{student.medications ? student.medications : '-'}}</b>
                </div>
                <div class="field col-12 md:col-3">
                    <label for="allergies">Alérgias</label>
                    <b>{{student.allergies ? student.allergies : '-'}}</b>
                </div>
                <div class="field col-12 md:col-3">
                    <label for="observations">Observaciones</label>
                    <b>{{student.observations ? student.observations : '-'}}</b>
                </div>
            </div>
        </div>
    </ScrollPanel>
        <div class="grid grid-nogutter justify-content-between">
            <Button label="Atrás" @click="prevPage()" icon="pi pi-angle-left"></Button>
            <Button :label="student.id ? 'Guardar cambios' : 'Registrar Alumno'" @click="complete()" icon="pi pi-check" icon-pos="right" class="p-button-success"></Button>
        </div>
</div>
</template>

<script>

import AuthService from '../../../service/AuthService';
import AdminService from '../../../service/Secretaria/AdminService';
import { mapState } from 'vuex';
import dayjs from 'dayjs';
import { GENDER_OPTIONS, STATE_ITEMS } from '../../../service/Constants/Utils';

export default {
    data() {
        return {
            genderOptions: GENDER_OPTIONS,
            stateItems: STATE_ITEMS,
        }
    },
    created() {
        this.AuthService = new AuthService();
        this.AdminService = new AdminService();
    },
    computed: {
        ...mapState('student', ['student', 'countries']),
    },
    methods: {
		getGenderLabel(genderValue) {
			let gender = this.genderOptions.find(g => g.value === genderValue.toString());
			return gender ? gender.label : '-';
		},
		getStateLabel(stateValue) {
			let state = this.stateItems.find(s => s.value === stateValue);
			return state ? state.label : '-';
		},
        formatDate(dateString) {
            if (!dateString) return '-';
            return dayjs(dateString).format('DD-MM-YYYY');
        },
        prevPage() {
            this.$emit('prev-page', { pageIndex: 3 });
        },
        complete() {

            if (this.student && !this.student.id) {
                let user = { "email": this.student.email, "password1": this.student.doc_number.replaceAll('.', ''), "password2": this.student.doc_number.replaceAll('.', '') }
                this.AuthService.newUser(user).then(response => {
                    if (response.status === 201) {
                        this.student.user = response.data.id

                        this.AdminService.newStudent(this.student).then(response => {
                            if (response.status === 201) {
                                this.$emit('complete', 'newStudent');
                            }
                        }).catch(error => {
                            if (error.response) {
                                for (const property in error.response.data) {
                                    this.$toast.add({ severity: 'error', summary: 'Hubo un error', detail: error.response.data[property].toString(), life: 3000 });
                                }
                            } else if (error.message) {
                                console.log(error.message)
                            } else {
                                console.log(error)
                            }
                        })
                    }
                }).catch(error => {
                    console.log(error)
                }
                )
            } else {
                this.AdminService.editStudent(this.student).then(response => {
                    if (response.status === 200) {
                        this.$emit('complete', 'editStudent');
                    }}).catch(error => {
                        if (error.response) {
                            for (const property in error.response.data) {
                                this.$toast.add({ severity: 'error', summary: 'Hubo un error', detail: error.response.data[property].toString(), life: 3000 });
                            }
                        } else if (error.message) {
                            console.log(error.message)
                        } else {
                            console.log(error)
                        }
                    })
            }
        },
    },
}

</script>