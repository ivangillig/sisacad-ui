# Sistema Académico - UI

Aplicación front end para la gestion y administración de un sistema escolar a través de una API desarrollada en Python y Django/DRF.

## Configuración Inicial

#### 1- Clonar el repositorio
Clonar el repositorio en la ruta deseada:
```sh
git clone https://gitlab.com/ivan.gillig/sisacad-ui
```
Luego acceder a la carpeta del proyecto 
```sh
cd sisacad-api
```

#### 2- Construcción de imagen docker
```sh
sudo docker-compose build
```
#### 3- Levantar los servicios con docker-compose
```sh
sudo docker-compose up
```
#### 3.2- Si se quiere probar la aplicación sin levantar el docker se puede hacer con el siguiente comando:
```sh
npm run serve
```
#### Users de prueba
**Admin**
```sh
user: admin@jif.com
pass: admin
```

<br>
<br>

#### Link al repositorio frontend
https://github.com/ivangillig/sisacad-ui
