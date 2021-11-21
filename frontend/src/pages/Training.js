import { useEffect, useState } from "react";
import { Button, ButtonGroup, Table } from "reactstrap";
import Content from "../components/Content/Content";
import {
  GetAllRegisters,
  GetTraining,
} from "../Services/Registers/RegisterService";
import RegistroModal from "./Modals/RegistroModal";

function Training() {
  const [registros, setRegistros] = useState([]);
  const [idRegistro, setIdRegistro] = useState();

  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalDetalle, setModalDetalle] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [mx, setMx] = useState({ m: "", c: "" });

  const toggleAgregar = () => setModalAgregar(!modalAgregar);

  const toggleEditar = (idregistro) => {
    setModalEditar(!modalEditar);
    setIdRegistro(idregistro);
  };
  const toggleDetalle = (idregistro) => {
    setModalDetalle(!modalDetalle);
    setIdRegistro(idregistro);
  };
  const toggleEliminar = (idregistro) => {
    setModalEliminar(!modalEliminar);
    setIdRegistro(idregistro);
  };

  const Entrenar = () =>
    GetTraining().then((mx) => {
      setMx(mx);
    });

  const fetchData = () =>
    GetAllRegisters().then((registros) => {
      setRegistros(registros);
    });

  useEffect(() => {
    fetchData();
    Entrenar();
  }, [idRegistro, modalAgregar]);

  return (
    <div>
      <RegistroModal
        modal={modalAgregar}
        toggle={toggleAgregar}
        tipo={1}
      ></RegistroModal>
      <RegistroModal
        modal={modalEditar}
        toggle={toggleEditar}
        tipo={2}
        idRegistro={idRegistro}
      ></RegistroModal>
      <RegistroModal
        modal={modalDetalle}
        toggle={toggleDetalle}
        tipo={3}
        idRegistro={idRegistro}
      ></RegistroModal>
      <RegistroModal
        modal={modalEliminar}
        toggle={toggleEliminar}
        tipo={4}
        idRegistro={idRegistro}
      ></RegistroModal>

      <div className="page-content">
        <Content site="Entrenamiento" modulo="Registros" />
        <div className="page-component">
          <div style={{ marginBottom: "10px" }}>
            <Button
              style={{ backgroundColor: "#57419d" }}
              size="sm"
              onClick={toggleAgregar}
            >
              + Agregar Registro
            </Button>{" "}
            <span
              style={{ marginLeft: "10px" }}
            >{`M: ${mx.m} C: ${mx.c}`}</span>
          </div>
          <Table borderless responsive size="sm" striped>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>Id</th>
                <th>Fecha</th>
                <th>CO</th>
                <th>H2S</th>
                <th>NO2</th>
                <th>O3</th>
                <th>PM10</th>
                <th>PM25</th>
                <th>SO2</th>
                <th>Ruido</th>
                <th>Humedad</th>
                <th>Presión</th>
                <th>Temperatura</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((registro) => (
                <tr key={registro.id} style={{ textAlign: "center" }}>
                  <td>{registro.id}</td>
                  <td>{registro.fecha}</td>
                  <td>{registro.co}</td>
                  <td>{registro.h2s}</td>
                  <td>{registro.no2}</td>
                  <td>{registro.o3}</td>
                  <td>{registro.pm10}</td>
                  <td>{registro.pm25}</td>
                  <td>{registro.so2}</td>
                  <td>{registro.ruido}</td>
                  <td>{registro.humedad}</td>
                  <td>{registro.presion}</td>
                  <td>{registro.temperatura}</td>
                  <td>
                    <ButtonGroup size="sm">
                      {" "}
                      <Button
                        style={{ backgroundColor: "#57419d" }}
                        onClick={() => toggleDetalle(registro.id)}
                      >
                        {" "}
                        Detalle{" "}
                      </Button>{" "}
                      <Button
                        style={{ backgroundColor: "#57419d" }}
                        onClick={() => toggleEditar(registro.id)}
                      >
                        <ion-icon name="create-outline"></ion-icon>
                      </Button>{" "}
                      <Button
                        style={{ backgroundColor: "#57419d" }}
                        onClick={() => toggleEliminar(registro.id)}
                      >
                        <ion-icon name="trash-outline"></ion-icon>
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Training;
