import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';

const routes = [
    {
        path: '/',
        name: 'app',
        component: App,
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('./pages/Home.vue'),
                meta: { requireLogin: true}
            },
            {
                path: '/formlayout',
                name: 'formlayout',
                component: () => import('./components/FormLayoutDemo.vue')
            },
            {
                path: '/input',
                name: 'input',
                component: () => import('./components/InputDemo.vue')
            },
            {
                path: '/floatlabel',
                name: 'floatlabel',
                component: () => import('./components/FloatLabelDemo.vue')
            },
            {
                path: '/invalidstate',
                name: 'invalidstate',
                component: () => import('./components/InvalidStateDemo.vue')
            },
            {
                path: '/button',
                name: 'button',
                component: () => import('./components/ButtonDemo.vue')
            },
            {
                path: '/table',
                name: 'table',
                component: () => import('./components/TableDemo.vue')
            },
            {
                path: '/list',
                name: 'list',
                component: () => import('./components/ListDemo.vue')
            },
            {
                path: '/tree',
                name: 'tree',
                component: () => import('./components/TreeDemo.vue')
            },
            {
                path: '/panel',
                name: 'panel',
                component: () => import('./components/PanelsDemo.vue')
            },
            {
                path: '/overlay',
                name: 'overlay',
                component: () => import('./components/OverlayDemo.vue')
            },
            {
                path: '/media',
                name: 'media',
                component: () => import('./components/MediaDemo.vue')
            },
            {
                path: '/messages',
                name: 'messages',
                component: () => import('./components/MessagesDemo.vue')
            },
            {
                path: '/file',
                name: 'file',
                component: () => import('./components/FileDemo.vue')
            },
            {
                path: '/chart',
                name: 'chart',
                component: () => import('./components/ChartDemo.vue')
            },
            {
                path: '/misc',
                name: 'misc',
                component: () => import('./components/MiscDemo.vue')
            },
            {
                path: '/crud',
                name: 'crud',
                component: () => import('./pages/CrudDemo.vue')
            },
            {
                path: '/alumnos',
                name: 'crudalumnos',
                component: () => import('./pages/alumnos/CrudAlumnos.vue'),
                meta: { requireLogin: true}
            },
            {
                path: '/alumnos/formulario',
                name: 'nuevoalumno',
                redirect: '/alumnos/formulario/informacionpersonal',
                component: () => import('./pages/alumnos/AddStudent.vue'),
                meta: { requireLogin: true},
                props: true,
                children: [
                    {
                        path: 'informacionpersonal',
                        component: () => import('./pages/alumnos/steps/PersonalInformation.vue'),
                        meta: { requireLogin: true}
                    },
                    {
                        path: 'informacioninstitucional',
                        component: () => import('./pages/alumnos/steps/InstitutionalInformation.vue'),
                        meta: { requireLogin: true}
                    },
                    {
                        path: 'informacionextra',
                        component: () => import('./pages/alumnos/steps/MedAuthInformation.vue'),
                        meta: { requireLogin: true}
                    },
                    {
                        path: 'confirmacion',
                        component: () => import('./pages/alumnos/steps/Confirmation.vue'),
                        meta: { requireLogin: true}
                    },
                ],
            },
            {
                path: '/asociar-alumnos',
                name: 'addStudentToGrade',
                component: () => import('./pages/cursos/AddStudentToGrade.vue'),
                meta: { requireLogin: true}
            },
            {
                path: '/administracion/curso_lectivo',
                name: 'crudCursoLectivo',
                component: () => import('./pages/cursos/CrudCourseByYear.vue'),
                meta: { requireLogin: true}
            },
            {
                path: '/administracion/niveles',
                name: 'crudNivel',
                component: () => import('./pages/administracion/CrudNivel.vue'),
                meta: { requireLogin: true}
            },
            {
                path: '/administracion/divisiones',
                name: 'crudDivision',
                component: () => import('./pages/administracion/CrudDivision.vue'),
                meta: { requireLogin: true}
            },
            {
                path: '/administracion/modalidades',
                name: 'crudModalidad',
                component: () => import('./pages/administracion/CrudModalidad.vue'),
                meta: { requireLogin: true}
            },
            {
                path: '/administracion/grados',
                name: 'crudGrado',
                component: () => import('./pages/administracion/CrudGrado.vue'),
                meta: { requireLogin: true}
            },
            {
                path: '/administracion/pagos',
                name: 'pagos',
                component: () => import('./pages/administracion/payments/StudentFeePayment.vue'),
                meta: { requireLogin: true}
            },
            {
                path: '/timeline',
                name: 'timeline',
                component: () => import('./pages/TimelineDemo.vue')
            },
            {
                path: '/empty',
                name: 'empty',
                component: () => import('./components/EmptyPage.vue')
            },
            {
                path: '/documentation',
                name: 'documentation',
                component: () => import('./components/Documentation.vue')
            },
            {
                path: '/blocks',
                name: 'blocks',
                component: () => import('./components/BlocksDemo.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./pages/Login.vue')
    },
    {
        path: '/landing',
        name: 'landing',
        component: () => import('./pages/LandingDemo.vue')
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('./pages/Error.vue')
    },
    {
        path: '/notfound',
        name: 'notfound',
        component: () => import('./pages/NotFound.vue')
    },
    {
        path: '/access',
        name: 'access',
        component: () => import('./pages/Access.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

import store from '../store';
import axios from "axios";

router.beforeEach((to, from, next) => {

    if (to.matched.some(record => record.meta.requireLogin)){
        if ( !store.state.auth.isAuthenticated ){
            next('/login')
        }else{
            // Recupera el token del localStorage
            const token = localStorage.getItem('token')

            if (token) {
                axios.defaults.headers.common['Authorization'] = "Token " + token;
                next();
            } else {
                axios.defaults.headers.common['Authorization'] = '';
                next('/login');
            }
        }
    } else {
        next(); // does not require auth, call next()
    }
})

export default router;
