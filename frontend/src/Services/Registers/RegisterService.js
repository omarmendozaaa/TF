import axios from "axios";

export const GetAllRegisters = () => {
  return axios
    .get("http://localhost:8000/registers")
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const GetRegisterById = (Id) => {
  return axios
    .get(`http://localhost:8000/registers/${Id}`)
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const PostRegister = (Register) => {
  return axios
    .post(`http://localhost:8000/registers`, Register)
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const PutRegister = (Id, RegisterUpdate) => {
  return axios
    .put(`http://localhost:8000/registers/${Id}`, RegisterUpdate)
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const DeleteRegister = (Id) => {
  return axios
    .delete(`http://localhost:8000/registers/${Id}`)
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
};
