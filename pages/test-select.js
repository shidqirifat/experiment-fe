import useFetch from 'hooks/useFetch';
import useForm from 'hooks/useForm';
import React from 'react';
import Select from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';
import { HOBBIES, ROLES } from 'utils/FORM_DATA';
import { generateOptions } from 'utils/select';

const ENDPOINT = 'https://rickandmortyapi.com/api/character';

export default function TestSelect() {
  const { fetch } = useFetch();
  const { form, onChangeCurrency, onChangeNumber, onChangeSelect } = useForm({
    character: '',
    phone_number: '',
    pajak: '',
    role: '',
    hobby: ''
  });

  const getCharacters = async (keyword, _, { page }) => {
    const { data } = await fetch({
      type: 'GET',
      url: ENDPOINT,
      params: {
        page,
        name: keyword
      },
      isExternalUrl: true
    });

    return {
      options: generateOptions({ list: data.results, label: 'name', value: 'id' }),
      hasMore: data.results?.length >= 1,
      additional: {
        page: page + 1
      }
    };
  };

  return (
    <div>
      <h1>Research React Select</h1>

      <div className="grid grid-cols-2 gap-4 mx-4 mt-6">
        <div>
          <h2 className="mb-2">No. HP</h2>
          <input
            className="border-2 w-full h-10 rounded-sm p-2"
            type="text"
            placeholder="Input phone number"
            value={form.phone_number}
            onChange={(e) => onChangeNumber('phone_number', e)}
          />
        </div>
        <div>
          <h2 className="mb-2">Pajak Tahun Ini</h2>
          <input
            className="border-2 w-full h-10 rounded-sm p-2"
            type="text"
            placeholder="Input pajak"
            value={form.pajak}
            onChange={(e) => onChangeCurrency('pajak', e)}
          />
        </div>
        <div>
          <h2 className="mb-2">Role</h2>
          <Select
            placeholder="Select role"
            options={ROLES}
            value={form.role}
            onChange={(options) => onChangeSelect('role', options)}
            isClearable
          />
        </div>
        <div>
          <h2 className="mb-2">Hobby</h2>
          <Select
            placeholder="Select hobby"
            options={HOBBIES}
            value={form.hobby}
            onChange={(options) => onChangeSelect('hobby', options)}
            isClearable
            isMulti
          />
        </div>
        <div>
          <h2 className="mb-2">Character</h2>
          <AsyncPaginate
            placeholder="Select character"
            value={form.character}
            loadOptions={getCharacters}
            onChange={(options) => onChangeSelect('character', options)}
            additional={{ page: 1 }}
            isClearable
            isMulti
          />
        </div>
      </div>
    </div>
  );
}
