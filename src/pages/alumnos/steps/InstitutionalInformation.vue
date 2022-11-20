<template>
    <div class="flex align-items-center py-5 px-3">
        <div class="p-fluid">
            <div class="field">
                <label for="email">Email Institucional</label>
                <InputText id="email" v-model="email" :class="{'p-invalid': validationErrors.email && submitted}">
                </InputText>
                <small v-show="validationErrors.email && submitted" class="p-error">El email institucional es obligatorio.</small>
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
                    email: '',
                    submitted: false,
                    validationErrors: {}
                }
            },
            methods: {
                nextPage() {
                    this.submitted = true;
                    if (this.validateForm() ) {
                        this.$emit('next-page', {formData: {email: this.email}, pageIndex: 1});
                    }
                },
                prevPage() {
                    this.$emit('prev-page', {pageIndex: 1});
                },
                validateForm() {
                    if (!this.email.trim())
                        this.validationErrors['email'] = true;
                    else
                        delete this.validationErrors['email'];


                    return !Object.keys(this.validationErrors).length;
                }
            }
}
</script>