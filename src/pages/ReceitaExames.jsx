import React, { useState } from "react";
import CheckboxList from "../components/CheckboxList";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import assinatura from "../assets/assinatura.png"; // Importando a assinatura diretamente

const ReceitaExames = ({ usuarioLogado }) => {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [examesSelecionados, setExamesSelecionados] = useState([]);
  const navigate = useNavigate();

  const exames = [
    "Hemograma Completo",
    "Glicemia de Jejum",
    "Colesterol Total",
    "Triglicerídeos",
    "Exame de Urina",
    "Creatinina",
    "T4 Livre",
    "TSH",
    "Vitamina D",
    "Calcio"
  ];

  const toggleSelecionado = (exame) => {
    setExamesSelecionados((prev) =>
      prev.includes(exame)
        ? prev.filter((item) => item !== exame)
        : [...prev, exame]
    );
  };

  const handleDownload = () => {
    if (!nome || !dataNascimento || examesSelecionados.length === 0) {
      alert("Por favor, preencha todos os campos antes de gerar o PDF.");
      return;
    }

    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Receituário Médico", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Paciente: ${nome}`, 20, 40);
    doc.text(`Data de Nascimento: ${formatarData(dataNascimento)}`, 20, 50);
    doc.text(`Data da Receita: ${new Date().toLocaleString()}`, 20, 60);

    doc.text("Exames Solicitados:", 20, 70);
    examesSelecionados.forEach((exame, index) => {
      doc.text(`${index + 1}. ${exame}`, 30, 80 + index * 10);
    });

    doc.addImage(assinatura, "PNG", 150, 240, 50, 20);

    doc.save(`Receita_${nome.replace(/\s+/g, "_")}.pdf`);
  };

  const formatarData = (data) => {
    const date = new Date(data);
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const handleSalvar = () => {
    if (!nome || !dataNascimento || examesSelecionados.length === 0) {
      alert("Por favor, preencha todos os campos antes de salvar.");
      return;
    }

    const receita = {
      usuarioId: usuarioLogado.id,
      nomePaciente: nome,
      dataNascimento: dataNascimento,
      exames: examesSelecionados,
      data: new Date().toLocaleString(),
    };

    const historico = JSON.parse(localStorage.getItem("historicoReceitas")) || [];
    historico.push(receita);
    localStorage.setItem("historicoReceitas", JSON.stringify(historico));

    alert("Receita salva com sucesso!");
    handleDownload();
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="container bg-light p-5 rounded shadow">
        <div className="row">
          <div className="col-md-6 mx-auto">
            {/* Botão de voltar (somente para admin) */}
            {usuarioLogado?.tipo === "admin" && (
              <button
                className="btn btn-outline-primary mb-3"
                onClick={() => navigate("/admin-dashboard")}
              >
                ← Voltar
              </button>
            )}

            <h2
              className="mb-4"
              style={{ fontFamily: "var(--font-bold)", color: "var(--primary-color)" }}
            >
              Receituário 5s
            </h2>

            <div className="form-group mb-4">
              <label className="fw-bold">Nome do Paciente</label>
              <input
                type="text"
                className="form-control"
                style={{ fontFamily: "var(--font-regular)" }}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="form-group mb-4">
              <label className="fw-bold">Data de Nascimento</label>
              <input
                type="date"
                className="form-control"
                style={{ fontFamily: "var(--font-regular)" }}
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
              />
            </div>

            <CheckboxList
              exames={exames}
              selecionados={examesSelecionados}
              toggleSelecionado={toggleSelecionado}
            />

            <button className="btn btn-secondary mt-2 w-100" onClick={handleSalvar}>
              Salvar Receita
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceitaExames;
