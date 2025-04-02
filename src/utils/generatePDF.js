import { jsPDF } from "jspdf";
import assinatura from "../assets/assinatura.png"; // Certifique-se de que o caminho está correto

// Função para gerar o PDF
export const generatePDF = (nome, examesSelecionados) => {
  if (!nome || examesSelecionados.length === 0) {
    alert("Preencha o nome e selecione pelo menos um exame.");
    return;
  }

  console.log("Gerando PDF...");

  // Criação do documento PDF com layout customizado
  const doc = new jsPDF("p", "mm", "a4"); // Padrão é retrato (vertical) e A4
  
  // Definindo margens e fontes
  doc.setMargins(10, 10, 10, 10);
  doc.setFont("helvetica");
  doc.setFontSize(16);

  // Título do PDF
  doc.setTextColor(0, 0, 255); // Cor do texto (azul)
  doc.text("Receita de Exames", 105, 20, null, null, "center");

  // Nome do paciente
  doc.setTextColor(0, 0, 0); // Cor do texto (preto)
  doc.setFontSize(12);
  doc.text(`Nome: ${nome}`, 20, 40);

  // Exames recomendados
  doc.text("Exames recomendados:", 20, 50);
  examesSelecionados.forEach((exame, index) => {
    doc.text(`${index + 1}. ${exame}`, 20, 60 + index * 10);
  });

  // Adicionando a assinatura
  doc.addImage(assinatura, "PNG", 150, 240, 50, 20); // Ajuste a posição conforme necessário

  // Salvando o PDF com o nome do paciente e data
  doc.save(`Receita_${nome}_${new Date().toLocaleDateString()}.pdf`);
};
