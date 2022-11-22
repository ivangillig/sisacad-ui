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
                    <h5>Tiene autorización para salir de paseos?</h5>
                </div>
                <div class="col-12 md:col-1">
                    <SelectButton v-model="medical_auth" :options="options" optionLabel="name" optionValue="value"
                    aria-labelledby="single" />
                </div>
                <div class="field col-12 md:col-1">
                </div>
                
            </div>


        </Fieldset>
    </div>

    <div class="card">
        <h5>Domicilio y Contacto</h5>

        <div class="p-fluid grid mt-5">

            <div class="field col-12 md:col-6">
                <span class="p-float-label">
                    <Chips v-model="value2" separator="," />
                    <label for="number">Alergias (separar con , )</label>
                </span>
            </div>

            <div class="field col-12 md:col-2">
                <span class="p-float-label">
                    <InputNumber id="number" type="text" v-model="number" :useGrouping="false" />
                    <label for="number">Número</label>
                </span>
            </div>

            <div class="field col-12 md:col-2">
                <span class="p-float-label">
                    <InputNumber id="floor" type="text" v-model="floor" showButtons />
                    <label for="floor">Piso</label>
                </span>
            </div>

            <div class="field col-12 md:col-2">
                <span class="p-float-label">
                    <InputNumber id="department" type="text" v-model="department" showButtons />
                    <label for="department">Depto</label>
                </span>
            </div>

            <div class="field col-12 md:col-4">
                <span class="p-float-label">
                    <InputText id="city" type="text" v-model="city" />
                    <label for="city">Ciudad</label>
                </span>
            </div>

            <div class="field col-12 md:col-3">
                <span class="p-float-label">
                    <Dropdown id="state" v-model="state" :options="stateItems" optionLabel="name" optionValue="value"
                        placeholder="Selecciona una"></Dropdown>
                    <label for="state">Provincia</label>
                </span>
            </div>

            <div class="field col-12 md:col-1">
                <span class="p-float-label">
                    <InputText id="cp" type="text" v-model="cp" />
                    <label for="cp">Código Postal</label>
                </span>
            </div>

            <div class="field col-12 md:col-2">
                <span class="p-float-label">
                    <InputNumber inputId="phone" v-model="phone" max_length="10" :useGrouping="false" />
                    <label for="phone">Teléfono Personal</label>
                </span>
            </div>

            <div class="field col-12 md:col-2">
                <span class="p-float-label">
                    <InputNumber inputId="family_phone" v-model="family_phone" max_length="10" :useGrouping="false" />
                    <label for="family_phone">Teléfono Familiar</label>
                </span>
            </div>
        </div>
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
                medical_treatment: null,
                trips_auth: null,
                medical_auth: null,
                leave_auth: null,
                public_auth: null,
                
                medications: '',
                allergies: '',
                observations: '',

                submitted: false,
                validationErrors: {},

                options: [
                    { name: 'Si', value: 1 },
                    { name: 'No', value: 0},
                    ],
                }
            },
            methods: {
                nextPage() {
                    this.submitted = true;
                    if (this.validateForm() ) {
                        this.$emit('next-page', {formData: {firstname: this.firstname, lastname: this.lastname, age: this.age}, pageIndex: 2});
                    }
                },
                prevPage() {
                    this.$emit('prev-page', {pageIndex: 2});
                },
                validateForm() {
                    if (!this.firstname.trim())
                        this.validationErrors['firstname'] = true;
                    else
                        delete this.validationErrors['firstname'];

                    if (!this.lastname.trim())
                        this.validationErrors['lastname'] = true;
                    else
                        delete this.validationErrors['lastname'];

                    return !Object.keys(this.validationErrors).length;
                }
            }
}
</script>

