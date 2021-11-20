import axios from "axios";

export const GetTraining = () => {
  axios
    .get("http://localhost:8000/training")
    .then((response) => {
      const { data } = response.data;
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};
