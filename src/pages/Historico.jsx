import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

const Historico = ({ usuarioLogado }) => {
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    // Recupera o histórico do localStorage
    const todasReceitas = JSON.parse(localStorage.getItem("historicoReceitas")) || [];
    // Filtra as receitas do usuário logado
    const receitasDoUsuario = todasReceitas.filter((receita) => receita.usuarioId === usuarioLogado.id);
    setHistorico(receitasDoUsuario);
  }, [usuarioLogado]);

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
      <h2 className="mb-4">Histórico de Receitas</h2>
      {historico.length === 0 ? (
        <p>Nenhuma receita encontrada.</p>
      ) : (
        <ul className="list-group">
          {historico.map((receita, index) => (
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