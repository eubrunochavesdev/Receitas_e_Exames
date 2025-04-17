import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";

const Historico = ({ usuarioLogado }) => {
  const [receitas, setReceitas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReceitas = async () => {
      try {
        console.log("Usuário logado:", usuarioLogado);
        const response = await axios.get("http://localhost:3000/api/receitas"); // Atualiza a URL para incluir o prefixo /api
        console.log("Receitas carregadas:", response.data);

        // Filtra receitas pelo ID do usuário logado
        const receitasFiltradas = response.data.filter(
          (receita) => receita.usuarioId === usuarioLogado.id
        );
        setReceitas(receitasFiltradas);
      } catch (error) {
        console.error("Erro ao carregar receitas:", error);
      }
    };

    if (usuarioLogado) {
      fetchReceitas();
    }
  }, [usuarioLogado]);

  if (!usuarioLogado) {
    return <p>Carregando informações do usuário...</p>;
  }

  // Função para formatar a data no formato dd/mm/aaaa
  const formatarData = (data) => {
    const date = new Date(data);
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0"); // Mês começa em 0
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  // Função para gerar o PDF de uma receita
  const handleDownloadPDF = (receita) => {
    const doc = new jsPDF();

    // Adiciona o título
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Receituário Médico", 105, 20, { align: "center" });

    // Adiciona os dados do paciente
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Paciente: ${receita.nomePaciente}`, 20, 40);
    doc.text(`Data de Nascimento: ${formatarData(receita.dataNascimento)}`, 20, 50);
    doc.text(`Data da Receita: ${receita.data}`, 20, 60);
    doc.text(`Exames: ${receita.exames.join(", ")}`, 20, 70);

    // Salva o PDF
    doc.save(`Receita_${receita.nomePaciente}.pdf`);
  };

  return (
    <div className="container mt-5">
      {/* Botão de voltar */}
      <button
        className="btn btn-outline-primary mb-4"
        onClick={() => navigate("/admin-dashboard")}
      >
        ← Voltar
      </button>

      <h2 className="mb-4">Histórico de Receitas</h2>
      {receitas.length === 0 ? (
        <p>Nenhuma receita encontrada.</p>
      ) : (
        <ul className="list-group">
          {receitas.map((receita, index) => (
            <li key={index} className="list-group-item">
              <h5>Paciente: {receita.nomePaciente}</h5>
              <p><strong>Data de Nascimento:</strong> {formatarData(receita.dataNascimento)}</p>
              <p><strong>Data da Receita:</strong> {receita.data}</p>
              <p><strong>Exames:</strong> {receita.exames.join(", ")}</p>
              <button onClick={() => handleDownloadPDF(receita)} className="btn btn-primary mt-2">Baixar PDF</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Historico;