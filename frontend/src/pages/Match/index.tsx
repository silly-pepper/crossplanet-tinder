import React, { useEffect, useState } from 'react';
import '../../App.css';
import axios from "axios";
import { saveTokenInLocalStorage } from "../../utils/saveDataInLocalstorage";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import axiosApiInstance from "../../utils/tokenHelper";
import { useNavigate } from "react-router-dom";
import PersonCard from "../../components/PersonCard";
import blonde_young from '../../images/Mars/women/blonde_young.png';
const MatchPage: React.FC = () => {
    const navigate = useNavigate();
    const [resultArray, setResultArray] = useState<any[]>([]);

    const getMatches = () => {
        if(localStorage.getItem("accessToken") ) {

            axiosApiInstance.post('/connection/getConnections', {}, {headers: {'Authorization' : `Basic ${localStorage.getItem("accessToken")}`}})
            .then((response => {
                console.log(response);
                setResultArray(response.data);
            }))
            .catch((error) => {
                console.error(error);
                setResultArray([]);
            });}
    }

    useEffect(() => {
        getMatches();
    }, []);

    return (
        <Box sx={{width: "100vw", margin: "0px", height: "100vh",
            // backgroundImage: `url(${bg})`, backgroundRepeat: `no-repeat`, backgroundSize: "cover",
        }}><Grid container justifyContent="center"
                 alignItems="center" >
            <Grid item xs={8} >
                <Button style={{
                    margin: "30px 15px",
                    height: "40px",
                    fontSize: "18px",
                    color: "#90334f",
                    borderRadius: "15px",
                    width: "300px",
                    alignSelf: "center",
                    border: `1px solid #90334f`,
                }}                    onClick={() => navigate("/gallery")}>
                    Вернуться к просмотру
                </Button>

            </Grid>

            <Grid item xs={2}>
                <Button style={{
                    margin: "30px 15px",
                    height: "40px",
                    fontSize: "18px",
                    color: "#90334f",
                    width: "150px",

                    borderRadius: "15px",
                    alignSelf: "center",
                    border: `1px solid #90334f`,
                }}>
                    Профиль
                </Button>
            </Grid>
            <Grid item xs={2}>
                <Button style={{
                    margin: "30px 15px",
                    height: "40px",
                    fontSize: "18px",
                    color: "#90334f",
                    borderRadius: "15px",
                    width: "150px",
                    alignSelf: "center",
                    border: `1px solid #90334f`,
                }} onClick={()=>{
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("role");
                    localStorage.removeItem("username");
                    navigate("/");
                }}>
                    Выйти
                </Button>
            </Grid>

        </Grid>

        <Box sx={{width: "94.8vw", margin: "100px"}}>

        <Box sx={{ flex: "1"}}>
            <Grid
                container
                columns={{xl: 12, md: 12, xs: 12}}
                rowSpacing={3}
                direction="row"
                columnSpacing={"20px"}
                sx={{
                    marginBottom: "40px"
                }}
            >
                {resultArray.map((item, index) => (
                        <Grid key={item.id} item xl={4} md={6} xs={12} style={{ minWidth: "350px" }}>
                            <PersonCard
                                id={item.id}
                                firstname={item.firstname}
                                birth_date={item.birthdate}
                                sex={item.sex}
                                weight={item.weight}
                                height={item.height}
                                hair_color={item.hairColor}
                                location={item.location}
                            />
                            {
                                item.location == "MARS" ? <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate("/spacesuit-form")}
                                >
                                    Создать скафандр
                                </Button> :
                                    <Button
                                        variant="contained"
                                        color="primary"
                                    >
                                        Организовать встречу
                                    </Button>
                            }
                        </Grid>
                    ))
                }

            </Grid>
        </Box>
        </Box>
        </Box>
    //             {resultArray.map((item, index) => (
    //                 <PersonCard
    //                     id={item.id}
    //                     birth_date={item.birthdate}
    //                     sex={item.sex}
    //                     weight={item.weight}
    //                     height={item.height}
    //                     hair_color={item.hairColor}
    //                     location={item.location}
    //                 />
    //
    //
    //                 // <div key={index} style={{ borderBottom: "1px solid #000", padding: "10px", display: "flex", justifyContent: "space-between" }}>
    //                 //     <div>
    //                 //         <Typography variant="body1">
    //                 //             <strong>Birthdate:</strong> {item.birthdate}
    //                 //         </Typography>
    //                 //         <Typography variant="body1">
    //                 //             <strong>Sex:</strong> {item.sex}
    //                 //         </Typography>
    //                 //         <Typography variant="body1">
    //                 //             <strong>Weight:</strong> {item.weight}
    //                 //         </Typography>
    //                 //         <Typography variant="body1">
    //                 //             <strong>Height:</strong> {item.height}
    //                 //         </Typography>
    //                 //         <Typography variant="body1">
    //                 //             <strong>Hair Color:</strong> {item.hairColor}
    //                 //         </Typography>
    //                 //         <Typography variant="body1">
    //                 //             <strong>Location:</strong> {item.location}
    //                 //         </Typography>
    //                 //     </div>
    //                     <Button
    //                         variant="contained"
    //                         color="primary"
    //                         onClick={() => connectUsers(item.id)}
    //                     >
    //                         Connect Users
    //                     </Button>
    //                 // </div>
    //             ))}
    //         </Box>
    );
}

export default MatchPage;
