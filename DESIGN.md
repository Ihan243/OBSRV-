# OBSRV® — Interactive Streetwear Showroom & E-Commerce

> **"EVERYONE LOOKS. FEW OBSRV."**  
> Indumentaria de autor y plataforma de streetwear editorial de San José, Costa Rica.

---

## 🖤 Sistema de Diseño y Filosofía

| Elemento | Especificación |
| :--- | :--- |
| **Colores Principales** | `obsrv-black` (`#0B0B0B`), `obsrv-card` (`#121212`), `obsrv-charcoal` (`#1A1A1A`), `obsrv-white` (`#F2F0EA`) |
| **Acentos y Bordes** | `obsrv-accent` (`#E53E3E`), `obsrv-muted` (`#858585`), `obsrv-border` (`#262626`) |
| **Tipografía Editorial** | **Bodoni Moda** (Serif de alto contraste editorial), **Space Grotesk** (Sans/Mono brutalista), **Syncopate** (Titulares extendidos de impacto) |
| **Moneda Oficial** | Colones Costarricenses (CRC - ₡) con soporte para envíos nacionales e internacionales |

---

## 🚀 Arquitectura y Componentes Desarrollados

1. **Perchero Digital 3D Interactivo (`HeroRack.jsx`)**:
   - Barra metálica con textura y soportes estructurales.
   - Perchas de madera maciza grabadas con el isotipo **OBSRV** y ganchos de acero colgados del riel.
   - Perspectiva tridimensional (`perspective: 1400px`) con rotación axial de cada prenda en reposo.
   - Efecto *tilt & lift* al pasar el cursor (hover), elevando la prenda e iluminando la etiqueta flotante informativa.
   - Clic directo para expandir la prenda en el visor inmersivo.

2. **Renderizador Vectorial de Indumentaria (`GarmentSVG.jsx`)**:
   - Generación SVG en tiempo real con textura de tela mediante filtros de turbulencia (`fractalNoise`).
   - Mockups fotorealistas para:
     - *Hoodies pesados* (420 GSM French Terry con bolsillo canguro, capucha estructurada y coordenadas `09°56'N 84°05'W`).
     - *T-Shirts Oversize* (260 GSM con caída de hombros ancha y gráfica brutalista San José Urban Study).
     - *Chaqueta Workwear* (Lona estructurada, cremallera metálica central y bolsillos simétricos).
     - *Pantalones Cargo Tácticos* (Bolsillos ripstop y cintas de ajuste).
     - *Crewneck* (Bone White con remates de canalé ancho).

3. **Catálogo con Filtros Editoriales (`CollectionGrid.jsx`)**:
   - Barra de filtros por categoría: **Todas (6)**, **Hoodies & Sweaters (2)**, **T-Shirts (2)**, **Chaquetas (1)** y **Pantalones (1)**.
   - Contador dinámico de piezas activas.
   - Botón directo de "Visualizar Pieza" y acceso rápido de "+ Carrito".

4. **Visor Inmersivo de Prenda (`ProductModal.jsx`)**:
   - Modal a pantalla completa con desenfoque de fondo cinematográfico.
   - Animación de levitación suave (`animate-float-slow`).
   - Selector interactivo de tallas Oversize Fit (S, M, L, XL).
   - Navegación bidireccional continua con flechas o teclado (**Flecha Izquierda**, **Flecha Derecha**, **Escape** para salir).

5. **Carrito de Compras Deslizable (`CartDrawer.jsx`)**:
   - Panel lateral deslizante con memoria local persistente (`localStorage`).
   - Ajuste de cantidades (+/-), eliminación individual y desglose de subtotales en tiempo real.
   - Botón de checkout automático hacia **WhatsApp Oficial** con el pedido formateado en detalle (prendas, tallas, subtotales y solicitud de SINPE Móvil).

6. **Marquesina Continua Brutalista (`MarqueeBanner.jsx`)**:
   - Ticker sin interrupción con la identidad de marca, manifiesto y origenjosefino.

7. **Editorial & Manifiesto (`EditorialSection.jsx` y `ManifestoSection.jsx`)**:
   - Fotografía de campaña monocromática, estética underground y manifiesto del corte de 240g a 420g.

---

## 🛠️ Cómo ejecutar el proyecto

- **Modo Desarrollo:**
  ```powershell
  npm.cmd run dev
  ```
- **Compilar para Producción:**
  ```powershell
  npm.cmd run build
  ```
- **Previsualizar Build:**
  ```powershell
  npm.cmd run preview
  ```
- **Versión Estática Inmediata:**
  Puedes abrir directamente en el navegador:
  - [standalone_showroom.html](file:///c:/Users/iraul/Downloads/OneDrive/Escritorio/FLOREIA%20MUÑOZ/standalone_showroom.html)
  - O los archivos originales en: [stitch_obsrv_interactive_streetwear_showroom/obsrv_interactive_streetwear_experience_con_filtros/code.html](file:///c:/Users/iraul/Downloads/OneDrive/Escritorio/FLOREIA%20MUÑOZ/stitch_obsrv_interactive_streetwear_showroom/obsrv_interactive_streetwear_experience_con_filtros/code.html)
