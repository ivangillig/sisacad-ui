<template>

    <div class="col-12 mt-4">
        <div class="card">
            <h5>Información Personal</h5>

            <div class="p-fluid grid mt-5">
                <div class="field col-12 md:col-3">
                        <span class="label-modified">
                            <InputText type="text" required id="first_name" v-model.trim="student.first_name" @input="handleInputChange" :class="{ 'p-invalid': validationErrors.first_name && submitted }" />
                            <small v-show="validationErrors.first_name && submitted" class="p-error">{{ msg.first_name }}</small>
                            <label for="first_name">Primer Nombre</label>
                        </span>
                    </div>

                <div class="field col-12 md:col-3">
                    <span class="label-modified">
                        <InputText id="middle_name" type="text" v-model.trim="student.middle_name"/>
                        <label for="middle_name">Segundo Nombre</label>
                    </span>
                </div>

                <div class="field col-12 md:col-3">
                    <span class="label-modified">
                        <InputText id="first_lastname" required v-model.trim="student.first_lastname" type="text" :class="{'p-invalid': validationErrors.first_lastname && submitted}" />
                        <small v-show="validationErrors.first_lastname && submitted" class="p-error">{{msg.first_lastname}}</small>
                        <label for="first_lastname">Primer Apellido</label>
                    </span>
                </div>
                <div class="field col-12 md:col-3">
                    <span class="label-modified">
                        <InputText id="second_lastname" type="text" v-model.trim="student.second_lastname" />
                        <label for="second_lastname">Segundo Apellido</label>
                    </span>
                </div>



                <div class="field col-12 md:col-3">
                    <span class="label-modified">
                        <AutoComplete id="nationality" v-model="student.nationality" :suggestions="filteredCountries" :options="countries" optionLabel="name" optionValue="code"
                        placeholder="País de nacimiento" @complete="searchCountry" :dropdown="true"></AutoComplete>
                        <label for="state">Nacionalidad</label>
                    </span>
                </div>

                <div class="field col-12 md:col-3">
                    <span class="label-modified">
                        <label for="birthday">Fecha de nacimiento</label>
                        <Calendar id="birthday" v-model="student.birthday" :minDate="minDate" :maxDate="maxDate" dateFormat="dd-mm-yy"
                        :showButtonBar="true" :showIcon="true" placeholder="dd-mm-aaaa"/>
                    </span>
                </div>

                <div class="field col-12 md:col-6">
                    <span class="label-modified">
                        <label for="birth_place">Lugar de nacimiento</label>
                        <InputText id="birth_place" type="text" v-model="student.birth_place" />
                    </span>
                </div>

                <div class="field col-12 md:col-3">
                    <span class="label-modified">
                        <InputMask id="doc_number" required mask="99.999.999" v-model.trim="student.doc_number"
                        :class="{'p-invalid': validationErrors.doc_number && submitted}" />
                        <small v-show="validationErrors.doc_number && submitted" class="p-error">{{msg.doc_number}}</small>
                        <label for="doc_number">DNI</label>
                    </span>
                </div>

                    <div class="field col-12 md:col-3" v-if="(1 > 0)">
                        <span class="label-modified">
                            <Dropdown id="gender" v-model="student.gender" :options="genderOptions" optionLabel="label" placeholder="Selecciona un género" class="w-full md:w-14rem" >
                                <template #value="slotProps">
                                    <div v-if="slotProps.value && slotProps.value.value">
                                        {{slotProps.value.label}}
                                    </div>
                                    <div v-else-if="slotProps.value && !slotProps.value.value">
                                        {{slotProps.value}}
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
                <span class="label-modified">
                    <InputText id="street" type="text" v-model.trim="student.street"/>
                    <label for="street">Calle</label>
                </span>
            </div>

            <div class="field col-12 md:col-2">
                <span class="label-modified">
                <InputNumber id="number" type="text" v-model="student.number" :useGrouping="false"/>
                <label for="number">Número</label>
                </span>
            </div>

            <div class="field col-12 md:col-2">
                <span class="label-modified">
                <InputNumber id="floor" type="text" v-model="student.floor" showButtons/>
                <label for="floor">Piso</label>
                </span>
            </div>

            <div class="field col-12 md:col-2">
                <span class="label-modified">
                    <InputNumber id="department" type="text" v-model="student.department" showButtons/>
                    <label for="department">Depto</label>
                </span>
            </div>

            <div class="field col-12 md:col-4">
                <span class="label-modified">
                <InputText id="city" type="text" v-model="student.address_city" />
                <label for="city">Ciudad</label>
                </span>
            </div>

            <div class="field col-12 md:col-3">
                <span class="label-modified">
                    <Dropdown id="state" v-model="student.address_state" :options="stateItems" optionLabel="name" optionValue="value"
                    placeholder="Selecciona una"></Dropdown>
                    <label for="state">Provincia</label>
                </span>
            </div>

            <div class="field col-12 md:col-1">
                <span class="label-modified">
                <InputText id="cp" type="text" v-model="student.cp"/>
                <label for="cp">CP</label>
                </span>
            </div>

            <div class="field col-12 md:col-2">
                <span class="label-modified">
                    <InputNumber inputId="phone" v-model="student.phone" max_length="10" :useGrouping="false" />
                    <label for="phone">Teléfono Personal</label>
                </span>
            </div>
            <div class="field col-12 md:col-2">
                <span class="label-modified">
                    <InputNumber inputId="family_phone" v-model="student.family_phone" max_length="10" :useGrouping="false" />
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
import AdminService from '../../../service/Secretaria/AdminService';
import { mapState, mapActions } from 'vuex';
import dayjs from 'dayjs';

export default {
    created() {
        this.AdminService = new AdminService();

        if (this.studentData) {
            this.student = { ...this.studentData };
        }

        // Establecer la fecha mínima como 1 de enero de 1980
        this.minDate = dayjs('1980-01-01').toDate();

        // Establecer la fecha máxima como el primer día del próximo mes
        this.maxDate = dayjs().add(1, 'month').startOf('month').toDate();
    },
    mounted() {
        this.fetchCountries();

        if (this.studentInfo) {
            const birthday = this.studentInfo.birthday;
            this.student = this.studentInfo;
            this.student.birthday = birthday ? dayjs(birthday).format('DD-MM-YYYY') : null;

            const selectedState = this.stateItems.find(state => state.value == parseInt(this.student.address_state));
            if (selectedState) {
                this.student.address_state = selectedState.value;
            }

            // on editing student, we change code country to name country for dropdown
            if (this.studentInfo && this.studentInfo.id) {
                const country = this.countries.find(country => country.code === this.studentInfo.nationality);
                this.student.nationality = country;
            }
        }
    },
    data() {
        return {
            msg: [],

            student: {},
            stateItems: [
                {name: 'Tierra Del Fuego', value: 1},
                {name: 'Santa Cruz', value: 2},
                {name: 'Chubut', value: 3},
                {name: 'Buenos Aires', value: 4},
            ],

            genderOptions: [
                {label: 'Sin especificar', value: 'Sin especificar'},
                {label: 'Sin género', value: 'Sin género'},
                {label: 'Masculino', value: 'Masculino'},
                {label: 'Femenino', value: 'Femenino'},
            ],
            submitted: false,
            validationErrors: {},
            countries: [],
            searchQuery: ''
        }
    },
    watch: {
        studentData(newVal) {
            if (newVal) {
                this.student = { ...newVal };
            }
            console.log(newVal)
        }
    },
    computed: {
        filteredCountries() {
            if (!this.searchQuery) {
                return this.$store.state.student.countries;
            }
            else {
                const query = this.searchQuery.toLowerCase();
                return this.$store.state.student.countries.filter(country =>
                    country.name.toLowerCase().startsWith(query)
                );
            }
        },
        nationalityCode() {
            return this.$store.state.student.studentInfo.nationality;
        },
        genderValue() {
            return this.$store.state.student.studentInfo.gender;
        },
        ...mapState('student', ['studentData', 'countries']),
        },
    //countryService: null,
    methods: {
        ...mapActions('student', ['fetchCountries', 'checkStudentByDNI', 'updatePersonalInfo']),
        handleInputChange(event) {
            const fieldName = event.target.name;
            const value = event.target.value;
            this.$store.commit('student/UPDATE_STUDENT_FIELD', { field: fieldName, value: value });
        },
        onNationalitySelected(selectedNationality) {
            this.$store.commit('student/SET_NATIONALITY', selectedNationality.code);
        },
        onGenderSelected(selectedGender) {
            this.$store.commit('student/SET_GENDER', selectedGender.value);
        },
        nextPage() {
            this.submitted = true;

            if (this.validateForm()) {
                const studentData = {
                    first_name: this.student.first_name,
                    middle_name: this.student.middle_name,
                    first_lastname: this.student.first_lastname,
                    second_lastname: this.student.second_lastname,
                    doc_number: this.student.doc_number,
                    birthday: this.student.birthday,
                    birth_place: this.student.birth_place,
                    nationality: this.student.nationality ? this.student.nationality.code : null,
                    gender: this.student.gender ? this.student.gender.value : null,
                    phone: this.student.phone,
                    family_phone: this.student.family_phone,
                    street: this.student.street,
                    number: this.student.number,
                    floor: this.student.floor,
                    department: this.student.department,
                    address_city: this.student.address_city,
                    address_state: this.student.address_state,
                    cp: this.student.cp,
                };

                this.$store.commit('student/setStudentData', studentData);

                if (this.student && !this.student.id) {
                    this.$store.dispatch('person/fetchPersonByDNI', this.student.doc_number).then(() => {
                        const personData = this.$store.getters['person/getPersonData'];
                        if (personData && personData.success) {
                            this.$toast.add({ severity: 'error', summary: 'Verifique el DNI', detail: 'Ya existe un usuario/a con ese documento', life: 4000 });
                        } else {
                            this.$emit('next-page', { pageIndex: 0 });
                        }
                    });
                } else {
                    this.$emit('next-page', { pageIndex: 0 });
                }
            }
        },
        validateForm() {
            if (!this.student.first_name || !this.student.first_name.trim()){
                this.validationErrors['first_name'] = true;
                this.msg['first_name'] = 'Este campo es obligatorio';
            }
            else if (!(/^[a-zA-Z]+$/.test(this.first_name))){
                    this.msg['first_name'] = 'El nombre solo puede contener letras';
                    this.validationErrors['first_name'] = true;
            }else
                delete this.validationErrors['first_name'];

            if (!this.student.first_lastname || !this.student.first_lastname.trim()){
                this.validationErrors['first_lastname'] = true;
                this.msg['first_lastname'] = 'Este campo es obligatorio';
            }
            else if (!(/^[a-zA-Z]+$/.test(this.first_lastname))){
                    this.msg['first_lastname'] = 'El apellido solo puede contener letras';
                    this.validationErrors['first_lastname'] = true;
            }
            else
                delete this.validationErrors['first_lastname'];

            if (!this.student.doc_number || !this.student.doc_number.trim()){
                this.validationErrors['doc_number'] = true;
                this.msg['doc_number'] = 'Este campo es obligatorio';
            }
            else
                delete this.validationErrors['doc_number'];

            return !Object.keys(this.validationErrors).length;
        },
        searchCountry(event) {
            this.searchQuery = event.query.trim();
        },
    }
}
</script>

<style lang="scss" scoped>
.Dropdown {
    width: 14rem;
}

.label-modified {
    display: block;
    position: relative;
}

.label-modified label{
    top: -.75rem;
    font-size: 12px;
    position: absolute;
    margin-top: -.5rem;
    line-height: 1;
    left: 0.75rem;
    color: #6c757d;
    box-sizing: border-box;
    font-family: var(--font-family);
}
</style>