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
  const filteredData = result.data.filter(
    (seance) =>
      seance.testName.toUpperCase().includes(name.toUpperCase()) &&
      seance.createdBy &&
      (seance.createdBy.firstname.toUpperCase().includes(owner.toUpperCase()) ||
        seance.createdBy.lastname
          .toUpperCase()
          .includes(owner.toUpperCase())) &&
      seance.status.toUpperCase().includes(status.toUpperCase())
  );

  filteredData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return filteredData;
};

const fetchDataTest = async () => {
  const result = await axios.get(`${API_URL}/result`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result.data;
};

const getTestById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};


const TesterService = {
  executerTest,
  fetchAllTests,
  fetchDataTest,
  getTestById
};

export default TesterService;
