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
                        <InputText id="middle_name" type="text" v-model.trim="student.middle_name" @input="handleInputChange" />
                        <label for="middle_name">Segundo Nombre</label>
                    </span>
                </div>

                <div class="field col-12 md:col-3">
                    <span class="label-modified">
                        <InputText id="first_lastname" required v-model.trim="student.first_lastname" @input="handleInputChange" type="text" :class="{'p-invalid': validationErrors.first_lastname && submitted}" />
                        <small v-show="validationErrors.first_lastname && submitted" class="p-error">{{msg.first_lastname}}</small>
                        <label for="first_lastname">Primer Apellido</label>
                    </span>
                </div>
                <div class="field col-12 md:col-3">
                    <span class="label-modified">
                        <InputText id="second_lastname" type="text" v-model.trim="student.second_lastname" @input="handleInputChange" />
                        <label for="second_lastname">Segundo Apellido</label>
                    </span>
                </div>

                <div class="field col-12 md:col-3">
                    <span class="label-modified">
                        <Dropdown id="nationality" v-model="student.nationality" :options="filteredCountries" optionLabel="name" optionValue="code" placeholder="País de nacimiento" :editable="true" @change="handleDropdownChange('nationality', $event)"></Dropdown>
                        <label for="nationality">Nacionalidad</label>
                    </span>
                </div>

                <div class="field col-12 md:col-3">
                    <span class="label-modified">
                        <label for="birthday">Fecha de nacimiento</label>
                        <Calendar id="birthday" v-model="student.birthday" @update:modelValue="handleInputChange({ target: { id: 'birthday', value: $event } })" :minDate="minDate" :maxDate="maxDate" dateFormat="dd-mm-yy"
                        :showButtonBar="true" :showIcon="true" placeholder="dd-mm-aaaa"/>
                    </span>
                </div>

                <div class="field col-12 md:col-6">
                    <span class="label-modified">
                        <label for="birth_place">Lugar de nacimiento</label>
                        <InputText id="birth_place" type="text" v-model="student.birth_place" @input="handleInputChange"/>
                    </span>
                </div>

                <div class="field col-12 md:col-3">
                    <span class="label-modified">
                        <InputMask id="doc_number" required mask="99.999.999" v-model.trim="student.doc_number" :disabled="student.id !== null && student.id !== undefined" @input="handleInputChange"
                        :class="{'p-invalid': validationErrors.doc_number && submitted}" />
                        <small v-show="validationErrors.doc_number && submitted" class="p-error">{{msg.doc_number}}</small>
                        <label for="doc_number">DNI</label>
                    </span>
                </div>

                <div class="field col-12 md:col-3">
                    <span class="label-modified">
                        <Dropdown id="gender" v-model="student.gender" :options="genderOptions" @change="handleDropdownChange('gender', $event)" optionLabel="label" optionValue="value" placeholder="Selecciona un género" class="w-full md:w-14rem"></Dropdown>
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
                    <InputText id="street" type="text" v-model.trim="student.street" @input="handleInputChange" />
                    <label for="street">Calle</label>
                </span>
            </div>

            <div class="field col-12 md:col-2">
                <span class="label-modified">
                    <InputNumber id="number" :min="0" v-model="student.number" @update:modelValue="handleNumberInputChange('number', $event)"/>
                <label for="number">Número</label>
                </span>
            </div>

            <div class="field col-12 md:col-2">
                <span class="label-modified">
                <InputNumber id="floor" :min="0" v-model="student.floor" @update:modelValue="handleNumberInputChange('floor', $event)" showButtons/>
                <label for="floor">Piso</label>
                </span>
            </div>

            <div class="field col-12 md:col-2">
                <span class="label-modified">
                    <InputNumber id="department" :min="0" v-model="student.department" @update:modelValue="handleNumberInputChange('number', $event)" showButtons/>
                    <label for="department">Depto</label>
                </span>
            </div>

            <div class="field col-12 md:col-4">
                <span class="label-modified">
                <InputText id="city" type="text" v-model="student.address_city" @input="handleInputChange" />
                <label for="city">Ciudad</label>
                </span>
            </div>

            <div class="field col-12 md:col-3">
                <span class="label-modified">
                    <Dropdown id="state" v-model="student.address_state" @change="handleDropdownChange('address_state', $event)" :options="stateItems" optionLabel="label" optionValue="value"
                    placeholder="Selecciona una"></Dropdown>
                    <label for="state">Provincia</label>
                </span>
            </div>

            <div class="field col-12 md:col-1">
                <span class="label-modified">
                <InputText id="cp" type="text" v-model="student.cp" @input="handleInputChange" />
                <label for="cp">CP</label>
                </span>
            </div>

            <div class="field col-12 md:col-2">
                <span class="label-modified">
                    <InputText inputId="phone" v-model="student.phone" @input="handleInputChange" max_length="10" :useGrouping="false" />
                    <label for="phone">Teléfono Personal</label>
                </span>
            </div>
            <div class="field col-12 md:col-2">
                <span class="label-modified">
                    <InputText inputId="family_phone" v-model="student.family_phone" @input="handleInputChange" max_length="10" :useGrouping="false" />
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
import { GENDER_OPTIONS, STATE_ITEMS } from '../../../service/Constants/Utils';

export default {
    created() {
        this.AdminService = new AdminService();

        this.minDate = dayjs('1980-01-01').toDate();
        this.maxDate = dayjs().add(1, 'month').startOf('month').toDate();
    },
    mounted() {
        this.fetchCountries();

        if (this.student && this.student.id) {
            const selectedState = this.stateItems.find(state => state.value == parseInt(this.student.address_state));
            if (selectedState) {
                this.student.address_state = selectedState.value;
            }

            const selectedGender = this.genderOptions.find(option => option.value == parseInt(this.student.gender));
            if (selectedGender) {
                this.student.gender = selectedGender.value;
            }
        }
    },
    data() {
        return {
            msg: [],
            stateItems: STATE_ITEMS,
            genderOptions: GENDER_OPTIONS,

            submitted: false,
            validationErrors: {},
            searchQuery: ''
        }
    },
    computed: {
        filteredCountries() {
            if (!this.searchQuery) {
                return this.countries;
            }
            else {
                const query = this.searchQuery.toLowerCase();
                return this.countries.filter(country =>
                    country.name.toLowerCase().startsWith(query)
                );
            }
        },
        ...mapState('student', ['student']),
        ...mapState('person', ['countries']),
        },
    methods: {
        ...mapActions({
            checkStudentByDNI: 'student/checkStudentByDNI',
            updatePersonalInfo: 'student/updatePersonalInfo',
            clearStudent: 'student/clearStudent',
            fetchCountries: 'person/fetchCountries'
        }),
        handleInputChange(event) {
            const fieldName = event.target.id;
            let value;

            if (fieldName === 'birthday') {
                value = dayjs(event.target.value).format('YYYY-MM-DD')
            } else {
                value = event.target.value;
            }

            this.$store.commit('student/UPDATE_STUDENT_FIELD', { field: fieldName, value: value });
        },
        handleNumberInputChange(fieldName, value) {
            this.$store.commit('student/UPDATE_STUDENT_FIELD', { field: fieldName, value: value });
        },
        handleAutoCompleteChange(fieldName, event) {
            const selectedCountry = event.value;
            this.$store.commit('student/UPDATE_STUDENT_FIELD', { field: fieldName, value: selectedCountry });
        },
        handleDropdownChange(fieldName, event) {
            const value = event.value;
            this.$store.commit('student/UPDATE_STUDENT_FIELD', { field: fieldName, value: value });
        },
        onNationalitySelected(selectedNationality) {
            this.$store.commit('student/SET_NATIONALITY', selectedNationality.code);
        },
        nextPage() {
            this.submitted = true;

            if (this.validateForm()) {
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