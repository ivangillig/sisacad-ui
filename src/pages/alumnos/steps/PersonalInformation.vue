<template>

<div class="col-12">
			<div class="card">
				<h5>Advanced</h5>
				<div class="p-fluid formgrid grid">
					<div class="field col-12 md:col-6">
						<label for="firstname2">Nombre</label>
						<InputText id="firstname2" type="text" :class="{'p-invalid': validationErrors.firstname && submitted}"/>
                        <small v-show="validationErrors.firstname && submitted" class="p-error">El nombre es obligatorio.</small>
					</div>
					<div class="field col-12 md:col-6">
						<label for="lastname2">Apellido</label>
						<InputText id="lastname2" type="text"/>
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
						<InputText id="zip" type="text"/>
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
    data() {
        return {
            firstname: '',
            lastname: '',
            age: null,
            submitted: false,
            validationErrors: {}
        }
    },
    methods: {
        nextPage() {
            this.submitted = true;
            if (this.validateForm()) {
                this.$emit('next-page', { formData: { firstname: this.firstname, lastname: this.lastname, age: this.age }, pageIndex: 0 });
            }
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