import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/";
const token = localStorage.getItem("token");

const getInfos = async () => {
  const result = await axios.get(`${API_URL}get-info`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return result.data;
};

const updateInfo = async (data) => {
  const result = await axios.put(
    `${API_URL}update-names`,
    {
      firstname: data.firstname,
      lastname: data.lastname,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result.data;
};

const updatePassword = async (data) => {
  const result = await axios.put(
    `${API_URL}update-password`,
    {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      newPasswordConfirm: data.newPasswordConfirm,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result.data;
};

const updateMail = async (data) => {
  try {
    const result = await axios.put(
      `${API_URL}update-mail`,
      {
        newMail: data.newMail,
        newMailRetype: data.newMailRetype,
        password: data.password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

const ProfileServices = {
  getInfos,
  updateInfo,
  updateMail,
  updatePassword,
  token,
};

export default ProfileServices;
