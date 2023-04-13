<template>

<div class="col-12 mt-4">
        <div class="card">
            <h5>Información Institucional</h5>

            <div class="p-fluid grid mt-5">

                <div class="field col-12 md:col-5">
                    <label for="email">Cuenta de usuario</label>
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-user"></i>
                        </span>
                        <InputText placeholder="Email institucional" id="email" type="email"  v-model="email" :class="{'p-invalid': validationErrors.email && submitted}"/>
                    </div>
                    <small v-show="validationErrors.email && submitted" class="p-error">{{msg.email}}</small>
                </div>

                <div class="field col-12 md:col-5">
                </div>

                <div class="field col-12 md:col-5">
                    <label for="school_cert_destinty">Destinatario de Certificado Escolar</label>
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-building"></i>
                        </span>
                        <InputText id="school_cert_destinty" v-model="school_cert_destinty" placeholder="Por ej: Gobierno de la provicia de Tierra Del Fuego" />
                    </div>
                </div>

                <div class="field col-12 md:col-5">
                </div>

                <div class="field col-12 md:col-5">
                    <label for="admission_date">Fecha de Ingreso </label>
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-calendar"></i>
                        </span>
                        <Calendar id="admission_date" v-model="admission_date" :minDate="minDate" :maxDate="maxDate" dateFormat="dd-mm-yy"
                        :showButtonBar="true" placeholder="dd-mm-aaaa"/>
                    </div>
                </div>

            </div>
        </div>
</div>
            
    <div class="flex align-items-center py-5 px-3">
        <div class="p-fluid">
            
        </div>
        </div>

    <div class="grid grid-nogutter justify-content-between">
        <Button label="Anterior" @click="prevPage()" icon="pi pi-angle-left"></Button>
        <Button label="Siguiente" @click="nextPage()" icon="pi pi-angle-right" icon-pos="right"></Button>
    </div>
</template>

<script>

import AdminService from '../../../service/Secretaria/AdminService';

export default {
    created() {
        this.AdminService = new AdminService();
    },
    data () {
                return {
                    email: '',
                    admission_date: null,
                    school_cert_destinty: null,

                    submitted: false,
                    validationErrors: {},
                    msg: [],
                }
            },
            methods: {
                nextPage() {
                    this.submitted = true;
                    if (this.validateForm()) {
                        
                        this.AdminService.getPersonEmail({email: this.email}).then(response => {
                            console.log(response)
                            if (response.status === 200) {
                                this.$emit('next-page', {
                                        formData: {
                                            email: this.email, 
                                            admission_date: this.admission_date, 
                                            school_cert_destinty: this.school_cert_destinty
                                        }, 
                                        pageIndex: 1
                                    });
                                }
                        }).catch(error => {
                            console.log(error)
                            if (error.response.status === 400) {
                                for (const property in error.response.data) {
                                    this.$toast.add({ severity: 'error', summary: 'Hubo un error', detail: error.response.data[property].toString(), life: 4000 });
                                }
                                this.email = ''
                                this.submitted = false;
                            } else if (error.message) {
                                console.log(error.message)
                            } else {
                                console.log(error)
                            }
                        })
                    }
                },
                prevPage() {
                    this.$emit('prev-page', {pageIndex: 1});
                },
                validateForm() {
                    if (!this.email.trim()){
                        this.validationErrors['email'] = true;
                        this.msg['email'] = 'Este campo es obligatorio';
                    }                        
                    else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email))){
                        this.msg['email'] = 'Dirección de email inválida';
                        this.validationErrors['email'] = true;
                    }
                    else
                        delete this.validationErrors['email'];

                    return !Object.keys(this.validationErrors).length;
                },
            },
}
</script>

<style lang="scss" >
.p-inputgroup-addon {
    background-color: var(--primary-color);
	color: var(--primary-color-text);
}
</style>

