import { useEffect, useMemo, useState } from 'react'
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
    priority: '1',
  },
  {
    name: 'SQL Injection',
    score: '8.2',
    severity: 'High',
    risk: 'Crítico',
    probability: 'Alta',
    impact: 'Alto',
    priority: '2',
  },
  {
    name: 'XSS Reflected',
    score: '6.1',
    severity: 'Medium',
    risk: 'Alto',
    probability: 'Media',
    impact: 'Alto',
    priority: '3',
  },
]

const riskCells = [
  { label: 'Command Injection', row: 1, col: 4 },
  { label: 'SQL Injection', row: 1, col: 3 },
  { label: 'XSS', row: 2, col: 3 },
]

const slides = [
  {
    eyebrow: 'TI3034 · Evaluación Sumativa N°3',
    title: 'Auditoría de Seguridad Web',
    subtitle: 'SeguroTotal · Seguros generales',
    content: (
      <div className="hero-grid">
        <div className="hero-card glow-card">
          <p className="overline">Auditor</p>
          <h3>Vicente Andrés Rodríguez Quezada</h3>
          <p>Proyecto React: <strong>presentacion_rodvic</strong></p>
        </div>
        <div className="hero-card">
          <p className="overline">Empresa auditada</p>
          <h3>SeguroTotal</h3>
          <p>Portal de clientes con pólizas y datos patrimoniales.</p>
        </div>
        <div className="hero-card">
          <p className="overline">Laboratorio</p>
          <h3>DVWA · Low</h3>
          <p>Entorno controlado para demostrar vulnerabilidades web.</p>
        </div>
      </div>
    ),
  },
  {
    eyebrow: 'Contexto del negocio',
    title: '¿Por qué esta auditoría importa?',
    subtitle: 'En una empresa de seguros, una falla técnica se transforma rápidamente en riesgo de negocio.',
    content: (
      <div className="two-column">
        <div className="panel">
          <h3>Información protegida</h3>
          <ul>
            <li>Pólizas y contratos de seguros.</li>
            <li>Datos personales y patrimoniales de clientes.</li>
            <li>Credenciales y sesiones del portal.</li>
            <li>Historial de solicitudes, siniestros y respaldos.</li>
          </ul>
        </div>
        <div className="panel accent-panel">
          <h3>Impacto posible</h3>
          <p>
            La exposición o alteración de estos datos puede generar pérdida de confianza,
            daño reputacional, interrupción del servicio y consecuencias legales para la organización.
          </p>
        </div>
      </div>
    ),
  },
  {
    eyebrow: 'Objetivo y alcance',
    title: 'Qué se evaluó',
    subtitle: 'Se auditaron tres vulnerabilidades en DVWA y se tradujeron a impacto real para SeguroTotal.',
    content: (
      <div className="method-grid">
        <article>
          <span>01</span>
          <h3>Explotación controlada</h3>
          <p>Pruebas en DVWA con nivel de seguridad Low.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Evidencia</h3>
          <p>Capturas de payload, resultado del ataque y cálculo CVSS.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Análisis de riesgo</h3>
          <p>Probabilidad, impacto, activos afectados y matriz de calor.</p>
        </article>
        <article>
          <span>04</span>
          <h3>Plan de acción</h3>
          <p>Prevención, mitigación, recuperación y mejora tecnológica.</p>
        </article>
      </div>
    ),
  },
  {
    eyebrow: 'Hallazgo 1',
    title: 'SQL Injection',
    subtitle: "Payload: ' OR '1'='1 · Resultado: exposición de registros de usuarios.",
    content: (
      <div className="evidence-layout">
        <figure>
          <img src={sqliImg} alt="Evidencia SQL Injection en DVWA" />
          <figcaption>Evidencia del ataque SQL Injection.</figcaption>
        </figure>
        <div className="finding-card high">
          <p className="score-label">CVSS 3.1</p>
          <div className="score">8.2</div>
          <p className="severity">High</p>
          <p>
            Permite modificar la consulta SQL y obtener registros que deberían estar protegidos.
            En SeguroTotal, el riesgo principal es la filtración de pólizas y datos patrimoniales.
          </p>
        </div>
      </div>
    ),
  },
  {
    eyebrow: 'Hallazgo 2',
    title: 'XSS Reflected',
    subtitle: "Payload: <script>alert('XSS')</script> · Resultado: ejecución de JavaScript en el navegador.",
    content: (
      <div className="evidence-layout reverse">
        <div className="finding-card medium">
          <p className="score-label">CVSS 3.1</p>
          <div className="score">6.1</div>
          <p className="severity">Medium</p>
          <p>
            Requiere interacción del usuario, pero puede permitir robo de sesión,
            redirección a sitios falsos o suplantación dentro del portal de clientes.
          </p>
        </div>
        <figure>
          <img src={xssImg} alt="Evidencia XSS Reflected en DVWA" />
          <figcaption>Evidencia del ataque XSS Reflected.</figcaption>
        </figure>
      </div>
    ),
  },
  {
    eyebrow: 'Hallazgo 3',
    title: 'Command Injection',
    subtitle: 'Payload: 127.0.0.1; cat /etc/passwd · Resultado: lectura de archivo interno del servidor.',
    content: (
      <div className="evidence-layout">
        <figure>
          <img src={comandosImg} alt="Evidencia Command Injection en DVWA" />
          <figcaption>Evidencia del ataque Command Injection.</figcaption>
        </figure>
        <div className="finding-card critical">
          <p className="score-label">CVSS 3.1</p>
          <div className="score">10.0</div>
          <p className="severity">Critical</p>
          <p>
            Es el hallazgo más grave: permite ejecutar comandos del sistema.
            Puede comprometer confidencialidad, integridad y disponibilidad del servidor.
          </p>
        </div>
      </div>
    ),
  },
  {
    eyebrow: 'Resultados CVSS',
    title: 'Gravedad comparada de los hallazgos',
    subtitle: 'El puntaje CVSS permitió ordenar la urgencia técnica de corrección.',
    content: (
      <div className="scoreboard">
        {findings.map((finding) => (
          <div className="score-row" key={finding.name}>
            <div>
              <strong>{finding.name}</strong>
              <span>Severidad {finding.severity}</span>
            </div>
            <div className="score-pill">{finding.score}</div>
            <div className="bar"><span style={{ width: `${Number(finding.score) * 10}%` }} /></div>
          </div>
        ))}
        <div className="cvss-shots">
          <img src={cvssSqliImg} alt="CVSS SQL Injection" />
          <img src={cvssXssImg} alt="CVSS XSS Reflected" />
          <img src={cvssComandosImg} alt="CVSS Command Injection" />
        </div>
      </div>
    ),
  },
  {
    eyebrow: 'Activos críticos',
    title: 'Qué debe proteger SeguroTotal',
    subtitle: 'La priorización se definió según activos de información y daño para el negocio.',
    content: (
      <div className="asset-grid">
        {[
          ['Base de datos de clientes', 'Pólizas, contratos y antecedentes patrimoniales.'],
          ['Portal web de clientes', 'Acceso a trámites, consultas y servicios online.'],
          ['Servidor de aplicación', 'Infraestructura que procesa solicitudes del portal.'],
          ['Credenciales y sesiones', 'Identidad digital de clientes y administradores.'],
          ['Respaldos', 'Continuidad y recuperación ante incidentes.'],
          ['Reputación institucional', 'Confianza del cliente en la aseguradora.'],
        ].map(([title, text]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    ),
  },
  {
    eyebrow: 'Matriz de riesgo',
    title: 'Probabilidad × Impacto',
    subtitle: 'La matriz transforma el hallazgo técnico en prioridad de negocio.',
    content: (
      <div className="matrix-wrapper">
        <div className="risk-matrix" aria-label="Matriz de riesgo">
          <div className="corner"></div>
          {['Bajo', 'Medio', 'Alto', 'Crítico'].map((impact) => <div className="axis" key={impact}>{impact}</div>)}
          {['Alta', 'Media', 'Baja', 'Mínima'].map((probability, rowIndex) => (
            <div className="matrix-row" key={probability}>
              <div className="axis left">{probability}</div>
              {[1, 2, 3, 4].map((col) => {
                const marker = riskCells.find((cell) => cell.row === rowIndex + 1 && cell.col === col)
                return (
                  <div className={`cell heat-${rowIndex + col}`} key={`${probability}-${col}`}>
                    {marker && <span>{marker.label}</span>}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        <div className="priority-list">
          <h3>Prioridad de remediación</h3>
          {findings.map((finding) => (
            <p key={finding.name}><strong>{finding.priority}.</strong> {finding.name} · Riesgo {finding.risk}</p>
          ))}
        </div>
      </div>
    ),
  },
  {
    eyebrow: 'Controles propuestos',
    title: 'Prevención y mitigación',
    subtitle: 'La respuesta combina desarrollo seguro, monitoreo y endurecimiento de infraestructura.',
    content: (
      <div className="controls-grid">
        <article>
          <h3>SQL Injection</h3>
          <p>Consultas parametrizadas, validación de tipos, mínimo privilegio y monitoreo de consultas anómalas.</p>
        </article>
        <article>
          <h3>XSS Reflected</h3>
          <p>Escape de salida HTML, validación de entrada, Content Security Policy y cookies HttpOnly/Secure.</p>
        </article>
        <article>
          <h3>Command Injection</h3>
          <p>Eliminar ejecución directa de comandos, listas blancas, APIs seguras y hardening del servidor.</p>
        </article>
        <article>
          <h3>Controles transversales</h3>
          <p>WAF, revisión de código, pruebas periódicas, SIEM, respaldo cifrado y capacitación del equipo.</p>
        </article>
      </div>
    ),
  },
  {
    eyebrow: 'Recuperación ante incidentes',
    title: 'Plan de respuesta y continuidad',
    subtitle: 'SeguroTotal debe recuperarse de forma controlada y aprender del incidente.',
    content: (
      <div className="timeline">
        {[
          ['Detectar', 'Alertas, logs y confirmación del alcance.'],
          ['Contener', 'Bloquear endpoints, aislar servidor y cerrar sesiones afectadas.'],
          ['Erradicar', 'Corregir código vulnerable, eliminar procesos no autorizados y parchear.'],
          ['Recuperar', 'Restaurar desde respaldos limpios y validar integridad.'],
          ['Mejorar', 'Documentar lecciones, reforzar controles y repetir pruebas.'],
        ].map(([step, text]) => (
          <article key={step}>
            <h3>{step}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    ),
  },
  {
    eyebrow: 'Cierre',
    title: 'Conclusión ejecutiva',
    subtitle: 'La auditoría permitió convertir vulnerabilidades técnicas en decisiones concretas para el negocio.',
    content: (
      <div className="closing-card">
        <h3>Mensaje principal</h3>
        <p>
          SeguroTotal debe priorizar Command Injection y SQL Injection por su potencial de comprometer
          servidor, base de datos, pólizas y datos patrimoniales. XSS también requiere corrección por su
          impacto en sesiones y confianza de los clientes.
        </p>
        <div className="final-badges">
          <span>Desarrollo seguro</span>
          <span>Monitoreo</span>
          <span>Respuesta a incidentes</span>
          <span>Continuidad operacional</span>
        </div>
      </div>
    ),
  },
]

function App() {
  const [active, setActive] = useState(0)
  const currentSlide = slides[active]
  const progress = useMemo(() => ((active + 1) / slides.length) * 100, [active])

  const goToPrevious = () => setActive((index) => Math.max(index - 1, 0))
  const goToNext = () => setActive((index) => Math.min(index + 1, slides.length - 1))

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown') goToNext()
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') goToPrevious()
      if (event.key === 'Home') setActive(0)
      if (event.key === 'End') setActive(slides.length - 1)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <main className="presentation-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">ST</span>
          <div>
            <strong>SeguroTotal</strong>
            <small>Auditoría Web</small>
          </div>
        </div>
        <nav aria-label="Navegación de diapositivas">
          {slides.map((slide, index) => (
            <button
              className={index === active ? 'active' : ''}
              key={slide.title}
              type="button"
              onClick={() => setActive(index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {slide.title}
            </button>
          ))}
        </nav>
      </aside>

      <section className="slide-stage">
        <div className="progress"><span style={{ width: `${progress}%` }} /></div>
        <header className="slide-header">
          <p className="eyebrow">{currentSlide.eyebrow}</p>
          <h1>{currentSlide.title}</h1>
          <p className="subtitle">{currentSlide.subtitle}</p>
        </header>
        <div className="slide-content">{currentSlide.content}</div>
        <footer className="slide-footer">
          <button type="button" onClick={goToPrevious} disabled={active === 0}>Anterior</button>
          <span>{active + 1} / {slides.length}</span>
          <button type="button" onClick={goToNext} disabled={active === slides.length - 1}>Siguiente</button>
        </footer>
      </section>
    </main>
  )
}

export default App
