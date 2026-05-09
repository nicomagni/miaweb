import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Términos y condiciones de uso del sitio web de Mía Hilados.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/terminos",
  },
};

export default function TerminosPage() {
  return (
    <LegalPage title="Terminos y Condiciones" updatedAt="abril 2026">
      <h2>1. Aceptacion</h2>
      <p>
        Al acceder y utilizar el sitio web <strong>miahilados.com.ar</strong> (en adelante, &quot;el
        Sitio&quot;), propiedad de XAUMAX S.A. (CUIT: 30-70308143-2), aceptas estos terminos y
        condiciones en su totalidad. Si no estas de acuerdo, te pedimos que no utilices el Sitio.
      </p>

      <h2>2. Uso del sitio</h2>
      <p>
        El Sitio tiene como finalidad brindar informacion institucional sobre Mia Hilados, sus
        productos, colecciones y red de distribuidores. El contenido es de caracter informativo y
        puede ser modificado sin previo aviso.
      </p>

      <h2>3. Propiedad intelectual</h2>
      <p>
        Todo el contenido del Sitio, incluyendo textos, imagenes, logotipos, videos, diseno
        grafico y codigo fuente, es propiedad de XAUMAX S.A. o de sus licenciantes y esta
        protegido por las leyes de propiedad intelectual de la Republica Argentina.
      </p>
      <p>
        Queda prohibida la reproduccion, distribucion o modificacion del contenido sin autorizacion
        expresa por escrito.
      </p>

      <h2>4. Formularios y datos</h2>
      <p>
        Los formularios del Sitio (solicitud mayorista, contacto) recopilan datos con el unico fin
        de gestionar consultas comerciales. Al enviar un formulario, aceptas ser contactado por el
        equipo comercial de Mia Hilados.
      </p>

      <h2>5. Enlaces a terceros</h2>
      <p>
        El Sitio puede contener enlaces a plataformas externas (Instagram, WhatsApp, YouTube). Mia
        Hilados no se responsabiliza por el contenido, politicas de privacidad ni practicas de
        estos sitios de terceros.
      </p>

      <h2>6. Limitacion de responsabilidad</h2>
      <p>
        Mia Hilados no garantiza la disponibilidad ininterrumpida del Sitio ni la ausencia de
        errores. La informacion sobre productos (composiciones, colores, pesos) es orientativa y
        puede variar entre lotes de produccion.
      </p>

      <h2>7. Legislacion aplicable</h2>
      <p>
        Estos terminos se rigen por las leyes de la Republica Argentina. Cualquier controversia
        sera sometida a la jurisdiccion de los tribunales ordinarios de la Provincia de Buenos
        Aires.
      </p>

      <h2>8. Contacto</h2>
      <p>
        Para consultas sobre estos terminos podes escribirnos a{" "}
        <a href="mailto:martin@miahilados.com">martin@miahilados.com</a>.
      </p>
    </LegalPage>
  );
}
