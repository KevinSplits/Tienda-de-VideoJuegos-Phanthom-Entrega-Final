import { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import {useAuth} from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, TextField, Typography, Link } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material'; 
import '../styles/Register.css';

function RegisterPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated) navigate('/demo');
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });



  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });


  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={`register-container ${isDarkMode ? 'dark' : 'light'}`}>
        <Button 
          variant="outlined" 
          onClick={toggleTheme}
          style={{ position: 'absolute', top: 20, right: 20 }}
        >
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </Button>
        <Typography variant="h4" gutterBottom>
          Registrarse
        </Typography>
        {
          registerErrors.map((error, i) => (
            <div key={i}>
              {error}
            </div>
          ))
        }
        <form onSubmit={onSubmit}>
          <TextField
            label="Nombre de Usuario"
            fullWidth
            margin="normal"
            variant="outlined"
            {... register('username', {required: true})}
          />

          {
            errors.username && (
              <p>
                El nombre de usuario es requerido
              </p>
            )
          }
          <TextField
            label="Correo Electrónico"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            {... register('email', {required: true})}
          />

{
            errors.email && (
              <p>
                El correo electrónico es requerido
              </p>
            )
          }
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            {... register('password', {required: true})}
          />

{
            errors.username && (
              <p>
                La contraseña es requerida
              </p>
            )
          }
          <Button type="submit" variant="contained" color="primary">
            Registrarse
          </Button>
        </form>
        <Typography variant="body2" style={{ marginTop: '16px' }}>
          Ya tienes una cuenta?{' '}
          <Link href="/login" variant="body2">
            Iniciar Sesión
          </Link>
        </Typography>
      </div>
    </ThemeProvider>
  );
}

export default RegisterPage;
