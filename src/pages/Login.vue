<template>
    <Toast/>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 mt-5 xl:mt-0 text-center">
                <!-- <img :src="'layout/images/logo-' + logoColor + '.svg'" alt="Sakai logo" class="mb-5" style="width:81px; height:60px;"> -->
                <img :src="'/images/logo-jif.png'" alt="Jif Logo" class="mb-5" style="width:300px; height:300px;">
            </div>
            <div class="col-12 xl:col-5" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="text-center mb-5">
                        <!-- <img src="layout/images/avatar.png" alt="Image" height="50" class="mb-3">
                        <div class="text-900 text-3xl font-medium mb-3">Welcome, Isabel!</div> -->
                        <!-- <span class="text-600 font-medium">Inicia sesión para continuar</span> -->
                    </div>
                
                    <div class="w-full md:w-10 mx-auto">
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" v-model="email" type="text" class="w-full mb-3" placeholder="Email" style="padding:1rem;" />
                
                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" :feedback="false" v-model="password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem" @keydown.enter="login"></Password>
                
                        <div class="flex align-items-center justify-content-between mb-5">
                            <div class="flex align-items-center">
                                <Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2"></Checkbox>
                                <label for="rememberme1">Recuerdame</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Olvidaste tu password?</a>
                        </div>
                        <Button label="Ingresar" v-on:click="login()" class="w-full p-3 text-xl"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import clienteAxios from '../config/axios'
export default {
    data() {
        return {
            email: '',
            password: '',
            checked: false,
            errors: []
        }
    },
        methods: {
            async login() {
                const formData = {
                    email: this.email,
                    password: this.password
                }

                await clienteAxios.post('auth/login/', formData).then(response =>{
                    const token = response.data.key

                    this.$store.commit('setToken', token)
                    clienteAxios.defaults.headers.common['Authorization'] = "Token " + token

                    clienteAxios.get('auth/user/').then(response =>{
                        if(response.status == 200){

                            const body = response.data
                            localStorage.setItem('email', body.email)
                            localStorage.setItem('first name', body.first_name)
                            localStorage.setItem('last name', body.first_lastname)
                        }

                    })

                    localStorage.setItem("token", token)

                    this.$router.push('/')

                }).catch(error => {
                    if( error.response) {

                        for (const property in error.response.data) {
                            this.$toast.add({severity:'error', summary: 'Hubo un error', detail: error.response.data[property].toString(), life: 3000});
                        }
                    } else if (error.message) {
                        console.log(error.message)
                    } else {
                        console.log(error)
                    }
                })

            },
        },
    computed: {
        logoColor() {
            if (this.$appState.darkTheme) return 'white';
            return 'dark';
        }
    }
}
</script>

<style scoped>
.pi-eye {
    transform:scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform:scale(1.6);
    margin-right: 1rem;
}
</style>