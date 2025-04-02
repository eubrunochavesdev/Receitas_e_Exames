import React, { useState } from "react";
import CheckboxList from "../components/CheckboxList";
import { jsPDF } from "jspdf";
import assinatura from "../assets/assinatura.png"; // Importando a assinatura diretamente

const ReceitaExames = () => {
  const [nome, setNome] = useState("");
  const [examesSelecionados, setExamesSelecionados] = useState([]);
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
    const doc = new jsPDF();
    doc.text("Receita de Exames", 20, 10);
    doc.text(`Nome: ${nome}`, 20, 20);
    doc.text("Exames recomendados:", 20, 30);

    examesSelecionados.forEach((exame, index) => {
      doc.text(`${index + 1}. ${exame}`, 20, 40 + index * 10);
    });

    // Adicionando a assinatura digital (agora utilizando o import da imagem)
    doc.addImage(assinatura, "PNG", 150, 240, 50, 20); // Adicionando a imagem da assinatura com as dimensões

    // Salvando o PDF com a data do dia
    doc.save(`Receita_${nome}_${new Date().toLocaleDateString()}.pdf`);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <h2 className="mb-4">Receita de Exames</h2>
          <div className="form-group mb-4">
            <label>Nome do Paciente</label>
            <input
              type="text"
              className="form-control"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <CheckboxList
            exames={exames}
            selecionados={examesSelecionados}
            toggleSelecionado={toggleSelecionado}
          />

          <button
            onClick={handleDownload}
            className="btn btn-primary mt-4 w-100"
          >
            Gerar Receita em PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceitaExames;
