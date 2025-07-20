const ramos = [
  {
    nivel: 1,
    cursos: [
      { codigo: "FGRA050-19", nombre: "EDUCACIÓN FÍSICA Y SALUD" },
      { codigo: "ICJU050-23", nombre: "SISTEMA JURÍDICO" },
      { codigo: "ICJU055-23", nombre: "HISTORIA DEL DERECHO" },
      { codigo: "ICJU060-23", nombre: "TEORÍA CONSTITUCIONAL" },
      { codigo: "ICJU065-23", nombre: "JURISDICCIÓN" },
      { codigo: "ICJU070-23", nombre: "INVESTIGACIÓN JURÍDICA" }
    ]
  },
  {
    nivel: 2,
    cursos: [
      { codigo: "ICJU075-23", nombre: "RAZONAMIENTO JURÍDICO", prereqs: ["ICJU050-23"] },
      { codigo: "ICJU080-23", nombre: "HISTORIA DEL DERECHO CHILENO" },
      { codigo: "ICJU085-23", nombre: "DERECHO CONSTITUCIONAL ORGÁNICO", prereqs: ["ICJU060-23"] },
      { codigo: "ICJU090-23", nombre: "CONCEPTOS FUNDAMENTALES DE DERECHO PRIVADO" },
      { codigo: "ICJU095-23", nombre: "COMUNICACIÓN ORAL Y ESCRITA", prereqs: ["ICJU070-23"] }
    ]
  },
  // Agrega más niveles y cursos...
];

const aprobados = new Set(JSON.parse(localStorage.getItem("aprobados") || "[]"));

function crearMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  ramos.forEach(nivel => {
    const nivelDiv = document.createElement("div");
    nivelDiv.className = "nivel";
    nivelDiv.innerHTML = `<h2>Semestre ${nivel.nivel}</h2>`;

    nivel.cursos.forEach(ramo => {
      const div = document.createElement("div");
      div.className = "ramo";
      div.textContent = ramo.nombre;
      div.dataset.codigo = ramo.codigo;

      const tienePrerrequisitos = ramo.prereqs && ramo.prereqs.length > 0;
      const prerequisitosCumplidos = !tienePrerrequisitos || ramo.prereqs.every(c => aprobados.has(c));

      if (!prerequisitosCumplidos) {
        div.classList.add("bloqueado");
      } else if (aprobados.has(ramo.codigo)) {
        div.classList.add("aprobado");
      }

      div.addEventListener("click", () => {
        if (div.classList.contains("bloqueado")) return;

        if (aprobados.has(ramo.codigo)) {
          aprobados.delete(ramo.codigo);
        } else {
          aprobados.add(ramo.codigo);
        }
        localStorage.setItem("aprobados", JSON.stringify([...aprobados]));
        crearMalla(); // actualizar vista
      });

      nivelDiv.appendChild(div);
    });

    contenedor.appendChild(nivelDiv);
  });
}

crearMalla();
