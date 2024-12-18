import React, { useState, useEffect } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [socialMedia, setSocialMedia] = useState('');
    const [daysLeft, setDaysLeft] = useState(0);
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const updateCountdown = () => {
            const year = new Date().getFullYear();
            const targetDate = new Date(`${year}-12-31T23:59:59`);
            const currentDate = new Date();

            const differenceInTime = targetDate.getTime() - currentDate.getTime();
            const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

            setDaysLeft(differenceInDays >= 0 ? differenceInDays : 0);

            const hoursLeft = Math.floor((differenceInTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutesLeft = Math.floor((differenceInTime % (1000 * 60 * 60)) / (1000 * 60));
            const secondsLeft = Math.floor((differenceInTime % (1000 * 60)) / 1000);

            setTimeLeft(`${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`);
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleDialogOpen = (media) => {
        setOpenDialog(true);
        setSocialMedia(media);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleVisitSocialMedia = () => {
        let url;
        switch (socialMedia) {
            case 'github':
                url = 'https://github.com/PRATHAPA-POOJARI';
                break;
            case 'instagram':
                url = 'https://www.instagram.com/';
                break;
            case 'twitter':
                url = 'https://twitter.com/';
                break;
            case 'youtube':
                url = 'https://www.youtube.com/';
                break;
            default:
                url = '';
        }
        window.open(url, '_blank');
        setOpenDialog(false);
    };

    return (
        <footer style={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}>
            <Box sx={{
                textAlign: "center",
                bgcolor: 'black',
                color: 'white',
                p: 0.5,
                '@media (max-width:800px)': {
                    p: 0.25,
                }
            }}>
                {/* Timer Display at Bottom Left Corner */}
                <Box sx={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px'
                }}>
                    <Typography variant="body2" sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#fff',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        fontSize: '0.9rem'
                    }}>
                        {daysLeft > 0
                            ? `Time until the end of the year: ${daysLeft} day${daysLeft > 1 ? 's' : ''}, ${timeLeft}`
                            : 'Happy New Year!'}
                    </Typography>
                </Box>

                {/* Social Media Icons */}
                <Box sx={{
                    my: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    "& svg": {
                        fontSize: "30px",
                        cursor: "pointer",
                        mx: 1.5,
                    },
                    "& svg:hover": {
                        color: "goldenrod",
                        transform: 'translateY(-5px)',
                        transition: 'all 400ms',
                    },
                }}>
                    <InstagramIcon onClick={() => handleDialogOpen('instagram')} />
                    <TwitterIcon onClick={() => handleDialogOpen('twitter')} />
                    <GitHubIcon onClick={() => handleDialogOpen('github')} />
                    <YouTubeIcon onClick={() => handleDialogOpen('youtube')} />
                </Box>

                <Typography variant="body2" sx={{
                    "@media (max-width:800px)": {
                        fontSize: '0.8rem'
                    }
                }}>
                    All Rights Reserved © 2024
                </Typography>
            </Box>

            {/* Dialog for Social Media */}
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>
                    Do you want to visit {socialMedia === 'instagram' ? 'Instagram' : socialMedia === 'twitter' ? 'Twitter' : socialMedia === 'youtube' ? 'YouTube' : 'Prathap\'s GitHub account'}?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleVisitSocialMedia}>Yes</Button>
                    <Button onClick={handleDialogClose}>No</Button>
                </DialogActions>
            </Dialog>
        </footer>
    );
};

export default Footer;
