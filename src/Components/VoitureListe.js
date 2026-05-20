import React, { Component } from 'react';
import { Card, Table, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class VoitureListe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voitures: []
        };
    }

    componentDidMount() {
        this.findAllVoitures();
    }

    // Questions 73 à 75 : Récupération des données sur le port 8081
    findAllVoitures() {
        axios.get("http://localhost:8081/api/voitures") // Changement de port ici (8081)
            .then(response => response.data)
            .then((data) => {
                this.setState({ voitures: data });
            })
            .catch(error => {
                console.error("Erreur lors de la récupération : ", error);
            });
    }

    // Fonction de suppression (Port 8081)
    deleteVoiture = (voitureId) => {
        axios.delete("http://localhost:8081/api/voitures/" + voitureId) // Changement de port ici (8081)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        voitures: this.state.voitures.filter(voiture => voiture.id !== voitureId)
                    });
                }
            });
    };

    render() {
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList} /> Liste Voitures</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark">
                        <thead>
                            <tr>
                                <th>Marque</th>
                                <th>Modèle</th>
                                <th>Couleur</th>
                                <th>Année</th>
                                <th>Prix</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.voitures.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6">Aucune Voiture disponible</td>
                                </tr> :
                                this.state.voitures.map((voiture) => (
                                    <tr key={voiture.id}>
                                        <td>{voiture.marque}</td>
                                        <td>{voiture.modele}</td>
                                        <td>{voiture.couleur}</td>
                                        <td>{voiture.annee}</td>
                                        <td>{voiture.prix}</td>
                                        <td>
                                            <ButtonGroup>
                                                {/* CORRECTION : Ajout du slash "/" devant edit */}
                                            <Link to={"/edit/" + voiture.id} className="btn btn-sm btn-outline-primary">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Link>{' '}
                                               
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteVoiture.bind(this, voiture.id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}