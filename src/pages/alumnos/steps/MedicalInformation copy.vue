<template>
    <div class="flex align-items-center py-5 px-3">
        <div class="p-fluid">
            <div class="field">
                <label for="firstname">Firstname</label>
                <InputText id="firstname" v-model="firstname" :class="{'p-invalid': validationErrors.firstname && submitted}">
                </InputText>
                <small v-show="validationErrors.firstname && submitted" class="p-error">Firstname is required.</small>
            </div>
            <div class="field">
                <label for="lastname">Lastname</label>
                <InputText id="lastname" v-model="lastname" :class="{'p-invalid': validationErrors.lastname && submitted}">
                </InputText>
                <small v-show="validationErrors.lastname && submitted" class="p-error">Lastname is required.</small>
            </div>
            <div class="field">
                <label for="age">Age</label>
                <InputNumber id="age" v-model="age"></InputNumber>
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
                    if (this.validateForm() ) {
                        this.$emit('next-page', {formData: {firstname: this.firstname, lastname: this.lastname, age: this.age}, pageIndex: 0});
                    }
                },
                prevPage() {
                    this.$emit('prev-page', {pageIndex: 1});
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