import { useEffect, useState } from 'react'
import sqliImg from './assets/evidencias/sqli_rodvic.png'
import xssImg from './assets/evidencias/xss_rodvic.png'
import comandosImg from './assets/evidencias/comandos_rodvic.png'
import cvssSqliImg from './assets/evidencias/cvss_sqli_rodvic.png'
import cvssXssImg from './assets/evidencias/cvss_xss_rodvic.png'
import cvssComandosImg from './assets/evidencias/cvss_comandos_rodvic.png'
import './App.css'

const findings = [
  {
    name: 'Command Injection',
    score: '10.0',
    severity: 'Critical',
    risk: 'Crítico',
    probability: 'Alta',
    impact: 'Crítico',
    color: 'critical',
    priority: '01',
    short: 'Permite ejecutar comandos del sistema en el servidor.',
  },
  {
    name: 'SQL Injection',
    score: '8.2',
    severity: 'High',
    risk: 'Crítico',
    probability: 'Alta',
    impact: 'Alto',
    color: 'high',
    priority: '02',
    short: 'Permite extraer registros desde la base de datos.',
  },
  {
    name: 'XSS Reflected',
    score: '6.1',
    severity: 'Medium',
    risk: 'Alto',
    probability: 'Media',
    impact: 'Alto',
    color: 'medium',
    priority: '03',
    short: 'Ejecuta JavaScript en el navegador de la víctima.',
  },
]

const riskMarkers = [
  { label: 'Command Injection', row: 0, col: 3 },
  { label: 'SQL Injection', row: 0, col: 2 },
  { label: 'XSS', row: 1, col: 2 },
]

function TitleSlide() {
  return (
    <section className="slide cover-slide">
      <div className="deck-kicker">TI3034 · Fundamentos de Seguridad de la Información</div>
      <div className="cover-content">
        <div>
          <p className="tag">Auditoría Web · React</p>
          <h1>SeguroTotal</h1>
          <p className="lead">Análisis de vulnerabilidades, matriz de riesgo y plan de acción para un portal de clientes de seguros generales.</p>
        </div>
        <div className="cover-card">
          <span>Auditor</span>
          <strong>Vicente Andrés Rodríguez Quezada</strong>
          <small>Proyecto: presentacion_rodvic</small>
        </div>
      </div>
      <div className="cover-footer">SQL Injection · XSS Reflected · Command Injection · CVSS 3.1</div>
    </section>
  )
}

function ContextSlide() {
  return (
    <section className="slide split-slide">
      <Header eyebrow="01 · Contexto" title="Una falla técnica puede convertirse en riesgo de negocio" />
      <div className="split-grid">
        <div className="big-number-card">
          <span>E21</span>
          <h3>SeguroTotal</h3>
          <p>Empresa ficticia de seguros generales. Su portal custodia pólizas, datos patrimoniales y credenciales de clientes.</p>
        </div>
        <div className="bullets-panel">
          <h3>Activos sensibles</h3>
          <ul>
            <li>Pólizas y contratos de seguros.</li>
            <li>Datos patrimoniales de clientes.</li>
            <li>Credenciales y sesiones del portal.</li>
            <li>Servidor web, aplicación y respaldos.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function MethodSlide() {
  const steps = [
    ['1', 'Explorar', 'Ingreso a DVWA y selección de nivel Low.'],
    ['2', 'Explotar', 'Ejecución controlada de los tres payloads.'],
    ['3', 'Medir', 'Cálculo CVSS 3.1 de cada hallazgo.'],
    ['4', 'Priorizar', 'Matriz probabilidad × impacto.'],
    ['5', 'Actuar', 'Controles, mitigación y recuperación.'],
  ]

  return (
    <section className="slide">
      <Header eyebrow="02 · Metodología" title="Del laboratorio al plan de acción" subtitle="La auditoría se realizó solo en un entorno controlado y autorizado." />
      <div className="process-line">
        {steps.map(([number, title, text]) => (
          <article key={title}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function FindingSlide({ title, eyebrow, payload, image, score, severity, color, text }) {
  return (
    <section className={`slide evidence-slide ${color}`}>
      <Header eyebrow={eyebrow} title={title} subtitle={`Payload usado: ${payload}`} />
      <div className="evidence-grid">
        <figure className="screenshot-frame">
          <img src={image} alt={`Evidencia ${title}`} />
          <figcaption>Captura de evidencia ejecutada en DVWA.</figcaption>
        </figure>
        <aside className="score-card">
          <span>CVSS 3.1</span>
          <strong>{score}</strong>
          <em>{severity}</em>
          <p>{text}</p>
        </aside>
      </div>
    </section>
  )
}

function CvssSlide() {
  return (
    <section className="slide">
      <Header eyebrow="06 · Resultados CVSS" title="Gravedad comparada" subtitle="El puntaje CVSS ayuda a ordenar la urgencia técnica de corrección." />
      <div className="cvss-grid">
        {findings.map((finding) => (
          <article className={`cvss-card ${finding.color}`} key={finding.name}>
            <div>
              <span>{finding.priority}</span>
              <h3>{finding.name}</h3>
              <p>{finding.short}</p>
            </div>
            <strong>{finding.score}</strong>
            <em>{finding.severity}</em>
          </article>
        ))}
      </div>
      <div className="mini-evidence-strip">
        <img src={cvssSqliImg} alt="CVSS SQL Injection" />
        <img src={cvssXssImg} alt="CVSS XSS Reflected" />
        <img src={cvssComandosImg} alt="CVSS Command Injection" />
      </div>
    </section>
  )
}

function MatrixSlide() {
  const rows = ['Alta', 'Media', 'Baja', 'Mínima']
  const cols = ['Bajo', 'Medio', 'Alto', 'Crítico']

  return (
    <section className="slide matrix-slide">
      <Header eyebrow="07 · Matriz de riesgo" title="Probabilidad × Impacto" subtitle="La matriz convierte los hallazgos técnicos en prioridades para SeguroTotal." />
      <div className="matrix-layout">
        <div className="matrix-board">
          <div className="blank-cell" />
          {cols.map((col) => <div className="axis-cell" key={col}>{col}</div>)}
          {rows.map((row, rowIndex) => (
            <div className="matrix-row" key={row}>
              <div className="axis-cell row-label">{row}</div>
              {cols.map((col, colIndex) => {
                const marker = riskMarkers.find((item) => item.row === rowIndex && item.col === colIndex)
                return (
                  <div className={`risk-cell heat-${rowIndex + colIndex}`} key={`${row}-${col}`}>
                    {marker && <span>{marker.label}</span>}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        <div className="priority-panel">
          <h3>Orden de remediación</h3>
          {findings.map((finding) => (
            <p key={finding.name}><strong>{finding.priority}</strong> {finding.name} · Riesgo {finding.risk}</p>
          ))}
        </div>
      </div>
    </section>
  )
}

function ControlsSlide() {
  const controls = [
    ['SQL Injection', 'Consultas parametrizadas, validación estricta de tipos y mínimo privilegio en base de datos.'],
    ['XSS Reflected', 'Escape de salida, Content Security Policy, cookies HttpOnly/Secure y validación de entrada.'],
    ['Command Injection', 'Eliminar llamadas directas al sistema, usar APIs seguras, listas blancas y hardening.'],
    ['Transversal', 'WAF, monitoreo, revisión de código, respaldos cifrados y pruebas periódicas.'],
  ]

  return (
    <section className="slide">
      <Header eyebrow="08 · Controles" title="Prevención y mitigación" subtitle="La solución combina código seguro, infraestructura protegida y monitoreo continuo." />
      <div className="control-cards">
        {controls.map(([title, text]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function RecoverySlide() {
  const steps = [
    ['Detectar', 'Alertas, logs y confirmación del incidente.'],
    ['Contener', 'Aislar servidor, bloquear endpoints y cerrar sesiones.'],
    ['Erradicar', 'Corregir código, eliminar procesos no autorizados y parchar.'],
    ['Recuperar', 'Restaurar respaldos limpios y validar integridad.'],
    ['Mejorar', 'Documentar lecciones y repetir pruebas de seguridad.'],
  ]

  return (
    <section className="slide">
      <Header eyebrow="09 · Recuperación" title="Plan de respuesta ante incidentes" subtitle="La continuidad operacional depende de restaurar, validar y aprender." />
      <div className="recovery-roadmap">
        {steps.map(([title, text]) => (
          <article key={title}>
            <span />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ClosingSlide() {
  return (
    <section className="slide close-slide">
      <div className="close-content">
        <p className="tag">Conclusión ejecutiva</p>
        <h2>SeguroTotal debe priorizar Command Injection y SQL Injection.</h2>
        <p>
          Estos hallazgos pueden comprometer servidor, base de datos, pólizas y datos patrimoniales.
          XSS también debe corregirse por su impacto en sesiones, suplantación y confianza del cliente.
        </p>
        <div className="closing-badges">
          <span>Desarrollo seguro</span>
          <span>Monitoreo</span>
          <span>Recuperación</span>
          <span>Mejora continua</span>
        </div>
      </div>
    </section>
  )
}

function Header({ eyebrow, title, subtitle = '' }) {
  return (
    <header className="slide-header">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {subtitle && <span>{subtitle}</span>}
    </header>
  )
}

const slides = [
  { title: 'Portada', component: <TitleSlide /> },
  { title: 'Contexto', component: <ContextSlide /> },
  { title: 'Metodología', component: <MethodSlide /> },
  {
    title: 'SQL Injection',
    component: (
      <FindingSlide
        eyebrow="03 · Hallazgo 1"
        title="SQL Injection"
        payload="' OR '1'='1"
        image={sqliImg}
        score="8.2"
        severity="High"
        color="high"
        text="Permite alterar la consulta SQL y obtener registros que deberían estar protegidos. En SeguroTotal afecta directamente pólizas y datos patrimoniales."
      />
    ),
  },
  {
    title: 'XSS Reflected',
    component: (
      <FindingSlide
        eyebrow="04 · Hallazgo 2"
        title="XSS Reflected"
        payload="<script>alert('XSS')</script>"
        image={xssImg}
        score="6.1"
        severity="Medium"
        color="medium"
        text="Requiere interacción del usuario, pero puede facilitar robo de sesión, redirección a sitios falsos o suplantación en el portal."
      />
    ),
  },
  {
    title: 'Command Injection',
    component: (
      <FindingSlide
        eyebrow="05 · Hallazgo 3"
        title="Command Injection"
        payload="127.0.0.1; cat /etc/passwd"
        image={comandosImg}
        score="10.0"
        severity="Critical"
        color="critical"
        text="Es el hallazgo más grave: permite ejecutar comandos del sistema y comprometer confidencialidad, integridad y disponibilidad del servidor."
      />
    ),
  },
  { title: 'CVSS', component: <CvssSlide /> },
  { title: 'Matriz', component: <MatrixSlide /> },
  { title: 'Controles', component: <ControlsSlide /> },
  { title: 'Recuperación', component: <RecoverySlide /> },
  { title: 'Cierre', component: <ClosingSlide /> },
]

function App() {
  const [active, setActive] = useState(0)
  const progress = ((active + 1) / slides.length) * 100

  const goPrevious = () => setActive((current) => Math.max(current - 1, 0))
  const goNext = () => setActive((current) => Math.min(current + 1, slides.length - 1))

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') goNext()
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') goPrevious()
      if (event.key === 'Home') setActive(0)
      if (event.key === 'End') setActive(slides.length - 1)
      if (event.key.toLowerCase() === 'f') document.documentElement.requestFullscreen?.()
      if (event.key === 'Escape' && document.fullscreenElement) document.exitFullscreen?.()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <main className="deck-app">
      <div className="topbar">
        <div>
          <strong>SeguroTotal</strong>
          <span>Auditoría de Seguridad Web</span>
        </div>
        <nav aria-label="Mini navegación">
          {slides.map((slide, index) => (
            <button
              aria-label={`Ir a ${slide.title}`}
              className={index === active ? 'active' : ''}
              key={slide.title}
              type="button"
              onClick={() => setActive(index)}
            />
          ))}
        </nav>
      </div>

      <div className="deck-frame">
        {slides[active].component}
        <div className="slide-counter">{String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</div>
      </div>

      <div className="controls">
        <button type="button" onClick={goPrevious} disabled={active === 0}>← Anterior</button>
        <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
        <button type="button" onClick={goNext} disabled={active === slides.length - 1}>Siguiente →</button>
      </div>
      <p className="help-text">Usa ← → para navegar · F para pantalla completa</p>
    </main>
  )
}

export default App
