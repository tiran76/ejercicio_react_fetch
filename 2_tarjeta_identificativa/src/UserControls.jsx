import React from 'react';
import styled from 'styled-components';

const Controls = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const UserControls = ({ resultCount, onResultCountChange, onReload, isLoading }) => {
  return (
    <Controls>
      <select
        value={resultCount}
        onChange={onResultCountChange}
        disabled={isLoading}
      >
        {[5, 10, 15, 20].map((count) => (
          <option key={count} value={count}>
            {count}
          </option>
        ))}
      </select>
      <button onClick={onReload} disabled={isLoading}>
        Recargar
      </button>
    </Controls>
  );
};

export default UserControls;
