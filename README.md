#TagTemplate.js
TagTemplate.js es un script pensado para agilizar el desarrollo de front-end dividiendo el html en elementos así tener un mayor control sobre el HTML. 

*El mismo al usar AJAX deberá ser ejecutado en un servidor (local) para su correcto funcionamiento.
##Estructura de trabajo
En el root del proyecto se debe crear la carpeta "elements" (puede cambiarse luego) donde se incluira una carpeta por cada tipo de elemento. Por ejemplo:
```sh
/elements/
/resources/
----/scripts/
--------/tagtemplate.min.js
--------/jquery.min.js
----/styles/
----/images/
/index.html
/secciones.html
/noticia.html
```

##Como iniciarlo
Incluir el archivo /libs/tagtemplate.min.js debajo de la llamada a jQuery, para luego iniciarlo:
```sh
<script src="resources/scripts/jquery.min.js"></script>
<script src="resources/scripts/tagtemplate.min.js"></script>
<script>
    var TPL = new Templates();
    TPL.init();
</script>
```
##Creando nuestro primer elemento
Los elementos comunes en todos los desarrollos son el Header y Footer. Vamos a sumar tambien un preview de noticia y un banner para poder cubrir todas las opciones. 
1. Creamos dentro de /elements/ la carpeta correspondiente al modulo, por ejemplo, creamos la carpeta /header/
2. Dentro de la carpeta /header/ se debe crear un html y css con el mismo nombre, por lo que agregamos dentro de la misma el archivo **header.html** y **header.css**
3. En el caso de que tengamos distintas instancias del mismo modulo se deberan nombrar de la siguiente manera. Para el caso del header con el usuario logueado el html seria **header-logueado.html**

Quedando la estructura de carpetas de la siguiente manera:
```sh
/elements/
----/header/
--------/header.css
--------/hedaer.html
--------/header-logueado.html
/resources/
index.html
```
##Agregando el elemento al template.
Para agregar el elemento al template de html se deberá incluir con el siguiente tag:
```sh
<t name="#archivo#"></t>
```
Donde **#archivo#** es el nombre del element a incluir. Por ejemplo:
```sh
<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title></title>
</head>
<body>
	
	<t name="header"></t>
	
	<script src="resources/scripts/jquery.min.js"></script>
	<script src="resources/scripts/tagtemplate.min.js"></script>
	<script type="text/javascript">
		var Tpl = new Templates();
		Tpl.init();
	</script>
</body>
</html>
```
De esta manera se incluira el archivo *header.html* y *header.css*. En el caso de querer incluir la instancia de logueo se debera agregar el atributo **instance** donde el nombre de la instancia es la parte marcada en negrita en el nombre del archivo header-**logueado**.html:
```sh
<t name="header" instance="logueado"></t>
```
#Documentacion
Incluir un template:
```sh
<t name="header"></t>
```
Incluir la instancia de un template:
```sh
<t name="header" instance="logueado"></t>
```
Si se necesitar incluir un archivo que no tiene el mismo nombre que el elemento y se encuentra en la misma carpeta debera inclurise con el atributo **filename**:
```sh
<t name="header" filename="clima.html"></t>
```
Si el template requiere un javascript, por defecto debería llamarse igual al elemento, en este caso **header.js** siendo asi debería agregarse el atributo **script**:
```sh
<t name="header" instance="logueado" script></t>
```
Si el javascript se encuetra en otra carpeta:
```sh
<t name="header" script="path/to/other/script.js"></t>
```
Si el javascript es externo:
```sh
<t name="header" script="http://cdn.site.com/external/script.js"></t>
```
Si se necesita incluir un archivo mas de 1 vez:
```sh
<t name="noticia" size="10"></t>
```
Si un mismo elementos se utiliza en dos lugares distintos pero la imagen que se encuentra dentro tiene distinto tamaño se puede utilizar el atributo **image**:
```sh
<t name="noticia" image="320|180"></t>
<t name="noticia" image="160|90" size="4"></t>
```
Si necesitamos incluir un elemento dento de un listado se puede utilizar un *<include>*. El incluido se determina por la posicion, por ejemplo si necesitamos incluir un banner en la posicion 3 del elemento:
```sh
<t name="noticia" size="10">
    <include onposition="2">
        <t name="banner" instance="300x250"></t>
    </include>
</t>
```
Se puede indicar si se quiere incluir el banner antes del elemento de la posicion 2 o posterior al mismo, esto se puede realizar agregando el atributo **before** o **after**
```sh
<t name="noticia" size="10">
    <include onposition="2" after>
        <t name="banner"></t>
    </include>
    <include onposition="5" before>
        <t name="banner"></t>
    </include>
</t>
```

#Contacto
Desarrollado por @agusrdelia para agilizar y organizar el desarrollo de front-end. Por dudas, consultas o errores escribir a: adelia@iconosur.com