import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import papelTimbrado from "../assets/papel_timbrado.jpg";
import { useNavigate } from "react-router-dom";

const AdminPanel = ({ usuarioLogado }) => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [clinicaSelecionada, setClinicaSelecionada] = useState(null);

  useEffect(() => {
    const usuariosCadastrados = [
      { id: 1, nome: "Admin", email: "admin@admin.com", tipo: "admin" }, // Adiciona o admin à lista
      { id: 2, nome: "Clínica A", email: "clinicaA@exemplo.com", tipo: "clinica" },
      { id: 3, nome: "Clínica B", email: "clinicaB@exemplo.com", tipo: "clinica" },
    ];
    setUsuarios(usuariosCadastrados);

    const receitas = JSON.parse(localStorage.getItem("historicoReceitas")) || [];
    setHistorico(receitas);
  }, []);

  const handleToggleClinica = (clinicaId) => {
    setClinicaSelecionada(clinicaSelecionada === clinicaId ? null : clinicaId);
  };

  const adicionarPapelTimbradoETitulo = (doc, titulo) => {
    doc.addImage(papelTimbrado, "PNG", 0, 0, 210, 297);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(titulo, 105, 40, { align: "center" });
  };

  const handleDownloadHistorico = (clinicaId) => {
    const receitasDaClinica = historico.filter((receita) => receita.usuarioId === clinicaId);
    const clinica = usuarios.find((usuario) => usuario.id === clinicaId);

    const doc = new jsPDF();
    adicionarPapelTimbradoETitulo(doc, `Histórico de Receitas - ${clinica?.nome || "Clínica"}`);

    const pacientesPorPagina = 4;
    receitasDaClinica.forEach((receita, index) => {
      const yPosition = 60 + (index % pacientesPorPagina) * 50;

      if (index > 0 && index % pacientesPorPagina === 0) {
        doc.addPage();
        adicionarPapelTimbradoETitulo(doc, `Histórico de Receitas - ${clinica?.nome || "Clínica"}`);
      }

      doc.setDrawColor(187, 190, 0);
      doc.setLineWidth(0.5);
      doc.roundedRect(10, yPosition - 5, 190, 40, 5, 5);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Paciente: ${receita.nomePaciente}`, 15, yPosition);
      doc.text(`Data de Nascimento: ${formatarData(receita.dataNascimento)}`, 15, yPosition + 10);
      doc.text(`Data da Receita: ${formatarData(receita.data)}`, 15, yPosition + 20);
    });

    doc.save(`Historico_${clinica?.nome.replace(/\s+/g, "_") || clinicaId}.pdf`);
  };

  const formatarData = (data) => {
    const dataObj = new Date(data);
    return dataObj.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="container mt-5 bg-light p-4 rounded shadow">
      {/* Botão de voltar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Emitir Relatórios</h2>
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/admin-dashboard")}
        >
          ← Voltar
        </button>
      </div>

      <ul className="list-group">
        {usuarios.map((usuario) => (
          <li
            key={usuario.id}
            className="list-group-item"
            style={{ border: "1px solid var(--primary-color)" }}
          >
            <div
              className="d-flex justify-content-between align-items-center"
              onClick={() => handleToggleClinica(usuario.id)}
              style={{ cursor: "pointer" }}
              title={`Clique para ${clinicaSelecionada === usuario.id ? "recolher" : "expandir"}`}
            >
              <span>{usuario.nome}</span>
              <span>{clinicaSelecionada === usuario.id ? "-" : "+"}</span>
            </div>
            <div
              className={`accordion-content ${clinicaSelecionada === usuario.id ? "open" : ""}`}
            >
              {clinicaSelecionada === usuario.id && (
                <div className="mt-3">
                  <p>
                    <strong>Receitas emitidas no mês:</strong>{" "}
                    {
                      historico.filter(
                        (receita) =>
                          receita.usuarioId === usuario.id &&
                          new Date(receita.data).getMonth() === new Date().getMonth()
                      ).length
                    }
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleDownloadHistorico(usuario.id)}
                    aria-label={`Baixar histórico de ${usuario.nome}`}
                  >
                    Baixar Histórico
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
