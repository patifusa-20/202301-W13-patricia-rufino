<img align="right" width="179" height="118" alt="ISDI CODER LOGO" src="/public/assets/isdi_logo_hq.jpg">

**PROYECTO FINAL BOOTCAMP**

### :zap: Creador de cartas digitales de restaurante

---

**DESCRIPCIÓN DEL PROYECTO**

Aplicación web dirigida a propietarios de restaurantes que necesitan crear y mantener actualizada la carta de su restaurante.

La aplicación permitirá al usuario crear una carta de restaurante donde podrá hacer un CRUD de productos.

Funcionalidades:

-   Perfil de usuario. El usuario podrá añadir el logo, la imagen principal de la carta, nombre de su restaurante y su nombre.
-   Carta. Esta carta contendrá un listado de Productos.
-   CRUD Producto. El usuario podrá crear los productos que quiere ofrecer en su carta uno a uno mediante un formulario. Cada producto que cree, será añadido automáticamente a la carta.
-   CRUD Producto - Extra. El usuario podrá elegir una imagen para su producto de un listado de imágenes que comparten la query correspondiente a la categoría del producto de la API de **[Unsplash](https://unsplash.com/documentation#get-a-topic)**.

---

**MODELO DE DATOS**

![Modelo de datos](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/96d6a354-8dce-4825-8e49-8db52e7b3c20/Untitled.png)

---

**COMPONENTES Y RESPONSABILIDADES**

**Componentes**

-   **LOGIN_BTN.** Permitirá al usuario hacer login con Google.
-   **LOGOUT_BTN.** Permitirá al usuario hacer logout.
-   **PROFILE**. Recibirá el **_UserType_** y mostrará sus datos en un formulario que se podrá editar.
-   **PROFILE_BTN**. Dará acceso a PROFILE.
-   **MENUS**. Mostrará el listado de Menus **_Array<MenuType>_** existentes.
-   **MENU.** Cargará en una estructura de “card” algunos datos del producto **_MenuType_** y enrutará a PRODUCTSPAGE.
-   **PRODUCTS_FILTER**. Mostrará el listado de categorías **_Array<CategoryType>_** y recibirá el **_MenuType_** correspondiente al usuario logado. Pasará a PRODUCTS un listado de productos **_Array<ProductType>_** filtrados por la categoría seleccionada por el usuario ( ProductType[category][id] === CategoryType[id]) .
-   **PRODUCTS**. Mostrará el listado de Productos **_Array<ProductType>_** y dará acceso al modo “edición de productos” si el propietario de dicha carta está logado.
-   **ADD_PRODUCT_BTN.** Indicar a PRODUCT_ADD que lo se va a editar es un nuevo producto.
-   **PRODUCT**. Cargará en una estructura de “card” algunos datos del producto **_ProductType._** Si no está logado**_,_** abrirá la página de detalle del producto DETAILSPAGE Si está logado, abrirá la página de Añadir/Actualizar producto ADDPAGE.
-   **PRODUCT_DETAILS.** Mostrará los datos del producto **_ProductType._**
-   **PRODUCT_ADD**. Contendrá un formulario que recogerá todos los datos introducidos para el producto **_ProductType_**.
-   **ADD_IMAGE**. Mostrará modal con 2 opciones para cargar imagen. Desde local (Se almacenará en Firebase Storage) o desde librería pública (UNSPLASH).
-   **MODAL_EXT_IMAGE.** Recibe query procedente de **_CategoryType_** y carga listado de imágenes **_Array<ImageType>_** procedentes de API pública.
-   **IMAGE_CARD.** Carga una estructura de “card” con algunos datos de la imagen **_ImageType_** procedentes de la API pública.
-   **HEADER.** Contendrá el enrutado a PROFILEPAGE desde PROFILE_BTN si el usuario se loguea.
-   ROUTES.
-   LAYOUT.
-   APP.

**Páginas**

-   **HOMEPAGE.** Mostrará LOGIN_BTN y MENUS.
-   **ADDPAGE.** Mostrará el formulario de producto. PRODUCT_ADD.
-   **DETAILSPAGE.** Mostrará el detalle del producto. PRODUCT_DETAILS.
-   **PRODUCTSPAGE.** Mostrará PRODUCTS_FILTER, PRODUCTS y si cumple condición ADD_PRODUCT_BTN.
-   **PROFILEPAGE.** Mostrará PROFILE, LOGOUTBTN, ADD_IMAGE.

---

**DISEÑO UI FIGMA**

[https://www.figma.com/file/fFDXQn6EbSN4rmSgR0ZNNT/Final-Project?node-id=0%3A1&t=2nRYWgCNFbrWuJhh-1](https://www.figma.com/file/fFDXQn6EbSN4rmSgR0ZNNT/Final-Project?node-id=0%3A1&t=2nRYWgCNFbrWuJhh-1)

## Resultado

https://patricia-challenge-w13.netlify.app/

https://sonarcloud.io/summary/overall?id=patifusa-20_202301-W13-patricia-rufino

## Tecnologías usadas

![Logos of used technologies](/public/assets/tech_logos_v2.jpg)
