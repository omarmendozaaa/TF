import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { DeleteRegister, GetRegisterById, PostRegister, PutRegister } from "../../Services/Registers/RegisterService";
import ModalCustomBody from "./ModalCustonBody";

function RegistroModal({ modal, toggle, tipo, idRegistro }) {
  //agregar 1, editar 2, detalle 3
  const [registro, SetRegistro] = useState();

  useEffect(()=>{
    GetRegisterById(idRegistro).then((registro) => {
        SetRegistro(registro);
      });
  },[idRegistro]);

  const AgregarRegistro = () => {
    toggle();
    PostRegister(registro);
  }
  const EditarRegistro = () => {
    toggle();
    PutRegister(idRegistro,registro);
  }
  const EliminarRegistro = () => {
    toggle();
    DeleteRegister(idRegistro);
  };

  if (tipo === 1) {
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Agregar Registro</ModalHeader>
        <ModalCustomBody SetRegistro = {SetRegistro} registro = {registro} canedit={true} empty={true}></ModalCustomBody>
        <ModalFooter>
          <Button color="primary" onClick={AgregarRegistro}>
            Aceptar
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    );
  } else if (tipo === 2) {
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Editar Registro</ModalHeader>
        <ModalCustomBody  SetRegistro = {SetRegistro} registro = {registro} canedit={true} empty={false}></ModalCustomBody>
        <ModalFooter>
          <Button color="primary" onClick={EditarRegistro}>
            Aceptar
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    );
  } else if (tipo === 3) {
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Detalle</ModalHeader>
        <ModalCustomBody  SetRegistro = {SetRegistro} registro = {registro} empty={false} canedit={false}></ModalCustomBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Aceptar
          </Button>{" "}
        </ModalFooter>
      </Modal>
    );
  } else {
    return(    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Eliminar</ModalHeader>
      <ModalBody>
      ¿Desea eliminar este registro?
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={EliminarRegistro}>
          Aceptar
        </Button>{" "}
        <Button color="primary" onClick={toggle}>
          Cancelar
        </Button>{" "}
      </ModalFooter>
    </Modal>);
  }
}

export default RegistroModal;
