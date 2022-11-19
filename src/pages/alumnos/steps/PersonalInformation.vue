<template>

<div class="col-12 mt-4">
			<div class="card">
                
				<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-3">
						<label for="first_name">Primer Nombre</label>
						<InputText id="first_name" type="text" :class="{'p-invalid': validationErrors.first_name && submitted}"/>
                        <small v-show="validationErrors.first_name && submitted" class="p-error">El nombre es obligatorio.</small>
					</div>
                    <div class="field col-12 md:col-3">
						<label for="firstname2">Segundo Nombre</label>
						<InputText id="firstname2" type="text" />
					</div>
                    <div class="field col-12 md:col-3">
						<label for="first_lastname">Apellido Paterno</label>
						<InputText id="first_lastname" type="text" :class="{'p-invalid': validationErrors.firstname && submitted}" />
                        <small v-show="validationErrors.first_lastname && submitted" class="p-error">El Apellido es obligatorio.</small>
					</div>
					<div class="field col-12 md:col-3">
						<label for="lastname2">Apellido Materno</label>
						<InputText id="lastname2" type="text"/>
					</div>

                    <!-- <div class="field col-12 md:col-4">						
                        <label for="lastname2">Correo Institucional</label>
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                                <i class="pi pi-inbox"></i>
                            </span>
                            <InputText placeholder="E-mail" />
                        </div>
                    </div> -->

                    <!-- dni
                    email personal
                    lugar de nacimiento
                    nacionalidad
                    genero
                    direccion
                    barrio
                    telefono familiar -->


					<div class="field col-12 md:col-3">
						<label for="doc_number">DNI</label>
						<InputMask id="doc_number" mask="99.999.999"/>
					</div>

                    <div class="field col-12 md:col-4">
						<label for="birthdate">Fecha de nacimiento</label>
                        <Calendar id="birthdate" v-model="date1" :minDate="minDate" :maxDate="maxDate" dateFormat="dd-mm-yy" :showButtonBar="true" :showIcon="true" />
					</div>

                    
					<div class="field col-12">
						<label for="address">Dirección</label>
						<Textarea id="address" rows="4"/>
					</div>
					<div class="field col-12 md:col-6">
						<label for="city">Ciudad</label>
						<InputText id="city" type="text" />
					</div>
					<div class="field col-12 md:col-3">
						<label for="state">Provincia</label>
						<Dropdown id="state" v-model="dropdownItem" :options="dropdownItems" optionLabel="name" placeholder="Selecciona una"></Dropdown>
					</div>
					<div class="field col-12 md:col-3">
						<label for="zip">CP</label>
						<InputText id="zip" type="number"/>
					</div>
				</div>
			</div>
		</div>

    <div class="grid grid-nogutter justify-content-between">
        <i></i>
        <Button label="Siguiente" @click="nextPage()" icon="pi pi-angle-right" icon-pos="right"></Button>
    </div>
</template>

<script>
export default {
    created() {
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
    data() {
        return {
            
            first_name: '',
            first_lastname: '',
            date1: null,
            doc_number: '',
            submitted: false,
            validationErrors: {}
        }
    },
    methods: {
        nextPage() {
            console.log({formData: { first_name: this.first_name, first_lastname: this.first_lastname, }})
            this.submitted = true;
            if (this.validateForm()) {
                this.$emit('next-page', { formData: { first_name: this.first_name, first_lastname: this.first_lastname, }, pageIndex: 0 });
            }
        },
        validateForm() {
            if (!this.first_name.trim())
                this.validationErrors['first_name'] = true;
            else
                delete this.validationErrors['first_name'];

            if (!this.first_lastname.trim())
                this.validationErrors['first_lastname'] = true;
            else
                delete this.validationErrors['first_lastname'];

            return !Object.keys(this.validationErrors).length;
        }
    }
}
</script>