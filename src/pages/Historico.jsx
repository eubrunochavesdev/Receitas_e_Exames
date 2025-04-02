import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { Link } from "react-router-dom";

const Historico = () => {
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    // Simula a recuperação de dados do histórico (iremos integrar com Firebase depois)
    const receitas = [
      {
        nome: "João Silva",
        data: "02/04/2025 14:30",
        exames: ["Hemograma Completo", "Glicemia de Jejum"],
      },
      {
        nome: "Maria Oliveira",
        data: "01/04/2025 10:15",
        exames: ["Colesterol Total", "Triglicerídeos"],
      },
    ];
    setHistorico(receitas);
  }, []);

  const handleDownload = (receita) => {
    const doc = new jsPDF();

    // Adiciona o título
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Receituário Médico", 105, 20, { align: "center" });

    // Adiciona o nome do paciente
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(`Nome do Paciente: ${receita.nome}`, 20, 40);

    // Adiciona a data
    doc.text(`Data: ${receita.data}`, 20, 50);

    // Adiciona os exames
    doc.text("Exames:", 20, 60);
    receita.exames.forEach((exame, index) => {
      doc.text(`${index + 1}. ${exame}`, 30, 70 + index * 10);
    });

    // Salva o PDF
    doc.save(`Receituario_${receita.nome.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Histórico de Receituários</h2>
      {historico.length === 0 ? (
        <p>Nenhum receituário emitido ainda.</p>
      ) : (
        <ul className="list-group">
          {historico.map((receita, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{receita.nome}</h5>
                <p><strong>Data:</strong> {receita.data}</p>
                <p><strong>Exames:</strong> {receita.exames.join(", ")}</p>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => handleDownload(receita)}
              >
                Baixar PDF
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4">
        <Link to="/" className="btn btn-primary me-2">
          Novo Receituário
        </Link>
        <button className="btn btn-danger">
          Limpar Histórico
        </button>
      </div>
    </div>
  );
};

export default Historico;