const profesionales = {
  medico: [
    { nombre: "Dr. Juan Pérez", domicilio: "Av. Siempre Viva 123", obraSocial: "OSDE", tiempoEspera: 3 },
    { nombre: "Dra. Ana López", domicilio: "Calle Salud 456", obraSocial: "Swiss Medical", tiempoEspera: 7 }
  ],
  abogado: [
    { nombre: "Ab. Laura Fernández", domicilio: "Av. Justicia 789", matricula: "AB12345" },
    { nombre: "Ab. Carlos Gómez", domicilio: "Calle Legal 321", matricula: "AB67890" }
  ],
  arquitecto: [
    { nombre: "Arq. Pablo Ruiz", domicilio: "Av. Diseño 159", matricula: "AR11111" }
  ],
  ingeniero: [
    { nombre: "Ing. Sofía Castro", domicilio: "Calle Técnica 753", matricula: "IN22222" }
  ]
};

let profesionalSeleccionado = null;

function mostrarProfesionales(tipo) {
  const contenedor = document.getElementById('listaProfesionales');
  contenedor.innerHTML = '';

  const resultados = profesionales[tipo];
  document.getElementById('calendario').style.display = 'none';

  resultados.forEach(p => {
    const div = document.createElement('div');
    div.classList.add('profesional');
    div.innerHTML = `
      <h3>${p.nombre}</h3>
      <p><strong>Domicilio:</strong> ${p.domicilio}</p>
      ${p.matricula ? `<p><strong>Matrícula:</strong> ${p.matricula}</p>` : ''}
      ${p.obraSocial ? `<p><strong>Obra Social:</strong> ${p.obraSocial}</p>` : ''}
      ${p.tiempoEspera ? `<p><strong>Espera:</strong> ${p.tiempoEspera} días</p>` : ''}
      <button onclick="mostrarCalendario('${p.nombre}')">Solicitar Turno</button>
    `;
    contenedor.appendChild(div);
  });
}

function mostrarCalendario(nombre) {
  profesionalSeleccionado = nombre;
  document.getElementById('calendario').style.display = 'block';

  const fechaInput = document.getElementById('fecha');
  fechaInput.value = '';
  fechaInput.oninput = () => {
    const fecha = new Date(fechaInput.value);
    const dia = fecha.getDay();
    if (dia === 0 || dia === 6) {
      alert("No hay turnos disponibles los fines de semana.");
      fechaInput.value = '';
    }
  };

  const horas = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
  const selectHora = document.getElementById('hora');
  selectHora.innerHTML = '<option value="">Seleccione un horario</option>';
  horas.forEach(h => {
    const opt = document.createElement('option');
    opt.value = h;
    opt.textContent = h;
    selectHora.appendChild(opt);
  });
}

function confirmarTurno() {
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;
  if (!fecha || !hora) {
    alert("Seleccione fecha y hora.");
    return;
  }

  const mensaje = `Hola, quiero solicitar un turno con ${profesionalSeleccionado} el ${fecha} a las ${hora}.`;
  const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

// Auto abrir desde sesión si se viene desde inicio
window.onload = () => {
  const tipo = sessionStorage.getItem('prof');
  if (tipo && document.getElementById('listaProfesionales')) {
    mostrarProfesionales(tipo);
    sessionStorage.removeItem('prof');
  }
};
