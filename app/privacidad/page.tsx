import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad del sitio web de Mia Hilados.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/privacidad",
  },
};

export default function PrivacidadPage() {
  return (
    <LegalPage title="Politica de Privacidad" updatedAt="abril 2026">
      <h2>1. Responsable del tratamiento</h2>
      <p>
        <strong>XAUMAX S.A.</strong> (CUIT: 30-70308143-2), con domicilio en Zarate 989, B1650,
        Villa Chacabuco, Buenos Aires, Argentina, es responsable del tratamiento de los datos
        personales recopilados a traves de este sitio web.
      </p>

      <h2>2. Datos que recopilamos</h2>
      <p>
        Recopilamos unicamente los datos que proporcionas voluntariamente al completar nuestros
        formularios:
      </p>
      <ul>
        <li>
          <strong>Formulario de contacto:</strong> nombre, email, asunto y mensaje.
        </li>
        <li>
          <strong>Solicitud mayorista:</strong> nombre del comercio, CUIT, email, provincia,
          ciudad, Instagram, sitio web y volumen estimado.
        </li>
      </ul>

      <h2>3. Finalidad del tratamiento</h2>
      <p>Los datos recopilados se utilizan exclusivamente para:</p>
      <ul>
        <li>Responder consultas y solicitudes de contacto.</li>
        <li>Evaluar solicitudes de distribuidores mayoristas.</li>
        <li>Gestionar la relacion comercial con distribuidores.</li>
      </ul>

      <h2>4. Base legal</h2>
      <p>
        El tratamiento de datos se realiza con base en el consentimiento del usuario al enviar el
        formulario, en cumplimiento de la Ley 25.326 de Proteccion de Datos Personales de la
        Republica Argentina.
      </p>

      <h2>5. Comparticion de datos</h2>
      <p>No vendemos, alquilamos ni compartimos datos personales con terceros, salvo:</p>
      <ul>
        <li>
          Proveedores de servicios tecnologicos necesarios para el funcionamiento del sitio
          (servicio de procesamiento de formularios).
        </li>
        <li>Requerimientos legales o judiciales.</li>
      </ul>

      <h2>6. Conservacion de datos</h2>
      <p>
        Los datos se conservan durante el tiempo necesario para cumplir la finalidad para la que
        fueron recopilados y, posteriormente, durante los plazos legales aplicables.
      </p>

      <h2>7. Derechos del titular</h2>
      <p>
        De acuerdo con la Ley 25.326, podes ejercer tus derechos de acceso, rectificacion,
        supresion y oposicion enviando un email a{" "}
        <a href="mailto:martin@miahilados.com">martin@miahilados.com</a> con el asunto &quot;Datos
        personales&quot;.
      </p>

      <h2>8. Cookies y tecnologias</h2>
      <p>
        Este sitio no utiliza cookies de rastreo ni herramientas de analitica de terceros.
        Unicamente se utilizan tecnologias estandar del navegador para el correcto funcionamiento
        del sitio.
      </p>

      <h2>9. Seguridad</h2>
      <p>
        Implementamos medidas de seguridad tecnicas y organizativas para proteger los datos
        personales contra acceso no autorizado, perdida o alteracion, incluyendo conexion HTTPS y
        headers de seguridad.
      </p>

      <h2>10. Contacto</h2>
      <p>
        Para cualquier consulta sobre esta politica, podes contactarnos en{" "}
        <a href="mailto:martin@miahilados.com">martin@miahilados.com</a> o al telefono{" "}
        <a href="tel:+541166004450">11 6600-4450</a>.
      </p>
    </LegalPage>
  );
}
