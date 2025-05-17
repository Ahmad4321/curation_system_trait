import React from 'react';
import { Box, Typography, Container, Stack } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#0f6588', // Blue background similar to screenshot
        color: 'white',
        paddingY: 6,
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        {/* Main Title */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Developing Team
        </Typography>

        {/* Lab Logo and Name */}
        <Stack direction="column" alignItems="center" spacing={1}>
          <Box
            component="img"
            src="http://lit-evi.hzau.edu.cn/static/BioNLP_Django/img/home/BioNLP_logo.png" // Replace with your logo path or import
            alt="BioNLP Lab Logo"
            sx={{ width: 100, height: 100 }}
          />
          <Typography variant="h6" fontWeight="bold">
            HZAU BioNLP Lab
          </Typography>
        </Stack>

        {/* Affiliation Info */}
        <Box mt={4}>
          <Typography>
            <strong>Affiliation:</strong> College of Informatics, Huazhong Agricultural University, Wuhan, Hubei, China
          </Typography>
          <Typography>
            <strong>Lab PI:</strong> Jingbo Xia
          </Typography>
          <Typography mt={1}>
            All the contributors refer to above publications.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
