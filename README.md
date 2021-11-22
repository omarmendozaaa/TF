# [Predicción de la Contaminación del Aire con Regresión Lineal Simple 🤖]

    Monitoreo y control de la predicción de los niveles de las partículas respirables (PM2.5/PM10) identificadas por las etiquetas que tenemos, las cuales representaran los diferentes distritos que hay en lima metropolitana.

## Introducción

    El Servicio Nacional de Meteorología e Hidrología del Perú ha realizado una investigación durante el mes de marzo del año 2021, para obtener los parámetros contaminantes y meteorológicos. La investigación que se presentará es acerca de la contaminación ambiental que se da en el Perú, exactamente en el departamento de Lima, por lo que nuestro objetivo es predecir o estimar resultados para el monitoreo de los niveles de contaminación teniendo en cuenta ciertos parámetros como hora, lugar y entre otros.
    Utilizaremos regresión lineal simple, el cual es un algoritmo de aprendizaje supervisado que se utiliza en machine learning. Por otro lado, se presentará una arquitectura de diseño y el sprint backlog.

## Motivación

    Para nuestra propuesta, hemos visto el panorama completo sobre la contaminación del aire, por eso hemos encontrado distintos problemas en diferentes ámbitos los cuales afectan negativamente a muchos peruanos diariamente, los cuales son los siguientes:
        • Salud: Las consecuencias en la salud, las partículas PM2.5 y PM10 encontradas en el aire en los distintos distritos de Lima a ciertas horas del día como SO2, NO2, O3 y CO, repercuten negativamente en la salud cuando una persona se expone mucho a estas partículas, por eso una de nuestras motivaciones es poder saber que tan dañinas son estas cantidades de partículas a las que una persona está expuesta y que medidas deberían ser tomadas al respecto.
        • Económico: Al ser Lima la capital de nuestro país, el que este contaminada con este tipo de partículas es algo que impacta negativamente en campos como el turismo que tienen gran impacto en nuestra economía, por eso nuestra motivación en este ámbito sería el poder saber que distritos son los más contaminados y tomar medidas al respecto para no tener efectos negativos en el turismo y demás actividades económicas.
        • Social: La contaminación del aire al ser un problema de salud afecta a la calidad de vida de todos los ciudadanos residentes de los distintos distritos de Lima, nuestra motivación en este aspecto es el poder mejorar la calidad de vida erradicando o controlando el problema de la contaminación.

## Arquitectura

![  ](https://i.ibb.co/LtW5RXt/Dise-o-de-arquitectura.png)

### 1. Inicializar Microservicios

#### `go run hello.go`

    Nos dirigimos a la siguiente ruta: ./backend/microservicioEntrenamiento/ y ejecutamos "go run hello.go"
    Esto comenzará el servicio de entrenamiento

    Nos dirigimos a la siguiente ruta: ./backend/microservicioPrediccion/ y ejecutamos "go run hello.go"
    Esto comenzará el servicio de predicción

### 2. Inicializar Nodos

#### `npm test`

#### `npm run build`

#### `npm run eject`

### 3. Inicializar aplicación web

#### `npm install`

    Nos dirigimos a la ruta: ./frontend y ejecutamos "npm install"
    Instalremos las dependencias que requiere el proyecto (axios, reactstrap)

#### `npm start`

    Finalmente, en la misma ruta ejecutaremos "npm start" que levantará el servicio en el puerto 3000
    Para acceder: "http://localhost:3000"

### 4. Happy Predict

    🤖🤖
