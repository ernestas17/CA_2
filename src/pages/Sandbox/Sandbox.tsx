import { useState } from 'react';
import Input from '../../components/atoms/Input';
import Radio from '../../components/atoms/Radio';
// import Select from '../../components/atoms/Select';
// import {
//   SelectItem,
//   ValidValueType,
// } from '../../components/atoms/Select/Select';

const Sandbox = () => {
  const [textInputVal, setTextInputVal] = useState('initialValue');
  // const [selectedVal, setSelectedVal] = useState<ValidValueType>(null);

  return (
    <div>
      <h1>Sandbox for testing/showcasing components</h1>
      <section>
        <h2>Input</h2>
        <p>
          Input value: <span>{textInputVal}</span>
        </p>
        <br />
        <Input
          type='text'
          value={textInputVal}
          setvalue={setTextInputVal}
          placeholder='input 1'
        ></Input>
        <Input
          type='text'
          value={textInputVal}
          setvalue={setTextInputVal}
          placeholder='input 2'
        ></Input>
        <Input
          type='text'
          value={123.45}
          setvalue={setTextInputVal}
          placeholder='input 3'
        ></Input>
      </section>
      <br />
      <section>
        <h2>Radio</h2>
        <br />
        <div>
          <Radio name='a' label='Faktiškai patirtos' checked={true} />
          <Radio name='a' label='30% nuo pajamų' />
          <Radio name='a' label='Other text' />
        </div>
        <br />
        <div>
          <Radio name='b' label='Faktiškai patirtos' />
          <Radio name='b' label='30% nuo pajamų' />
          <Radio name='b' label='Other text' />
        </div>
      </section>
      <br />
      {/* <section>
        <h2>Select</h2>
        <p>
          Selected: <span>{selectedVal}</span>
        </p>
        <br />
        <Select setvalue={setSelectedVal}>
          <SelectItem value={1}>item 1</SelectItem>
          <SelectItem value={2}>
            <a href='#'>item 2</a>
          </SelectItem>
          <SelectItem value={3}>
            <span>item 3</span> <img src='vite.svg' alt='[img]' height={16} />
          </SelectItem>
          <SelectItem value={4}>item 4</SelectItem>
          <SelectItem value={5}>item 5</SelectItem>
        </Select>
      </section> */}
    </div>
  );
};

export default Sandbox;
