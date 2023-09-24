<template>
	<div :class="containerClass" @click="onWrapperClick">
        <AppTopBar @menu-toggle="onMenuToggle" />
        <div class="layout-sidebar" @click="onSidebarClick">
            <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
        </div>

        <div class="layout-main-container">
            <div class="layout-main">
                <router-view />
            </div>
            <AppFooter />
        </div>

		<AppConfig :layoutMode="layoutMode" @layout-change="onLayoutChange" />
        <transition name="layout-mask">
            <div class="layout-mask p-component-overlay" v-if="mobileMenuActive"></div>
        </transition>
	</div>
</template>

<script>
import AppTopBar from './AppTopbar.vue';
import AppMenu from './AppMenu.vue';
import AppConfig from './AppConfig.vue';
import AppFooter from './AppFooter.vue';

import axios from 'axios'; //agregado para login

export default {
    emits: ['change-theme'],
    data() {
        return {
            layoutMode: 'static',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            menu : [
                {
                    label: 'Administracion',
                    items: [
                        {
                            label: 'ABM Secretaría', icon: 'pi pi-fw pi-th-large',
                            items: [
                                { label: 'Niveles', icon: 'pi pi-fw pi-filter-fill', to: '/administracion/niveles' },
                                { label: 'Divisiones', icon: 'pi pi-fw pi-filter-fill', to: '/administracion/divisiones' },
                                { label: 'Modalidades', icon: 'pi pi-fw pi-filter-fill', to: '/administracion/modalidades' },
                                { label: 'Años/Grados', icon: 'pi pi-fw pi-filter-fill', to: '/administracion/grados' },
                            ]
                        },
                        {
                            label: 'Cuotas/Matriculas', icon: 'pi pi-fw pi-money-bill',
                            items: [
                                { label: 'Registrar pago', icon: 'pi pi-fw pi-plus-circle', to: '/administracion/pagos' },
                            ]
                        },
                        {
                            label: 'Cargos docentes', icon: 'pi pi-fw pi-fw pi-briefcase',
                            items: [
                                { label: 'Alta/baja de cargos', icon: 'pi pi-fw pi-inbox' },
                                { label: 'Certificación de servicios', icon: 'pi pi-file-pdf' },
                                { label: 'Prestación de servicios', icon: 'pi pi-file-pdf' },
                            ]
                        },
					]
                },
                {
                    label: 'Alumnos',
                    items: [
                        {
                            label: 'Gestión de Alumnos', icon: 'pi pi-fw pi-user-edit',
                            items: [
                                { label: 'Listado Alumnos', icon: 'pi pi-fw pi-users', to: '/alumnos' },
                                { label: 'Tutores', icon: 'pi pi-fw pi-users' },
                            ]
                        },
					]
                },
                {
                    label: 'Cursos',
                    items: [
                        {
                            label: 'Cursos lectivos', icon: 'pi pi-fw pi-user-edit',
                            items: [
                        {
                            label: 'Listado de cursos', icon: 'pi pi-fw pi-filter-fill', to: '/administracion/curso_lectivo'
                        },
                        {
                            label: 'Alta de alumno en curso', icon: 'pi pi-fw pi-plus-circle', to: '/asociar-alumnos'
                        },
                    ]
                }]
                },
                {
                    label: 'Docentes',
                    icon: 'pi pi-fw pi-users',
                    items: [
                        {
                            label: 'Gestión de Docentes', icon: 'pi pi-fw pi-users',
                            items: [
                                {label: 'Listado Docentes', icon: 'pi pi-fw pi-filter-fill'},
                                {label: 'Recibos de haberes', icon: 'pi pi-fw pi-folder'},
                                {label: 'Licencias', icon: 'pi pi-fw pi-clock'},
                                {label: 'Estadísticas', icon: 'pi pi-fw pi-chart-line'},
                            ]
                        },
                    ]
                },
            ]
        }
    },
    watch: {
        $route() {
            this.menuActive = false;
            this.$toast.removeAllGroups();
        }
    },
    methods: {
        onWrapperClick() {
            if (!this.menuClick) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }

            this.menuClick = false;
        },
        onMenuToggle() {
            this.menuClick = true;

            if (this.isDesktop()) {
                if (this.layoutMode === 'overlay') {
					if(this.mobileMenuActive === true) {
						this.overlayMenuActive = true;
					}

                    this.overlayMenuActive = !this.overlayMenuActive;
					this.mobileMenuActive = false;
                }
                else if (this.layoutMode === 'static') {
                    this.staticMenuInactive = !this.staticMenuInactive;
                }
            }
            else {
                this.mobileMenuActive = !this.mobileMenuActive;
            }

            event.preventDefault();
        },
        onSidebarClick() {
            this.menuClick = true;
        },
        onMenuItemClick(event) {
            if (event.item && !event.item.items) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }
        },
		onLayoutChange(layoutMode) {
			this.layoutMode = layoutMode;
		},
        addClass(element, className) {
            if (element.classList)
                element.classList.add(className);
            else
                element.className += ' ' + className;
        },
        removeClass(element, className) {
            if (element.classList)
                element.classList.remove(className);
            else
                element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        },
        isDesktop() {
            return window.innerWidth >= 992;
        },
        isSidebarVisible() {
            if (this.isDesktop()) {
                if (this.layoutMode === 'static')
                    return !this.staticMenuInactive;
                else if (this.layoutMode === 'overlay')
                    return this.overlayMenuActive;
            }

            return true;
        }
    },
    computed: {
        containerClass() {
            return ['layout-wrapper', {
                'layout-overlay': this.layoutMode === 'overlay',
                'layout-static': this.layoutMode === 'static',
                'layout-static-sidebar-inactive': this.staticMenuInactive && this.layoutMode === 'static',
                'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
                'layout-mobile-sidebar-active': this.mobileMenuActive,
				'p-input-filled': this.$primevue.config.inputStyle === 'filled',
				'p-ripple-disabled': this.$primevue.config.ripple === false
            }];
        },
        logo() {
            return (this.$appState.darkTheme) ? "images/logo-white.svg" : "images/logo.svg";
        }
    },
    beforeUpdate() {
        if (this.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden');
        else
            this.removeClass(document.body, 'body-overflow-hidden');
    },
    components: {
        'AppTopBar': AppTopBar,
        'AppMenu': AppMenu,
        'AppConfig': AppConfig,
        'AppFooter': AppFooter,
    },
    beforeCreate(){
        const token = localStorage.getItem('token')

        if (token) {
            axios.defaults.headers.common['Authorization'] = "Token " + token
        } else {
            axios.defaults.headers.common['Authorization'] = ''
        }
    }

}
</script>

<style lang="scss">
@import './App.scss';
</style>
