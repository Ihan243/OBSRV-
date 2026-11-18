# OBSRV — imágenes de las prendas del perchero

El sitio muestra inicialmente las prendas con el componente SVG. Ahora puede mostrar imágenes fotorrealistas sin romper la interfaz si falta una imagen.

## Cómo agregar fotografías oficiales

1. Exporta cada prenda en PNG o WebP con transparencia real (sin un rectángulo negro), vista frontal y, opcionalmente, vista lateral.
2. Guarda los archivos en `public/assets/garments/`.
3. En el producto correspondiente de `src/data/products.js`, añade:

```js
rackImage: '/assets/garments/obsrv-01.webp',
rackHangerIncluded: true // solo si la fotografía ya incluye la percha
```

4. El perchero y el visor ampliado utilizan `GarmentMedia`; si la imagen no carga, vuelven al SVG existente. Deja `rackHangerIncluded` sin definir si la foto no incluye percha, para mantener visible la percha del sitio.
5. Para venta real, verifica estampado, tallas, precio, disponibilidad y derechos de uso con OBSRV.

Los mockups conceptuales elaborados durante el desarrollo **no son fotografías oficiales de productos**. No deben publicarse como imágenes de mercancía confirmada sin validación explícita.

## Cambios dentro de esta entrega

- Textura textil y pliegues más profundos sobre el SVG.
- Hover más realista y presentación lateral.
- Hangers físicos de madera y acero sobre la barra.
- Visor preparado para las fotos, manteniendo el carrito.
- Corrección del orden de hooks de React en el visor.
