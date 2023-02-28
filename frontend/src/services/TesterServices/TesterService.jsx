import axios from "axios";
import jwtDecode from "jwt-decode";

const API_URL = "http://localhost:5000/api/v1/tester/test";
const token = localStorage.getItem("token");

const executerTest = async (data) => {
  const result = await axios.post(
    API_URL,
    {
      testName: data.testName,
      protocol: data.protocol,
      url: data.url,
      port: data.port,
      path: data.path,
      method: data.method,
      createdBy: jwtDecode(token).userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result.data;
};

const fetchAllTests = async (name, owner, status) => {
  const result = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result.data.filter(
    (seance) =>
      seance.testName.toUpperCase().includes(name.toUpperCase()) &&
      (seance.createdBy.firstname.toUpperCase().includes(owner.toUpperCase()) ||
        seance.createdBy.lastname
          .toUpperCase()
          .includes(owner.toUpperCase())) &&
      seance.status.includes(status)
  );
};

const TesterService = {
  executerTest,
  fetchAllTests,
};

export default TesterService;
