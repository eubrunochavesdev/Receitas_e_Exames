import React, { useEffect, useState } from "react";
import axios from "axios";

const ClinicasList = () => {
  const [clinicas, setClinicas] = useState([]);

  useEffect(() => {
    const fetchClinicas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/clinicas");
        setClinicas(response.data);
      } catch (error) {
        console.error("Erro ao buscar clínicas:", error);
      }
    };

    fetchClinicas();
  }, []);

  return (
    <div>
      <h1>Lista de Clínicas</h1>
      <ul>
        {clinicas.map((clinica) => (
          <li key={clinica.id}>
            {clinica.nome} - {clinica.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClinicasList;
