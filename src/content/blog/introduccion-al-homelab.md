---
title: "Introducción a mi HomeLab"
description: "Primera parte de cómo he construido mi homelab"
pubDate: "May 27 2026"
heroImage: "/homelab-hero.png"
category: "proyectos"
tags: ["informatica", "docker", "linux", "redes"]
---
# Introducción
Me he propuesto explicar al mundo cómo he construido mi homelab, los servicios que he desplegado, las funciones de cada uno y los ajustes y configuraciones que he ido realizando.
También me he propuesto ser constante con las publicaciones que vaya haciendo (intentaré una a la semana).

He decidido dividir todo el trabajo que he hecho en bloques, para no hacer posts demasiado largos, estos son: 

 [**Introducción a mi HomeLab - Puesta en marcha y primeros pasos**](/blog/introduccion-al-homelab/)
 [**Bloque de Red I - Dominios**](/blog/bloque-de-red-I)
- **Bloque de Red II - Servicios**
- **Bloque de Gestión I - Administración**
- **Bloque de Gestión II - Monitorización**
- **Bloque de Servicios**
- **Retoques, copias de seguridad y extras**

> Irán apareciendo los enlaces según vaya haciendo las publicaciones

## Un poco de teoría

Antes de iniciar a crear el homelab, creo que está bien aclarar algo de teoría para entender un poco las cosas de las que se van a hablar aquí, así como programas, aplicaciones y servicios usados.

Pero antes de eso, **¿Qué es un homelab?**. Pues es un entorno de laboratorio informático que se construye en casa para alojar servicios propios y experimentar con tecnología, redes y ciberseguridad. Permite aprender, mejorar habilidades profesionales y ejecutar proyectos personales sin riesgos, utilizando desde portátiles antiguos o Raspberry Pi hasta servidores en rack profesionales.

Con esta definición, y como iréis viendo, se deja claro que no hacen falta equipos superpotentes para tener una infraestructura en condiciones y lista para desplegar varios servicios útiles.

## La Red
La red es simple, no esperéis un switch aruba de 24 puertos 1Gb ni tampoco un TP-Link cutre de 6 puertos, solo hay dos servidores, por lo que van directos al router usando cable ethernet CAT.7.
La topología es simple: el router actúa también como switch y gestiona las conexiones entre los dispositivos, sin trampa ni cartón. Como sé que os gustan las imágenes, os dejo una: 
<img src="https://assets.jrodriiguezg.link/imagen.png" width="320" style="display: block; margin: 1.5rem auto; border-radius: 12px; box-shadow: var(--box-shadow);" />

A nivel logico es algo mas caotico, ahora no me parare a explicar cada cosa por que eso lo iremos viendo poco a poco, por ahora solo os muestro el diagrama logico: 
<img src="https://assets.jrodriiguezg.link/Captura%20de%20pantalla_20260527_202248.png" width="800" style="display: block; margin: 1.5rem auto; border-radius: 12px; box-shadow: var(--box-shadow);" />



## Los equipos
Bueno, como vais a ver el hardware usado es bastante modesto, aunque a día de redacción de este post ya cuento con dos equipos, cuando inicié el homelab solo contaba con una humilde Raspberry Pi 4B de 4GB (es humilde pero se defiende), esta Raspberry Pi sigue estando montada en la infraestructura y aloja los servicios más importantes.
Más tarde me compré mediante Wallapop un HP Elitedesk 705 G3, que la verdad por los 60 euros que costó fue un muy buen upgrade. A continuación detallo las especificaciones de cada uno de estos equipos:

### Raspberry Pi 4B
La Raspberry Pi es bastante conocida por los frikis de la informática, electrónica y cualquier persona que tenga aficiones geek y curiosidad por hacer proyectos, pero si da la casualidad que estás leyendo esto y no tienes ni idea de qué es, te pondré en contexto:
La Raspberry Pi es un ordenador de placa única (SBC), de un tamaño bastante reducido (como una tarjeta de crédito), monta un procesador ARM como el que llevan los móviles que le permite consumir poco y no necesitar de refrigeración. Una placa como esta tiene bastantes usos: algunos la usan como un mini PC, otros la usan para proyectos de electrónica e informática.

En mi caso yo tengo desde hace varios años la Pi 4B de 4GB, con ella he hecho de todo y le he instalado de todo y aquí sigue dando guerra, sus especificaciones son:
- **CPU**: Broadcom BCM2711 4 x 1,50Ghz
- **GPU**: VideoCore VI 500Mhz
- **RAM**: 4GB LPDDR4-3200
- **Conectividad**: Wifi 2,4/5 Ghz, Bluetooth 5.0 y Ethernet 1Gb
- **Almacenamiento**: Depende del usuario, yo le tengo una MicroSD de 64GB de la marca Lexar

<img src="https://www.tiendatec.es/14429-large_default/raspberry-pi-4-modelo-b-4gb.jpg" alt="Pi 4B" width="320" style="display: block; margin: 1.5rem auto; border-radius: 12px; box-shadow: var(--box-shadow);" />

Para el sistema operativo estoy usando RaspberryPiOS Lite que se basa en Debian 12 Bookworm, ya veréis que en temas de servidor siempre uso y usaré Debian, ya que es lo más estable a largo plazo y con el mejor soporte de la comunidad (jamás me veréis con Ubuntu).

La configuración fue simple usando la herramienta de *Raspberry Pi Imager*, grabé en la tarjeta SD la imagen de RaspberryPiOS y configuré el SSH en el arranque, el resto fue enchufar a la corriente y conectar por red y listo. Todo lo demás se hace por SSH.

### HP Elitedesk 705 G3
Este equipo fue una adquisición de hace unos meses, dado que quería expandir los servicios que tenía y la Raspberry Pi estaba al borde de apagarse para siempre. Este equipo lo adquirí por Wallapop por unos 60 euros, y yo lo mejoré con unas piezas que tenía. Yo ahora diré las características actuales, no las que tenía cuando me llegó:

- **CPU**: AMD PRO A10-8770E 4 x 3.08Ghz
- **GPU**: AMD Radeon R7
- **RAM**: 16GB DDR4-SODIMM
- **Conectividad**: Qualcomm Atheros QCA9377 + BCM5762 1Gb
- **Almacenamiento**: Kingston 128GB SSD (SO)
- **Películas**: WD Blue 1TB NVMe
- **Copias de Seguridad**: WD easystore 5TB
- **Música**: Genérico Aliexpress 512GB NVMe

<img src="https://assets.jrodriiguezg.link/Captura%20de%20pantalla_20260527_195822.png" alt="fastfetch" width="550" style="display: block; margin: 1.5rem auto; border-radius: 12px; box-shadow: var(--box-shadow);" />

En cuanto al sistema operativo, ya he dado una pista en la imagen anterior pero volvemos a tener Debian, ya he dicho que no iba a usar otra cosa.
Aquí el despliegue fue algo diferente ya que tuve que instalarlo y después habilitar el SSH.

## La base de ambos
Como ya he dicho, de base tenemos Debian. A nivel de sistema operativo los únicos paquetes que tienen instalados son:
- `tailscale`
- `docker`
- `vsftpd`
- `kpatch`
- `nfs-common` y `nfs-kernel-server`
- `needrestart`
- `rsync`
- `zstd`

A nivel de sistema operativo solo hay eso, en ambos (bueno y el fastfetch para hacer la imagen).
Todos los servicios se han desplegado usando contenedores de Docker, usando el instalador oficial:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```
Una vez Docker está instalado, todo lo demás se ha desplegado usando docker-compose.

## La imagen
No podía acabar esta entrada sin enseñar una imagen de la súper infraestructura, a esta imagen le falta el disco duro de 5TB ya que es una adquisición reciente.

<img src="https://assets.jrodriiguezg.link/imagen(1).png" alt="Super infraestructura" width="600" style="display: block; margin: 1.5rem auto; border-radius: 12px; box-shadow: var(--box-shadow);" />

