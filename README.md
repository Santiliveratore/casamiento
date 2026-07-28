# Casamiento — Página base con imagenes responsivas

Proyecto React (Vite) minimal para mostrar un diseño completo como imagen única.

Cómo ejecutar:

1. Instalar dependencias

```bash
npm install
```

2. Levantar servidor de desarrollo

```bash
npm run dev
```

Estructura relevante:

- [index.html](index.html)
- [src/App.jsx](src/App.jsx) — Componente principal con `picture` responsive.
- [src/styles.css](src/styles.css) — Estilos que aseguran `width:100%` y `height:auto`.
- Carpeta `Diseno/` en la raíz: colocar `pc.webp` y `celular.webp` allí.

Notas:
- La imagen completa no se recorta ni se usa `background-size: cover`.
- La caja `.stage` tiene `position: relative` para poder posicionar overlays absolutos.
