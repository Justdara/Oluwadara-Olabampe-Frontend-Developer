// api.js

const BASE_URL = "localhost/api";

export const fetchCapsules = async (status, capsuleSerial, type) => {
  let url = `${BASE_URL}/capsules`;

  // Append query parameters based on user input
  if (status) {
    url += url.includes("?") ? `&status=${status}` : `?status=${status}`;
  }

  if (capsuleSerial) {
    url += url.includes("?")
      ? `&capsule_serial=${capsuleSerial}`
      : `?capsule_serial=${capsuleSerial}`;
  }

  if (type) {
    url += url.includes("?") ? `&type=${type}` : `?type=${type}`;
  }

try {
  const username = "root";
  const password = "basic123";
  const headers = new Headers({
    'Authorization': 'Basic ' + btoa(username + ':' + password)
  });

  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  
  const data = await response.json();
  return data;
} catch (error) {
  console.error("Error fetching data", error);
  throw error; // Rethrow the error
}

};
