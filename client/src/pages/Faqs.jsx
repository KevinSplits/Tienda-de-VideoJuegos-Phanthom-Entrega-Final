import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';





const FAQs = () => {
    const faqs = [
      { question: "¿Cómo rastrear mi pedido?", answer: "Puedes rastrear tu pedido desde la sección de pedidos." },
      { question: "¿Qué hago si recibí un producto defectuoso?", answer: "Contacta con soporte y abre un ticket." },
      { question: "¿Cómo puedo restablecer mi contraseña?", answer: "Para restablecer tu contraseña, ve a la sección de 'Mi cuenta' y selecciona 'Olvidé mi contraseña'. Recibirás un enlace en tu correo electrónico para restablecerla." },
      { question: "¿Cuáles son los métodos de pago aceptados?", answer: "Aceptamos tarjetas de crédito, débito y transferencias bancarias." },
      { question: "¿Cómo puedo seguir el estado de mi pedido?", answer: "Para seguir el estado de tu pedido, inicia sesión en tu cuenta y ve a la sección 'Mis pedidos'." },
      { question: "¿Cómo puedo contactar al soporte?", answer: "Puedes contactar al soporte enviando un ticket a través del Centro de Soporte, o llamando a nuestro número de atención al cliente." }
    ];
  
    return (
      <Box sx={{ mx: 'auto', maxWidth: 800, p: 2 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
          Preguntas Frecuentes
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion key={index} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" color="textSecondary">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  };
  
  export default FAQs;