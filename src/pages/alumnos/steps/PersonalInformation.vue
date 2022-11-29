<template>

    <div class="col-12 mt-4">
        <div class="card">
            <h5>Información Personal</h5>

            <div class="p-fluid grid mt-5">
                <div class="field col-12 md:col-3">
                    <span class="p-float-label">
                        <InputText type="text"  id="first_name" v-model.trim="student.first_name" :class="{'p-invalid': validationErrors.first_name && submitted}" />
                        <small v-show="validationErrors.first_name && submitted" class="p-error">{{msg.first_name}}</small>
                        <label for="first_name">Primer Nombre</label>
                    </span>
                </div>

                <div class="field col-12 md:col-3">
                    <span class="p-float-label">
                        <InputText id="middle_name" type="text" v-model.trim="student.middle_name"/>
                        <label for="middle_name">Segundo Nombre</label>
                    </span>
                </div>

                <div class="field col-12 md:col-3">
                    <span class="p-float-label">
                        <InputText id="first_lastname" v-model.trim="student.first_lastname" type="text" :class="{'p-invalid': validationErrors.first_lastname && submitted}" />
                        <small v-show="validationErrors.first_lastname && submitted" class="p-error">{{msg.first_lastname}}</small>
                        <label for="first_lastname">Apellido Paterno</label>
                    </span>
                </div>
                <div class="field col-12 md:col-3">
                    <span class="p-float-label">
                        <InputText id="second_lastname" type="text" v-model.trim="student.second_lastname" />
                        <label for="second_lastname">Apellido Materno</label>
                    </span>
                </div>

                <div class="field col-12 md:col-3">
                    <span class="p-float-label">
                        <AutoComplete id="nationality" v-model.trim="student.nationality"  :suggestions="filteredCountries"
                        @complete="searchCountry($event)" :dropdown="true" optionLabel="name" forceSelection>
                        <template #item="slotProps">
                            <div class="country-item">
                                <!-- <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" width="18" /> -->
                                <div class="ml-2">{{slotProps.item.name}}</div>
                            </div>
                        </template>
                    </AutoComplete>
                    <label for="nationality">Nacionalidad</label>
                    </span>
                </div>

                <div class="field col-12 md:col-3">
                    <span class="p-float-label">
                        <Calendar id="birthdate" v-model.trim="student.birthdate" :minDate="minDate" :maxDate="maxDate" dateFormat="dd-mm-yy"
                        :showButtonBar="true" :showIcon="true" placeholder="dd-mm-aaaa"/>
                        <label for="birthdate">Fecha de nacimiento</label>
                    </span>
                </div>

                <div class="field col-12 md:col-6">
                    <span class="p-float-label">
                        <InputText id="birth_place" type="text" v-model.trim="student.birth_place" />
                        <label for="birth_place">Lugar de nacimiento</label>
                    </span>
                </div>

                <div class="field col-12 md:col-3">
                    <span class="p-float-label">
                        <InputMask id="doc_number" mask="99.999.999" v-model.trim="student.doc_number"
                        :class="{'p-invalid': validationErrors.doc_number && submitted}" />
                        <small v-show="validationErrors.doc_number && submitted" class="p-error">{{msg.doc_number}}</small>
                        <label for="doc_number">DNI</label>
                    </span>
                </div>

                <div class="field col-12 md:col-3">
                    <span class="p-float-label">
                        <Dropdown id="gender" v-model="student.gender" selected="slotProps" :options="genderOptions" optionLabel="label" optionValue="value" placeholder="Selecciona uno" >
                            <template #value="slotProps">
                                <div v-if="slotProps.value && slotProps.value.value">
                                    <span>{{slotProps.value.label}}</span>
                                </div>
                                <div v-else-if="slotProps.value && !slotProps.value.value">
                                    <span>{{slotProps.value}}</span>
                                </div>
                                <span v-else>
                                    {{slotProps.placeholder}}
                                </span>
                            </template>                
                        </Dropdown>
                        <label for="gender">Género</label>
                    </span>
                </div>

            </div>
        </div>
    </div>


    <div class="card">
        <h5>Domicilio y Contacto</h5>
        <div class="p-fluid grid mt-5">

            <div class="field col-12 md:col-6">
                <span class="p-float-label">
                    <InputText id="street" type="text" v-model.trim="student.street"/>
                    <label for="street">Calle</label>
                </span>
            </div>

            <div class="field col-12 md:col-2">
                <span class="p-float-label">
                <InputNumber id="number" type="text" v-model.trim="student.number" :useGrouping="false"/>
                <label for="number">Número</label>
                </span>
            </div>

            <div class="field col-12 md:col-2">
                <span class="p-float-label">
                <InputNumber id="floor" type="text" v-model.trim="student.floor" showButtons/>
                <label for="floor">Piso</label>
                </span>
            </div>

            <div class="field col-12 md:col-2">
                <span class="p-float-label">
                    <InputNumber id="department" type="text" v-model.trim="student.department" showButtons/>
                    <label for="department">Depto</label>
                </span>
            </div>

            <div class="field col-12 md:col-4">
                <span class="p-float-label">
                <InputText id="city" type="text" v-model.trim="student.city" />
                <label for="city">Ciudad</label>
                </span>
            </div>

            <div class="field col-12 md:col-3">
                <span class="p-float-label">
                    <Dropdown id="state" v-model.trim="student.state" :options="stateItems" optionLabel="name" optionValue="value"
                    placeholder="Selecciona una"></Dropdown>
                    <label for="state">Provincia</label>
                </span>
            </div>

            <div class="field col-12 md:col-1">
                <span class="p-float-label">
                <InputText id="cp" type="text" v-model.trim="student.cp"/>
                <label for="cp">CP</label>
                </span>
            </div>

            <div class="field col-12 md:col-2">
                <span class="p-float-label">
                    <InputNumber inputId="phone" v-model.trim="student.phone" max_length="10" :useGrouping="false" />
                    <label for="phone">Teléfono Personal</label>
                </span>
            </div>
            
            <div class="field col-12 md:col-2">
                <span class="p-float-label">
                    <InputNumber inputId="family_phone" v-model.trim="student.family_phone" max_length="10" :useGrouping="false" />
                    <label for="family_phone">Teléfono Familiar</label>
                </span>
            </div>
        </div>
    </div>

    <div class="grid grid-nogutter justify-content-between">
        <i></i>
        <Button label="Siguiente" @click="nextPage()" icon="pi pi-angle-right" icon-pos="right"></Button>
    </div>
</template>

<script>
import CountryService from '../../../service/CountryService'
import AdminService from '../../../service/AdminService';

export default {
    created() {
        this.AdminService = new AdminService();
        this.countryService = new CountryService();


        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        //let prevMonth = (month === 0) ? 11 : month -1;
        //let prevYear = (prevMonth === 11) ? year - 1 : year;
        let nextMonth = (month === 11) ? 0 : month + 1;
        let nextYear = (nextMonth === 0) ? year + 1 : year;
        this.minDate = new Date();
        this.minDate.setDate(1)
        this.minDate.setMonth(0);
        this.minDate.setFullYear(1980);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
        this.maxDate.setFullYear(nextYear);
    },
    mounted(){
        this.countryService.getCountries().then(data => this.countries = data);

        this.student = this.$store.state.student;
    },
    data() {
        return {
			student: {},
            // first_name: '',
            // middle_name: null,
            // first_lastname: '',
            // second_lastname: null,
            // selectedCountry: null,
            // birthdate: '',
            // birth_place: null,
            // nationality: '',
            // doc_number: '',
            // filteredCountries: null,
            // gender: '',
            // phone: null,
            // family_phone: null,

            // street: null,
            // number: null,
            // floor: null,
            // department: null,
            // city: null,
            // state: null,
            // cp: null,

            msg: [],

            stateItems: [
                {name: 'Tierra Del Fuego', value: 1},
                {name: 'Santa Cruz', value: 2},
                {name: 'Chubut', value: 3},
                {name: 'Buenos Aires', value: 4},
            ],

            genderOptions: [
                {label: 'Sin especificar', value: 1},
                {label: 'Sin género', value: 2},
                {label: 'Másculino', value: 3},
                {label: 'Femenino', value: 4},
            ],
            submitted: false,
            validationErrors: {}
        }
    },
    countryService: null,
    methods: {
        nextPage() {
            this.submitted = true;
            
            if (this.validateForm()) {
                this.AdminService.getPerson(this.doc_number.replaceAll('.', '')).then(response => {
                    if (response.status === 200) {
                        this.$toast.add({ severity: 'error', summary: 'Verifique el DNI', detail: 'Ya existe un alumno/a con ese documento', life: 4000 });
                    }
                }).catch(error => {
                    if (error.response.status === 404) {

                        this.$emit('next-page', {
                            formData: {
                                first_name: this.first_name,
                                middle_name: this.middle_name,
                                first_lastname: this.first_lastname,
                                second_lastname: this.second_lastname,
                                doc_number: this.doc_number,
                                birthdate: this.birthdate,
                                birth_place: this.birth_place,
                                nationality: this.nationality.code,
                                gender: this.gender,
                                phone: this.phone,
                                family_phone: this.family_phone,
                                street: this.street,
                                number: this.number,
                                floor: this.floor,
                                department: this.department,
                                city: this.city,
                                state: this.state,
                                cp: this.cp,
                            },
                            pageIndex: 0
                        });

                    } else if (error.message) {
                        console.log(error.message)
                    } else {
                        console.log(error)
                    }
                })
            }
        },
        validateForm() {
            if (!this.first_name.trim()){
                this.validationErrors['first_name'] = true;
                this.msg['first_name'] = 'Este campo es obligatorio';
            }
            else if (!(/^[a-zA-Z]+$/.test(this.first_name))){
                    this.msg['first_name'] = 'El nombre solo puede contener letras';
                    this.validationErrors['first_name'] = true;
            }else
                delete this.validationErrors['first_name'];

            if (!this.first_lastname.trim()){
                this.validationErrors['first_lastname'] = true;
                this.msg['first_lastname'] = 'Este campo es obligatorio';
            }
            else if (!(/^[a-zA-Z]+$/.test(this.first_lastname))){
                    this.msg['first_lastname'] = 'El apellido solo puede contener letras';
                    this.validationErrors['first_lastname'] = true;
            }
            else
                delete this.validationErrors['first_lastname'];

            if (!this.doc_number.trim()){
                this.validationErrors['doc_number'] = true;
                this.msg['doc_number'] = 'Este campo es obligatorio';
            }
            else
                delete this.validationErrors['doc_number'];

            return !Object.keys(this.validationErrors).length;
        },
        searchCountry(event) {
            setTimeout(() => {
                if (!event.query.trim().length) {
                    this.filteredCountries = [...this.countries];
                }
                else {
                    this.filteredCountries = this.countries.filter((country) => {
                        return country.name.toLowerCase().startsWith(event.query.toLowerCase());
                    });
                }
            }, 250);
        },
    }
}
</script>

<style lang="scss" scoped>
.Dropdown {
    width: 14rem;
}
</style>