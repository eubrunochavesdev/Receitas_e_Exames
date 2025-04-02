import React from "react";

const CheckboxList = ({ exames, selecionados, toggleSelecionado }) => {
  return (
    <div className="d-flex flex-column">
      {exames.map((exame, index) => (
        <div key={index} className="d-flex align-items-center mb-2">
          <input
            type="checkbox"
            className="custom-checkbox" // Classe personalizada para o checkbox
            checked={selecionados.includes(exame)}
            onChange={() => toggleSelecionado(exame)}
          />
          <label className="checkbox-label">{exame}</label> {/* Classe personalizada para o texto */}
        </div>
      ))}
    </div>
  );
};

export default CheckboxList;
