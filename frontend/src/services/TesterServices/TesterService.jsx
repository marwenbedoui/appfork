import axios from "axios";
import jwtDecode from "jwt-decode";

function extractNumbers(str) {
  const regex = /(\d+)\)$/; // match one or more digits between parenthesis at the end of the string
  const match = str.match(regex);
  if (match) {
    const num = match[1];
    if (num.length > 0) {
      return num;
    } else {
      return 0; // return 0 if the string ends with empty parentheses
    }
  } else {
    return -1; // return 0 if the string doesn't end with a number between parenthesis
  }
}

const API_URL = "http://localhost:5000/api/v1/tester/test";
const token = localStorage.getItem("token");

// const executerTest = async (data, nouv, files) => {
const executerTest = async (data, ancien) => {
  let dataParsed, req;
  if (data.method === "post") {
    dataParsed = JSON.parse(data.data);
  } else {
    dataParsed = "";
  }
  let nom = data.testName;
  if (ancien) {
    var numbers = extractNumbers(nom);
    if (numbers === -1) {
      numbers = numbers + 2;
      nom = nom + " (" + numbers + ")";
    } else if (numbers === 0) {
      numbers++;
      nom =
        nom.substring(0, nom.length - numbers.toString().length) +
        " (" +
        numbers +
        ")";
    } else {
      numbers++;
      nom =
        nom.substring(0, nom.length - numbers.toString().length - 1) +
        numbers +
        ")";
    }
  }
  req = {
    testName: nom,
    linkRepo: data.linkRepo,
    file: data.file,
    protocol: data.protocol,
    url: data.url,
    port: data.port,
    path: data.path,
    usersNumber: data.usersNumber,
    method: data.method,
    data: dataParsed,
    link: data._id,
    createdBy: jwtDecode(token).userId,
  };
  // } else {
  //   const formData = new FormData();
  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     formData.append("files", file);
  //   }
  //   formData.append("testName", data.testName);
  //   formData.append("protocol", data.protocol);
  //   formData.append("url", data.url);
  //   formData.append("port", data.port);
  //   formData.append("path", data.path);
  //   formData.append("usersNumber", data.usersNumber);
  //   formData.append("method", data.method);
  //   formData.append("data", dataParsed);
  //   formData.append("createdBy", jwtDecode(token).userId);
  //   req = formData;
  // }

  const result = await axios.post(API_URL, req, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return result.data;
};

const fetchAllTests = async (name, owner, status, role, auth) => {
  const result = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  let filteredData;
  if (role === "tester") {
    const result = await axios.get(`${API_URL}/tester`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    filteredData = result.data.filter(
      (seance) =>
        seance.testName.toUpperCase().includes(name.toUpperCase()) &&
        seance.createdBy &&
        seance.createdBy._id.includes(auth) &&
        seance.status.toUpperCase().includes(status.toUpperCase())
    );
  } else {
    filteredData = result.data.filter(
      (seance) =>
        seance.testName.toUpperCase().includes(name.toUpperCase()) &&
        seance.createdBy &&
        (seance.createdBy.firstname
          .toUpperCase()
          .includes(owner.toUpperCase()) ||
          seance.createdBy.lastname
            .toUpperCase()
            .includes(owner.toUpperCase())) &&
        seance.status.toUpperCase().includes(status.toUpperCase())
    );
  }

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

const fetchTestStatePerUser = async () => {
  const result = await axios.get(`${API_URL}/number`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result.data;
};

const fetchTestsPerUser = async () => {
  const result = await axios.get(`${API_URL}/all`, {
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

const predictTest = async (data) => {
  const result = await axios.post(
    `${API_URL}/predict`,
    {
      usersNumber: parseInt(data.usersNumber),
      linkRepo: data.linkRepo,
      file: data.file,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result.data;
};

const TesterService = {
  executerTest,
  fetchAllTests,
  fetchDataTest,
  fetchTestStatePerUser,
  fetchTestsPerUser,
  getTestById,
  predictTest,
};

export default TesterService;
