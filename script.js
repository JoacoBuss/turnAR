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

function buscarProfesionales() {
    const profesion = document.getElementById('profesion').value;
    const contenedor = document.getElementById('listaProfesionales');
    contenedor.innerHTML = '';

    if (!profesion) {
        contenedor.innerHTML = '<p>Seleccione una profesión.</p>';
        return;
    }

    let resultados = profesionales[profesion];

    if (profesion === 'medico') {
        const obra = document.getElementById('obraSocial').value.toLowerCase();
        const espera = document.getElementById('tiempoEspera').value;
        resultados = resultados.filter(m => 
            (!obra || m.obraSocial.toLowerCase().includes(obra)) &&
            (!espera || m.tiempoEspera <= espera)
        );
    }

    if (resultados.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron profesionales.</p>';
        return;
    }

    resultados.forEach(p => {
        const div = document.createElement('div');
        div.classList.add('profesional');
        div.innerHTML = `
            <h3>${p.nombre}</h3>
            <p><strong>Domicilio:</strong> ${p.domicilio}</p>
            ${p.matricula ? `<p><strong>Matrícula:</strong> ${p.matricula}</p>` : ''}
            ${p.obraSocial ? `<p><strong>Obra Social:</strong> ${p.obraSocial}</p>` : ''}
            ${p.tiempoEspera ? `<p><strong>Espera:</strong> ${p.tiempoEspera} días</p>` : ''}
            <button onclick="solicitarTurno('${p.nombre}')">Solicitar Turno</button>
        `;
        contenedor.appendChild(div);
    });
}

function solicitarTurno(nombre) {
    const mensaje = `Hola, quiero solicitar un turno con ${nombre}.`;
    const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

document.getElementById('profesion').addEventListener('change', (e) => {
    document.getElementById('filtrosMedico').style.display = e.target.value === 'medico' ? 'block' : 'none';
});