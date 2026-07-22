function formatearFecha(fecha) {
  const [dia, mes, año] = fecha.split('-');
  
  // El mes en JS va de 0 a 11 (enero es 0, mayo es 4)
  const fechaFormateada = new Date(año, mes - 1, dia);

  const opciones = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };

  // Reemplazamos "de" por "del" antes del año para cumplir con tu formato exacto
  return fechaFormateada.toLocaleDateString('es-ES', opciones).replace(' de 20', ' del 20');
}
export {
    formatearFecha
}