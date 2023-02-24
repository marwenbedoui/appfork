import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/tester/test";
const token = localStorage.getItem("token");

const executerTest = async (data) => {
  const result = await axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result.data;
};

const TesterService = {
  executerTest,
};

export default TesterService;
