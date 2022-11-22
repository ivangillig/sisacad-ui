<template>

<div class="col-12 mt-4">
    <div class="card card-w-title">
		<h5>Datos Personales</h5>

            <div class="p-fluid formgrid grid mt-5">
                <div class="field col-12 md:col-3">
                    <label for="class">Nombre</label>
                    <b>{{formData.first_name ? formData.first_name : '-'}}</b>
                </div>
                <div class="field col-12 md:col-3">
                    <label for="middle_name">Segundo Nombre</label>
                    <b>{{formData.middle_name ? formData.middle_name : '-'}}</b>
                </div>
                <div class="field col-12 md:col-3">
                    <label for="first_lastname">Apellido Paterno</label>
                    <b>{{formData.first_lastname ? formData.first_lastname : '-'}}</b>
                </div>
                <div class="field col-12 md:col-3">
                    <label for="second_lastname">Apellido Materno</label>
                    <b>{{formData.second_lastname ? formData.second_lastname : '-'}}</b>
                </div>
                <div class="field col-3">
                    <label for="nationality">Nacionalidad</label>
                    <b>{{formData.nationality ? formData.nationality : '-'}}</b>
                </div>
                <div class="field col-3">
                    <label for="birthdate">Fecha de nacimiento</label>
                    <b>{{formData.birthdate ? formData.birthdate.toLocaleDateString('es-AR') : '-'}}</b>
                </div>
                <div class="field col-6">
                    <label for="birth_place">Lugar de nacimiento</label>
                    <b>{{formData.birth_place ? formData.birth_place : '-'}}</b>
                </div>
                <div class="field col-3">
                    <label for="doc_number">DNI</label>
                    <b>{{formData.doc_number ? formData.doc_number : '-'}}</b>
                </div>
                <div class="field col-3">
                    <label for="gender">Género</label>
                    <b>{{formData.gender ? formData.gender : '-'}}</b>
                </div>
            </div>
    </div>

    <div class="card card-w-title">
		<h5>Dirección</h5>
            <div class="p-fluid formgrid grid mt-5">
                <div class="field col-3">
                    <label for="street">Calle</label>
                    <b>{{formData.street ? formData.street : '-'}}</b>
                </div>
                <div class="field col-1">
                    <label for="number">Nro</label>
                    <b>{{formData.number ? formData.number : '-'}}</b>
                </div>
                <div class="field col-1">
                    <label for="floor">Piso</label>
                    <b>{{formData.floor ? formData.floor : '-'}}</b>
                </div>
                <div class="field col-1">
                    <label for="department">Depto</label>
                    <b>{{formData.department ? formData.department : '-'}}</b>
                </div>
                <div class="field col-2">
                    <label for="city">Ciudad</label>
                    <b>{{formData.city ? formData.city : '-'}}</b>
                </div>
                <div class="field col-2">
                    <label for="state">Provincia</label>
                    <b>{{formData.state ? formData.state : '-'}}</b>
                </div>
                <div class="field col-2">
                    <label for="cp">Código Postal</label>
                    <b>{{formData.cp ? formData.cp : '-'}}</b>
                </div>
            </div>
    </div>

    <div class="card card-w-title">
        <h5>Institucional</h5>
            <div class="p-fluid formgrid grid mt-5">
                <div class="field col-6">
                    <label for="email">Email Institucional</label>
                    <b>{{formData.email ? formData.email : '-'}}</b>
                </div>   
            </div>
    </div>
                    
                        <div class="grid grid-nogutter justify-content-between">
                            <Button label="Atrás" @click="prevPage()" icon="pi pi-angle-left"></Button>
                            <Button label="Registrar Alumno" @click="complete(formData)" icon="pi pi-check" icon-pos="right" class="p-button-success"></Button>
                        </div>
</div>     
</template>

<script>

import AuthService from '../../../service/AuthService';
import AdminService from '../../../service/AdminService';

export default {
    created() {
        this.AuthService = new AuthService();
        this.AdminService = new AdminService();
    },
    props: {
        formData: Object
    },
    methods: {
        prevPage() {
            this.$emit('prev-page', { pageIndex: 3 });
        },
        complete(formData) {
            var user = {email: formData.email, password1: formData.doc_number.replaceAll('.', ''), password2: formData.doc_number.replaceAll('.', '') }
            var student = {
                    doc_number: formData.doc_number,
                    first_name: formData.first_name, 
                    middle_name: formData.middle_name,
                    first_lastname: formData.first_lastname,
                    second_lastname: formData.second_lastname,
                    birthday: formData.birthdate.toLocaleDateString('es-AR').split("/").reverse().join("-"),
                    birth_place: formData.birth_place,
                    nationality: formData.nationality,
                    gender: formData.gender.toString(),
                    phone: formData.phone.toString(),
                    family_phone: formData.family_phone.toString(),
                    street: formData.street,
                    number: formData.number,
                    floor: formData.floor.toString(),
                    department: formData.department.toString(),
                    city: formData.city,
                    address_state: formData.state,
                    cp: formData.cp
                    }

            console.log(student)

            this.AuthService.newUser(user).then(response => {
                    if (response.status === 201) {
                        student.user = response.data.user

                        this.AdminService.newStudent(student).then(response => {
                            if (response.status === 201) {
                                this.$emit('complete', this.formData);
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
                    if( error.response) {
                     
                        for (const property in error.response.data) {
                            this.$toast.add({severity:'error', summary: 'Hubo un error', detail: error.response.data[property].toString(), life: 3000});
                        }
                    } else if (error.message) {
                        console.log(error.message)
                    } else {
                        console.log(error)
                    }
            })

        }
    },
}

</script>