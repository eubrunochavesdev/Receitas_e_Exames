import React from "react";

const CheckboxList = ({ exames, selecionados, toggleSelecionado }) => {
  return (
    <div className="form-check form-check-inline flex-column">
      {exames.map((exame, index) => (
        <div key={index} className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            checked={selecionados.includes(exame)}
            onChange={() => toggleSelecionado(exame)}
          />
          <label className="form-check-label">{exame}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxList;
