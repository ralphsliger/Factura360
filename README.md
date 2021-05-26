# Factura360

Es un Sistema de Facturacion e Inventarios para tu negocio desarrollado en MEAN. (MONGO, EXPRESS, ANGULAR, NODEJS) y Un Dashboard hecho en Dash.


### Estructura del proyecto 
La estructura del proyecto esta organizado de acuerdo a cada servicio 
- Sistema Ventas (Carpeta Global)

#### Backend
    - Back (Carpeta Backend - NodeJS / ExpressJS)
      - Controllers (Controladores del Proyecto)
          - categoria
          - cliente
          - usuario
          - venta
          - productos
      - Models (Modelo Representacion de cada Objeto)
          - categoria
          - cliente
          - detalle venta
          - producto
          - usuario
          - venta 
      - Routes (Rutas http)
          - categoria
          - cliente
          - producto
          - usuario
          - venta 
      - Uploads (Carpeta para guardar archivos) 
      
      
   #### Frontend 
    - Front (Carpeta Frontend - Angular)
      - SRC (Directorio Global Proyecto)
        - app (Codigo Proyecto)
          - components (componentes de cada modulo)
              -Producto
              -Usuario
              -Ventas
              -Categorias
              -Etc
           - services (se establecen los servicios para conexion con el backend de cada modulo)
              - cliente
              - producto
              - venta
              - Global (Direccion/Ruta Backend) 
        - assets (Utilidades proyecto: Css, Fonts, Imgs)
        - enviroments (Configuraciones)
        
   #### Dashboard Dash
       
    - dashapp (carpeta global)
      - nuevodash.py (Dashboard de Restaurantes)
      - restaurant-1-orders.csv (Dataset restaurantes new york)
      - env (carpeta de entorno virtual con virtual env)
      

 
 
# Iniciar proyecto
 
## Correr Backend 
 Primero ingresamos a la carpeta back
 `cd back`
 
 Instalamos las dependencias
 `npm i`
 
 Ejecutamos el Backend
 `npm start`


## Correr Frontend 
 En otra terminal, es necesario correr las dos al tiempo
 Primero ingresamos a la carpeta front
 `cd front`
 
 Instalamos las dependencias
 `npm i`
 
 Ejecutamos el Backend
 `ng serve`



## Correr Dashboard
En otra terminal

 Primero ingresamos a la carpeta dashapp
 `cd dashapp`

## Activar entorno virtual
 `source env/bin/activate`

### Iniciar servidor
`python nuevodash.py`

# Preview Proyecto
![Captura de Pantalla 2021-05-26 a la(s) 10 54 23 a  m](https://user-images.githubusercontent.com/8931588/119692490-13275b80-be11-11eb-8d8f-00e9c77e89fe.png)


