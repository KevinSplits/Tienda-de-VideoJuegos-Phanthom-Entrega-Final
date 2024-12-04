import React from 'react';
import { Box, Button, TextField, Typography, Grid, Avatar } from '@mui/material';

const userAvatarUrl = 'https://avatars.githubusercontent.com/u/19550456';

export default function ChangeProfile() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                minHeight: '100vh',
                textAlign: 'center',
                mt: 2,
                px: { xs: 2, md: 3 },
            }}
        >
            <Typography variant="h4" sx={{ mb: 2 }}>
                Cambiar Perfil
            </Typography>

            <Avatar 
                src={userAvatarUrl} 
                alt="Usuario" 
                sx={{ width: 100, height: 100, mb: 2 }} 
            />

            <Box component="form" sx={{ width: '100%', maxWidth: 400 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                    Información Pública
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Nombre"
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Correo Electrónico"
                            fullWidth
                            variant="outlined"
                            type="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Teléfono"
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                    Información Privada
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Dirección"
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Contraseña"
                            fullWidth
                            variant="outlined"
                            type="password"
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
                    <Button variant="contained" color="primary" fullWidth>
                        Guardar Cambios
                    </Button>
                </Grid>
            </Box>
        </Box>
    );
}
