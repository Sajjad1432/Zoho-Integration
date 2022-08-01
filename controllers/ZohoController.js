const { default: axios } = require("axios");
const FormData = require("form-data");

async function createZohoAccount(formData) {
  const token = await generateToken();

  var data = JSON.stringify({
    data: [
      {
        Account_Name: formData.username,
        Email: formData.email,
        Account_Type: "Client",
      },
    ],
  });

  var config = {
    method: "post",
    url: "https://www.zohoapis.com/crm/v3/Accounts",
    headers: {
      Authorization: "Zoho-oauthtoken " + token,
      "Content-Type": "application/json",
    },
    data: data,
  };

  const account = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
      // throw error.data.message;
    });
  // await createZohoContact(token, formData);

  return account;
}

async function updateZohoAccount(zohoAccountId, username) {
  const token = await generateToken();

  var data = JSON.stringify({
    data: [
      {
        Account_Owner: username,
        Account_Name: username,
      },
    ],
  });

  var config = {
    method: "put",
    url: "https://www.zohoapis.com/crm/v3/Accounts/" + zohoAccountId,
    headers: {
      Authorization: "Zoho-oauthtoken " + token,
      "Content-Type": "application/json",
    },
    data: data,
  };

  const account = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
      // throw error.data.message;
    });

  return account;
}

async function createZohoContact(token, formData) {
  // if(!token)
  //     token = await generateToken();

  var data = JSON.stringify({
    data: [
      {
        Full_Name: formData.username,
        Last_Name: formData.username,
        Email: formData.email,
      },
    ],
  });

  var config = {
    method: "post",
    url: "https://www.zohoapis.com/crm/v3/Contacts",
    headers: {
      Authorization: "Zoho-oauthtoken " + token,
      "Content-Type": "application/json",
    },
    data: data,
  };

  const account = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      if (error.response.data.data[0].code == "DUPLICATE_DATA")
        return "DUPLICATE DATA";
      throw error;
    });
  return account;
}

async function createZohoTask(formData) {
  const token = await generateToken();

  console.log(token);

  var data = JSON.stringify({
    data: [
      {
        Description: "Hello World!",
        Status: "Not Started",
        Due_Date: "2022-08-06",
        Subject: "My Task Subject",
      },
    ],
  });

  var config = {
    method: "post",
    url: "https://www.zohoapis.com/crm/v3/Tasks",
    headers: {
      Authorization: "Zoho-oauthtoken " + token,
      "Content-Type": "application/json",
    },
    data: data,
  };

  const account = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    });

  return account;
}

async function generateToken() {
  //Access Token Generated From Refresh Token (Not Expire)
  // return '1000.48424f6412cb48b337bf15d520df7d5e.10f5e64c5b1de21bdbbbd17581abd4ab';
  var data = new FormData();
  data.append("client_id", "1000.SXMVJVWZL8LCDLOU7CH5R0HWRJV3SM");
  data.append("client_secret", "d2bdc0e48c66f55a8d6c0a1bfd749ab01f90c590e9");
  data.append(
    "refresh_token",
    "1000.6dea449d5cd96212c9737370df2d87ab.0710125c391e29057b28646ccaea64b2"
  );
  data.append("grant_type", "refresh_token");

  // var data = JSON.stringify({
  //     "client_id": '1000.I7MP2CQBXQSTWLO8LYG31TXCAARX3X',
  //     "client_secret": '1e4a35398c526b40dd1750b66bed08af787219ab56',
  //     "refresh_token": '1000.49ccc2e8e459f86cc1a28751718c6ac3.981190e67ebd5806941a3bb6397b84c7',
  //     "grant_type": 'refresh_token',
  // });

  var config = {
    method: "post",
    url: "https://accounts.zoho.com/oauth/v2/token",
    data: data,
  };

  const refreshToken = await axios(config)
    .then(function (response) {
      console.log("Refresh Token");
      if (response.data.error) throw response.data.error;

      if (response.data.access_token) {
        const token = response.data.access_token;
        return token;
      }
    })
    .catch(function (error) {
      console.log("ERROR---------->", error);
      throw error;
    });

  return refreshToken;
}

module.exports = {
  createZohoAccount,
  createZohoContact,
  createZohoTask,
};
