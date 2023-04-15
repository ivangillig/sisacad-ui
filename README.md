# Sistema Académico - UI

Trabajo final para la tecnicatura universitaria en programación de la **UTN - Río Grande**

Aplicación front end para la gestión y administración de un sistema escolar a través de una API desarrollada en Python y Django/DRF.

##### Link al repositorio backend -> https://github.com/ivangillig/sisacad-api

## Índice

- [Sistema Académico - UI](#sistema-académico---ui)
- [Configuración Inicial](#configuración-inicial)
  - [Clonar el repositorio](#1-clonar-el-repositorio)
  - [Construcción de imagen docker](#2-construcción-de-imagen-docker)
  - [Levantar los servicios con docker-compose](#3-levantar-los-servicios-con-docker-compose)
  - [Acceso a la consola del docker](#para-acceder-a-la-consola-del-docker-escribir-en-otra-terminal)
  - [Usuarios de prueba](#users-de-prueba)

## Configuración Inicial

#### 1. Clonar el repositorio
Clonar el repositorio en la ruta deseada:
```sh
git clone https://gitlab.com/ivan.gillig/sisacad-ui
```
Luego acceder a la carpeta del proyecto 
```sh
cd sisacad-ui
```

#### 2. Construcción de imagen docker
```sh
sudo docker-compose build
```
#### 3. Levantar los servicios con docker-compose
```sh
sudo docker-compose up
```

#### Para acceder a la consola del docker, escribir en otra terminal:
```sh
sudo docker exec -it Sisacad_UI sh
```

<br>
<br>

#### Users de prueba
**Admin**
```sh
user: admin@jif.com
pass: admin
```


