import React, { Component } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlusSquare, faUndo, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MyToast from './MyToast'; // <-- Importation du nouveau composant Toast

class Voiture extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.voitureChange = this.voitureChange.bind(this);
        this.submitVoiture = this.submitVoiture.bind(this);
    }

    // L'état initial inclut désormais les propriétés de contrôle du Toast
    get initialState() {
        return { 
            id: '', marque: '', modele: '', couleur: '', immatricule: '', annee: '', prix: '',
            show: false, message: '', type: '' // Propriétés pour le Toast
        };
    }

    componentDidMount() {
        const voitureId = this.props.params ? this.props.params.id : null;
        if (voitureId) {
            this.findVoitureById(voitureId);
        }
    }

    findVoitureById = (voitureId) => {
        axios.get("http://localhost:8081/api/voitures/" + voitureId)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        id: response.data.id,
                        marque: response.data.marque,
                        modele: response.data.modele,
                        couleur: response.data.couleur,
                        immatricule: response.data.immatricule,
                        annee: response.data.annee,
                        prix: response.data.prix
                    });
                }
            }).catch((error) => {
                console.error("Erreur lors du chargement de la voiture : " + error);
            });
    }

    resetVoiture = () => {
        this.setState(() => this.initialState);
    }

    submitVoiture(event) {
        event.preventDefault();

        const voiture = {
            marque: this.state.marque,
            modele: this.state.modele,
            couleur: this.state.couleur,
            immatricule: this.state.immatricule,
            annee: parseInt(this.state.annee, 10),
            prix: parseInt(this.state.prix, 10)
        };

        const voitureId = this.props.params ? this.props.params.id : null;

        if (voitureId) {
            // MODE ÉDITION (PUT)
            axios.put("http://localhost:8081/api/voitures/" + voitureId, voiture)
                .then(response => {
                    if (response.data != null) {
                        // 1. On active le Toast de succès
                        this.setState({ 
                            show: true, 
                            message: "Voiture mise à jour avec succès !", 
                            type: "success" 
                        });
                        
                        // 2. On attend 3 secondes pour que l'utilisateur voie la notification, puis on redirige
                        setTimeout(() => {
                            this.setState({ show: false });
                            window.location.href = "/list";
                        }, 3000);
                    }
                }).catch(error => {
                    this.setState({ show: true, message: "Erreur : " + error.message, type: "danger" });
                });
        } else {
            // MODE AJOUT (POST)
            axios.post("http://localhost:8081/api/voitures", voiture)
                .then(response => {
                    if (response.data != null) {
                        // 1. On affiche le Toast de succès
                        this.setState({ 
                            show: true, 
                            message: "Voiture enregistrée avec succès !", 
                            type: "success" 
                        });
                        
                        // 2. On nettoie les champs de saisie manuellement SANS toucher aux variables du Toast
                        this.setState({ 
                            id: '', marque: '', modele: '', couleur: '', immatricule: '', annee: '', prix: '' 
                        });
                        
                        // 3. On ferme automatiquement la notification après 3 secondes
                        setTimeout(() => {
                            this.setState({ show: false });
                        }, 3000);
                    }
                }).catch(error => {
                    this.setState({ show: true, message: "Erreur : " + error.message, type: "danger" });
                });
        }
    }

    voitureChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { marque, modele, couleur, immatricule, annee, prix } = this.state;
        const voitureId = this.props.params ? this.props.params.id : null;

        return (
            <div>
                {/* Inclusion du Toast en haut de la vue en lui transmettant l'état */}
                <MyToast children={{ show: this.state.show, message: this.state.message, type: this.state.type }} />
                
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={voitureId ? faEdit : faPlusSquare} />{' '}
                        {voitureId ? "Modifier la Voiture" : "Ajouter une Voiture"}
                    </Card.Header>
                    <Form onSubmit={this.submitVoiture} id="VoitureFormId">
                        <Card.Body>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridMarque">
                                    <Form.Label>Marque</Form.Label>
                                    <Form.Control required name="marque" type="text"
                                        className={"bg-dark text-white"} placeholder="Entrez Marque"
                                        value={marque} onChange={this.voitureChange} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridModele">
                                    <Form.Label>Modèle</Form.Label>
                                    <Form.Control required name="modele" type="text"
                                        className={"bg-dark text-white"} placeholder="Entrez Modèle"
                                        value={modele} onChange={this.voitureChange} />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCouleur">
                                    <Form.Label>Couleur</Form.Label>
                                    <Form.Control required name="couleur" type="text"
                                        className={"bg-dark text-white"} placeholder="Entrez Couleur"
                                        value={couleur} onChange={this.voitureChange} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridImmatricule">
                                    <Form.Label>Immatriculation</Form.Label>
                                    <Form.Control required name="immatricule" type="text"
                                        className={"bg-dark text-white"} placeholder="Ex: 12345-A-15"
                                        value={immatricule} onChange={this.voitureChange} />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridAnnee">
                                    <Form.Label>Année</Form.Label>
                                    <Form.Control required name="annee" type="number"
                                        className={"bg-dark text-white"} placeholder="Entrez Année"
                                        value={annee} onChange={this.voitureChange} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPrix">
                                    <Form.Label>Prix</Form.Label>
                                    <Form.Control required name="prix" type="number"
                                        className={"bg-dark text-white"} placeholder="Entrez Prix"
                                        value={prix} onChange={this.voitureChange} />
                                </Form.Group>
                            </Row>
                        </Card.Body>
                        <Card.Footer style={{ "textAlign": "right" }}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> {voitureId ? "Mettre à jour" : "Enregistrer"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.resetVoiture}>
                                <FontAwesomeIcon icon={faUndo} /> Réinitialiser
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default function VoitureWithParams(props) {
    const params = useParams();
    return <Voiture {...props} params={params} />;
}