<template>
    <div class="col-12 mt-4">
        <Fieldset legend="Autorizaciones" :toggleable="true" >

            <div class="p-fluid grid mt-4">
                
                <div class="field col-12 md:col-1">
                </div>
                <div class="field col-12 md:col-3">
                    <h5>Tiene autorización para salir de paseos?</h5>
                </div>
                <div class="col-12 md:col-1">
                    <SelectButton v-model="trips_auth" :options="options" optionLabel="name" optionValue="value"
                    aria-labelledby="single" />
                </div>
                <div class="field col-12 md:col-1">
                </div>
                <div class="field col-12 md:col-3">
                    <h5>Tiene autorización para recibir asistencia médica?</h5>
                </div>
                <div class="col-12 md:col-1">
                    <SelectButton v-model="medical_auth" :options="options" optionLabel="name" optionValue="value"
                    aria-labelledby="single" />
                </div>
                <div class="field col-12 md:col-1">
                </div>
            </div>
            <div class="p-fluid grid mt-4">
                <div class="field col-12 md:col-1">
                </div>
                <div class="field col-12 md:col-3">
                    <h5>Tiene autorización para salir solo del colegio?</h5>
                </div>
                <div class="col-12 md:col-1">
                    <SelectButton v-model="leave_auth" :options="options" optionLabel="name" optionValue="value"
                    aria-labelledby="single" />
                </div>
                <div class="field col-12 md:col-1">
                </div>
                <div class="field col-12 md:col-3">
                    <h5>Tiene autorización para exposición pública?</h5>
                </div>
                <div class="col-12 md:col-1">
                    <SelectButton v-model="public_auth" :options="options" optionLabel="name" optionValue="value"
                    aria-labelledby="single" />
                </div>
                <div class="field col-12 md:col-1">
                </div>
                
            </div>


        </Fieldset>
    </div>

    <div class="col-12 mt-2">
        <Fieldset legend="Tratamientos médicos" :toggleable="true" >

            <div class="p-fluid grid mt-2">

                <div class="field col-12 md:col-6">
                    <span class="p-float-label">
                        <Chips v-model="allergies" separator="," />
                        <label for="number">Alergias (separar con , )</label>
                    </span>
                </div>
                
                <div class="field col-12 md:col-6">
                    <span class="p-float-label">
                        <Chips v-model="medications" separator="," />
                        <label for="number">Medicamentos que consume (separar con , )</label>
                    </span>
                </div>

                <div class="field col-12 md:col-12">
                    <span class="p-float-label">
                        <Textarea v-model="observations" :autoResize="true" rows="5" cols="30" />
                        <label for="number">Observaciones (horarios para tomar medicamentos, consideraciones a tener en cuenta)</label>
                    </span>
                </div>

                
            </div>
        </Fieldset>
    </div>


    <div class="grid grid-nogutter justify-content-between">
        <Button label="Anterior" @click="prevPage()" icon="pi pi-angle-left"></Button>
        <Button label="Siguiente" @click="nextPage()" icon="pi pi-angle-right" icon-pos="right"></Button>
    </div>
</template>

<script>
export default {
    data () {
            return {
                trips_auth: false,
                medical_auth: false,
                leave_auth: false,
                public_auth: false,
                medical_treatment: null,
                
                medications: '',
                allergies: '',
                observations: '',

                submitted: false,
                validationErrors: {},

                options: [
                    { name: 'Si', value: 'True' },
                    { name: 'No', value: 'False'},
                    ],
                }
            },
            methods: {
                nextPage() {
                    this.submitted = true;
                    
                        this.$emit('next-page', {
                            formData: {
                                trips_auth: this.trips_auth, 
                                medical_auth: this.medical_auth, 
                                leave_auth: this.leave_auth,
                                public_auth: this.public_auth,
                                medications: this.medications ? this.medications.join(): '',
                                allergies: this.allergies ? this.allergies.join(): '',
                                observations: this.observations,
                            }, 
                            pageIndex: 2
                        });
                },
                prevPage() {
                    this.$emit('prev-page', {pageIndex: 2});
                }
            }
}
</script>

<style lang="scss" >
.p-selectbutton .p-button.p-highlight {
    background-color: var(--primary-color);
	color: var(--primary-color-text);
    text-align: center;
}

.p-selectbutton .p-button.p-highlight:hover{
    background-color: var(--primary-color);
	color: var(--primary-color-text);
}
</style>
