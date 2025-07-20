<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Malla Interactiva Derecho</title>
  <style>
    body {
      font-family: sans-serif;
      background: #f4f4f4;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      padding: 2rem;
    }
    .nivel {
      border: 2px solid #333;
      border-radius: 8px;
      padding: 1rem;
      background: #fff;
      width: 320px;
      flex-shrink: 0;
    }
    .nivel h2 {
      text-align: center;
      margin-bottom: 1rem;
    }
    .ramo {
      margin: 5px 0;
      padding: 6px;
      background-color: #ffc0cb;
      border-radius: 4px;
      cursor: pointer;
    }
    .ramo.aprobado {
      background-color: #800080;
      color: #fff;
      text-decoration: line-through;
    }
    .ramo.bloqueado {
      background-color: #ccc;
      cursor: not-allowed;
    }
  </style>
</head>
<body>

<script>
const niveles = {
  "1": [
    "FGRA050-19|Educación Física y Salud",
    "ICJU050-23|Sistema Jurídico",
    "ICJU055-23|Historia del Derecho",
    "ICJU060-23|Teoría Constitucional",
    "ICJU065-23|Jurisdicción",
    "ICJU070-23|Investigación Jurídica"
  ],
  "2": [
    "ICJU075-23|Razonamiento Jurídico|ICJU050-23",
    "ICJU080-23|Historia del Derecho Chileno",
    "ICJU085-23|Derecho Constitucional Orgánico|ICJU060-23",
    "ICJU090-23|Conceptos Fund. Derecho Privado",
    "ICJU095-23|Comunicación Oral y Escrita|ICJU070-23"
  ],
  "3": [
    "ICJU100-23|Teoría de la Justicia",
    "ICJU105-23|Economía",
    "ICJU110-23|Derechos Fundamentales|ICJU060-23",
    "ICJU115-23|Acto Jurídico|ICJU090-23",
    "ICJU120-23|Proceso Civil Ordinario",
    "ICJU125-23|Análisis Jurisprudencial|ICJU095-23"
  ],
  "4": [
    "ICJU128-23|Derecho Internacional de los DDHH|ICJU110-23",
    "ICJU129-23|Derecho Económico|ICJU105-23",
    "ICJU140-23|Derecho Procesal Constitucional|ICJU065-23",
    "ICJU142-23|Psicología Jurídica y Forense",
    "ICJU144-23|Bienes|ICJU115-23",
    "ICJU150-23|Derecho Probatorio"
  ],
  "5": [
    "ICJU195-23|Introducción al Derecho Penal|ICJU110-23",
    "ICJU202-23|Derecho Societario|ICJU090-23",
    "ICJU204-23|Bases del Derecho Administrativo|ICJU085-23",
    "ICJU206-23|Obligaciones|ICJU115-23",
    "ICJU207-24|Procedimientos Especiales y Recursos Civiles|ICJU120-23",
    "ICJU209-23|Análisis Doctrinal|ICJU125-23",
    "ICJU258-23|Aspectos Prácticos de Estudio de Títulos de Dominio"
  ],
  "6": [
    "ELECT122|Optativo Formación Profesional II",
    "ICJU212-23|Teoría del Delito y Pena|ICJU195-23",
    "ICJU214-23|Derecho Tributario|ICJU204-23",
    "ICJU216-23|Control y Responsabilidad Administración|ICJU204-23",
    "ICJU218-23|Contratos|ICJU115-23",
    "ICJU220-23|Regulaciones Ambientales|ICJU204-23",
    "ICJU222-23|Redacción de Contratos|ICJU095-23,ICJU206-23"
  ],
  "7": [
    "ELECT123|Optativo Formación Profesional III",
    "ICJU224-23|Delitos|ICJU212-23",
    "ICJU226-23|Derecho Individual del Trabajo|ICJU115-23",
    "ICJU228-23|Mercados Regulados|ICJU204-23",
    "ICJU230-23|Responsabilidad Civil|ICJU206-23",
    "ICJU250-23|Proceso Penal|ICJU065-23,ICJU212-23",
    "ICJU251-23|Redacción Instrumentos Administrativos|ICJU204-23,ICJU095-23"
  ],
  "8": [
    "ELECT124|Optativo Formación Profesional IV",
    "ICJU231-23|Resolución Conflictos Trabajo|ICJU120-23,ICJU226-23",
    "ICJU232-23|Títulos de Crédito e Insolvencia|ICJU206-23",
    "ICJU233-23|Derecho y Procedimientos Familia|ICJU206-23,ICJU120-23",
    "ICJU244-23|Derecho y Procedimientos Consumo|ICJU120-23,ICJU230-23",
    "ICJU246-23|Informe Jurídico|ICJU209-23",
    "ICJU254-23|Litigación Penal|ICJU095-23,ICJU224-23,ICJU250-23"
  ],
  "9": [
    "ELECT125|Optativo Formación Profesional V",
    "ICJU234-23|Ética y Responsabilidad Profesional|ICJU250-23,ICJU230-23",
    "ICJU235-23|Derecho Sucesorio|ICJU144-23",
    "ICJU236-23|Pasantía Profesional|ICJU244-23,ICJU233-23,ICJU254-23,ICJU231-23",
    "ICJU256-23|Litigación Civil, Familia y Trabajo|ICJU233-23,ICJU254-23,ICJU231-23"
  ],
  "10": [
    "ICJU298-23|Examen de Licenciatura|ICJU115-23,ICJU209-23,ICJU125-23,ICJU204-23,ICJU144-23,ICJU095-23,ICJU090-23,ICJU085-23,ICJU129-23,ICJU128-23,ICJU150-23,ICJU140-23,ICJU202-23,ICJU110-23,ICJU105-23,FGRA050-19,ICJU055-23,ICJU080-23,ICJU195-23,ICJU070-23,ICJU065-23,ICJU206-23,ELECT120,ICJU208-23,ICJU120-23,ICJU075-23,ICJU050-23,ICJU060-23,ICJU100-23,ICJU218-23,ICJU216-23,ICJU224-23,ICJU226-23,ICJU235-23,ICJU214-23,ICJU244-23,ICJU233-23,ICJU246-23,ICJU256-23,ICJU254-23,ICJU228-23,ELECT121,ELECT122,ELECT123,ELECT124,ELECT125,ICJU236-23,ICJU250-23,ICJU222-23,ICJU251-23,ICJU220-23,ICJU231-23,ICJU230-23,ICJU212-23,ICJU232-23,ICJU234-23"
  ]
};

for (let n in niveles) {
  const cont = document.createElement('div');
  cont.className = 'nivel';
  cont.innerHTML = `<h2>Nivel ${n}</h2>`;
  niveles[n].forEach(r => {
    const [id, nombre, prereqs] = r.split('|');
    const div = document.createElement('div');
    div.className = 'ramo';
    div.id = id;
    div.textContent = nombre;
    if (prereqs) div.dataset.prereqs = prereqs;
    cont.appendChild(div);
  });
  document.body.appendChild(cont);
}

function checkPrerequisitos() {
  document.querySelectorAll('.ramo').forEach(ramo => {
    const prereqList = ramo.dataset.prereqs;
    if (prereqList) {
      const prereqIds = prereqList.split(',');
      const allApproved = prereqIds.every(id => {
        const prereq = document.getElementById(id);
        return prereq && prereq.classList.contains('aprobado');
      });
      if (!allApproved) {
        ramo.classList.add('bloqueado');
      } else {
        ramo.classList.remove('bloqueado');
      }
    }
  });
}

setTimeout(() => {
  document.querySelectorAll('.ramo').forEach(ramo => {
    ramo.addEventListener('click', () => {
      if (ramo.classList.contains('bloqueado')) return;
      ramo.classList.toggle('aprobado');
      checkPrerequisitos();
    });
  });
  checkPrerequisitos();
}, 100);
</script>

</body>
</html>
