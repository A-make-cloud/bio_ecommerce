import React from "react";

import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import image1 from '../../static/master_card.jpg'
import image2 from '../../static/visa.jpg'
import image3 from '../../static/cb.jpg'

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,

}));

const footerHeight = 150;
const footerEltMarginTop = 15;

const div1Style = {
    width: "100vw",
    height: `${footerHeight + footerEltMarginTop}px`,
    backgroundColor: "#346344",
    marginTop: "30px",
    // position: "absolute",
};

const div2Style = {
    width: "100%",
    //  position: "absolute",
    backgroundColor: "#346344",
    color: "white",
    // height: `${footerHeight}px`,
    paddingTop: `${footerEltMarginTop}px`,
};
function Footer() {
    return (
        <div>
            <section sx={{ display: 'flex' }} style={div1Style}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        p: 1,
                        m: 1,
                        bgcolor: "#346344",
                        color: '#ffff',
                        borderRadius: 1,
                    }}
                >

                    <div>
                        <h6>Informations légales</h6>
                        <h6>Nos conditions d’achat</h6>
                        <h6>Nous contacter</h6>

                    </div>

                    <div>

                        <h4>Paiements acceptés</h4>


                        <Grid item xs={4}>
                            <Item>
                                <CardActionArea sx={{ display: 'flex' }}
                                    height="60"
                                    bgcolor="#346344"
                                >

                                    <Grid item xs={4}>

                                        <CardMedia sx={{ maxWidth: 80 }}
                                            component="img"
                                            height="60"
                                            image={image1}
                                            alt="master"
                                        />

                                    </Grid>
                                    <Grid item xs={4}>
                                        <CardMedia sx={{ maxWidth: 80 }}
                                            component="img"
                                            height="60"
                                            image={image2}
                                            alt="visa"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CardMedia sx={{ maxWidth: 80 }}
                                            component="img"
                                            height="60"
                                            image={image3}
                                            alt="cb"
                                        />
                                    </Grid>
                                </CardActionArea>
                            </Item>
                        </Grid>




                    </div>
                </Box>

            </section>


            <div style={div2Style}>



                <FacebookIcon style={{ marginRight: 10 }} />
                <LinkedInIcon style={{ marginRight: 10 }} />
                <InstagramIcon style={{ marginRight: 10 }} />
                <TwitterIcon style={{ marginRight: 10 }} />
                <PinterestIcon />
            </div>

        </div>
    );
}

export default Footer;