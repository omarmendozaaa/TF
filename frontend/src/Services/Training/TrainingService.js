import axios from "axios";

export const GetAllData = () => {
  return axios
    .get("http://localhost:9000/data")
    .then((response) => {
      const { data } = response;
      return data;
    })
};

export const GetDataById = (Id) => {
  return axios
    .get(`http://localhost:9000/data/${Id}`)
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const PostData = (Data) => {
  return axios
    .post(`http://localhost:9000/data`, Data)
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const PutData = (Id, DataUpdate) => {
  return axios
    .put(`http://localhost:9000/data/${Id}`, DataUpdate)
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const DeleteData = (Id) => {
  return axios
    .delete(`http://localhost:9000/data/${Id}`)
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const GetPredict = (mx) => {
  return axios
    .post(`http://localhost:9000/predict`, mx)
    .then((response) => {
      const { data } = response;
      return data;
    })
};
