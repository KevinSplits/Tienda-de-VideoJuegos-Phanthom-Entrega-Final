import { useEffect,useState } from 'react';
import {useForm} from 'react-hook-form';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, TextField, Typography, Link } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material'; 
import '../styles/Login.css'; 
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
  } = useForm();
  const {signin,isAuthenticated, errors: signinErrors} = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated) navigate('/demo');
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });



  // Creación del tema claro y oscuro
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  // Función para cambiar entre modo claro y oscuro
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={`login-container ${isDarkMode ? 'dark' : 'light'}`}>
        <Button 
          variant="outlined" 
          onClick={toggleTheme}
          style={{ position: 'absolute', top: 20, right: 20 }}
        >
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </Button>
        <Typography variant="h4" gutterBottom>
          Iniciar Sesión
        </Typography>
        {
          signinErrors.map((error, i) => (
            <div key={i}>
              {error}
            </div>
          ))
        }
        <form onSubmit={onSubmit}>
          <TextField
            label="Correo Electrónico"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            {... register('email', {required: true})}
          />
          {
            errors.email && <p>El correo electrónico es requerido</p>
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
            errors.password && <p>La contraseña es requerida</p>
          }
          <Button type="submit" variant="contained" color="primary">
            Ingresar
          </Button>
        </form>
        <Typography variant="body2" style={{ marginTop: '16px' }}>
          No tienes una cuenta?{' '}
          <Link href="/register" variant="body2">
            Regístrate
          </Link>
        </Typography>
      </div>
    </ThemeProvider>
  );
}

export default LoginPage;
