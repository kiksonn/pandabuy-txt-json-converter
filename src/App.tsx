import React, { useState, ChangeEvent } from 'react';

interface DataItem {
  id: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  price: string | null;
  country: string;
  province: string;
  city: string;
  street: string;
  postalCode: string;
  idnr2: string;
}

function App(): JSX.Element {
  const [jsonData, setJsonData] = useState<DataItem[] | null>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target?.result?.toString();
      if (!text) return;

      const lines = text.split('\n');
      const data = lines.map((line) => {
        const [id, phoneNumber, firstName, lastName, price, country, province, city, street, postalCode, idnr2] = line.split(',');
        return {
          id: id ? id.trim() : '',
          phoneNumber: phoneNumber ? phoneNumber.trim() : '',
          firstName: firstName ? firstName.trim() : '',
          lastName: lastName ? lastName.trim() : '',
          price: price ? price.trim() : null,
          country: country ? country.trim() : '',
          province: province ? province.trim() : '',
          city: city ? city.trim() : '',
          street: street ? street.trim() : '',
          postalCode: postalCode ? postalCode.trim() : '',
          idnr2: idnr2 ? idnr2.trim() : ''
        };
      });
      setJsonData(data);
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {jsonData && (
        <div>
          <h2>Converted JSON Data:</h2>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
