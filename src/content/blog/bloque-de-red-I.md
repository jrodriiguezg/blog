---
title: "Bloque de Red I - Dominios"
description: "Segunda parte de mi homelab"
pubDate: "May 28 2026"
heroImage: "/cloud-hero.png"
category: "proyectos"
tags: ["informatica", "docker", "linux", "redes"]
---
# Introducción 
Bueno, como en la entrada anterior comenté, iba a dividir el enseñar mi **HomeLab** en diferentes *posts* para no hacerlo demasiado largo. Esta es la segunda publicación de todas las que se vienen. Podría haber puesto todo el bloque de red junto, pero esta parte tiene bastante contenido y se va a hacer largo.

Este es el bloque de red que hace referencia a toda la parte de **Internet** que no gestiono yo directamente.

Si esta es vuestra primera vez leyendo este blog, os invito a ver el resto de entradas aquí: 
 [**Introducción a mi HomeLab - Puesta en marcha y primeros pasos**](/blog/introduccion-al-homelab/)
 [**Bloque de Red I - Dominios**](/blog/bloque-de-red-I)
- **Bloque de Red II - Servicios**
- **Bloque de Gestión I - Administración**
- **Bloque de Gestión II - Monitorización**
- **Bloque de Servicios**
- **Retoques, copias de seguridad y extras**

A continuación, os muestro el diagrama de red **lógico** solo con las partes que enseñaré en este bloque:

<img src="https://assets.jrodriiguezg.link/diagrama_servicios_network.png" alt="Diagrama de red lógico" width="800" style="display: block; margin: 1.5rem auto; border-radius: 12px; box-shadow: var(--box-shadow);" />


## Algo de teoría 
Antes de empezar a hablar del bloque de red y, sobre todo, de esta primera parte (dominios), voy a comentar algo de **teoría** por si la persona que está leyendo esto no conoce los **términos** de los que hablo. Lo primero de todo es:

### ¿Qué es un dominio? 
Es una **dirección única** y exclusiva que identifica un sitio web en **Internet**, permitiendo así a un usuario encontrarlo con facilidad. Es el nombre o dirección postal digital que evita tener que recordar las direcciones IP numéricas. Un ejemplo de esto es este mismo dominio: [docs.jrodriiguezg.link](https://docs.jrodriiguezg.link).

Ahora la siguiente, 

### ¿DNS?
El sistema de **DNS** (Domain Name System) es como la **agenda telefónica** de **Internet**. Su única función es almacenar el dominio y la dirección IP donde se encuentra. Así, cuando alguien escribe un dominio en el buscador, este sistema le redirige de manera **automática** al servidor de alojamiento.

Ahora que sabemos lo que es un **dominio** y el **DNS**, vamos a ver el proveedor que he elegido: **Cloudflare**. 

¿Y por qué **Cloudflare**? Después de ver varias opciones (Ionos, Hostinger, etc.), **Cloudflare** era el que más me ofrecía por menos precio. El plan base tiene bastantes funciones interesantes, es **rápido** y **seguro**, y el panel de analíticas es una maravilla.

Ahora voy a explicar los dominios que tengo: tengo dos **públicos** y uno **privado**, que luego se ramifican en subdominios.

## Los Dominios 
A **nivel interno** tengo un dominio con terminación `.lan`, que luego resuelve a 12 subdominios para cada servicio desplegado, los cuales podemos ver en el siguiente diagrama: 

<img src="https://assets.jrodriiguezg.link/dominios_internos.png" alt="Dominios internos" width="800" style="display: block; margin: 1.5rem auto; border-radius: 12px; box-shadow: var(--box-shadow);" />

> Estos no son accesibles desde **Internet**

A **nivel externo**, es decir, de cara al **público**, tengo dos dominios, ambos comprados en **Cloudflare**. Estos son [jrodriiguezg.link](https://jrodriiguezg.link) y [lemoe.link](https://lemoe.link), de los cuales cuelgan varios subdominios, como vemos ahora: 

<img src="https://assets.jrodriiguezg.link/externos.png" alt="Dominios externos" width="800" style="display: block; margin: 1.5rem auto; border-radius: 12px; box-shadow: var(--box-shadow);" />

Como creo que os habéis dado cuenta porque lo he mencionado, yo uso **Cloudflare** para la **gestión** de la parte expuesta a **Internet**, así como de los dominios. Por ello, y a modo de que veáis un poco la consola de **Cloudflare** ([dash.cloudflare.com](https://dash.cloudflare.com)), voy a enseñar algunas de las configuraciones más **importantes** y partes más destacadas de la consola.

## Paseíto por el dash 
Como he comentado hace medio **párrafo**, ahora voy a enseñar un poco la consola de **Cloudflare**, algunas de las configuraciones que tiene y que he aplicado (solo algunas, ¡esto tiene mil cosas!), así como partes interesantes de la misma.

### Configuraciones básicas y partes interesantes
Lo primero así que voy a remarcar son los **buckets**, que son instancias de almacenamiento que **Cloudflare** da de forma gratuita (hasta 10 GB gratis). Las **imágenes** que veis aquí se almacenan ahí.

<img src="https://assets.jrodriiguezg.link/buckets.png" alt="Cloudflare Buckets" width="600" style="display: block; margin: 1.5rem auto; border-radius: 12px; box-shadow: var(--box-shadow);" />

Otra cosa **interesante** es el poder bloquear ciertos **crawlers**. Estos son los bots que usan las IA y algunos buscadores para escanear las **páginas** web y ver su contenido; yo los tengo **bloqueados** (solo algunos).

<img src="https://assets.jrodriiguezg.link/crawler.png" alt="Crawlers" width="600" style="display: block; margin: 1.5rem auto; border-radius: 12px; box-shadow: var(--box-shadow);" />

La siguiente es la pantalla **más básica**, el *dashboard* de **tráfico** web, que muestra en tiempo real el **tráfico** del dominio o de ambos (depende de la **configuración**).

<img src="https://assets.jrodriiguezg.link/dashboard.png" alt="Dashboard" width="600" style="display: block; margin: 1.5rem auto; border-radius: 12px; box-shadow: var(--box-shadow);" />

Desde los ajustes de seguridad, se pueden bloquear ciertas cosas o activar medidas de seguridad. Algunas son el laberinto de IA o el bloqueo de ataques **DDoS**.

<img src="https://assets.jrodriiguezg.link/settinmgs_secure.png" alt="Ajustes de seguridad" width="600" style="display: block; margin: 1.5rem auto; border-radius: 12px; box-shadow: var(--box-shadow);" />

<img src="https://assets.jrodriiguezg.link/ddos.png" alt="Protección DDoS" width="600" style="display: block; margin: 1.5rem auto; border-radius: 12px; box-shadow: var(--box-shadow);" />

**Cloudflare** no ofrece buzones de correo (al menos no los he encontrado); lo que **sí** ofrece son **direcciones** con **redirección** a correos usando el dominio.

<img src="https://assets.jrodriiguezg.link/email.png" alt="Redirección de correos" width="600" style="display: block; margin: 1.5rem auto; border-radius: 12px; box-shadow: var(--box-shadow);" />

Y, por **último**, los **workers** y **pages**. Esto es almacenamiento de sitios web **estáticos**; **aquí**, por ejemplo, se almacena este mismo blog.

<img src="https://assets.jrodriiguezg.link/pages.png" alt="Workers y Pages" width="600" style="display: block; margin: 1.5rem auto; border-radius: 12px; box-shadow: var(--box-shadow);" />

El paseo ha sido cortito ya que ver todas las opciones del *dash* **haría** este *post* muy largo. Yo, si **estáis** buscando un dominio, os animo a usar **Cloudflare** ya que va muy bien.

Esto no lo he dicho, pero hay dos dominios a nivel externo que sirven el contenido desde mi **infraestructura** local, haciendo uso de un servicio oficial de **Cloudflare** llamado `cloudflared`, el cual vamos a ver ahora. 

## Conexión con la infraestructura local 
Como he **mencionado** antes, tengo dos dominios que se sirven desde la **infraestructura** local (no voy a decir **cuáles** son, pero **están ahí**). Para servir estos dominios, he usado un servicio de **Cloudflare** llamado `cloudflared` que crea un **túnel** entre mi infraestructura y la de **Cloudflare**.

La parte del *dashboard* donde encontramos esto se llama **Cloudflare Zero Trust** o **Cloudflare One**. 

<img src="https://assets.jrodriiguezg.link/one.png" alt="Cloudflare One" width="600" style="display: block; margin: 1.5rem auto; border-radius: 12px; box-shadow: var(--box-shadow);" />

En este caso, nos vamos a los conectores donde tenemos el conector creado; desde **aquí** se gestionan los dominios que queremos exponer.

<img src="https://assets.jrodriiguezg.link/tunel.png" alt="Túnel activo" width="600" style="display: block; margin: 1.5rem auto; border-radius: 12px; box-shadow: var(--box-shadow);" />

Gracias a este servicio, no necesito abrir puertos en el router ni exponer mi infraestructura. Ahora **explicaré cómo** se instala, lo cual es bastante simple:

Para instalar el **túnel**, nos vamos a la consola, a la parte de conectores, y pulsamos en *Create a tunnel*.

<img src="https://assets.jrodriiguezg.link/tunnels.png" alt="Crear túnel" width="600" style="display: block; margin: 1.5rem auto; border-radius: 12px; box-shadow: var(--box-shadow);" />

**Después**, nos **pedirá** el tipo de **túnel** que queremos usar; por ahora, solo he probado `cloudflared`.

<img src="https://assets.jrodriiguezg.link/tunel2.png" alt="Elegir cloudflared" width="600" style="display: block; margin: 1.5rem auto; border-radius: 12px; box-shadow: var(--box-shadow);" />

Le asignamos un nombre.

<img src="https://assets.jrodriiguezg.link/nombre.png" alt="Asignar nombre al túnel" width="600" style="display: block; margin: 1.5rem auto; border-radius: 12px; box-shadow: var(--box-shadow);" />

Y nos **saldrá** una lista de opciones para desplegar; yo uso **Docker** para todo.

<img src="https://assets.jrodriiguezg.link/opciones.png" alt="Opciones de despliegue" width="600" style="display: block; margin: 1.5rem auto; border-radius: 12px; box-shadow: var(--box-shadow);" />

Esto nos **devolverá** un comando con un token; esto es solo copiar y pegar en la terminal y se configura solo. Pasados unos segundos, nos **aparecerá** en la consola de conectores.

<img src="https://assets.jrodriiguezg.link/comando.png" alt="Comando con token" width="600" style="display: block; margin: 1.5rem auto; border-radius: 12px; box-shadow: var(--box-shadow);" />

## Final
Esta entrada **quizás** ha sido algo corta. La siguiente, os aseguro que es algo **más** larga, pero es mejor ofrecer **trocitos** pequeños y con **información** de calidad que un texto gigante que nadie se va a leer. Por ello, hasta aquí hemos visto todo lo que conecta mi infraestructura de cara al exterior. Ahora **hacemos** un punto y aparte hasta el siguiente *post*, en el cual empezaremos a ver la infraestructura a nivel local.
