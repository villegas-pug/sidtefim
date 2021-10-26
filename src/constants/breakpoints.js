/*
   » Pantalla de 19 pulgadas (relación estándar): 1280 x 1024 píxeles
   » Pantalla de 20 pulgadas (relación estándar): 1600 x 1200 píxeles
   » Pantalla de 22 pulgadas (pantalla panorámica): 1680 x 1050 píxeles
   » Pantalla de 24 pulgadas (pantalla panorámica): 1900 x 1200 píxeles 
*/
//-------------------------------------------------------------------------------------------------------------

export const breakpoints = [
   { name: 'mobile', measure: 320 },
   { name: 'mobileLandscape', measure: 480 },
   { name: 'tablet', measure: 768 },
   { name: 'tabletLandscape', measure: 1024 },
   { name: 'desktop', measure: 1200 },
   { name: 'desktopLarge', measure: 1500 },
   { name: 'desktopWide', measure: 1800 },
].sort(({ measure: a }, { measure: b }) => {
   if (a > b) return -1
   else if (a < b) return 1
   else return 0
})

export const screens = breakpoints.reduce((map, { name }) => (map[name] = name, map), {})