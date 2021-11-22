import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import Content from "../components/Content/Content";
import {
  DeleteData,
  GetAllData,
  GetDataById,
  GetPredict,
  PostData,
  PutData,
} from "../Services/Training/TrainingService";

function Predict({mx}) {
  const [data, setData] = useState([]);
  const [predictions, setPredictions] = useState([]);

  const [id, SetId] = useState(Number);
  const [registro, SetRegistro] = useState(null);

  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalDetalle, setModalDetalle] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [ispredict, setIsPredict] = useState(false);
  const showPredict = () => setIsPredict(!ispredict);

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetRegistro((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleAgregar = () => setModalAgregar(!modalAgregar);

  const toggleEditar = (idData) => {
    SetId(idData);
    GetDataById(idData).then((registro) => {
      SetRegistro(registro);
    });
    setModalEditar(!modalEditar);
  };

  const toggleDetalle = (idData) => {
    SetId(idData);
    GetDataById(idData).then((registro) => {
      SetRegistro(registro);
    });
    setModalDetalle(!modalDetalle);
  };
  const toggleEliminar = (idData) => {
    setModalEliminar(!modalEliminar);
    SetId(idData);
  };

  const FetchData = () =>
    GetAllData().then((response) => {
      setData(response);
    });

  const AgregarRegistro = () => {
    PostData(registro);
    toggleAgregar();
  };
  const EditarRegistro = () => {
    toggleEditar();
    PutData(id, registro);
  };
  const EliminarRegistro = () => {
    DeleteData(id);
    toggleEliminar();
  };
  const Predecir = () => {
    GetPredict(mx).then((response) => {
      console.log(response);
      setPredictions(response);
    });
    showPredict();
  };
  useEffect(() => {
    FetchData();
  }, [id, modalAgregar]);

  return (
    <div className="page-content">
      <Content site="Predicción" modulo="Registros" />
      <div className="page-component">
        <div style={{ marginBottom: "10px" }}>
          <Button
            style={{ backgroundColor: "#57419d" }}
            size="sm"
            onClick={toggleAgregar}
          >
            + Agregar Registro
          </Button>{" "}
          <Button size="sm" onClick={Predecir}>
            {ispredict ? "Realizar Predicción" : "Ocultar Predicción"}
          </Button>
        </div>
        <Table borderless responsive size="sm" striped>
          <thead>
            <tr>
              <th style={{ width: "25%", textAlign: "center" }}>ID</th>
              <th style={{ width: "25%", textAlign: "center" }}>PM 10</th>
              <th
                hidden={ispredict}
                style={{ width: "25%", textAlign: "center" }}
              >
                Predicción
              </th>
              <th style={{ width: "25%", textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
            data.map((item, index) => {
              return (
                <tr style={{ textAlign: "center" }}>
                  <td>{item.id}</td>
                  <td>{item.pm10}</td>
                  <th hidden={ispredict}>
                    {
                    predictions.map((predict, index) => {
                      if (item.id === predict.id) {
                        return predict.pm25;
                      }
                    })}
                  </th>
                  <td>
                    <ButtonGroup size="sm">
                      {" "}
                      <Button
                        style={{ backgroundColor: "#57419d" }}
                        onClick={() => toggleDetalle(item.id)}
                      >
                        {" "}
                        Detalle{" "}
                      </Button>{" "}
                      <Button
                        style={{ backgroundColor: "#57419d" }}
                        onClick={() => toggleEditar(item.id)}
                      >
                        <ion-icon name="create-outline"></ion-icon>
                      </Button>{" "}
                      <Button
                        style={{ backgroundColor: "#57419d" }}
                        onClick={() => toggleEliminar(item.id)}
                      >
                        <ion-icon name="trash-outline"></ion-icon>
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              );
            })} 

          </tbody>
        </Table>
      </div>
      {/* MODALS */}
      <Modal isOpen={modalAgregar} toggle={toggleAgregar}>
        <ModalHeader toggle={toggleAgregar}>Agregar Registro</ModalHeader>
        <ModalBody>
          <Row>
            <FormGroup>
              <Label>Particular Material (PM10)</Label>
              <Input
                type="number"
                placeholder="Particular Material (PM10)"
                bsSize="sm"
                name="pm10"
                onChange={handleChange}
              />
            </FormGroup>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ backgroundColor: "#57419d" }}
            onClick={AgregarRegistro}
          >
            Aceptar
          </Button>{" "}
          <Button color="secondary" onClick={toggleAgregar}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      {/* MODAL */}
      <Modal isOpen={modalEditar} toggle={toggleEditar}>
        <ModalHeader toggle={toggleEditar}>Editar Registro</ModalHeader>
        <ModalBody>
          <Row>
            <FormGroup>
              <Label>Particular Material (PM10)</Label>
              <Input
                type="number"
                placeholder="Particular Material (PM10)"
                bsSize="sm"
                name="pm10"
                value={registro && registro.pm10}
                onChange={handleChange}
              />
            </FormGroup>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ backgroundColor: "#57419d" }}
            onClick={EditarRegistro}
          >
            Aceptar
          </Button>{" "}
          <Button color="secondary" onClick={toggleEditar}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      {/* MODAL */}
      <Modal isOpen={modalDetalle} toggle={toggleDetalle}>
        <ModalHeader toggle={toggleDetalle}>Editar Registro</ModalHeader>
        <ModalBody>
          <Row>
            <FormGroup>
              <Label>Particular Material (PM10)</Label>
              <Input
                type="number"
                placeholder="Particular Material (PM10)"
                bsSize="sm"
                name="pm10"
                value={registro && registro.pm10}
                onChange={handleChange}
                disabled
              />
            </FormGroup>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ backgroundColor: "#57419d" }}
            onClick={toggleDetalle}
          >
            Aceptar
          </Button>{" "}
        </ModalFooter>
      </Modal>
      {/* MODAL */}
      <Modal isOpen={modalEliminar} toggle={toggleEliminar}>
        <ModalHeader toggle={toggleEliminar}>Eliminar</ModalHeader>
        <ModalBody>¿Desea eliminar este registro?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={EliminarRegistro}>
            Aceptar
          </Button>{" "}
          <Button
            style={{ backgroundColor: "#57419d" }}
            onClick={toggleEliminar}
          >
            Cancelar
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default Predict;
